'use strict';

/* Fiile require */
const
    path = require ('path'),
    router = require('express').Router(),
    dir = `${path.dirname(__dirname)}/controllers`,
    helperLib = require(path.resolve('./config/lib/helper_lib'));


/*create new object create with red_directory */

let ReadDirectory =  new helperLib.read_directory.readDirectory();

/* create New Object of  Middleware Function used*/

let Middleware = new helperLib.middleware();

/* create new object of require Directory  */

let fileObj = ReadDirectory.requireFiles(dir);


// routing

router

    .post('/userRegistere',  Middleware.validatePassword,       fileObj['users'].userRegistere)
    .post('/userLogin', fileObj['users'].userLogin)


module.exports = {
    router: router,
    base: '/api/users'
}