const jwt = require("jsonwebtoken");
const {secretKey} = require("../config");

module.exports = (roles) => {
    return function(req, res, next) 
    {
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

        const {roles: userRoles} = jwt.verify(token, secretKey);
        let isPermitted = false;
        userRoles.forEach(element => {
            if(element.includes(roles))
                isPermitted = true;
        });
        if(!isPermitted)
        {
            res.status(403).json({message: "You have no permission"});
        }
        next();
    } catch (e) {
        console.log(e);
        res.status(403).json({message: "User is not authorized"});
    }
    }
}