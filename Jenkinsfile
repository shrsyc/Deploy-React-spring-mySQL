pipeline {
    agent any
    stages {
        stage('Build Backend & Docker Image') {
            steps {
                dir('backend/nursery') {
                    sh """
                        docker rmi -f shrsyc/dd_assignment_backend || true
                        docker build -t shrsyc/dd_assignment_backend .
                    """
                }
            }
        }
        stage('Build Frontend & Docker Image') {
            steps {
                dir('frontend') {
                    sh """
                        docker rmi -f shrsyc/dd_assignment_frontend || true
                        docker build -t shrsyc/dd_assignment_frontend .
                    """
                }
            }
        }
        stage("Push both Docker images to Docker Hub") { 
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh """
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

                        cd frontend
                        docker push $DOCKER_USER/dd_assignment_frontend
                        cd ..

                        
                        cd backend/nursery
                        docker push $DOCKER_USER/dd_assignment_backend
                        cd ..

                        docker logout
                    """
                }
            }
        }

        stage('Run Docker Compose') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'db-creds', usernameVariable: 'DB_USER', passwordVariable: 'DB_PASS')]) {
                    sh '''
                        export DB_USER=$DB_USER
                        export DB_PASS=$DB_PASS
                        docker-compose down || true
                        docker-compose up -d
                    '''
                }
            }
        }

    }
}
