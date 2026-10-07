// ==========================================
// ENDEREÇO DO GOOGLE APPS SCRIPT
// ==========================================

const URL_RECEBER_RESPOSTAS =
    "https://script.google.com/macros/s/AKfycbzZ24pYHNl42vdgnkFcn_Nk46us8f-4kIx_cwDEkW1raMrDJtntkyIXmXSsFP3wYN_8/exec";
// ==========================================
// PERGUNTAS
// correta: 0 = primeira, 1 = segunda,
// 2 = terceira, 3 = quarta alternativa.
// ==========================================

const perguntas = [
    {
        pergunta: "Qual é minha comida favorita?",
        alternativas: [
            "Pizza",
            "Lasanha",
            "Sushi",
            "Hambúrguer"
        ],
        correta: 1
    },
    {
        pergunta: "O que eu mais gosto de fazer no tempo livre?",
        alternativas: [
            "Cozinhar",
            "Ler",
            "Jogar basquete",
            "Dançar"
        ],
        correta: 2
    },
    {
        pergunta: "Qual é meu jogo favorito?",
        alternativas: [
            "Clash Royale",
            "Minecraft",
            "Free Fire",
            "FIFA"
        ],
        correta: 0
    },
    {
        pergunta: "Qual é meu cantor favorito e a música dele que eu mais gosto?",
        alternativas: [
            "Luan Santana — Meteoro",
            "Anitta — Envolver",
            "Ludmilla — Cheguei",
            "Hungria — Amor e Fé"
        ],
        correta: 3
    },
    {
        pergunta: "Qual lugar eu sonho em conhecer?",
        alternativas: [
            "Paris",
            "Fernando de Noronha",
            "Disney",
            "Nova York"
        ],
        correta: 1
    },
    {
        pergunta: "Qual é meu maior objetivo atualmente?",
        alternativas: [
            "Ficar famoso",
            "Comprar uma moto",
            "Terminar os estudos",
            "Mudar de país"
        ],
        correta: 2
    },
    {
        pergunta: "Qual destes programas eu prefiro?",
        alternativas: [
            "Sair com os amigos",
            "Ficar em casa vendo filmes",
            "Passear sozinho",
            "Passar o dia dormindo"
        ],
        correta: 0
    },
    {
        pergunta: "O que mais me irrita em alguém?",
        alternativas: [
            "Falar alto",
            "Chegar atrasado",
            "Mexer no celular",
            "Mentir"
        ],
        correta: 3
    },
    {
        pergunta: "Quantos relacionamentos sérios eu já tive?",
        alternativas: [
            "Nenhum",
            "Um",
            "Dois",
            "Três"
        ],
        correta: 1
    },
    {
        pergunta: "O que eu mais valorizo em uma amizade?",
        alternativas: [
            "Presentes",
            "Popularidade",
            "Fidelidade e honestidade",
            "Gostar dos mesmos jogos"
        ],
        correta: 2
    },
    {
        pergunta: "O que me faria perder a confiança em alguém?",
        alternativas: [
            "Mentiras",
            "Demorar para responder",
            "Esquecer meu aniversário",
            "Não querer sair comigo"
        ],
        correta: 0
    },
    {
        pergunta: "Eu perdoaria uma traição?",
        alternativas: [
            "Sim, facilmente",
            "Sim, depois de um pedido de desculpas",
            "Talvez, depois de um tempo",
            "Não, seria impossível para mim"
        ],
        correta: 3
    },
    {
        pergunta: "Quando gosto de alguém, eu...",
        alternativas: [
            "Conto logo para a pessoa",
            "Escondo o que sinto",
            "Peço para um amigo contar",
            "Fico dando indiretas"
        ],
        correta: 1
    },
    {
        pergunta: "Qual destes é um sonho meu que pouca gente sabe?",
        alternativas: [
            "Ser cantor",
            "Comprar um barco",
            "Ter uma filha",
            "Morar em uma fazenda"
        ],
        correta: 2
    },
    {
        pergunta: "Quando fico magoado, eu prefiro...",
        alternativas: [
            "Me afastar e conversar depois",
            "Conversar na mesma hora",
            "Fingir que nada aconteceu",
            "Nunca mais falar com a pessoa"
        ],
        correta: 0
    }
];

// ==========================================
// ELEMENTOS DO HTML
// ==========================================

// Tela de nome.
const formulario = document.getElementById("formulario");
const campoNome = document.getElementById("nome");

// Tela da resposta escrita.
const apresentacao = document.getElementById("apresentacao");
const tituloApresentacao =
    document.getElementById("titulo-apresentacao");
const formularioOpiniao =
    document.getElementById("formulario-opiniao");
const campoOpiniao = document.getElementById("opiniao");

