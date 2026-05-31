pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = 'dockerhub-creds'

        BACKEND_IMAGE  = '02fe23bcs129/cinebook-backend'
        FRONTEND_IMAGE = '02fe23bcs129/cinebook-frontend'

        // ─── Version tag: use git tag if present, else short commit SHA ───
        IMAGE_TAG = sh(script: 'git describe --tags --exact-match 2>/dev/null || git rev-parse --short HEAD', returnStdout: true).trim()
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                url: 'https://github.com/KiranYBPatil/CineBook.git'
            }
        }

        // ─── Log the version being built ─────────────────
        stage('Print Version') {
            steps {
                echo "🏷️ Building CineBook version: ${IMAGE_TAG}"
            }
        }

        stage('Build Backend Image') {
            steps {
                script {
                    docker.build("${BACKEND_IMAGE}:${IMAGE_TAG}", "./bms-backend")
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    docker.build("${FRONTEND_IMAGE}:${IMAGE_TAG}", "./bms-frontend")
                }
            }
        }

        stage('Push Backend Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKERHUB_CREDENTIALS) {
                        // Push versioned tag
                        docker.image("${BACKEND_IMAGE}:${IMAGE_TAG}").push()
                        // Also push as :latest so "latest" always points to newest
                        docker.image("${BACKEND_IMAGE}:${IMAGE_TAG}").push('latest')
                    }
                }
            }
        }

        stage('Push Frontend Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKERHUB_CREDENTIALS) {
                        // Push versioned tag
                        docker.image("${FRONTEND_IMAGE}:${IMAGE_TAG}").push()
                        // Also push as :latest so "latest" always points to newest
                        docker.image("${FRONTEND_IMAGE}:${IMAGE_TAG}").push('latest')
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG_FILE')]) {

                    sh """
                    export KUBECONFIG=\$KUBECONFIG_FILE

                    # Update K8s manifests with the versioned image tag
                    sed -i 's|${BACKEND_IMAGE}:.*|${BACKEND_IMAGE}:${IMAGE_TAG}|g' k8s/backend/backend.yaml
                    sed -i 's|${FRONTEND_IMAGE}:.*|${FRONTEND_IMAGE}:${IMAGE_TAG}|g' k8s/frontend/frontend.yaml

                    kubectl apply -f k8s/backend/backend.yaml
                    kubectl apply -f k8s/frontend/frontend.yaml
                    kubectl apply -f k8s/frontend/frontend-service.yaml

                    # Wait for rollouts to complete
                    kubectl rollout status deployment cinebook-backend -n cinebook --timeout=120s
                    kubectl rollout status deployment cinebook-frontend -n cinebook --timeout=120s
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ CineBook ${IMAGE_TAG} deployed successfully to Kubernetes!"
        }

        failure {
            echo "❌ Pipeline failed for version ${IMAGE_TAG}!"
        }
    }
}
