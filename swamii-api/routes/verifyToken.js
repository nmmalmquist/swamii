const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("No Session. Access Denied. Sign in")
    
    try {
        const verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verifiedUser;
        next();
    } catch(error){
        res.status(400).send("Invalid Token")
    }
}