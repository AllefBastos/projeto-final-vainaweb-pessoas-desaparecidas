import { Router } from "express";
import { criarTabela, inserirPessoa, updatePessoa, selectPessoas, selectPessoa, deletePessoa } from '../controller/Pessoa.js';

const router = Router();

router.get('/', (req, res) => {
  res.send('Servidor rodando em rotas!');
});

criarTabela(); // Cria a tabela no banco de dados (se ainda não existir)
router.get('/pessoas', selectPessoas); // Rota para listar todas as pessoas
router.get('/pessoa', selectPessoa); // Rota para listar uma pessoa específica por ID
router.post('/pessoa', inserirPessoa); // Rota para criar uma nova pessoa
router.put('/pessoa', updatePessoa); // Rota para atualizar uma pessoa existente (ID obrigatório no corpo da requisição)
router.delete('/pessoa', deletePessoa); // Rota para excluir uma pessoa (ID obrigatório no corpo da requisição)

export default router;