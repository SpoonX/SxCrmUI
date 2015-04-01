SxCrmUI
=======

The UI for SxCrm based on Aurelia framework.

Requirement
-----------

1. [NodeJS](http://nodejs.org/)
2. [Gulp](http://gulpjs.com/) : 
```shell
npm install -g gulp
```
3. [jspm](http://jspm.io/) : 
```shell
npm install -g jspm
```
> **Note:** jspm queries GitHub to install semver packages, but GitHub has a rate limit on anonymous API requests. It is advised that you configure jspm with your GitHub credentials in order to avoid problems. You can do this by executing `jspm endpoint config github` and following the prompts.
4. Install local project deps :
```shell
npm install
jspm install -y
```

Make the magic happened
-----------------------

Type :

```shell
gulp watch
```
Browse to : [http://localhost:9000](http://localhost:9000)
