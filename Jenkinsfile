pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/Abhishek-b61/giftbloom-frontend.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Building...'
            }
        }

        stage('Test') {
            steps {
                echo 'Testing...'
            }
        }
    }
}
