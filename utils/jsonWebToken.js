const jwt = require("jsonwebtoken");
let expiresIn = "2h";
function createJWT(payload) {
    const { userId, email } = payload;
    let token = jwt.sign( {userId, email}, process.env.SECRET_TOKEN_KEY,{ expiresIn });
    return token;
};

function verifyJWT(token) {
    let payload = jwt.verify(token, secretKey);
    return payload;
};

module.exports = {
    createJWT,
    verifyJWT,
}