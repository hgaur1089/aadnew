const User = require('../../models/user');


module.exports.ekyc= async function(req, res){

    const name = req.body.name;
    const UID = 999920764387;
    const otp = req.body.otp;
    
    let aadhar = await User.findOne({uid: UID});
    let txnid =  aadhar.txnid;

    console.log(UID);
    console.log(txnid);
    console.log(otp);

    
    otpRequest(UID, name, txnid, otp, function(result){
        let ekycData = result;
        let ekycStatus = result.status;

        console.log(ekycData);
        
        if (ekycStatus == "n" || ekycStatus == 'N')
            return res.status(401).send("Invalid OTP");
        
        if(name == "landlord"){
            return res
                    .status(200)
                    .send()
        }

        if(ekycStatus == 'y' || ekycStatus == 'Y') {
            console.log(ekycData)
            return res
                .status(200)
                .send("OTP Verified");
        }
        
        return res.status(404).send("Some error Occured!");
    });
    
};

function otpRequest(UID, name, txnid, otp, cb){
    var Url =  "https://stage1.uidai.gov.in/onlineekyc/getEkyc/";

        var XMLHttpRequest = require('xhr2');
        var xhr = new XMLHttpRequest();

        let data = JSON.stringify({
            "uid": UID,
            "txnId": txnid,
            "otp": otp,
        });
        
        xhr.open('POST', Url);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               console.log(xhr.responseText);

               let response = JSON.parse(xhr.responseText);
               let responseData = "";
               let result;
               // creates object instantce of XMLtoJSON
               var xml2json = new XMLtoJSON();
               
               if(name == "landlord" && (response.status == 'Y' || response.status == 'y')){
                    let x = response.eKycString;
                    let obj = x.getElementsByTagName("UidData");
                    responseData = xml2json.fromStr(obj);
               } else{
                   responseData = response;
               }

               let finalResult = {
                   status: response.status,
                   data: responseData,
               }
               if (typeof cb === 'function') cb(finalResult);
            }
        };

        xhr.send(data);

}


// Converts XML to JSON
// from: https://coursesweb.net/javascript/convert-xml-json-javascript_s2
function XMLtoJSON() {
    var me = this;      // stores the object instantce
  
    // gets the content of an xml file and returns it in 
    me.fromFile = function(xml, rstr) {
      // Cretes a instantce of XMLHttpRequest object
      var xhttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
      // sets and sends the request for calling "xml"
      xhttp.open("GET", xml ,false);
      xhttp.send(null);
  
      // gets the JSON string
      var json_str = jsontoStr(setJsonObj(xhttp.responseXML));
  
      // sets and returns the JSON object, if "rstr" undefined (not passed), else, returns JSON string
      return (typeof(rstr) == 'undefined') ? JSON.parse(json_str) : json_str;
    }
  
    // returns XML DOM from string with xml content
    me.fromStr = function(xml, rstr) {
      // for non IE browsers
      if(window.DOMParser) {
        var getxml = new DOMParser();
        var xmlDoc = getxml.parseFromString(xml,"text/xml");
      }
      else {
        // for Internet Explorer
        var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
      }
  
      // gets the JSON string
      var json_str = jsontoStr(setJsonObj(xmlDoc));
  
      // sets and returns the JSON object, if "rstr" undefined (not passed), else, returns JSON string
      return (typeof(rstr) == 'undefined') ? JSON.parse(json_str) : json_str;
    }
  
    // receives XML DOM object, returns converted JSON object
    var setJsonObj = function(xml) {
      var js_obj = {};
      if (xml.nodeType == 1) {
        if (xml.attributes.length > 0) {
          js_obj["@attributes"] = {};
          for (var j = 0; j < xml.attributes.length; j++) {
            var attribute = xml.attributes.item(j);
            js_obj["@attributes"][attribute.nodeName] = attribute.value;
          }
        }
      } else if (xml.nodeType == 3) {
        js_obj = xml.nodeValue;
      }            
      if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
          var item = xml.childNodes.item(i);
          var nodeName = item.nodeName;
          if (typeof(js_obj[nodeName]) == "undefined") {
            js_obj[nodeName] = setJsonObj(item);
          } else {
            if (typeof(js_obj[nodeName].push) == "undefined") {
              var old = js_obj[nodeName];
              js_obj[nodeName] = [];
              js_obj[nodeName].push(old);
            }
            js_obj[nodeName].push(setJsonObj(item));
          }
        }
      }
      return js_obj;
    }
  
    // converts JSON object to string (human readablle).
    // Removes '\t\r\n', rows with multiples '""', multiple empty rows, '  "",', and "  ",; replace empty [] with ""
    var jsontoStr = function(js_obj) {
      var rejsn = JSON.stringify(js_obj, undefined, 2).replace(/(\\t|\\r|\\n)/g, '').replace(/"",[\n\t\r\s]+""[,]*/g, '').replace(/(\n[\t\s\r]*\n)/g, '').replace(/[\s\t]{2,}""[,]{0,1}/g, '').replace(/"[\s\t]{1,}"[,]{0,1}/g, '').replace(/\[[\t\s]*\]/g, '""');
      return (rejsn.indexOf('"parsererror": {') == -1) ? rejsn : 'Invalid XML format';
    }
  };
  
  