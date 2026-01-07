
const isAdmin = (req, res, next) => {
    console.log("req.user in admin middleware: ", req.user)
    if (req.user && req.user.role === "admin") {
        next()
    } else {
        return res.status(403).json({
            message: "Access denied! Admins only."
        })
    }
}

export default isAdmin;