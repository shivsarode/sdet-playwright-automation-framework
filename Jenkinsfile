
pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
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

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browser') {
            steps {
                bat 'npx playwright install chromium'
            }
        }

        stage('Run Automation Tests') {
            steps {
                bat 'set CI=true&& set HEADLESS=true&& npm test'
            }
        }
    }

    post {
        always {
            script {
                int reportStatus = bat(
                    returnStatus: true,
                    script: '''
                        if exist allure-results (
                            call npx allure generate allure-results --clean -o allure-report
                            exit /b %ERRORLEVEL%
                        ) else (
                            echo No Allure results were generated.
                            exit /b 0
                        )
                    '''
                )

                if (reportStatus != 0) {
                    echo "WARNING: Allure report generation failed with exit code ${reportStatus}."
                }

                archiveArtifacts(
                    artifacts: 'allure-results/**/*,allure-report/**/*,logs/**/*',
                    allowEmptyArchive: true,
                    fingerprint: true
                )
            }
        }

        success {
            echo 'All automation tests passed. Available reports and evidence archived.'
        }

        failure {
            echo 'Automation failed. Available reports and debugging evidence archived.'
        }

        cleanup {
            echo 'Jenkins pipeline finished.'
        }
    }
}
