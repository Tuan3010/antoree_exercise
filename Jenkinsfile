pipeline {
    agent any

    environment {
        IMAGE_NAME = 'tuan3010/laravel_app'
        DOCKER_CREDENTIALS_ID = 'docker-hub'
    }

    stages {
        stage('Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/Tuan3010/antoree_exercise.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker compose build'
                }
            }
        }

        stage('Login DockerHub') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker-hub', url: 'https://index.docker.io/v1/') {
                        echo "Logged in to Docker Hub"
                    }
                }
            }
        }

    }
}