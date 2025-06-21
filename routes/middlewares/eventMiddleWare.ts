export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); // The user is an admin, proceed
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' }); // 403 Forbidden
    }
};