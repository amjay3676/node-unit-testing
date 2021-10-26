const bcrypt = require("bcryptjs");

function encryptPassword(password) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password,salt);
    return hash;
};

function compareHashPassword(password, hashPassword){
    let check = bcrypt.compareSync(password, hashPassword);
    return check;
};

module.exports = {
    encryptPassword,
    compareHashPassword,
}