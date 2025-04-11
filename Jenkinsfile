pipeline {
    agent any

    environment {
        IMAGE_NAME = 'tuan3010/laravel_app'
        DOCKER_CREDENTIALS_ID = 'docker-hub'
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    sh '''
                        docker info
                        docker version
                    '''
                }
            }
        }


    }
}