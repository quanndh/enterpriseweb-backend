module.exports = async (req, res, next) => {
    if (req.user.role < 3) {
        next();
    } else {
        res.status(401).json({
            code: 401,
            message: 'Unauthorized'
        })
    }
}