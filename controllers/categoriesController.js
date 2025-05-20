const db = require('../database/conexion.js')

class categoriesController {
    constructor(){

    }

    addCategory(req, res){
        try {
            const {nombre, usuario_id} = req.body
            db.query(`INSERT INTO categorias
                (nombre, usuario_id)
                VALUES(?, ?);`,
            [nombre, usuario_id], (err, result) => {
            if (err) {
                return res.status(400).send(err.message);
            }
            if (result){
                return res.json({nombre:nombre});
            }
        });
        } catch (errr) {
            return res.status(500).send(errr.message)
        }
    }
    editCategory(req, res){
        try {
            const {nombre, usuario_id} = req.body
            db.query(`UPDATE categorias
                SET nombre = ?
                WHERE usuario_id = ?;`,
            [nombre, usuario_id], (err, result) => {
            if (err) {
                return res.status(400).send(err.message);
            }
            if (result){
                return res.json({nombre:nombre});
            }
        });
        } catch (errr) {
            return res.status(500).send(errr.message)
        }
    }
    getCategory(req, res){
        try {
            const {usuario_id} = req.query
            db.query(`SELECT * FROM categorias WHERE
                usuario_id = ?`,
            [usuario_id], (err, result) => {
            if (err) {
                return res.status(400).send(err.message);
            }
            if (result){
                return res.send(JSON.stringify(result));
            }
        });
        } catch (errr) {
            return res.status(500).send(errr.message)
        }
    }
    deleteCategory(req, res){
        try {
            const {id, usuario_id} = req.body
            db.query(`DELETE FROM categorias
                WHERE id = ? AND usuario_id = ?;`,
            [id, usuario_id], (err, result) => {
            if (err) {
                return res.status(400).send(err.message);
            }
            if (result){
                return res.status(200).send("eliminado");
            }
        });
        } catch (errr) {
            return res.status(500).send(errr.message)
        }
    }
}

module.exports = new categoriesController