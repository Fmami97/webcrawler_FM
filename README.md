# PROJECT
My implementation of the course  'Build a Web Crawler', from boot.dev

It allows to recursively fetch all links on the provided url.  


author: FMami97 

# PREREQUISITES
you will need the latest version of node to install this project.
you can check the version with
```
node --version
```
mine is currently on V20.10.0

you may also use git to clone the repository on your computer


# INSTALLATION

## clone the project

### clone with HTTPS:
```
git clone https://github.com/Fmami97/webcrawler.git
```

*warning:* while still available, git strongly advises you to use the ssh cloning instead.

### clone with SSH:
```
git clone git@github.com:Fmami97/webcrawler.git
```

*warning:* please note that you will need to set your own private ssh key using ssh-keygen. you may follow the tutorial provided by github on that matter

## install the node modules

```
npm install
```

this command shall automatically install the dependencies on your computer, by using the package.json file

# USAGE

use this command to run the script

```
npm run start <url>
```
where <url> stands for any url you want to recursively crawl into.
The course provides us with the following link: https://wagslane.dev

if the developper dependencies are installed, you may use jest to test some of the functions provided by crawl.js by using the file crawl.test.js:

```
npm run test
```




