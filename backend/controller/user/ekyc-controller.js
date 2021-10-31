const User = require('../../models/user');
const UserData = require('../../models/userData');
const xml2js = require('xml2js');

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

        // console.log("1, ", ekycData.data.KycRes.UidData[0].Poi[0].$);
        // console.log("2, ", ekycData.data.KycRes.UidData[0].Poa[0].$);
        // console.log("2, ", ekycData.data.KycRes.UidData[0].Pht[0]);
        const xml = {
            status: 'Y',
            data: {
              info: {
                dob: '20-08-2001',
                gender: 'M',
                name: 'Piyush Paradkar',
                phone: '6268575625'
              },
              address: {
                co: 'S/O: Hemraj Paradkar',
                country: 'India',
                dist: 'Chhindwara',
                lm: 'rani durgawati ward',
                loc: 'pandhurna',
                pc: '480334',
                state: 'Madhya Pradesh',
                vtc: 'Pandhurna'
              },
              photo: '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'
            }
        };
        console.log(xml.data[0].info);
        if (ekycStatus == "n" || ekycStatus == 'N')
            return res.status(401).send("Invalid OTP");
        
        if(name == "landlord"){
            return res
                    .status(200)
                    .send()
        }
        
        if(ekycStatus == 'y' || ekycStatus == 'Y') {
            
        //   UserData.findOne({uid: UID}, function(err, user){
        //     if(err){console.log('error in finding user'); return;}
    
        //     if(!user){
        //         User.create({
        //           uid: UID,
        //           name: ekycData.data[0].info
        //         }, 
        //         function(error){
        //           if(error){console.log('error in creating user', error); return;}
        //         })

        //     }  else {
        //         console.log("user exists");
        //     }
        //   });

            return res.json({
              status: 200,
              data: ekycData,
              message: "Logged in Successfully"
            });
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

               let response = JSON.parse(xhr.responseText);
               let responseData = "";
               let result;
               
               if(name == "landlord" && (response.status == 'Y' || response.status == 'y')){
                    let x = response.eKycString;

                    xml2js.parseString(x, (err, result) => {
                      if(err) {
                          throw err;
                      }
                  
                      // `result` is a JavaScript object
                      // convert it to a JSON string
                      responseData = JSON.stringify(result, null, 4);
                      console.log(responseData);
                      const Data = JSON.parse(responseData);
                      console.log(Data);
                      const info = Data.KycRes.UidData[0].Poi[0].$;
                      const address = Data.KycRes.UidData[0].Poa[0].$;
                      const photo = Data.KycRes.UidData[0].Pht[0];
                      
                      // log JSON string
                      responseData = {info, address, photo};
                      //console.log("err" , responseData);
                      
                    });

               } else{

                  responseData = response;
                  
               }

               let finalResult = {
                   status: response.status,
                   data: responseData,
               }
               console.log("err" , finalResult);
               if (typeof cb === 'function') cb(finalResult);
            }
        };

        xhr.send(data);

}

  