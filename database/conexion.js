const mysql = require('mysql2')

const db = mysql.createConnection(
    {
        host: 'turntable.proxy.rlwy.net',
        user: 'root',
        password: 'RRqEaQqmmsxyKuIeYNryjpDubaWNGnoP',
        database: 'railway',
        port: 58874
    }
)

db.connect((err) => {
    if(err){
        throw err
    }
    console.log("conectado papi")
})

module.exports = db
