# /bin/bash

docker start mongo-data || docker run --name mongo-data -v /data/db debian:jessie echo "Just a data container"
docker start mongo-server || docker run --name mongo-server --volumes-from mongo-data -d mongo:latest

docker stop money-track
docker rm money-track
docker rmi money-track:latest

if [ $MT_RELEASE ]
then
    docker build -t money-track:latest .
    docker run --name money-track --link mongo-server:mongodb.data.server -p 80:3000 -d money-track:latest
else
    docker build -t money-track:latest -f Dockerfile.cn .
    docker run --name money-track --link mongo-server:mongodb.data.server -p 3000:3000 -d money-track:latest
fi
