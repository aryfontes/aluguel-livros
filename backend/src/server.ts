import express from 'express';

const app = express();
const port = 3000;

// Middleware pra aceitar JSON nas requisições
app.use(express.json());

type Livro = { 
    nome: string
    autor: string 
    id: number
}
// Simulando um "banco de dados" na memória
const livros: Livro[] = [
    {
        id: 1,
        autor: "JK. Rowling",
        nome: "Harry Potter"
    }
];

// Rota GET para listar livros
app.get('/livros', (req: any, res: any) => {
  res.json(livros);
});

// Rota POST para cadastrar um livro
app.post('/livros', (req: any, res: any) => {
    const { nome, autor } = req.body;
    if(!nome) {
        res.status(500).json({error: "Nome do livro é obrigatório."})
        return 
    }

    if(!autor) {
        res.status(500).json({error: "Nome do autor é obrigatório."})
        return
    }

    if(nome.length < 3) { 
        res.status(500).json({error: "Nome não deve conter menos que três caracteres."})
        return
    }

    if(autor.length < 3) {
        res.status(500).json({error: "Autor não deve conter menos que três caracteres."})
        return
    }

    const novoLivro = {
    id: livros.length + 1,
    nome,
    autor
  };

    livros.push(novoLivro);
    res.status(201).json({ mensagem: 'Livro cadastrado com sucesso.', livro: novoLivro });
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


