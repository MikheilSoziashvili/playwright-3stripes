#!/usr/bin/env groovy

@Library(['GlobalJenkinsLibrary@master', 'TaaSWrapper@master']) _

def svc_credentials = "svc_testautomation"                                                        //UPDATE AS REQUIRED
def xrayImportUrl = "https://jira.tools.3stripes.net/rest/raven/1.0/import/execution/junit"       //DO NOT MODIFY
def xrayImportOutput = "reports/xray-response.json"                                               //DO NOT MODIFY
def xrayImportHeader = "-H 'Content-Type: application/json' -H 'Cache-Control: no-cache'"         //DO NOT MODIFY
def rpCredentials = "test-reporting-portal-pea-test_engineering"                                  //UPDATE AS REQUIRED
def rpUrl = "https://testreportingportal.tools.3stripes.net"                                      //DO NOT MODIFY
def projectName = "te-seed-tas-playwright-js"                                                     //UPDATE AS REQUIRED
def email = "pea.test_engineering@adidas.com"                                                     //UPDATE AS REQUIRED

def jiraEnvironment = "PROD"                                                                      //UPDATE ACCORDING TO YOUR NEEDS
def jiraSummary = "Test Plan $params.TEST_PLAN_KEY execution"                                    //UPDATE ACCORDING TO YOUR NEEDS

def testRepo = "tests/Kafka"

pipeline {
    agent { label 'ubuntu_node-18_docker-20_playwright' }
    environment {
        NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"                                  //Do not modify
        ENV = tools.git.getSimplifiedBranchName()                               //Do not modify
        BUILD = "${BUILD_NUMBER}"                                               //Do not modify
        CI = true                                                               //Do not modify
        RP_TOKEN = credentials('test-reporting-portal-pea-test_engineering')    //UPDATE AS REQUIRED
        RP_PROJECT = 'te-seed-tas-playwright-js'                                //UPDATE AS REQUIRED
        RP_DESCRIPTION = "${JOB_URL}${BUILD_NUMBER}"                            //Do not modify
        WEBHOOK_CREDENTIALS = credentials("jenkins-teams-webhook-url")          //UPDATE AS REQUIRED
    }
    parameters{
        gitParameter branchFilter: 'origin/(.*)', defaultValue: 'master', name: 'BRANCH_NAME', type: 'PT_BRANCH'
        string(name: 'PROJECT_KEY', defaultValue: 'TED', description: '*Mandatory!! - Your project key')
        string(name: 'TEST_PLAN_KEY', defaultValue: 'TED-34459', description: '*Mandatory!! - Test plan for executions and pushing the results')
        choice(name: 'COMMANDS', choices: [
            'npx playwright test --config=./configFiles/Kafka-jenkins.config.js',                         
            ], description: 'Choose a CLI command from the dropdown OR Use custom command by selecting the checkbox. For dropdown CLI commands, tests are executed based on the annotations specified in test file (e.g. @TED-34459 executes Kafka example tests)')
        booleanParam(name: 'FROM_CUSTOM_COMMAND', defaultValue: false, description: 'If you activate this, fill the following field:')
        string(name: 'CUSTOM_COMMAND', defaultValue: 'npm test', description: 'Test scripts/custom execution commands can be specified here. For using @annotation, specify the same using --grep flag')
    }
    stages {
        stage('Checkout & Collect Info'){
            steps{
                checkout scm
                echo "Checkout: done"
            }
        }

        stage('Build'){
            steps{
                dir(testRepo){
                    sh 'pwd'
                    echo 'Installing dependencies for Kafka'
                    sh "npm install"
                    sh "npx playwright --version"
                }
            }
        }

        stage('Checking Code Quality') {
            steps {
                dir(testRepo){
                    sh "npm run-script sonarAnalysis"
                }
            }
        }

        stage("Executing Tests"){
            steps{
                dir(testRepo){
                    catchError(buildResult: 'UNSTABLE', stageResult: 'UNSTABLE') {
                        sh buildCommand()  
                    }
                }
            }
        }

        stage('Exporting Test Results'){
            steps{
                dir(testRepo){
                    script {
                        withCredentials([usernamePassword(credentialsId: svc_credentials, passwordVariable: "password", usernameVariable: "username")]) {
                            sh "curl --location --request POST '${xrayImportUrl}?projectKey=${params.PROJECT_KEY}&testPlanKey=${params.TEST_PLAN_KEY}' -u ${username}@emea.adsint.biz:${password} --form 'file=@reports/junit.xml' -o ${xrayImportOutput}"
                        }
                        //Getting created execution key
                        def props = readJSON file: xrayImportOutput
                        def executionKey = props.testExecIssue.key
                        echo '[Xray] Test Execution created succesfully: ' + executionKey
                        //Linking test execution to test plan
                        //Creating json data for Xray
                        sh "echo '{\"add\": [\"$executionKey\"]}' > reports/data.json"

                        withCredentials([usernamePassword(credentialsId: svc_credentials, passwordVariable: "password", usernameVariable: "username")]) {
                            //Linking Test Plan and Test Execution
                            def url = 'https://jira.tools.3stripes.net/rest/raven/1.0/api/testplan/' + params.TEST_PLAN_KEY + '/testexecution'
                            def data = '@reports/data.json'
                            sh "curl -X POST ${url} ${xrayImportHeader} -u ${username}@emea.adsint.biz:${password} -d ${data}"
                            //Editing Test Execution attributes example
                            def urlExecution = 'https://jira.tools.3stripes.net/rest/api/2/issue/' + executionKey
                            sh "curl -X PUT ${urlExecution} ${xrayImportHeader} -u ${username}@emea.adsint.biz:${password} -d  \"{ \\\"fields\\\": { \\\"customfield_11405\\\":[\\\"${jiraEnvironment}\\\"] , \\\"summary\\\":\\\"${jiraSummary}\\\"}}\""
                        }
                    }
                }
            }
        }

        stage('Publishing Reports'){
            steps{
                dir(testRepo){
                    script {
                        allure results: [[path: 'reports/allure-results']]
                        report.playwright([dir: 'reports/htmlReport'])
                        withCredentials([string(credentialsId: rpCredentials, variable: 'token')]) {
                            reportingPortalReport = report.linkToRp([projectName: projectName, rpToken: token, rpUrl: rpUrl])
                        }
                    }
                }
            }
        }

        stage("Sending Notifications") {
            steps {
                script {
                    office365ConnectorSend status: '${currentBuild.result}', webhookUrl: WEBHOOK_CREDENTIALS
                    if (currentBuild.result == 'UNSTABLE' || currentBuild.result == 'FAILURE'){
                        emailext attachLog: true, body: "Playwright build failure!! :( Logs attached!!", subject: 'Playwright execution Failure. PFA execution Logs!!', to: email
                    }
                }
            }
        }
        


    }
    post{
        always {
            echo "Always"
        }
        failure {
            echo "Failure"
        }
        success{
            echo "Success"
        }
    }
}

def buildCommand(){
    def COMMAND = ''
    if(params.FROM_CUSTOM_COMMAND){
        return params.CUSTOM_COMMAND
    }else{
        return params.COMMANDS+ " --grep=@" + TEST_PLAN_KEY
    }
}
