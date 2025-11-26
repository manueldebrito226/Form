const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./db");
const path = require("path");
const app = express();
const nodemailer = require("nodemailer");
const PORT = 10000;


app.use(express.json());
app.use(express.static("public"));
app.get("/", (req, res) => {
     res.sendFile(__dirname, + "public", "index.html");
});

app.post("/enviar", async (req, res) =>{
     const { Nome, Idade, Email, Telefone, Pretende, Instituicao, Saber, Comentarios } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO cad (nome, idade, email, numero, visao, resultados, como_soube, comentarios) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [Nome, Idade, Email, Telefone, Pretende, Instituicao, Saber, Comentarios]
        );
        console.log("Novo Cadástro:", result.rows[0]);
        res.send("Dados recebidos com sucesso!");
    } catch (err) {
        console.error("Erro ao inserir dados:", err);
        res.status(500).send("Erro ao processar sua solicitação.");
    }
});


// Rota para enviar email
app.post("/send-email", async (req, res) => {
    const { Nome, Idade, Email, Telefone, Pretende, Instituicao, Saber, Comentarios } = req.body;

    // login Gmail usando APP PASSWORD
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "domingossapanda74@gmail.com",
            pass: "zbxn yceo vslr xezo"  // Não é tua senha normal!!!
            // domingossapanda74@gmail.com
        }
    });

    let mailOptions = {
        from: Email,
        to: "domingossapanda74@gmail.com",
        subject: "Nova mensagem do formulário",
        text: `Nome: ${Nome}\n Idade: ${Idade}\n Email: ${Email}\n Telefone:\n${Telefone}\n Visão: ${Pretende}\n Resultados que quer obter: ${Instituicao}\n Como soube da actividade?: ${Saber}\n Coemtário: ${Comentarios}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send("Mensagem enviada com sucesso!");
        console.log("Sucesso")
    } catch (error) {
        console.log(error);
        res.send("Erro ao enviar a mensagem.");
    }
});

// iniciar o servidor
app.listen(PORT, () =>{
     console.log(`Rodando em http://localhost:${PORT}`);
     
})
