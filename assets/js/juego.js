/* 2C = Two of Clubs */
/* 2D = Two of Diamonds */
/* 2H = Two of Hearts */
/* 2S = Two of Spades */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputadora = 0;

//Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
//const smallJugador = document.querySelector('#smallJugador');
const smalls = document.querySelectorAll('small')
const divCartasJugador = document.querySelector('#jugador-cartas')
const divCartasComputadora = document.querySelector('#computadora-cartas')


//esta funcion crea una nueva baraja
const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);
        }
    }
    //console.log(deck);
    deck = _.shuffle(deck);
    return deck;
}
crearDeck();

//Esta funcion me permite pedir una carta

const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay mas cartas en el deck';
    }
    const carta = deck.pop();
    return carta;

}





//pedirCarta();
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 : valor * 1;
} //Para resumir (ternario)
/*     let puntos = 0;
    if (isNaN(valor)) {
        // console.log('No es un numero');
        puntos = (valor === 'A') ? 11 : 10;
    } else {
        // console.log('Es un número');
        puntos = valor * 1; //lo transformo en number
 
    }
    console.log({ puntos, valor });
} */

//  const valor = valorCarta('3D');

//turno de la computadora

const turnoComputadora = (puntosMinimos) => {

    do {
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        console.log(carta);
        console.log(puntosComputadora);
        smalls[1].innerText = puntosComputadora;

        const imgCarta = document.createElement('img');
        console.log({ carta });
        console.log('assets/cartas/${carta}.png');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta')
        divCartasComputadora.append(imgCarta);

        if (puntosMinimos > 21) {
            break;
        }


    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21))
    setTimeout(() => {
        if (puntosComputadora > 21) {
            alert('Ganaste!!');
        }
        else if (puntosMinimos < puntosComputadora) {
            alert('Perdiste :(');
        }
        else if (puntosMinimos === puntosComputadora) {
            alert('Nadie gano');
        }
    }, 100);
}


//Eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    console.log(carta);
    console.log(puntosJugador);
    smalls[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    console.log({ carta });
    console.log('assets/cartas/${carta}.png');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta')
    divCartasJugador.append(imgCarta);
    if (puntosJugador > 21) {
        console.warn('Lo siento mucho perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
        setTimeout(() => { alert('Perdiste :(') }, 100);
    }
    else if (puntosJugador === 21) {
        console.warn('21, genial!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }

})

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);

})

btnNuevo.addEventListener('click',()=> {
    deck = []
    deck=crearDeck();

    puntosJugador=0;
    puntosComputadora=0;

    smalls[0].innerText = 0;
    smalls[1].innerText = 0;

    divCartasComputadora.innerHTML='';
    divCartasJugador.innerHTML='';
    btnPedir.disabled= false;
    btnDetener.disabled=false
})


