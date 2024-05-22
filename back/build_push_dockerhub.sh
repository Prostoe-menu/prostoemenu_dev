echo '* Building image...' && \
docker build -t prostoemenu/prostoemenu:latest .
echo '* Logging to dockerhub...' && \
docker login --username prostoemenu --password '*'
echo '* Pushing image to dockerhub...' && \
docker push prostoemenu/prostoemenu:latest
echo '* Deleting image...' && \
docker rmi -f prostoemenu/prostoemenu:latest