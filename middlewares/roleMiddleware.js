module.exports = (roles) => {
    //takes roles as parameter
    return (req, res, next) => {
        //checks whether role is ok
        //TODO: do it with server side or hash with bcrypt
        const userRole = req.body.role;
        if(roles.includes(userRole)) {
            next();
        } else {
            return res.status(401).send('YOU CANT DO IT');
        }
    }
}