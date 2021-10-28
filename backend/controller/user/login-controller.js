const UserServices = require('../../services/UserServices');
const UserServicesInstance = new UserServices();

module.exports.login = async function(req, res){
    const UID = req.body.uid;

    const OTP = await UserServicesInstance.login(UID);

    if(!OTP) return res.status(404).send("Invalid UID");

    if (OTP === "not verified")
        return res.status(401).send("Some error Occured!");

    return res
        .status(200)
        .send(OTP);

};