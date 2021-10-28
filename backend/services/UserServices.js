

class UserServices{
    constructor(UID){
        this.UID = UID;
    }

    async login(UID){
        const aua = "MBni88mRNM18dKdiVyDYCuddwXEQpl68dZAGBQ2nsOlGMzC9DkOVL5s";
        const asa = "MMxNu7a6589B5x5RahDW-zNP7rhGbZb5HsTRwbi-VVNxkoFmkHGmYKM";

        var url =  `https://“auth.uidai.gov.in/otp/2.5/public/${UID[0]}/${UID[1]}/${asa}`;

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        var xmlDoc;

        xhr.setRequestHeader("Content-Type", "text/xml");

        xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status == 200) {
            console.log(xhr.status);
            xmlDoc = xhr.responseXML;
            console.log(xmlDoc);

            var x = xmlDoc.getElementsByTagName('OtpRes');
            var code = x.getAttribute('code');

            return code;
        } else{
            return "not verified";
        }};

        var data = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <Otp uid=”${UID}” ac=”public” sa=”public” ver=”2.5” txn=”” ts=”” lk=”${aua}” type=”A”>
         <Opts ch=”00”/>
         <Signature>Digital signature of AUA</Signature>
        </Otp>`;

        xhr.send(data);


    }
}

module.exports = UserServices;