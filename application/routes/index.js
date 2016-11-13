var express = require('express');
var router = express.Router();
var request = require("request");
var cors=require('cors');
router.use(cors());


var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/vmtl');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sender', { title: 'Express' });
});

router.get('/sentMsg', function(req, res, next) {

  //msg: req.query.txtMsg

  var mycoll = db.get('coll');

  mycoll.remove({});
  mycoll.insert({"msg":req.query.txtMsg});

  res.send("The message is sent");
});


router.post('/encode', function(req,res,next){
  //console.log(req.body.raw);
  var wlen7=['01','26','09','20','17','14','25','02','27','10','21','18','08','03','28','11','15','19','04','22','12','16','05','23','13','06'];
  var wlen9=['01','42','11','34','21','26','31','18','41','02','43','12','35','22','27','32','10','03','44','13','36','23','19','33','04','45'];
  var temp;
  var mycoll = db.get('key');
  var msg=req.body.raw;

  var final=[];
  var flag=0;
  var i,j,len;
  len=msg.length;
  var k;
  for(i=0;i<len;i++)
  {
    k=msg.charCodeAt(i);
    if(k>122 || k<97) flag=1;
    if(k==32) flag=0;
  }
  if(flag==1) {
    //alert("Can't Be Encoded");
    res.json({"ans":"Can't Be Encoded"});
  }
  i=0;
  j=0;


  var n;
  var cod,docs;
  var wlen=0;

  console.log("len= "+len);
  while(j<len)
  {
    //console.log("entered");
    if(msg[j]==' ') {
      wlen = j - i;
      if (wlen < 5) {
        wlen = 7;
        temp = wlen7;
      }
      if (wlen == 5) {
        temp = wlen9;
      }


      for (k = i; k < j; k++) {
        var n = msg.charCodeAt(k) - 96;
        //console.log("n= " + n);
        cod = temp[n - 1];
        final[k] = cod;
      }

      final[j]='$';
      //console.log("j= " + j);
      j++;
      //console.log("j= " + j);
      i = j;
    }

    else if(j==len-1)
    {
      wlen = j - i+1;

      console.log("wlen= " + wlen);
      if (wlen < 5) {
        wlen = 7;
        temp = wlen7;
      }
      if (wlen == 5) {
        temp = wlen9;
      }


      for (k = i; k <= j; k++) {
        var n = msg.charCodeAt(k) - 96;
        console.log("n= " + n);
        cod = temp[n - 1];
        console.log("cod= " + cod);
        console.log("k= " + k);
        final[k] = cod;
        console.log("final[k]= " + final[k]);

      }


      //console.log("j= " + j);
      j++;
    //  console.log("j= " + j);
      i = j;
    }
    else j++;
    console.log("j= "+j);
  }


  res.json({"ans":final});
});



module.exports = router;
