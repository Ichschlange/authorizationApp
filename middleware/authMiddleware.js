const jwt = require("jsonwebtoken");
const {secretKey} = require("../config");

module.exports = (req, res, next) => {

    if(req.method === "OPTIONS")
    {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token)
        {
            res.status(403).json({message: "User is not authorized"});
        }
        const decodedInf = jwt.verify(token, secretKey);
        req.user = decodedInf;
        next();
    } catch (e) {
        console.log(e);
        res.status(403).json({message: "User is not authorized"});
    }
}