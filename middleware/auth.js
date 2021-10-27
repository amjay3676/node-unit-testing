const jwtoken = require("../utils/jsonWebToken");
const CustomException = require("../utils/customException");

module.exports = function( req, res, next ) {
    let token = req.header("Authorization");                        //get token from header
    //check for token existed or not
    if(!token) {                                                    
        console.log("Authorization Denied...!");
        throw new CustomException("Authorization Denied...!", 401 );
    }
    //verify token
    try {
        const decode = jwtoken.verifyJWT(token);
        req.userId = decode.userId;
        next();
    } catch (err) {
        throw new CustomException( "Oops...token is not valid! Please log in again.", 401)
    }

}