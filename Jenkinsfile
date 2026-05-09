pipeline {
    agent any

    tools {
        nodejs 'NodeJS20'
    }

    stages {

        // ─── Checkout ─────────────────────
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // ─── Backend Install ──────────────
        stage('Backend Install') {
            steps {
                dir('bms-backend') {
                    bat 'npm install'
                }
            }
        }

        // ─── Frontend Install ─────────────
        stage('Frontend Install') {
            steps {
                dir('bms-frontend') {
                    bat 'npm install'
                }
            }
        }

        // ─── Backend Build ────────────────
        stage('Backend Build') {
            steps {
                dir('bms-backend') {
                    bat 'npm run build'
                }
            }
        }

        // ─── Frontend Build ───────────────
        stage('Frontend Build') {
            steps {
                dir('bms-frontend') {
                    bat 'npm run build'
                }
            }
        }

        // ─── Docker Backend Build ─────────
        stage('Docker Backend Build') {
            steps {
                dir('bms-backend') {
                    bat 'docker build -t cinebook-backend .'
                }
            }
        }

        // ─── Docker Frontend Build ────────
        stage('Docker Frontend Build') {
            steps {
                dir('bms-frontend') {
                    bat 'docker build -t cinebook-frontend .'
                }
            }
        }

        // ─── Docker Check ─────────────────
        stage('Docker Images') {
            steps {
                bat 'docker images'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed!'
        }
    }
}