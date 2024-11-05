pipeline {
    agent any
    stages{
        stage('Build Frontend'){
            steps{
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Shyneem/prestabanco_frontend.git']])
                bat 'npm install'
                bat 'npm run build'

            }
        }


        stage('Build docker image'){
            steps{
                script{
                    bat 'docker build -t shyneem/prestabanco-frontend:latest .'
                }
            }
        }
         stage('Push image to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        bat "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                    }
                    bat 'docker push shyneem/prestabanco-frontend:latest'
                }
            }
        }
    }
}