pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = 'dockerhub-creds'

        BACKEND_IMAGE = '02fe23bcs129/cinebook-backend'
        FRONTEND_IMAGE = '02fe23bcs129/cinebook-frontend'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                url: 'https://github.com/KiranYBPatil/CineBook.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                script {
                    docker.build("${BACKEND_IMAGE}:latest", "./bms-backend")
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    docker.build("${FRONTEND_IMAGE}:latest", "./bms-frontend")
                }
            }
        }

        stage('Push Backend Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKERHUB_CREDENTIALS) {
                        docker.image("${BACKEND_IMAGE}:latest").push()
                    }
                }
            }
        }

        stage('Push Frontend Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKERHUB_CREDENTIALS) {
                        docker.image("${FRONTEND_IMAGE}:latest").push()
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG_FILE')]) {

                    sh '''
                    export KUBECONFIG=$KUBECONFIG_FILE

                    kubectl apply -f k8s/backend/backend.yaml
                    kubectl apply -f k8s/frontend/frontend.yaml
                    kubectl apply -f k8s/frontend/frontend-service.yaml

                    kubectl rollout restart deployment cinebook-backend -n cinebook

                    kubectl rollout restart deployment cinebook-frontend -n cinebook
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ CineBook deployed successfully to Kubernetes!'
        }

        failure {
            echo '❌ Pipeline failed!'
        }
    }
}
