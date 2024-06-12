const { User } = require('../models');

class UserController {
    async created(req, res) {
        try {
            const {firstName, lastName, email} = req.body;

            const existingUser = await User.findOne({
                where: { email: email }
            });

            if (existingUser) {
                return res.status(400).json({ error: "Usuário já existe!" });
            }

            if(!firstName || !email) {
                return res.status(400).json({error: "Nome e email são obrigatorios!"});
            }

            const createdUser = await User.create({firstName, lastName, email});

            return res.status(200).json(createdUser);
        } catch(e) {
            console.log(e);
            return res.status(400).json({message: "Falha ao criar novo usuario!"})
        }
    }

    async index(req, res) {
        try {
            const usersList = await User.findAll();

            return res.status(200).json(usersList);
        } catch(e) {
            return res.status(400).json({error: "Erro ao listar os usuarios!"});
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;

            const userExist = await User.findOne({
                where: {
                    id: id,
                },
            })

            if(!userExist) {
                return res.status(400).json({error: "Usuario não encontrado!"});
            }

            const user = await User.findOne({
                where: { id: id},
            });

            return res.status(200).json(user);
        } catch(e) {
            return res.status(400).json({error: "Erro ao listar usuário!"});
        }
    }

    async updated(req, res) {
        try {
            const { id } = req.params;

            const {firstName, lastName, email} = req.body;

            const userExist = await User.findOne({
                where: {
                    id: id,
                },
            })

            if(!userExist) {
                return res.status(400).json({error: "Usuario não encontrado!"});
            }

            if(!firstName || !email) {
                return res.status(400).json({error: "Erro! Nome e e-mail são obrigatórios!"});
            }

            await User.update({firstName, lastName, email}, {
                where: {id: id},
            });

            return res.status(200).json({message: "Usuário atualizado com sucesso!"});
        } catch(e) {
            return res.status(400).json({error: "Erro ao atualizar usuario!"});
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            const userExist = await User.findOne({
                where: {
                    id: id,
                },
            })

            if(!userExist) {
                return res.status(400).json({error: "Usuario não encontrado!"});
            }

            await User.destroy({
                where: {id: id},
            });

            return res.status(200).json({message: "Usuário excluido com sucesso!"});
        } catch(e) {
            console.log(e);
            return res.status(400).json({error: "Erro ao excluir usuário!"});
        }
    }
}

module.exports = new UserController;