
pipeline {
    agent {label 'mlops-runner'}
    options {
        skipStagesAfterUnstable()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    triggers {
        pollSCM('0 20 * * *')
    }
    stages {
        stage('Prepare'){
            steps {
              echo 'Build'
              sh 'npm install'
            }
        }
        stage ('Scan'){
            steps {
                echo 'ng lint'
            }
        }
        stage ('Test'){
            steps {
                echo 'npm run test --watch=false'
            }
        }
        stage ('Build'){
            steps {
                sh 'npm build --prod'
            }
        }
        stage ('Deploy'){
            steps {
                echo 'Deploy'
            }
        }
    }
}
