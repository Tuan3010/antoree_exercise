pipeline {
    agent any
    stages {
        stage('Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/Tuan3010/antoree_exercise.git'
            }
        }
        stage('Docker') {
            steps {
                withDockerRegistry(credentialsId: 'docker-hub', url: 'https://index.docker.io/v1/') {
                    sh 'docker compose build'
                    sh 'docker push tuan3010/react_app:first'
                    sh 'docker push tuan3010/laravel_app:first'
                }
            }
        }
    }
}