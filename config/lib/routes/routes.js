const path			     = require('path'),
	fs 			         = require('fs'),
    ENV                  = require(path.resolve(`./config/env/${process.env.NODE_ENV}`))
    helperLib            = require(path.resolve('./config/lib/helper_lib')),
	location		     = path.resolve('./modules');


module.exports = (app) => {

    //@ require all controllers here
    fs.readdirSync(location)
        .filter((dir) => {
            return fs.statSync(`${location}/${dir}`).isDirectory();
        }).forEach((dir, index) => {
            let fileObj = require(path.resolve(`./modules/${dir}/routes/route`));
            app.use(fileObj.base,	fileObj.router);
    });
}