var firstline = require('firstline');
var replace = require('replace-in-file');

const CONCURRENT_PATTERN = 'concurrent = ';
const RUNNER_CONFIG_FILE_PATH = process.env.RUNNER_CONFIG_FILE_PATH || "/etc/gitlab-runner/config.toml";

class RunnerConfigFile {

    constructor() {
        console.log('Loading from ' + RUNNER_CONFIG_FILE_PATH);

        let context = this;
        firstline(RUNNER_CONFIG_FILE_PATH).then(function(fileFirstLine) {
            console.log(fileFirstLine);

            let concurrent_value = fileFirstLine.split(CONCURRENT_PATTERN)[1].trim();
            console.log(concurrent_value);
            context._max_concurrent = parseInt(concurrent_value);

            console.log('Concurrent is ' + context._max_concurrent);
        }, function(err) {
            console.log('Deu ruim ' + err);
        });
    }

    increaseMaxConcurrent() {
        this._max_concurrent = this._max_concurrent + 1;
        this.syncFile();
    }

    reduceMaxConcurrent() {
        this._max_concurrent = this._max_concurrent - 1;
        this.syncFile();
    }

    get max_concurrent() {
        return this._max_concurrent;
    }

    syncFile() {
        try {
            let replaced = replace.sync({
                files: RUNNER_CONFIG_FILE_PATH,
                from: /^(.*)$/m,
                to: CONCURRENT_PATTERN + String(this.max_concurrent)
            });
            console.log(replaced);
        } catch (error) {
            console.error('Error occurred:', error);
        }
    }
}

module.exports = new RunnerConfigFile();