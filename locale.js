const traducoes = {
    'pt-BR': {
        titulo: 'Jogo do número secreto',
        escolhaNumero: 'Escolha um número entre 1 e {limite}',
        acertou: 'Acertou!',
        tentativas: 'Você descobriu o número secreto em {tentativas} {palavraTentativas}!',
        numeroMaior: 'O número secreto é maior!',
        numeroMenor: 'O número secreto é menor!',
        btnChutar: 'Chutar',
        btnNovoJogo: 'Novo jogo'
    },
    'en-US': {
        titulo: 'Secret Number Game',
        escolhaNumero: 'Pick a number between 1 and {limite}',
        acertou: 'You got it!',
        tentativas: 'You found the secret number in {tentativas} {palavraTentativas}!',
        numeroMaior: 'The secret number is higher!',
        numeroMenor: 'The secret number is lower!',
        btnChutar: 'Guess',
        btnNovoJogo: 'New game'
    }
};

var idiomaAtual = localStorage.getItem('idioma') || 'pt-BR';

document.addEventListener("DOMContentLoaded", () => {
    const selectIdioma = document.getElementById('select-idioma');
    if (selectIdioma) selectIdioma.value = idiomaAtual;
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
    localStorage.setItem('idioma', novoIdioma);

    if (typeof exibirMensagemInicial === 'function') {
        exibirMensagemInicial();
    }
}
