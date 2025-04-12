pipeline {
    agent any

    environment {
        IMAGE_NAME_FONTEND = 'tuan3010/react_app'
        IMAGE_NAME_BACKEND = 'tuan3010/laravel_app'
        DOCKER_CREDENTIALS = 'docker-hub-credentials'
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

        stage('Docker Hub Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: ${DOCKER_CREDENTIALS},
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
                }
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