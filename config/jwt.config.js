import jwt from 'jsonwebtoken';

const secret = "mysecret";

const authenticate = (req, res, next) => {
    // Verifica si existe la cookie del token
    const cookies = req;
    const token = req;
    console.log(cookies);
    console.log(token);

    if (!token) {
        // Si no hay token, retorna un error no autorizado (401)
        return res.status(401).json({ verified: false, message: 'Unauthorized' });
    }

    // Verifica el token
    jwt.verify(token, secret, (err, payload) => {
        if (err) {
            // Si hay un error en la verificación, retorna un error no autorizado (401)
            return res.status(401).json({ verified: false, message: 'Unauthorized' });
        } else {
            // Si la verificación es exitosa, establece el usuario en la sesión
            req.user = payload;
            next();
        }
    });
};

export { authenticate };
