pipeline {
    agent any
    stages{
        stage('Build Frontend'){
            steps{
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Shyneem/prestabanco_frontend.git']])
                bat 'npm install'
                bat 'npm ruin build'

            }
        }


        stage('Build docker image'){
            steps{
                script{
                    bat 'docker build -t shyneem/prestabanco-frontend:latest .'
                }
            }
        }
        stage('Push image to Docker Hub'){
            steps{
                script{
                   withCredentials([string(credentialsId: 'docker-credential', variable: 'dhpsw')]) {
                        bat 'docker login -u shyneem -p %dhpsw%'
                   }
                   bat 'docker push shyneem/prestabanco-frontend:latest'
                }
            }
        }
    }
}