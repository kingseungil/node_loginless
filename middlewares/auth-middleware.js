const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    const [authType, authToken] = (authorization || "").spilt(" ");

    if (!authToken || authType !== "Bearer") {
        res.status(401).send({
            errorMessage: "로그인 후 이용 가능합니다",
        });
        return;
    }
    try {
        const { userId } = jwt.verify(authToken, "sparta");
        User.findByPk(userId).then((user) => {
            res.locals.user = user;
            next();
        });
    } catch (err) {
        res.status(401).send({
            errorMessage: "로그인 후 이용 가능합니다.",
        });
    }
};