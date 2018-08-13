# Runner Manual Scaler

A app to scale your gitlab runner manually.

## Documentation

There are two endpoints

PATCH /runner-scaling/increase -> to increase a concurrent

PATCH /runner-scaling/reduce   -> to reduce a concurrent

## Running Without Docker

Config RUNNER_CONFIG_FILE_PATH environment variable or use default which is '/etc/gitlab-runner/config.toml'

You need to run that server as sudo or your user must be has authorization to edit the file.
```sh
npm install
npm start
```

## Running

The node service should run in a machine with a gitlab-runner installed as a shell. The related Dockerfile is run/Dockerfile 
```bash
docker build . -f run/Dockerfile -t gitlab-runner-manual-scale
```

To run the image, specify as volume your config.toml
```bash
docker run -v <your_config_toml_path_here>:/etc/gitlab-runner/config.toml:rw gitlab-runner-manual-scaler
```

The other service which is a pure linux with curl should run in a cluster on docker swarm, each new container will
increase the amount of concurrent jobs which your runner can run, when container is stopped it will decrease automatically 
by 1 the amount of concurrent jobs.  

To build
```bash
docker build run/ -f run/Dockerfile.starter -t gitlab-runner-manual-scale-starter
```

To run that container use
```bash
docker run -e ENDPOINT=http://172.17.0.3:5389 gitlab-runner-manual-scale-starter
```

Replace http://172.17.0.3 by your gitlab-runner-manual-scale IP

***IMPORTANT***: To your container reduce amount of concurrent jobs you need to stop your container gracefully using 
```
docker stop xyz #WITHOUT FORCE OPTION
```
