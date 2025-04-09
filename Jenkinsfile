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


    }
}