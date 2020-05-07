# backend

a [Sails v1](https://sailsjs.com) application


### Setup step

+ Pull project from branch develop (master is for deployment)
+ Install nodejs
+ Install sails globally -> npm i -g sails
+ Install packages -> npm install
+ Create "upload" folder at root of the project, inside "upload" there are 2 folders "other" and "images"
+ Config your database connection at config/datastore.js
+ Run the project -> sails lift
+ if there are ploblems with database -> sails lift --drop


### Version info

This app was originally created by Nguyen Do Hong Quan - quanndh1810@gmail.com

<!-- Internally, Sails used [`sails-generate@1.16.13`](https://github.com/balderdashy/sails-generate/tree/v1.16.13/lib/core-generators/new). -->



<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->

