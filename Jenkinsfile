pipeline {
    agent any

    tools {
        nodejs 'NodeJS-20'  // Configure this name in Jenkins Global Tool Configuration
    }

    environment {
        DOCKER_HUB_REPO   = 'your-dockerhub-username'  // TODO: Replace with your Docker Hub username
        FRONTEND_IMAGE     = "${DOCKER_HUB_REPO}/cinebook-frontend"
        BACKEND_IMAGE      = "${DOCKER_HUB_REPO}/cinebook-backend"
        DOCKER_CREDENTIALS = 'docker-hub-credentials'   // Jenkins credentials ID
        AWS_SSH_KEY        = 'aws-ec2-ssh-key'           // Jenkins credentials ID for EC2 SSH key
        EC2_HOST           = 'ec2-xx-xx-xx-xx.compute.amazonaws.com' // TODO: Replace with EC2 public DNS
    }

    stages {

        // ─── Stage 1: Checkout ──────────────────────────
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // ─── Stage 2: Install Dependencies ──────────────
        stage('Install Dependencies') {
            parallel {
                stage('Backend Deps') {
                    steps {
                        dir('bms-backend') {
                            sh 'npm ci'
                        }
                    }
                }
                stage('Frontend Deps') {
                    steps {
                        dir('bms-frontend') {
                            sh 'npm ci'
                        }
                    }
                }
            }
        }

        // ─── Stage 3: Lint & Test ───────────────────────
        stage('Lint & Test') {
            parallel {
                stage('Backend Lint') {
                    steps {
                        dir('bms-backend') {
                            sh 'npm run build'  // TypeScript compilation acts as type-check
                        }
                    }
                }
                stage('Frontend Lint') {
                    steps {
                        dir('bms-frontend') {
                            sh 'npm run lint'
                        }
                    }
                }
            }
        }

        // ─── Stage 4: Build Docker Images ───────────────
        stage('Build Docker Images') {
            parallel {
                stage('Build Backend Image') {
                    steps {
                        dir('bms-backend') {
                            sh "docker build -t ${BACKEND_IMAGE}:${BUILD_NUMBER} -t ${BACKEND_IMAGE}:latest ."
                        }
                    }
                }
                stage('Build Frontend Image') {
                    steps {
                        dir('bms-frontend') {
                            sh "docker build -t ${FRONTEND_IMAGE}:${BUILD_NUMBER} -t ${FRONTEND_IMAGE}:latest ."
                        }
                    }
                }
            }
        }

        // ─── Stage 5: Push to Docker Hub ────────────────
        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: "${DOCKER_CREDENTIALS}",
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push ${BACKEND_IMAGE}:${BUILD_NUMBER}
                        docker push ${BACKEND_IMAGE}:latest
                        docker push ${FRONTEND_IMAGE}:${BUILD_NUMBER}
                        docker push ${FRONTEND_IMAGE}:latest
                        docker logout
                    '''
                }
            }
        }

        // ─── Stage 6: Deploy to AWS via Ansible ─────────
        stage('Deploy to AWS') {
            steps {
                withCredentials([sshUserPrivateKey(
                    credentialsId: "${AWS_SSH_KEY}",
                    keyFileVariable: 'SSH_KEY',
                    usernameVariable: 'SSH_USER'
                )]) {
                    sh '''
                        ansible-playbook -i "${EC2_HOST}," \
                            --private-key "$SSH_KEY" \
                            -u "$SSH_USER" \
                            ansible/deploy.yml \
                            -e "backend_image=${BACKEND_IMAGE}:${BUILD_NUMBER}" \
                            -e "frontend_image=${FRONTEND_IMAGE}:${BUILD_NUMBER}"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully! CineBook deployed.'
        }
        failure {
            echo '❌ Pipeline failed. Check stage logs above.'
        }
        always {
            // Clean up local Docker images to save disk space
            sh 'docker system prune -f || true'
        }
    }
}
