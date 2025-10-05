const traducoes = {
  "pt-BR": {
    titulo: "Jogo do número secreto",
    escolhaNumero: "Escolha um número entre 1 e {limite}",
    acertou: "Acertou!",
    tentativas:
      "Você descobriu o número secreto em {tentativas} {palavraTentativas}!",
    numeroMaior: "O número secreto é maior!",
    numeroMenor: "O número secreto é menor!",
    btnChutar: "Chutar",
    btnNovoJogo: "Novo jogo",
    dificuldadeFacil: "🟢 Fácil (1-10)",
    dificuldadeMedio: "🟡 Médio (1-50)",
    dificuldadeDificil: "🔴 Difícil (1-100)",
  },
  "en-US": {
    titulo: "Secret Number Game",
    escolhaNumero: "Pick a number between 1 and {limite}",
    acertou: "You got it!",
    tentativas:
      "You found the secret number in {tentativas} {palavraTentativas}!",
    numeroMaior: "The secret number is higher!",
    numeroMenor: "The secret number is lower!",
    btnChutar: "Guess",
    btnNovoJogo: "New game",
    dificuldadeFacil: "🟢 Easy (1-10)",
    dificuldadeMedio: "🟡 Medium (1-50)",
    dificuldadeDificil: "🔴 Hard (1-100)",
  },
};

var idiomaAtual = localStorage.getItem("idioma") || "pt-BR";

document.addEventListener("DOMContentLoaded", () => {
  const selectIdioma = document.getElementById("select-idioma");
  if (selectIdioma) selectIdioma.value = idiomaAtual;

  // Definir a dificuldade salva no localStorage
  const dificuldadeSalva = localStorage.getItem("dificuldade") || "10";
  const selectDificuldade = document.getElementById("select-dificuldade");
  if (selectDificuldade) selectDificuldade.value = dificuldadeSalva;

  atualizarTextosDificuldade();
});

function t(chave, params = {}) {
  let texto = traducoes[idiomaAtual][chave] || chave;

  for (const key in params) {
    texto = texto.replace(`{${key}}`, params[key]);
  }
  return texto;
}

function mudarIdioma(novoIdioma) {
  idiomaAtual = novoIdioma;
  localStorage.setItem("idioma", novoIdioma);

  atualizarTextosDificuldade();

  if (typeof exibirMensagemInicial === "function") {
    exibirMensagemInicial();
  }
}

function atualizarTextosDificuldade() {
  const selectDificuldade = document.getElementById("select-dificuldade");
  if (selectDificuldade) {
    const options = selectDificuldade.options;
    if (options[0]) options[0].textContent = t("dificuldadeFacil");
    if (options[1]) options[1].textContent = t("dificuldadeMedio");
    if (options[2]) options[2].textContent = t("dificuldadeDificil");
  }
}