// Tela do quiz.
const quiz = document.getElementById("quiz");
const boasVindas = document.getElementById("boas-vindas");
const progresso = document.getElementById("progresso");
const textoPergunta = document.getElementById("pergunta");
const alternativas = document.getElementById("alternativas");
const feedback = document.getElementById("feedback");
const botaoProxima = document.getElementById("proxima");

// Tela do resultado.
const resultado = document.getElementById("resultado");
const tituloResultado =
    document.getElementById("titulo-resultado");
const pontuacao = document.getElementById("pontuacao");
const mensagemFinal = document.getElementById("mensagem-final");
const tituloRevisao = document.getElementById("titulo-revisao");
const listaErros = document.getElementById("lista-erros");
const statusEnvio = document.getElementById("status-envio");
const botaoReiniciar = document.getElementById("reiniciar");

// ==========================================
// INFORMAÇÕES DA PARTIDA
// ==========================================

let nomeJogador = "";
let opiniaoJogador = "";
let perguntaAtual = 0;
let acertos = 0;
let respostasJogador = [];

let respondeu = false;
let quizFinalizado = false;
let envioIniciado = false;
let enviando = false;

// ==========================================
// TROCAR DE TELA
// ==========================================

function mostrarTela(tela) {
    formulario.hidden = true;
    apresentacao.hidden = true;
    quiz.hidden = true;
    resultado.hidden = true;

    tela.hidden = false;
}

// ==========================================
// PRIMEIRA TELA: NOME
// ==========================================

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nome = campoNome.value.trim();

    if (nome === "") {
        campoNome.setCustomValidity(
            "Digite seu nome para continuar."
        );

        campoNome.reportValidity();
        return;
    }

    nomeJogador = nome;

    tituloApresentacao.textContent =
        `${nomeJogador}, você me conhece mesmo?`;

    mostrarTela(apresentacao);
    campoOpiniao.focus();
});

campoNome.addEventListener("input", function () {
    campoNome.setCustomValidity("");
});

// ==========================================
// SEGUNDA TELA: RESPOSTA ESCRITA
// ==========================================

formularioOpiniao.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const opiniao = campoOpiniao.value.trim();

    if (opiniao === "") {
        campoOpiniao.setCustomValidity(
            "Conte o quanto você acha que me conhece e por quê."
        );

        campoOpiniao.reportValidity();
        return;
    }

    opiniaoJogador = opiniao;

    perguntaAtual = 0;
    acertos = 0;
    respostasJogador = [];

    respondeu = false;
    quizFinalizado = false;
    envioIniciado = false;

    statusEnvio.textContent = "";
    listaErros.replaceChildren();

    boasVindas.textContent = `Vamos lá, ${nomeJogador}!`;

    mostrarTela(quiz);
    mostrarPergunta();
});

campoOpiniao.addEventListener("input", function () {
    campoOpiniao.setCustomValidity("");
});

// ==========================================
// MOSTRAR A PERGUNTA ATUAL
// ==========================================

function mostrarPergunta() {
    respondeu = false;

    const atual = perguntas[perguntaAtual];

    progresso.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    textoPergunta.textContent = atual.pergunta;

    alternativas.replaceChildren();
    feedback.textContent = "";

    botaoProxima.disabled = true;

    botaoProxima.textContent =
        perguntaAtual === perguntas.length - 1
            ? "Ver resultado"
            : "Próxima pergunta";

    atual.alternativas.forEach(function (texto, indice) {
        const botao = document.createElement("button");

        botao.type = "button";
        botao.className = "alternativa";
        botao.textContent = texto;
        botao.setAttribute("aria-pressed", "false");

        botao.addEventListener("click", function () {
            responder(indice);
        });

        alternativas.appendChild(botao);
    });

    textoPergunta.focus();
}

// ==========================================
// SELECIONAR OU TROCAR A ALTERNATIVA
// ==========================================

function responder(indiceEscolhido) {
    if (quizFinalizado) {
        return;
    }

    respondeu = true;

    // Substitui a escolha anterior desta pergunta.
    respostasJogador[perguntaAtual] = indiceEscolhido;

    const botoes = alternativas.querySelectorAll("button");

    botoes.forEach(function (botao, indice) {
        const selecionado = indice === indiceEscolhido;

        botao.classList.toggle("selecionada", selecionado);
        botao.setAttribute("aria-pressed", String(selecionado));
    });

    feedback.textContent =
        "Alternativa selecionada. Você pode mudar antes de avançar.";

    botaoProxima.disabled = false;
}

// ==========================================
// CONFIRMAR E AVANÇAR
// ==========================================

