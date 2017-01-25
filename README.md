
#### DESCRIPTION:
```
Simple client-side app that lists GitHub repositories for a given user.

Use the GitHub API documented here: https://developer.github.com/v3/ (sample request:https://api.github.com/users/goeuro/repos).

```

#### RUN:

```
npm i
bower i
grunt server --env=dev
```


#### TEST:
```
karma start test/karma.conf.js --log-level debug --single-run
#for particular file
karma run -- --grep=testDescriptionFilter
```
OR

```
bower i
npm i
grunt test
```

Unit Test Coverage:

```
grunt test
open coverage/report-html/index.html
```


### Git hook:
I moved pre-commit to overcommit-tool config, please do 
```
overcommit --install
overcommit --sign
overcommit --sign pre-commit
```
