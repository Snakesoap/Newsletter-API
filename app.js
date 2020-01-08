//jshint esversion: 6


const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

var firstName = req.body.fName;
var lastName = req.body.lName;
var email = req.body.email;

var data = {
  members: [
    {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName
    }
  }
  ]
};

var jsonData = JSON.stringify(data);


var options = {
  url: "https://us20.api.mailchimp.com/3.0/5c3fdbcbe1",
  method: "POST",
  headers: {
    "Authorization": "Princeton1 7f7099a5cbc93e527c69585bd6c01917-us20"
  },
  body: jsonData
};


request(options, function(error, response, body){
  if (error) {
  res.sendFile(__dirname + "/failure.html");
} else {
  if (response.statusCode === 200) {
    res.sendFile(__dirname + "/success.html");
    res.send("successfully Subscribed");
  } else {
    res.sendFile(__dirname + "/failure.html");
  }
}
});


});


app.post("/failure.html", function(req, res){
  res.redirect("/");
});

app.listen(3000, function(){
  console.log("Its up on 3000");

});


//7f7099a5cbc93e527c69585bd6c01917-us20
//5c3fdbcbe1
