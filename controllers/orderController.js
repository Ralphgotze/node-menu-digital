const db = require('../database/conexion.js')
const { io } = require("../app.js"); 


class orderController {
    constructor(){
        
    }

    addOrder(req, res) {
  try {
    const { mesa_id, comidas, usuario_id } = req.body;
    db.query(
      `INSERT INTO pedidos (mesa_id, comidas, usuario_id) VALUES (?, ?, ?)`,
      [mesa_id, JSON.stringify(comidas), usuario_id],
      (err, result) => {
        if (err) {
          return res.status(400).send(err.message);
        }
        if (result) {
          // 🔔 Emitir evento de nuevo pedido
          io.emit("nuevoPedido", {
            id: result.insertId,
            mesa_id,
            comidas,
            usuario_id,
            estado: "pendiente"
          });

          return res.json({ mesa_id, comidas });
        }
      }
    );
  } catch (errr) {
    return res.status(500).send(errr.message);
  }
}

    getOrder(req, res){
        try {
            const {usuario_id} = req.query
            db.query(`SELECT * FROM pedidos WHERE
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
    editOrder(req, res) {
  try {
    const { id } = req.query;
    db.query(
      `UPDATE pedidos SET estado = "entregado" WHERE id = ?`,
      [id],
      (err, result) => {
        if (err) return res.status(400).send(err.message);
        if (result) {
          return res.send(JSON.stringify(result));
        }
      }
    );
  } catch (errr) {
    return res.status(500).send(errr.message);
  }
}

}

module.exports = new orderController

