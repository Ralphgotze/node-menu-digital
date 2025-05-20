const db = require('../database/conexion.js')

class FoodController {
    constructor(){

    }

    addFood(req, res){
        try {
            const {nombre, descripcion, precio, imagen_url, categoria_id, usuario_id} = req.body
            db.query(`INSERT INTO comidas
                (nombre, descripcion, precio, imagen_url, categoria_id, usuario_id)
                VALUES(?, ?, ?, ?, ?, ?);`,
            [nombre, descripcion, precio, imagen_url, categoria_id, usuario_id], (err, result) => {
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
    editFood(req, res){
        try {
            const {id, nombre, descripcion, precio, imagen_url, categoria_id, usuario_id} = req.body
            db.query(`UPDATE comidas
                SET nombre = ?,
                descripcion = ?,
                precio = ?,
                imagen_url = ?,
                categoria_id = ?
                WHERE usuario_id = ? AND id=?;`,
            [nombre, descripcion, precio, imagen_url, categoria_id, usuario_id, id], (err, result) => {
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
    getFood(req, res){
        try {
            const {usuario_id} = req.query
            db.query(`SELECT * FROM comidas WHERE
                usuario_id = ?;`,
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
    deleteFood(req, res){
        try {
            const {id} = req.body
            db.query(`DELETE FROM comidas WHERE
                id = ?;`,
            [id], (err, result) => {
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

module.exports = new FoodController