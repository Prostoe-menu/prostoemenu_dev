echo '* Building image...' && \
docker build -t prostoemenu/prostoemenu:v0.1 .
echo '* Logging to dockerhub...' && \
docker login --username prostoemenu --password ''
echo '* Pushing image to dockerhub...' && \
docker push prostoemenu/prostoemenu:v0.1
echo '* Deleting image...' && \
docker rmi -f prostoemenu/prostoemenu:v0.1