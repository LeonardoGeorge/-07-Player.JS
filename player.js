let musicas = [
    {titulo: 'Guitar solo', artista: 'Leonardo George', 
    src:'Músicas/Guitar.mp3', img: 'Imagens/Guitar.jpg'},
    {titulo: 'Piano', artista: 'Blue.Blue', 
    src:'Músicas/Piano.mp3', img: 'Imagens/Piano.jpg'}

]

let musica = document.querySelector('audio');
let indexMusica = 0;

let duracaoMusica = document.querySelector('.fim');
let imagem = document.querySelector('img');
let nomeMusica = document.querySelector('.descricao h2');
let noemArtista = document.querySelector('.descricao i');

renderizarMusica(indexMusica);

duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));

// Eventos
document.querySelector('.botao_play').addEventListener('click', tocarMusica);

document.querySelector('.botao_pause').addEventListener('click', pausarMusica);

musica.addEventListener('timeupdate', atualizarBarra);

musica.addEventListener('loadedmetadata', () => {
    duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
});

document.querySelector('.anterior').addEventListener('click', () => {
    indexMusica--;
    if (indexMusica < 0) {
        indexMusica = 2;
    }
    renderizarMusica(indexMusica);
});

document.querySelector('.proxima').addEventListener('click', () => {
    indexMusica++;
    if (indexMusica > 2){
        indexMusica = 0;
    }
    renderizarMusica(indexMusica);
});

// Funções
function renderizarMusica(index) {
    musica.setAttribute('src', musicas[index].src);
    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[index].titulo;
        noemArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
    });
}


function tocarMusica() {
    musica.play();
    document.querySelector('.botao_pause').style.display = 'block';
    document.querySelector('.botao_play').style.display = 'none';
}

function pausarMusica() {
    musica.pause();
    document.querySelector('.botao_pause').style.display = 'none';
    document.querySelector('.botao_play').style.display = 'block';
}

function atualizarBarra() {
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
    let tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime)); 
}

function segundosParaMinutos(segundos) {
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;
    if (campoSegundos < 10){
        campoSegundos = '0' + campoSegundos;
    }

    return campoMinutos + ':' + campoSegundos;
}

