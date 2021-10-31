//const fetch = require('node-fetch');

class UserServices{
    constructor(UID){
        this.UID = UID;
    }

     async login(UID, txnid){

        var Url =  "https://stage1.uidai.gov.in/onlineekyc/getOtp/";

        var XMLHttpRequest = require('xhr2');
        var xhr = new XMLHttpRequest();
        var jsonResponse;
        var result = "n";
        let data = JSON.stringify({
            "uid": UID,
            "txnId": txnid,
        });

        // const otherParams = {
        //     headers: {
        //         "content-type":"application/json; charset=UTF-8"
        //     },
        //     body: data,
        //     method: "POST"
        // };

        // fetch(Url, otherParams)
        //     .then(data=>{return data.json()})
        //     .then(res=>{console.log(res)})
        //     .catch(error=>console.log(error))
        
        xhr.open('POST', Url);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               console.log(xhr.responseText);
               jsonResponse = JSON.parse(xhr.responseText);
               console.log(jsonResponse.status);
               result = jsonResponse.status;
            }
        };

        xhr.send(data);

        console.log(`err ${xhr.response}`);
        return result;

    }
}

module.exports = UserServices;