
//Selecionado a div com id cardboard que recebarar todas as imagens das cartas.
const cardBoard = document.querySelector("#cardboard");

//Armazendo os nome das imagens para mostrar nas cartas.
const images = [
    'angular.svg',
    'aurelia.svg',
    'backbone.svg',
    'ember.svg',
    'react.svg',
    'vue.svg'
];


let cardHTML = ''; 

/** Usando o forEach para gerar uma div para cada frente e verso de cartas, 
    O front-face é a parte que fica escondida e o back-face a imagem que esconde o resultado.
    A quantidade de cartas no game de depende de quantas imagens que voce tem no array images.
    CardHTMl guarda o conjunto de cartas(frente e trás) inseridas pelo images.forEach.
*/
images.forEach(img => {
    cardHTML += `
        <div class="memory-card" data-card="${img}">
            <img class="front-face" src="img/${img}">
            <img class="back-face" src="img/js-badge.svg">
        </div>
    `;
});


/**Utilizando o innerHTML para injetar 
Temos cardHTML + cardHTMl para ter um par de imagem para cada imagem.
*/

cardBoard.innerHTML = cardHTML + cardHTML;


/** Aqui termina o codigo de renderização dos elementos na pagina. */



const cards =  document.querySelectorAll('.memory-card');
let firstCard, secondCard;
let lockCard =  false; 


/** função adiciona na class=".memory-card" +flip para marcar se ela foi virada ou não; 
    Há um evento de click ao clicar na carta, que acionar a função flipcard();
    Ao clicar na primeira carta, firstCard adicionar o flip na class, ela fica em posição mostrando a imagem escondida, a secondCard a mesma coisa
    No final,  chama a função checkForMatch que verifica pelo se os nomes dos arquivos são iguias. 
    LockCard fica true para manter a carta virada com contéudo. 
*/
function flipCard() {

    if(lockCard) return false;
    this.classList.add('flip');


    if(!firstCard) {
        firstCard = this; 

        return false; 
    }

    secondCard = this;

    checkForMatch();
}

//Função que verificar se existe uma igual entre os nomes dos arquivos. 
// Se o match acontecer pela comparação abaixo, ela chama a função disableCards  que mantém ela virada. 
//Senão, chamada a função resetCards que resetar os valores da FirstCard, SecondCard para null e o lockcard para false
function checkForMatch() {
    let isMatch = firstCard.dataset.card == secondCard.dataset.card;

    if (!isMatch) {
        disableCards()
    } else {
        resetCards();
    }
}

//Função que rondomiza a ordem em o forEach injetar as div no HTML 
//Utilizando a função matemática floor que sempre arredonda para baixo e retorna o maior inteiro menor ou igual a determinado número multiplicado por 12;
//Utilizando a propriedade do css order que define a ordem em que os items estão dispostos no container flex, recendo da função rand o valor entre 1 e 12;
(function shuffle(){
    cards.forEach( card => {
        let rand = Math.floor(Math.random()* 12);
        card.style.order = rand;
    } )
})()



// função disableCars que remove o .flip  da class=".memory-card.flip" quando não há um match entre as duas.
//lockcard recebe o valor true novamente.
//setTimeout serve para dar tempo de remover o flip do nome da class, caso clique muito rapido pode nao cosnegui remover sem essa função.
//resetar as variaveis firstCard, secondCard, lockCard.
function disableCards() {
    lockCard = true;
    

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetCards();

        lockCard = false; 
    }, 1000);
}

//Resete dos atribuitos das cartas
function resetCards() {
    [firstCard, secondCard, lockCard] = [null, null, false];
}


//Esse forEach adiciona um evento de click e na execução do da função flipcard
cards.forEach(card => card.addEventListener('click', flipCard));


//Trecho responsável por disparar um alert quando todas as cartas foram acertas.
//SetInterval fica vericando a cada 5s se todas as cartas acertadas receberam a class="memory-card flip";
//Quando a condição é alcançada, dispara um alert com mensagem. 
//windows.location.reload recarrega a pagina a clicar no 'ok' do alert.  

let flipped = document.getElementsByClassName("memory-card flip")

setInterval(function checkEndGame() {
    if(flipped.length === 12) {
        alert('Parabéns, você conseguiu !!!')
        window.location.reload();
    }
}, 5000);


function Refresh() {
    window.location.reload();
}