const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    // console.log("verify");
    // console.log(req.body);
    // console.log(req.body.token);
    // console.log("verify");
    const token = req.body.token;
    // const token = req.header("auth-token");
    console.log(token);
    if (!token) return res.json({ msg: 'access denied' });

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        return res.json({ msg: 'Invalid token' });
    }
}
