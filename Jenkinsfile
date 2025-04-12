pipeline {
    agent any

    environment {
        IMAGE_NAME = 'tuan3010/laravel_app'
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

        statge('Docker Hub Login') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }

    }

    post {
        always {
            // Đăng xuất khỏi Docker Hub và xóa image cục bộ để dọn dẹp
            sh 'docker logout'
            sh 'echo Thành công'
        }
    }
}