botaoProxima.addEventListener("click", function () {
    if (!respondeu || quizFinalizado) {
        return;
    }

    const atual = perguntas[perguntaAtual];
    const escolhida = respostasJogador[perguntaAtual];

    // Conta o ponto somente ao confirmar a escolha.
    if (escolhida === atual.correta) {
        acertos++;
    }

    respondeu = false;
    botaoProxima.disabled = true;
    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
});

// ==========================================
// RESULTADO FINAL
// ==========================================

function mostrarResultado() {
    if (quizFinalizado) {
        return;
    }

    quizFinalizado = true;

    const percentualExato =
        (acertos / perguntas.length) * 100;

    const porcentagem = Math.round(percentualExato);

    tituloResultado.textContent =
        `${nomeJogador}, seu resultado!`;

    pontuacao.textContent =
        `Você acertou ${acertos} de ${perguntas.length} perguntas (${porcentagem}%).`;

    if (percentualExato > 70) {
        mensagemFinal.textContent =
            "Se você acertou mais de 70%, é porque é alguém bem próximo de mim. Obrigado por fazer parte da minha vida e prestar atenção nos detalhes.";
    } else if (percentualExato >= 50) {
        mensagemFinal.textContent =
            "Você já conhece uma parte da minha história, mas ainda temos muitos detalhes para descobrir.";
    } else {
        mensagemFinal.textContent =
            "Todo mundo começa conhecendo só um pouco. Ainda temos muitas histórias para compartilhar.";
    }

    mostrarErros();

    mostrarTela(resultado);
    tituloResultado.focus();

    enviarResultado();
}

// ==========================================
// REVISÃO DAS PERGUNTAS ERRADAS
// ==========================================

function mostrarErros() {
    listaErros.replaceChildren();

    tituloRevisao.textContent =
        acertos === perguntas.length
            ? "Você acertou todas as perguntas!"
            : "As perguntas que você errou";

    perguntas.forEach(function (item, indice) {
        const escolhida = respostasJogador[indice];

        if (escolhida === item.correta) {
            return;
        }

        const bloco = document.createElement("div");
        bloco.className = "item-revisao";

        const titulo = document.createElement("h4");
        titulo.textContent = `${indice + 1}. ${item.pergunta}`;

        const suaResposta = document.createElement("p");
        suaResposta.className = "resposta-errada";
        suaResposta.textContent =
            `Sua resposta: ${item.alternativas[escolhida]}`;

        const respostaCorreta = document.createElement("p");
        respostaCorreta.className = "resposta-certa";
        respostaCorreta.textContent =
            `Resposta correta: ${item.alternativas[item.correta]}`;

        bloco.append(
            titulo,
            suaResposta,
            respostaCorreta
        );

        listaErros.appendChild(bloco);
    });
}

// ==========================================
// ENVIO PARA A PLANILHA
// ==========================================

async function enviarResultado() {
    if (envioIniciado) {
        return;
    }

    envioIniciado = true;
    enviando = true;

    botaoReiniciar.disabled = true;

    statusEnvio.textContent =
        "Enviando sua participação para Arthur...";

    const dados = new URLSearchParams({
        nome: nomeJogador,
        opiniao: opiniaoJogador,
        acertos: String(acertos),
        total: String(perguntas.length)
    });

    const controlador = new AbortController();

    const limiteDeTempo = setTimeout(function () {
        controlador.abort();
    }, 20000);

    try {
        await fetch(URL_RECEBER_RESPOSTAS, {
            method: "POST",
            mode: "no-cors",
            body: dados,
            keepalive: true,
            signal: controlador.signal
        });

        // O navegador não consegue ler a confirmação
        // do Google neste modo. Confira na planilha.
        statusEnvio.textContent =
            "Solicitação enviada. A confirmação de recebimento fica na planilha de Arthur.";
    } catch (erro) {
        console.error("Problema no envio:", erro);

        statusEnvio.textContent =
            "Não foi possível confirmar o envio. Avise Arthur para conferir a planilha. Seu resultado continua nesta tela.";
    } finally {
        clearTimeout(limiteDeTempo);

        enviando = false;
        botaoReiniciar.disabled = false;
    }
}

// ==========================================
// JOGAR NOVAMENTE
// ==========================================

botaoReiniciar.addEventListener("click", function () {
    if (enviando) {
        return;
    }

    formulario.reset();
    formularioOpiniao.reset();

    campoNome.setCustomValidity("");
    campoOpiniao.setCustomValidity("");

    nomeJogador = "";
    opiniaoJogador = "";
    perguntaAtual = 0;
    acertos = 0;
    respostasJogador = [];

    respondeu = false;
    quizFinalizado = false;
    envioIniciado = false;

    statusEnvio.textContent = "";
    feedback.textContent = "";
    listaErros.replaceChildren();

    mostrarTela(formulario);
    campoNome.focus();
});

// ==========================================
// TELA INICIAL
// ==========================================

mostrarTela(formulario);