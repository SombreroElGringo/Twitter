const admin = require('firebase-admin');
const db = admin.database();
var ref = db.ref("server/saving-data/fireblog");



exports.getIndex = (req, res, next) => {

    /*var usersRef = ref.child("users");
    usersRef.set({
    alanisawesome: {
        date_of_birth: "June 23, 1912",
        full_name: "Alan Turing"
    },
    gracehop: {
        date_of_birth: "December 9, 1906",
        full_name: "Grace Hopper"
    }
    });*/
    return res.json({ 
        data: 'hello',
    });
};