import { openDB } from "../configDB.js";

export async function criarTabela() {

  const db = await openDB();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS pessoa (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      idade INTEGER,
      email TEXT,
      telefone TEXT
    )
  `);
}

export async function inserirPessoa(req, res) {

  const db = await openDB();
  const pessoa = req.body;

  await db.run(`
    INSERT INTO pessoa (nome, idade, email, telefone)
    VALUES (?, ?, ?, ?)
  `, [pessoa.nome, pessoa.idade, pessoa.email, pessoa.telefone]);

  res.json({ 
    "statusCode": 201,
    "message": "Pessoa recebida com sucesso",
  });
}

export async function updatePessoa(req, res) {
  const pessoa = req.body;
  const db = await openDB();
  await db.run(`
    UPDATE pessoa
    SET 
      nome = COALESCE(?, nome),
      idade = COALESCE(?, idade),
      email = COALESCE(?, email),
      telefone = COALESCE(?, telefone)
    WHERE id = ?
  `, [pessoa.nome, pessoa.idade, pessoa.email, pessoa.telefone, pessoa.id]);
  
  res.json({ 
    "statusCode": 200,
    "message": "Pessoa atualizada com sucesso",
  });
}

export async function selectPessoas(req, res) {

  const db = await openDB();
  const pessoas = await db.all(`SELECT * FROM pessoa`);
  res.json(pessoas);
  
}

export async function selectPessoa(req, res) {

  const db = await openDB();
  const pessoa = await db.get(`SELECT * FROM pessoa WHERE id = ?`, [req.body.id]);
  res.json(pessoa);
}

export async function deletePessoa(req, res) {

  const db = await openDB();
  const pessoa = req.body;
  await db.run(`DELETE FROM pessoa WHERE id = ?`, [pessoa.id]);
  res.json({ message: "Pessoa excluída com sucesso" });
}