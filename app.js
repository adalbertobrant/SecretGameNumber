let listaDeNumerosSorteados = [];
let maxnumero = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(selector, message) {
  let campo = document.querySelector(selector);
  campo.innerHTML = message;

  if ("speechSynthesis" in window) {
    let utterance = new SpeechSynthesisUtterance(message);
    // Ajusta a linguagem da voz de acordo com o idioma atual
    utterance.lang = idiomaAtual;
    utterance.rate = 1.2;
    window.speechSynthesis.speak(utterance);
  } else {
    console.log("Web Speech API não suportada neste navegador.");
  }
}

exibirMensagemInicial();

function verificarChute() {
  let chute = parseInt(document.querySelector("input").value);

  if (chute === numeroSecreto) {
    let palavraTentativas =
      tentativas === 1
        ? idiomaAtual === "pt-BR"
          ? "tentativa"
          : "attempt"
        : idiomaAtual === "pt-BR"
        ? "tentativas"
        : "attempts";

    exibirTextoNaTela("h1", t("acertou"));
    exibirTextoNaTela(
      "p",
      t("tentativas", {
        tentativas: tentativas,
        palavraTentativas,
      })
    );

    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    exibirTextoNaTela(
      "p",
      chute > numeroSecreto ? t("numeroMenor") : t("numeroMaior")
    );
    tentativas++;
    limparCampo();
  }
}

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * maxnumero + 1);
  let tamanhoDaLista = listaDeNumerosSorteados.length;

  if (tamanhoDaLista === maxnumero)
    listaDeNumerosSorteados = [];

  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  }

  listaDeNumerosSorteados.push(numeroEscolhido);
  return numeroEscolhido;
}

function limparCampo() {
  document.querySelector("input").value = "";
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}

function exibirMensagemInicial() {
  exibirTextoNaTela("h1", t("titulo"));
  exibirTextoNaTela(
    "p",
    t("escolhaNumero", {
      limite: maxnumero,
    })
  );

  document.getElementById("btn-chutar").innerText = t("btnChutar");
  document.getElementById("reiniciar").innerText = t("btnNovoJogo");
}
// Função para alternar a visibilidade do modal de créditos
function toggleModalCreditos() {
  const modal = document.getElementById("modal-creditos");

  if (modal.style.display === "flex") {
    modal.style.display = "none";
  } else {
    modal.style.display = "flex";
  }
}

// Fechar modal ao clicar fora do conteúdo
window.onclick = function (event) {
  const modal = document.getElementById("modal-creditos");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
