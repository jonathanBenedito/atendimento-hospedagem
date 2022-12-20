const mensagemAtendente = document.querySelector(".mensagem-atendente")
const mensagemCliente = document.querySelector(".mensagem-cliente")
const botoes = document.querySelector(".botoes")
const botaoNegacao = botoes.querySelector("#negar")
const botaoConfirmacao = botoes.querySelector("#confirmar")
const questaoBotao = botoes.querySelector("#questao")
const chat = document.querySelector(".chat")
const intervaloMensagem = 2000

function perguntarNome() {
    desativarBotoes()
    adicionarNovaMensagem("Olá! Qual é o seu nome?")

    setTimeout(function () {
        questaoBotao.innerText = "Informar nome?"
        botaoConfirmacao.disabled = false
        botaoConfirmacao.addEventListener("click", responderNome)
    }, intervaloMensagem)
}

function mostrarFormularioNome() {
    let nomeCliente = ""

    while (!nomeCliente) {
        nomeCliente = window.prompt("Informe seu nome.")

        if (!nomeCliente) {
            alert("Nome não pode estar em branco!")
        }
    }
    return nomeCliente
}

function responderNome() {
    let nomeCliente = mostrarFormularioNome()
    adicionarNovaMensagem(nomeCliente, false)
    desativarBotoes()
    botaoConfirmacao.removeEventListener("click", responderNome)

    setTimeout(function () {
        adicionarNovaMensagem(`Seja bem-vindo ${nomeCliente}!`)

        setTimeout(function () {
            adicionarNovaMensagem(`Gostaria de passar uma noite na nossa estalagem? Custa apenas R$ 500,00!`)
            questaoBotao.innerText = "Aceitar hospedagem?"
            botaoConfirmacao.disabled = false
            botaoNegacao.disabled = false
            botaoConfirmacao.removeEventListener("click", responderNome)
            botaoConfirmacao.addEventListener("click", confirmarHospedagem)
            botaoNegacao.addEventListener("click", negarHospedagem)
        }, intervaloMensagem)
    }, intervaloMensagem)
}

function confirmarHospedagem() {
    adicionarNovaMensagem("Sim, por favor!", false)
    desativarBotoes()

    setTimeout(function () {
        adicionarNovaMensagem("Ótimo! Nós temos as melhores camas de toda região!")
        questaoBotao.innerText = "Reiniciar conversa?"
        botaoNegacao.disabled = true
        botaoConfirmacao.disabled = false
        botaoConfirmacao.removeEventListener("click", confirmarHospedagem)
        botaoConfirmacao.addEventListener("click", reiniciarConversa)
        botaoNegacao.removeEventListener("click", negarHospedagem)
    }, intervaloMensagem)
}

function negarHospedagem() {
    adicionarNovaMensagem("Não, obrigado!", false)
    desativarBotoes()

    setTimeout(function () {
        adicionarNovaMensagem("Que pena! Você parecia ser uma pessoa mais legal!")
        questaoBotao.innerText = "Reiniciar conversa?"
        botaoNegacao.disabled = true
        botaoConfirmacao.disabled = false
        botaoConfirmacao.removeEventListener("click", confirmarHospedagem)
        botaoConfirmacao.addEventListener("click", reiniciarConversa)
        botaoNegacao.removeEventListener("click", negarHospedagem)
    }, intervaloMensagem)
}

function reiniciarConversa() {
    const podeReiniciar = window.confirm("Tem certeza que deseja reiniciar a conversa?")

    if (podeReiniciar) {
        const mensagens = chat.querySelectorAll(".mensagem")
        mensagens.forEach(mensagem => {
            mensagem.remove()
        })
        botaoConfirmacao.removeEventListener("click", reiniciarConversa)
        perguntarNome()
    }
}

function adicionarNovaMensagem(conteudo, souAtendente = true) {
    if (souAtendente) {
        const novaMensagemAtendente = mensagemAtendente.cloneNode(true)
        const elementoTexto = novaMensagemAtendente.querySelector("span")

        elementoTexto.innerText = conteudo
        novaMensagemAtendente.classList.remove("esconder")
        chat.appendChild(novaMensagemAtendente)
    } else {
        const novaMensagemCliente = mensagemCliente.cloneNode(true)
        const elementoTexto = novaMensagemCliente.querySelector("span")

        elementoTexto.innerText = conteudo
        novaMensagemCliente.classList.remove("esconder")
        chat.appendChild(novaMensagemCliente)
    }
    chat.scrollTo(0, chat.scrollHeight)
}

function desativarBotoes() {
    questaoBotao.innerText = ""
    botaoConfirmacao.disabled = true
    botaoNegacao.disabled = true
}

function ativarBotoes() {
    botaoConfirmacao.disabled = false
    botaoNegacao.disabled = false
}

perguntarNome()
