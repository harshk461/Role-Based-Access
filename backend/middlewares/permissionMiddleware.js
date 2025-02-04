const jwt=require('jsonwebtoken');
const ErrorHandler = require('../utils/err');
const { Permission } = require('../models/index');

const mapping = {
    "GET": "read",
    "POST": "create",
    "PATCH": "update",
    "PUT": "update"
};

const verifyPermission = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "Access Denied! No Token Provided" });
    }

    try {
        const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        const permissions = await Permission.findOne({ where: { role: verified.role } });

        if (!permissions) {
            return res.status(403).json({ message: "Permission Denied" });
        }

        const requiredPermission = mapping[req.method];

        if (!permissions.permissions || !permissions.permissions.includes(requiredPermission)) {
            return res.status(403).json({ message: "Permission Denied" });
        }

        req.user = verified;
        req.permissions = permissions.permissions;

        next();
    } catch (e) {
        console.log(e);
        next(new ErrorHandler("SERVER ERROR"));
    }
};

module.exports = verifyPermission;