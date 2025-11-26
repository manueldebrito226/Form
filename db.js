const {Pool} = require("pg");
const { user, host, database, port, password } = require("pg/lib/defaults");

const pool = new Pool({
     user: "postgres",
     host: "localhost",
     database: "form",
     port: 5432,
     password: "Programator123"
});
pool.connect()
    .then(() => console.log("Conectado ao PostgreSQL!"))
    .catch(err => console.error("Erro ao conectar ao PostgreSQL:", err));

module.exports = pool;
