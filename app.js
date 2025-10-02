let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag,texto){
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
   if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }

}

exibirMensagemInicial();

function verificarChute(){
  let chute = document.querySelector('input').value;
  if (chute == numeroSecreto){
    let palavraTentativas = tentativas == 1 ? 'tentativa' : 'tentativas';
    let mensagemTentativas = `Você descobriu o número secreto em ${tentativas} ${palavraTentativas} !`;
    exibirTextoNaTela('h1','Acertou!');
    exibirTextoNaTela('p',mensagemTentativas);
    document.getElementById('reiniciar').removeAttribute('disabled');
  }
  else {
    if (chute > numeroSecreto){
      exibirTextoNaTela('p','O número secreto é menor!');
    } else{
      exibirTextoNaTela('p','O número secreto é maior!');
    }
    tentativas++;
    limparCampo();
  }
  
}

function gerarNumeroAleatorio(){
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  let quantidadeDeNumerosEscolhidos = listaDeNumerosSorteados.length;

  quantidadeDeNumerosEscolhidos == numeroLimite ? listaDeNumerosSorteados = [] : null;

  if ( listaDeNumerosSorteados.includes(numeroEscolhido)){
    return gerarNumeroAleatorio();
  }
  listaDeNumerosSorteados.push(numeroEscolhido);
  return numeroEscolhido;

}

function limparCampo(){
  chute = document.querySelector('input');
  chute.value = '';
}

function reiniciarJogo(){
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  document.getElementById('reiniciar').setAttribute('disabled',true);
}

function exibirMensagemInicial(){
  exibirTextoNaTela('h1','Jogo do número secreto');
  exibirTextoNaTela('p','Escolha um número entre 1 e '+numeroLimite);
}