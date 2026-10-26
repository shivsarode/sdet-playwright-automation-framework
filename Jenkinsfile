
pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(
            daysToKeepStr: '7',
            numToKeepStr: '10'
        ))
    }

    triggers {
        pollSCM('H/5 * * * *')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Node and npm') {
            steps {
                bat 'node --version'
                bat 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Chromium') {
            steps {
                bat 'npx playwright install chromium'
            }
        }

        stage('Run UI and API Tests') {
            steps {
                bat 'set "CI=true" && set "HEADLESS=true" && npm test'
            }
        }
    }

    post {
        always {
            script {
                if (fileExists('allure-results')) {
                    int reportStatus = bat(
                        returnStatus: true,
                        script: 'npx allure generate allure-results --clean -o allure-report'
                    )

                    if (reportStatus != 0) {
                        echo "WARNING: Allure report generation failed. Exit code: ${reportStatus}"
                    }
                } else {
                    echo 'No Allure results directory found.'
                }
            }

            archiveArtifacts(
                artifacts: 'allure-results/**,allure-report/**,logs/**,test-results/**,playwright-report/**',
                allowEmptyArchive: true,
                fingerprint: true
            )
        }

        success {
            echo 'SUCCESS: Automation tests passed.'
        }

        failure {
            echo 'FAILURE: Check console output and archived evidence.'
        }

        cleanup {
            echo 'Jenkins pipeline completed.'
        }
    }
}
