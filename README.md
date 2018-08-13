# Runner Manual Scaler

A app to scale your gitlab runner manually.

## Running Locally

Config RUNNER_CONFIG_FILE_PATH environment variable or use default which is '/etc/gitlab-runner/config.toml'

You need to run that server as sudo or your user must be has authorization to edit the file.
```sh
npm install
npm start
```


## Documentation

There are two endpoints

PATCH /runner-scaling/increase -> to increase a concurrent
PATCH /runner-scaling/reduce   -> to reduce a concurrent