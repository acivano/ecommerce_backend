const authMiddleware = (req, res, next) => {
    if(req.headers.rol == "admin"){
        next()
    }else{
        res.send('No estas autorizado')
    }
}


module.exports = { authMiddleware }