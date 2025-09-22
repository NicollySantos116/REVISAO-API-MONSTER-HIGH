import dados from "../models/dados.js";
const { monsters } = dados;

const getAllMonsters = (req, res) => {
    let resultado = monsters;

    // FILTROS AQUI

   const { nome, tipo, cor, serie, idade } = req.query;

    if (nome) {
        resultado = resultado.filter(m =>
            m.nome.toLowerCase().includes(nome.toLowerCase())
        );
    }

    if (tipo) {
        resultado = resultado.filter(m =>
            m.tipo.toLowerCase() === tipo.toLowerCase()
        );
    }

    if (cor) {
        resultado = resultado.filter(m =>
            m.cor.toLowerCase() === cor.toLowerCase()
        );
    }

    if (serie) {
        resultado = resultado.filter(m =>
            m.serie.toLowerCase().includes(serie.toLowerCase())
        );
    }

    if (idade) {
        resultado = resultado.filter(m => m.idade === parseInt(idade));
    }

    
    res.status(200).json({
        total: resultado.length,
        data: resultado
    });
}

const getMonsterByld = (req, res) => {
    const id = parseInt(req.params.id);
    const monster = monsters.find(m => m.id === id);

    if (!monster) {
        res.status(404).json({
            success: false,
            message: `Monster not found, ${id}`
        })
    }

    res.status(200).json({
        total: monster.length,
        data: monster
    })
}

const createMonster = (req, res) => {
    const { nome, idade, tipo, cor, serie, habilidade, foto } = req.body;

    const tiposMonsterHigh = ["Vampiro", "Lobisomem", "Frankenstein", "Zumbi", "Múmia", "Fantasma", "Sereia", "Medusa", "Ciborgue", "Dragão", "Demônio", "Bruxa", "Híbrido"];

    if (!nome) {
        return res.status(400).json({
            success: false,
            message: "O campo 'nome' é obrigatório"
        });
    }

    if (!idade) {
        return res.status(400).json({
            success: false,
            message: "O campo 'idade' é obrigatório"
        });
    }

    if (!tipo) {
        return res.status(400).json({
            success: false,
            message: "O campo 'tipo' é obrigatório"
        });
    }

    if (!cor) {
        return res.status(400).json({
            success: false,
            message: "O campo 'cor' é obrigatório"
        });
    }

    if (!serie) {
        return res.status(400).json({
            success: false,
            message: "O campo 'serie' é obrigatório"
        });
    }

    if (!habilidade) {
        return res.status(400).json({
            success: false,
            message: "O campo 'habilidade' é obrigatório"
        });
    }


    //Regras de negocio
  
    // Garante que o nome do monstro tenha no mínimo 3 caracteres
    if (nome.length < 3) {
        return res.status(400).json({
            success: false,
            message: "O nome deve conter no mínimo 3 caracteres"
        });
    }

    // Impede nomes duplicados no sistema (case insensitive)
    const nomeJaExiste = monsters.some(m => m.nome.toLowerCase() === nome.toLowerCase());
    if (nomeJaExiste) {
        return res.status(400).json({
            success: false,
            message: "Já existe um monstro com esse nome"
        });
    }

    // Garante que a idade seja adequada para o universo Monster High (monstros antigos)
    if (idade < 1600) {
        return res.status(400).json({
            success: false,
            message: "A idade deve ser superior ou igual a 1600"
        });
    }

    // Garante que o tipo informado seja um dos válidos
    if (!tiposMonsterHigh.includes(tipo)) {
        return res.status(400).json({
            success: false,
            message: `O tipo "${tipo}" não é válido. Tipos permitidos: ${tiposMonsterHigh.join(", ")}.`
        });
    }

    // Garante que a habilidade não seja muito longa
    if (habilidade.length > 100) {
        return res.status(400).json({
            success: false,
            message: "A habilidade deve ter no máximo 100 caracteres"
        });
    }

    // Garante que a série esteja dentro dos valores válidos: 1, 2 ou 3
    if (!seriesValidas.includes(Number(serie))) {
        return res.status(400).json({
            success: false,
            message: "A série deve ser 1, 2 ou 3"
        });
    }


    //Criar a monster high

    const novaMonster = {
        id: monsters.length + 1,
        nome: nome,
        idade,
        tipo,
        cor,
        serie,
        dataDeCadastro: new Date(),
        habilidade,
        foto
    }

    monsters.push(novaMonster);

    res.status(201).json({
        success: true,
        message: "Nova Monstro Cadastrada com sucesso",
        data: novaMonster
    })

}

const deleteMonster = (req, res) => {
    const { id } = req.params

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O id deve ser válido"
        });
    }

    const idParaApagar = parseInt(id);

    const monsterParaRemover = monsters.find(m => m.id === idParaApagar);
    console.log(monsterParaRemover)

    if (!monsterParaRemover) {
        return res.status(404).json({
            success: false,
            message: "Monster id não existe"
        });
    }

    const monsterFiltrado = monsters.filter(m => m.id !== id);
    console.log(monsterFiltrado)

    monsters.splice(0, monsters.length, ...monsterFiltrado);

    return res.status(200).json({
        success: true,
        message: "O monster foi removida com sucesso!"
    })
}

const updateMonster = (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, idade, tipo, cor, serie, habilidade, foto } = req.body;

    const tiposMonsterHigh = ["Vampiro", "Lobisomem", "Frankenstein", "Zumbi", "Múmia", "Fantasma", "Sereia", "Medusa", "Ciborgue", "Dragão", "Demônio", "Bruxa", "Híbrido"];

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O id deve ser válido"
        });
    }

    const monstroExiste = monsters.find(m => m.id === id);

    if (!monstroExiste) {
        return res.status(404).json({
            success: false,
            message: "Monster não existe"
        });
    }

    //Regras de negocio
    if (idade < 1600) {
        return res.status(400).json({
            success: false,
            message: "A idade deve ser superior ou igual 1600"
        })
    }

    // O tipo esta vindo indefinido, logo este tipo nao esta no array de tipos, entao ele trava.

    if (tipo) {
        if (!tiposMonsterHigh.includes(tipo)) {
            return res.status(400).json({
                success: false,
                message: `O tipo "${tipo}" não é válido. Tipos permitidos: ${tiposMonsterHigh.join(", ")}.`
            });
        }
    }


    const monsterAtualizados = monsters.map(monster =>
        monster.id === id
            ? {
                ...monster,
                ...(nome && { nome }),
                ...(idade && { idade }),
                ...(tipo && { tipo }),
                ...(cor && { cor }),
                ...(serie && { serie }),
                ...(habilidade && { habilidade })
            }
            : monster
    );

    monsters.splice(0, monsters.length, ...monsterAtualizados);

    const monstroAtualizado = monsters.find(m => m.id === id);

    res.status(200).json({
        success: true,
        message: "Monstro atualizado com sucesso",
        monstro: monstroAtualizado
    })

}

export { getAllMonsters, getMonsterByld, createMonster, deleteMonster, updateMonster };