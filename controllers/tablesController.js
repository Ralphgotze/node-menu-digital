const db = require('../database/conexion.js')

class tablesController {
    constructor(){

    }

    addTable(req, res){
        try {
            const {numero, usuario_id} = req.body
            db.query(`INSERT INTO mesas
                (numero, usuario_id)
                VALUES(?, ?);`,
            [numero, usuario_id], (err, result) => {
            if (err) {
                return res.status(400).send(err.message);
            }
            if (result){
                return res.json({numero:numero, usuario_id:usuario_id});
            }
        });
        } catch (errr) {
            return res.status(500).send(errr.message)
        }
    }
    editTable(req, res){
        try {
            const {numero, usuario_id, id} = req.body
            db.query(`UPDATE mesas
                SET numero = ?
                WHERE usuario_id = ? AND id = ?;`,
            [numero, usuario_id, id], (err, result) => {
            if (err) {
                return res.status(400).send(err.message);
            }
            if (result){
                return res.json({numero:numero, usuario_id:usuario_id});
            }
        });
        } catch (errr) {
            return res.status(500).send(errr.message)
        }
    }
    getTable(req, res){
        try {
            const {usuario_id} = req.query
            db.query(`SELECT * FROM mesas WHERE usuario_id = ?;`,
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
    deleteTable(req, res){
        try {
            const {numero, usuario_id} = req.body
            db.query(`DELETE FROM mesas WHERE usuario_id = ?;`,
            [usuario_id], (err, result) => {
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

module.exports = new tablesController