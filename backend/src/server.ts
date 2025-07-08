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

app.get('/livros', (req: any, res: any) => {
  res.json(livros);
});

app.post('/livros', (req: any, res: any) => {
    const { nome, autor } = req.body;
    const novoLivro = {
    id: livros.length + 1,
    nome,
    autor
  };

    console.log("Antes de cadastrar", livros)


    livros.push(novoLivro);
    res.status(201).json({ mensagem: 'Livro cadastrado com sucesso.', livro: novoLivro });
    console.log("Depois de cadastrar", livros)
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


