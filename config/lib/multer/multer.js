'use strict';

const
 path = require('path'),
 fs = require ('fs'),
 mutler = require ('multer');

 
 /* set storage file  */
  let storage = mutler.diskStorage({
    destination:'../upload',
    filename: (req, file, cb) =>{
        cb(null , file.fieldname+'-'+Date.now() + path.extname(file.originalname));
    }
  });

  /* Upload File  */
  let upload = mutler({
    storage:storage,
    limits: {fileSize:100000},
    fileFilter: (req, file, cb)=> {
        checkFile(file, cb);
    }
  }).single('MyImage');

  /* fuction for  check file   */ 
 
  function checkFile (file,cb) {
      let fileType = /jpeg|png|jpg|pdf|gif/;
      let extname = fileType.test(path.extname(file.originalname).toLowerCase());

      /* check file  */
      let mimetype = fileType.test(file.mimetype);
      
      if(mimetype && extname) {
        return cb(null, true)
      } else{
        cb(' error!!!! image and pdf file only upload ');
      }
  }
