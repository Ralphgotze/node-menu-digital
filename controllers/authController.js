const db = require('../database/conexion.js')

class authController {
    constructor(){

    }

    register(req, res){
        try {
            const {nombre, email, contraseña } = req.body
            db.query(`INSERT INTO usuarios
                (id, nombre, email, contraseña)
                VALUES(NULL, ?, ?, ?);`,
            [nombre, email, contraseña], (err, result) => {
            if (err) {
                return res.status(400).send(err.message);
            }
            if (result){
                return res.json({ id:id, nombre:nombre, email:email});
            }
        });
        } catch (errr) {
            return res.status(500).send(errr.message)
        }
    }
    login(req, res){
        try {
            const { email, contraseña } = req.body
            db.query(`SELECT * FROM usuarios WHERE
                email = ? AND contraseña = ?;`,
            [email, contraseña], (err, result) => {
            if (err) {
                return res.status(400).send(err.message);
            }
            if (result.length === 0) {
                    return res.status(401).json({ error: 'Credenciales inválidas' });
                }

                // Usuario encontrado
                const usuario = result[0];
                return res.json({
                    mensaje: "Login correcto",
                    usuario_id: usuario.id,
                    nombre: usuario.nombre,
                    email: usuario.email
                });
            }
        );
    } catch (errr) {
        return res.status(500).send(errr.message);
    }
}
}

module.exports = new authController