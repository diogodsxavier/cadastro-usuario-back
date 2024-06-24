import express from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
const port = 3000;
app.use(express.json());

// Post  Criando
app.post('/usuarios', async (req, res) => {
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    });

    res.status(201).json(req.body);
});

// Get  Listando
app.get('/usuarios', async (req, res) => {
    let users = [];

    if (req.query) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        });
    } else {
        users = await prisma.user.findMany();
    }

    res.status(200).json(users);
});

// Put  Editar vários
app.put('/usuarios/:id', async (req, res) => {
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    });

    res.status(201).json(req.body);
});

// Delete 
app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    });

    res.status(200).json({ message: "Usuário deletado com sucesoo!" });
})

app.listen(port);

//  criar api de usuarios

//  - criar um usuário
//  - listar todos os usuário
//  - Editar um usuário
//  - deletar um usuário