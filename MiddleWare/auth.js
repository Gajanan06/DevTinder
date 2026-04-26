const AdminAuth = (req, res, next) => {
    const token = "123";
    if (token === "123") {
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
}

module.exports = AdminAuth;