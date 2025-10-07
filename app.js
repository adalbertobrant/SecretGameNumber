let listaDeNumerosSorteados = [];
let numeroLimite = parseInt(localStorage.getItem("dificuldade")) || 10;
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
  let chute = parseInt(document.querySelector("#input-numero").value);

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

    // --- Corrected, Combined Code ---

    // High score logic
    let recorde = localStorage.getItem('recordeTentativas');
    if (!recorde || tentativas < recorde) {
        localStorage.setItem('recordeTentativas', tentativas);
        exibirRecorde(); // Update the record display immediately
    }
    
    // Twitter share logic
    let mensagemTweet = `I hit the secret number in ${tentativas} attempts! Play also at #SecretNumberGame.`;
    let urlTwitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(mensagemTweet)}&url=https://github.com/adalbertobrant/secretgamenumber`;
    let shareButton = document.getElementById('share-twitter');
    shareButton.href = urlTwitter;
    shareButton.style.display = 'inline-flex';

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
  document.querySelector("#input-numero").value = "";
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);

   document.getElementById('share-twitter').style.display = 'none';
}

function exibirRecorde() {
  let recorde = localStorage.getItem("recordeTentativas");
  if (recorde) {
    let palavraTentativas =
      recorde == 1
        ? idiomaAtual === "pt-BR"
          ? "tentativa"
          : "attempt"
        : idiomaAtual === "pt-BR"
        ? "tentativas"
        : "attempts";

    // This now only targets the <span> to update just the number
    document.getElementById(
      "record"
    ).innerHTML = `${recorde} ${palavraTentativas}`;
  }
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

  // Atualizar o máximo do input
  document.getElementById("input-numero").setAttribute("max", numeroLimite);

  // Definir o valor correto no select de dificuldade
  document.getElementById("select-dificuldade").value = numeroLimite;

  exibirRecorde();
}

function mudarDificuldade(novaDificuldade) {
  numeroLimite = parseInt(novaDificuldade);
  localStorage.setItem("dificuldade", numeroLimite);

  // Reiniciar o jogo com a nova dificuldade
  listaDeNumerosSorteados = [];
  numeroSecreto = gerarNumeroAleatorio();
  tentativas = 1;

  // Atualizar a interface
  exibirMensagemInicial();
  limparCampo();
  document.getElementById("reiniciar").setAttribute("disabled", true);
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
}
// Listen for any key press on the whole page
document.addEventListener('keydown', function(event) {
  
  const restartButton = document.getElementById('reiniciar');
  if (event.key === 'Enter' && !restartButton.disabled) {
    
    reiniciarJogo();
  }
})

// --- Parallax Effect Logic ---
document.addEventListener('mousemove', function(e) {
    const background = document.getElementById('background-parallax');
    
    // Calculate movement strength (lower number = more movement)
    const moveStrength = 50; 
    
    // Get screen center coordinates
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Calculate mouse position offset from the center
    const moveX = (e.clientX - centerX) / moveStrength;
    const moveY = (e.clientY - centerY) / moveStrength;

    // Apply the transformation
    background.style.transform = `translate(${moveX}px, ${moveY}px)`;
});
