pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Automation Tests') {
            steps {
                bat 'npm test'
            }
        }

    }

    post {

        always {
            archiveArtifacts artifacts: 'reports/**/*', allowEmptyArchive: true
        }

        success {
            echo 'Automation Execution Successful'
        }

        failure {
            echo 'Automation Execution Failed'
        }
    }

}