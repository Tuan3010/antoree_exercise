pipeline {
    agent any

    environment {
        IMAGE_NAME_FONTEND = 'tuan3010/react_app'
        IMAGE_NAME_BACKEND = 'tuan3010/laravel_app'
        DOCKER_CREDENTIALS = credentials('docker-hub-credentials') // Sử dụng credentials binding
        DOCKER_TAG = 'latest'
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker compose build'
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                // Đăng nhập vào Docker Hub
                sh 'echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR --password-stdin'
            }
        }

        stage('Docker Push') {
            steps {
                sh "docker push ${IMAGE_NAME_FONTEND}:${DOCKER_TAG}"
                sh "docker push ${IMAGE_NAME_BACKEND}:${DOCKER_TAG}"
            }
        }

    }
}