pipeline {
    agent any

    tools {
        nodejs 'NodeJS20'
    }

    // ─── Environment Variables ────────────
    environment {
        EC2_IP       = '3.27.249.93'
        EC2_USER     = 'ubuntu'
        APP_DIR      = '/home/ubuntu/CineBook'
        GITHUB_REPO  = 'https://github.com/KiranYBPatil/CineBook.git'
    }

    // ─── Auto-trigger: check GitHub every 2 min ─
    triggers {
        pollSCM('H/2 * * * *')
    }

    stages {

        // ─── 1. Checkout ─────────────────────
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // ─── 2. Backend Install ──────────────
        stage('Backend Install') {
            steps {
                dir('bms-backend') {
                    bat 'npm install'
                }
            }
        }

        // ─── 3. Frontend Install ─────────────
        stage('Frontend Install') {
            steps {
                dir('bms-frontend') {
                    bat 'npm install'
                }
            }
        }

        // ─── 4. Backend Build ────────────────
        stage('Backend Build') {
            steps {
                dir('bms-backend') {
                    bat 'npm run build'
                }
            }
        }

        // ─── 5. Frontend Build ───────────────
        stage('Frontend Build') {
            steps {
                dir('bms-frontend') {
                    bat 'npm run build'
                }
            }
        }

        // ─── 6. Docker Backend Build ─────────
        stage('Docker Backend Build') {
            steps {
                dir('bms-backend') {
                    bat 'docker build -t cinebook-backend .'
                }
            }
        }

        // ─── 7. Docker Frontend Build ────────
        stage('Docker Frontend Build') {
            steps {
                dir('bms-frontend') {
                    bat 'docker build -t cinebook-frontend .'
                }
            }
        }

        // ─── 8. Docker Check ─────────────────
        stage('Docker Images') {
            steps {
                bat 'docker images'
            }
        }

        // ─── 9. Deploy to AWS EC2 ────────────
        stage('Deploy to EC2') {
            steps {
                echo "🚀 Deploying to EC2 at ${EC2_IP}..."
                withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh-key', keyFileVariable: 'SSH_KEY', usernameVariable: 'SSH_USER')]) {
                    // Fix Windows SSH key permissions
                    bat "icacls \"%SSH_KEY%\" /inheritance:r /grant:r \"%USERNAME%:(R)\""

                    // Pull latest code
                    bat "ssh -o StrictHostKeyChecking=no -i \"%SSH_KEY%\" %SSH_USER%@${EC2_IP} \"cd ${APP_DIR} && git pull origin main\""

                    // Create .env if missing
                    bat "ssh -o StrictHostKeyChecking=no -i \"%SSH_KEY%\" %SSH_USER%@${EC2_IP} \"test -f ${APP_DIR}/bms-backend/.env || echo 'PORT=9000' > ${APP_DIR}/bms-backend/.env\""

                    // Build and start containers
                    bat "ssh -o StrictHostKeyChecking=no -i \"%SSH_KEY%\" %SSH_USER%@${EC2_IP} \"cd ${APP_DIR} && docker compose up -d --build\""
                }
            }
        }

        // ─── 10. Health Check ────────────────
        stage('Verify Deployment') {
            steps {
                echo '🏥 Running health check...'
                bat """
                    @echo off
                    setlocal
                    set RETRIES=0
                    :LOOP
                    set /a RETRIES+=1
                    if %RETRIES% GTR 12 (
                        echo ❌ Health check failed after 12 attempts!
                        exit /b 1
                    )
                    echo Attempt %RETRIES%/12 - Checking http://${EC2_IP}/api/v1/movies ...
                    curl -s -o nul -w "%%{http_code}" http://${EC2_IP}/api/v1/movies | findstr "200" >nul
                    if errorlevel 1 (
                        echo Waiting 10 seconds...
                        timeout /t 10 /nobreak >nul
                        goto LOOP
                    )
                    echo ✅ Backend is healthy!
                """
            }
        }
    }

    post {
        success {
            echo """
            ════════════════════════════════════════════
            ✅ PIPELINE SUCCESS — CineBook Deployed!
            🌐 Frontend:  http://${EC2_IP}
            🔧 API:       http://${EC2_IP}/api/v1
            ════════════════════════════════════════════
            """
        }

        failure {
            echo '❌ Pipeline FAILED! Check the logs above.'
        }
    }
}