const paginaInicial = document.getElementById('paginaInicial');
const tabuleiroJogo = document.getElementById('tabuleiroJogo');
const celulas = document.querySelectorAll('.celula');
const iniciarJogo = document.getElementById('iniciarJogo');
const jogador1Input = document.getElementById('jogador1');
const jogador2Input = document.getElementById('jogador2');
let jogadorAtual = 'X';
let jogoAcabou = false;
let tabuleiro = ['', '', '', '', '', '', '', '', ''];
let jogador1Nome = '';
let jogador2Nome = '';

jogador1Input.addEventListener('click', () => {
    jogador1Input.value = '';
});

jogador2Input.addEventListener('click', () => {
    jogador2Input.value = '';
});

iniciarJogo.addEventListener('click', () => {
    jogador1Nome = jogador1Input.value;
    jogador2Nome = jogador2Input.value;
    paginaInicial.style.display = 'none';
    tabuleiroJogo.style.display = 'flex';
});

function handleClick(event) {
    if (jogoAcabou) {
        return;
    }

    const celula = event.target;
    const index = celula.dataset.index;

    if (tabuleiro[index] === '') {
        tabuleiro[index] = jogadorAtual;
        celula.textContent = jogadorAtual;
        verificarVitoria();
        jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
    }
}

function verificarVitoria() {
    const combinacoesVitoria = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let combinacao of combinacoesVitoria) {
        const [a, b, c] = combinacao;
        if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            jogoAcabou = true;
            const vencedor = tabuleiro[a] === 'X' ? jogador1Nome : jogador2Nome;
            alert(`Player ${vencedor} Won! Congratulations! :)`);
            resetarJogo();
            return;
        }
    }

    if (!tabuleiro.includes('')) {
        jogoAcabou = true;
        alert('Empate!');
        resetarJogo();
    }
}

function resetarJogo() {
    jogadorAtual = 'X';
    jogoAcabou = false;
    tabuleiro = ['', '', '', '', '', '', '', '', ''];
    celulas.forEach(celula => {
        celula.textContent = '';
    });
    tabuleiroJogo.style.display = 'none';
    paginaInicial.style.display = 'flex';
}

celulas.forEach(celula => {
    celula.addEventListener('click', handleClick);
});