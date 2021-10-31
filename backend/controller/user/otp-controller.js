const User = require('../../models/user');

const { v4: uuid } = require("uuid");

module.exports.otp= async function(req, res){
    const UID = req.body.uid;
    const txnid =  uuid();

    console.log(UID);
    console.log(txnid);
    
    otpRequest(UID, txnid, function(result){
        let OTP = result.status;
        console.log(OTP);
        if (OTP == "n" || OTP == 'N')
            return res.status(401).send("Some error Occured!");
        if(OTP == 'y' || OTP == 'Y'){

            User.findOne({uid: UID}, function(err, user){
                if(err){console.log('error in finding user'); return;}
        
                if(!user){
                    User.create({uid: UID, txnid: txnid}, function(error){
                        if(error){console.log('error in creating user', error); return;}
                    })
                }  else {
                    console.log("user exists");
                    user.txnid = txnid;
                    user.save();
                }
            })
            return res
                .status(200)
                .send("OTP Sent Successfully");
        }
        return res.status(404).send("Invalid UID");
    });
    
};

function otpRequest(UID, txnid, cb){
    var Url =  "https://stage1.uidai.gov.in/onlineekyc/getOtp/";

        var XMLHttpRequest = require('xhr2');
        var xhr = new XMLHttpRequest();
        var jsonResponse;
        let data = JSON.stringify({
            "uid": UID,
            "txnId": txnid,
        });
        
        xhr.open('POST', Url);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               console.log(xhr.responseText);
               jsonResponse = JSON.parse(xhr.responseText);
               console.log(jsonResponse.status);
               if (typeof cb === 'function') cb(jsonResponse);
            }
        };

        xhr.send(data);

}