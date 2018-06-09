'use strict'

const
    path = require('path'),
    router = require('express').Router(),
    dir = `${path.dirname(__dirname)}/controllers`,
    helperLib = require(path.resolve('./config/lib/helper_lib'));


let ReadDir = new helperLib.read_directory.readDirectory();

let fileObj =  ReadDir.requireFiles(dir);

router
    .post('/addFundraisers', fileObj['fundraiserctrl'].addFundraisers)
    .get('/GetFundraisers', fileObj['fundraiserctrl'].GetFundraisers)
    .post('/Chng_Status', fileObj['fundraiserctrl'].Chng_Status)
    .post('/Update_Fundraiser', fileObj['fundraiserctrl'].Update_Fundraiser)
    .post('/Delete_Fundraiser',fileObj['fundraiserctrl'].Delete_Fundraiser)
    .post('/Find_fundraiser', fileObj['fundraiserctrl'].Find_fundraiser)


module.exports={
    router:router,
    base:'/api/admin'
}