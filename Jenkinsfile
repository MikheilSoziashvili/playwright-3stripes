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
def jiraSummary = "Test Plan $params.TEST_PLAN_KEY execution"                                    

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
        VICTORIA_DB_URL = credentials('oneplfrVictoriaDbUrl')
        VICTORIA_DB_APIKEY = credentials('oneplfrVictoriaDbApiKey')
        VICTORIA_DB_USERNAME = credentials('oneplfrVictoriaDbUsername')
        VICTORIA_DB_PASSWORD = credentials('oneplfrVictoriaDbPassword')
    }

    parameters {
        gitParameter branchFilter: 'origin/(.*)', defaultValue: 'master', name: 'BRANCH_NAME', type: 'PT_BRANCH'
        string(name: 'PROJECT_KEY', defaultValue: 'ONEPLFR', description: '*Mandatory!! - Your project key')
        string(name: 'TEST_PLAN_KEY', defaultValue: '', description: '*Mandatory!! - Test plan for executions and pushing the results')
        choice(name: 'COMMANDS', choices: [      
            'npx playwright test --config=./configFiles/FE/BrowserStack/BrowserStack.config.js',
            'npx playwright test --config=./configFiles/FE/LocalBrowsers/LocalBrowsers.config.js',
            'npx playwright test --config=./configFiles/FE/Moon/Moon.config.js',
            'npx playwright test --config=./configFiles/FE/MobileDeviceEmulation/MobileDevices.config.js',
            'npx playwright test --config=./configFiles/FE/RealAndroidDevices/RealAndroid.config.js',
            'npx playwright test --config=./configFiles/BE/BE.config.js'
            ], description: 'Choose a CLI command from the dropdown OR Use custom command by selecting the checkbox. For dropdown CLI commands, tests are executed based on the annotations specified in test file (e.g. @TED-24886 executes the wiktionary test)')
        booleanParam(name: 'FROM_CUSTOM_COMMAND', defaultValue: false, description: 'If you activate this, fill the following field:')
        string(name: 'CUSTOM_COMMAND', defaultValue: 'npm test', description: 'Test scripts/custom execution commands can be specified here. For using @annotation, specify the same using --grep flag')
    }

    stages {
        stage('Checkout & Collect Info') {
            steps {
                checkout scm
                echo "Checkout: done"
                script {
                    if (params.TEST_PLAN_KEY == "" || params.PROJECT_KEY == "") { 
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
                            sh 'VICTORIA_DB = "$VICTORIA_DB_URL" node APITest.spec.js'
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
                        sh "curl --location --request POST '${xrayImportUrl}?projectKey=${params.PROJECT_KEY}&testPlanKey=${params.TEST_PLAN_KEY}' --header 'Authorization: Bearer ${token}' --form 'file=@reports/junit.xml' -o ${xrayImportOutput}"
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
                        def url = 'https://jira.tools.3stripes.net/rest/raven/1.0/api/testplan/' + params.TEST_PLAN_KEY + '/testexecution'
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
    post{
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
    if(params.FROM_CUSTOM_COMMAND) {
        return params.CUSTOM_COMMAND
    } else {
        return params.COMMANDS+ " --grep=@" + TEST_PLAN_KEY
    }
}
