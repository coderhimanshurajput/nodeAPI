'use strict'

const
    path = require('path'),
    router = require('express').Router(),
    dir = `${path.dirname(__dirname)}/controllers`,
    helperLib = require(path.resolve('./config/lib/helper_lib'));


let ReadDir = new helperLib.read_directory.readDirectory();

let fileObj =  ReadDir.requireFiles(dir);

router
 .post('/addDisasters', fileObj['disastersctrl'].addDisasters)
    .get('/getDisasters',fileObj['disastersctrl'].getDisasters)
    .post('/findDisasters',fileObj['disastersctrl'].findDisasters)
    .post('/updateDisasters',  fileObj['disastersctrl'].updateDisasters)
    .post('/DeleteDisaster', fileObj['disastersctrl'].DeleteDisaster)

module.exports={
    router:router,
    base:'/api/admin'
}