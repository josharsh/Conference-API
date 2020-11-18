var express = require('express');
const fetch = require('node-fetch');
var stringSimilarity = require('string-similarity');
app = express();
port = process.env.PORT || 3000;
var os = require("os");
app.get("/search",function(req,res){
    fetch('https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences')
    .then(res => res.json())
    .then(json => {
        let output= "";
        for(let i=0;i<json["paid"].length;++i){
            output+= json["paid"][i]["confName"] +" ,"+json["paid"][i]["confEndDate"]+" ,"+json["paid"][i]["city"]+" ,"+json["paid"][i]["country"]+" ,"+"Paid ,"+ json["paid"][i]["confUrl"]+"<br><hr>";
        }
        for(let i=0;i<json["free"].length;++i){
            output+= json["free"][i]["confName"] +" ,"+json["free"][i]["confEndDate"]+" ,"+json["free"][i]["city"]+" ,"+json["free"][i]["country"]+" ,"+"Free ,"+ json["free"][i]["confUrl"]+"<br><hr>";
        }
        console.log("Logging");
        res.send(output);       
});  
});
app.get("/duplicate",function(req,res){
    fetch('https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences')
    .then(res => res.json())
    .then(json => {
        let output = new Array();
        var valueArr = json["paid"].map(function(item){ return item.conference_id });
        valueArr.push(json["free"].map(function(item){ return item.conference_id }));
        let findDuplicates = arr=> arr.filter((item, index) => arr.indexOf(item) != index)
        console.log("Logging");
        var duplicates = findDuplicates(valueArr);
        for(let i=0;i<json["paid"].length;++i){
            var conId= json["paid"][i]["conference_id"];
           if(duplicates.includes(conId)){
               output.push(json["paid"][i]);
           }
        }
        for(let i=0;i<json["free"].length;++i){
            var conId= json["free"][i]["conference_id"];
           if(duplicates.includes(conId)){
               output.push(json["free"][i]);
           }
        }
        res.send(output);
}) 
});

app.get("/nearduplicate",function(req,res){
    fetch('https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences')
    .then(res => res.json())
    .then(json => {
        let output = new Array();
        for(let i=0;i<json["paid"].length;++i){
            for(let j=i+1;j<json["paid"].length;++j){
                let first = JSON.stringify(json["paid"][i]);
                let second = JSON.stringify(json["paid"][j]);
                let similarity = stringSimilarity.compareTwoStrings(first,second);
                if(similarity>0.7 && similarity!=1 ){
                    let obj={
                        first_similar:json["paid"][i],
                        second_similar:json["paid"][j]
                    };
                    output.push(obj);
                   
                }
        }
    }
           res.send(output);
}) 
});
app.listen(port, ()=>{
    console.log("Server is Running at "+port);
});