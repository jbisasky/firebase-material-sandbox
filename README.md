# Firebase and Angular-Material Sandbox

This is a sandbox application using Angular Material and Firebase.

The SPA is served using NodeJS and Express. Firebase is used as the real time database backend. The link to the Firebase server is https://material-sandbox.firebaseio.com/.

Presently the application consists of 3 UI router views; a simple chat, a list of users, and a new user form.

The following Bower components of note are used:
 - Angular
 - Angular Material
 - UI-Router
 - Firebase
 - Angular Fire

Please run npm install and bower install to download all of the needed packages.

**The build scripts in package.json require the following to be installed globally:**
 - [Browserify][browserify] (npm install -g browserify)
 - [Watchify][watchify] (npm install -g watchify)

The application uses CommonJS commands for modularization. The distinguishable difference is that 'require' and 'module.exports' are used, both commands common in NodeJS. Because of this, Browserify **must** be used to bundle the application since it supports 'require' and modules.

To start the bundling process, run in the main directory:
```bash
node start
```

[Nodemon][nodemon] or another node watcher is recommended (npm install -g nodemon) for monitoring any changes in the source and automatically restarting the server.

To start theserver using Nodemon, in another terminal session in the main directory, run:
```bash
nodemon server
```

[nodemon]: http://nodemon.io/
[browserify]: http://browserify.org/
[watchify]: https://www.npmjs.com/package/watchify
