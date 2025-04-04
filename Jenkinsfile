#!/usr/bin/env groovy

@Library(['GlobalJenkinsLibrary@master']) _

def svc_credentials = "svc_oneplfr"                                                      
def xrayImportUrl = "https://jira.tools.3stripes.net/rest/raven/1.0/import/execution/junit"       
def xrayImportOutput = "reports/xray-response.json"                                               
def xrayImportHeader = "-H 'Content-Type: application/json' -H 'Cache-Control: no-cache'"         
def rpCredentials = "rp_soziamik"                                  
def rpUrl = "https://testreportingportal.tools.3stripes.net"                                      
def projectName = "oneplfr-qa-playwright"                                                     
def email = "mikheil.soziashvili@externals.adidas.com"                                                     

def jiraEnvironment = "PROD"                                                                      
def jiraSummary = "Test Plan $env.TEST_PLAN_KEY execution"                                    

pipeline {
    agent { label 'custom_fip_node_aws' }
    environment {
        NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"                                   
        ENV = tools.git.getSimplifiedBranchName()                                
        BUILD = "${BUILD_NUMBER}"                                                
        CI = true                                                               
        RP_TOKEN = credentials('rp_soziamik')      
        RP_PROJECT = 'mikheil_soziashvili_personal'                               
        RP_DESCRIPTION = "${JOB_URL}${BUILD_NUMBER}"                             
        WEBHOOK_CREDENTIALS = credentials("svc_oneplfr")          
        BROWSERSTACK_LOCAL = false                                                
        PW_S3_FOLDER = "${JOB_NAME}-${BUILD_NUMBER}"
        VICTORIA_DB_URL = credentials('VictoriaDbApiUrl')
        VICTORIA_DB_APIKEY = credentials('oneplfrVictoriaDbApiKey')
        VICTORIA_DB_USERNAME = credentials('oneplfrVictoriaDbUsername')
        VICTORIA_DB_PASSWORD = credentials('oneplfrVictoriaDbPassword')
        DEV_API_URL = credentials('oneplfrDevApiUrl')
        DEV_API_KEY = credentials('oneplfrDevApiKey')
    }

    parameters {
        gitParameter branchFilter: 'origin/(.*)', defaultValue: 'master', name: 'BRANCH_NAME', type: 'PT_BRANCH'
        string(name: 'PROJECT_KEY', defaultValue: 'ONEPLFR', description: '*Mandatory!! - Your project key')
        string(name: 'TEST_PLAN_KEY', defaultValue: '', description: '*Mandatory!! - Test plan for executions and pushing the results')
        string(name: 'TEST_TYPE', defaultValue: 'BE', description: '*Mandatory!! - Test type (FE/BE)')
    }

    stage('Initialize Parameters') {
        steps {
            script {
                // Retrieve TEST_PLAN_KEY from an external source
                TEST_PLAN_KEY = fetchTestPlanKey() // Implement this method as needed
                echo "TEST_PLAN_KEY is set to: ${TEST_PLAN_KEY}"
                echo "TEST_TYPE is set to: ${TEST_TYPE}"
            }
        }
    }

    stages {
        stage('Checkout & Collect Info') {
            steps {
                checkout scm
                echo "Checkout: done"
                script {
                    if (env.TEST_PLAN_KEY == "" || params.PROJECT_KEY == "") { 
                        currentBuild.result = 'ABORTED'
                        echo "ERROR: TEST_PLAN_KEY and/or PROJECT_KEY not set!!"
                        error('TEST_PLAN_KEY and/or PROJECT_KEY not set')
                    }
                }
            }
        }
        stage('Build') {
            steps {
                sh "npm install"
                sh "npx playwright install"
                sh "npx playwright --version"
            }
        }
        
        stage("Checking Code Quality") {
            steps {
                sh "npm run-script sonarAnalysis"
            }
        }

        stage("Executing Tests") {
            steps {
                script {
                   catchError(buildResult: 'UNSTABLE', stageResult: 'UNSTABLE') {
                        tools.aws.withMfaAuthentication('aws_keys_oneplfr_account_dev', 'aws_mfa_oneplfr_account_dev') {
                            sh buildCommand()
                        }
                    } 
                }
            }
        }

        stage("Exporting Test Results") { 
            steps {
                script {
                    withCredentials([string(credentialsId: svc_credentials, variable: 'token')]) {
                        sh "curl --location --request POST '${xrayImportUrl}?projectKey=${params.PROJECT_KEY}&testPlanKey=${env.TEST_PLAN_KEY}' --header 'Authorization: Bearer ${token}' --form 'file=@reports/junit.xml' -o ${xrayImportOutput}"
                    }
                    sh "cat reports/xray-response.json"
                    //Getting created execution key
                    def props = readJSON file: xrayImportOutput
                    def executionKey = props.testExecIssue.key
                    echo '[Xray] Test Execution created succesfully: ' + executionKey
                    //Linking test execution to test plan
                    //Creating json data for Xray
                    sh "echo '{\"add\": [\"$executionKey\"]}' > reports/data.json"

                    withCredentials([string(credentialsId: svc_credentials, variable: 'token')]) {
                        //Linking Test Plan and Test Execution
                        def url = 'https://jira.tools.3stripes.net/rest/raven/1.0/api/testplan/' + env.TEST_PLAN_KEY + '/testexecution'
                        def data = '@reports/data.json'
                        sh "curl -X POST ${url} ${xrayImportHeader} --header 'Authorization: Bearer ${token}' -d ${data}"
                        //Editing Test Execution attributes example
                        def urlExecution = 'https://jira.tools.3stripes.net/rest/api/2/issue/' + executionKey
                        sh "curl -X PUT ${urlExecution} ${xrayImportHeader} --header 'Authorization: Bearer ${token}' -d  \"{ \\\"fields\\\": { \\\"customfield_11405\\\":[\\\"${jiraEnvironment}\\\"] , \\\"summary\\\":\\\"${jiraSummary}\\\"}}\""
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

    post {
        always {
            echo "Always"
        }
        failure {
            echo "Failure"
        }
        success {
            echo "Success"
        }
    }
}

def buildCommand() {
    def COMMAND = ''
    if(env.TEST_TYPE == 'FE') { 
        return 'npx playwright test --config=./configFiles/FE/LocalBrowsers/LocalBrowsers.config.js' + " --grep=@" + env.TEST_PLAN_KEY
    } else if(env.TEST_TYPE == 'BE') {
        return 'npx playwright test --config=./configFiles/BE/BE.config.js' + " --grep=@" + env.TEST_PLAN_KEY
    } else {
        return 'Please Specify: TEST_TYPE (FE/BE)'
    }
}
