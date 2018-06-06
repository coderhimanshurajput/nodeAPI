'use strict';

const
    path = require ('path'),
    router = require('express').Router(),
    dir = `${path.dirname(__dirname)}/controllers`,
    helperLib = require (path.resolve('./config/lib/helper_lib'));
	
let ReadDirectory =  new helperLib.read_directory.readDirectory();

let fileObj = ReadDirectory.requireFiles(dir);

router
    .post ('/Nmailer', fileObj['mailCtrl'].Nmailer)

module.exports={
    router: router,
    base: '/api/admin'
}
