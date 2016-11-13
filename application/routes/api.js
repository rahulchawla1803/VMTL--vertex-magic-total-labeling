var express = require('express');
var router = express.Router();
var cors=require('cors');
router.use(cors());

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/vmtl');

/* GET users listing. */
router.get('/', function(req, res, next) {
    
var mycoll=db.get('coll');
    mycoll.find({},function(e,docs){
        res.json(docs);
    });
   
});
module.exports = router;
