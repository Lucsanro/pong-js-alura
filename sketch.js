// -------------------------------------
// Curso Lógica de programação: comece em lógica com o jogo Pong e JavaScript
// Link do curso: https://cursos.alura.com.br/course/pong-javascript
// Aluno: Lucca Rocha
// Edição final: 19/02/2023
// -------------------------------------

// variáveis da bolinha
let xBola = 300;
let yBola = 200;
let diametro = 18;
let raio = diametro / 2;

// velocidade da bolinha
let velocidadeXBola = 7;
let velocidadeYBola = 7;

// variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 80;


// variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente  = 150;
let velocidadeYRaqueteOponente;

let colidiu = false;

// variáveis do placar
let meusPontos = 0;
let pontosDoOponente = 0;
let bordaArredondada = 5;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
  trilha = loadSound("trilha.mp3");
}


function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();  
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  //multiplayerRaqueteOponente();
  verificaColisaoRaqueteOponenteBiblioteca();
  verificaColisaoMinhaRaqueteBiblioteca();
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
  circle(xBola, yBola, diametro);
}

function movimentaBolinha(){
  xBola += velocidadeXBola;
  yBola += velocidadeYBola
}

function verificaColisaoBorda(){
  //if (xBola + raio > width || xBola - raio < 0){
  //  velocidadeXBola *= -1;
  //} comentado pois irá alterar direção ao marcar ponto
  if (yBola + raio > height || yBola - raio < 0){
    velocidadeYBola *= -1;
  }
}

function mostraRaquete(x, y){
  rect(x, y, comprimentoRaquete, alturaRaquete);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 6;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 6;
  }
}

function multiplayerRaqueteOponente(){
  if (keyIsDown(87)){
    yRaqueteOponente -= 6;
  }
  if (keyIsDown(83)){
    yRaqueteOponente += 6;
  }
}


function verificaColisaoRaqueteOponenteBiblioteca(){
  colidiu = collideRectCircle(xRaqueteOponente, yRaqueteOponente, comprimentoRaquete, alturaRaquete, xBola, yBola, raio);
  if (colidiu){
    velocidadeXBola *= -1
    xBola = 580 // altera o X da bolinha para evitar ficar presa na Raquete Oponente
    raquetada.play();
  }
}

function verificaColisaoMinhaRaqueteBiblioteca(){
  colidiu = collideRectCircle(xRaquete, yRaquete, comprimentoRaquete, alturaRaquete, xBola, yBola, raio);
  if (colidiu){
    velocidadeXBola *= -1
    xBola = 20 // altera o X da bolinha para evitar ficar presa na Minha Raquete
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeYRaqueteOponente = (yBola - yRaqueteOponente - comprimentoRaquete) / 2 - 35;
  yRaqueteOponente += velocidadeYRaqueteOponente
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255,140,0));
  rect(150, 10, 40, 20, bordaArredondada);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255,140,0));
  rect(430, 10, 40, 20, bordaArredondada);
  fill(255);
  text(pontosDoOponente, 450, 26);
}

function marcaPonto(){
  if (xBola > 590){
    meusPontos += 1;
    velocidadeXBola *= -1;
    xBola = 580; // evita colidir com a raquete após ponto
    ponto.play();
  }
  if (xBola < 10){
    pontosDoOponente += 1;
    velocidadeXBola *= -1;
    xBola = 20; // evita colidir com a raquete após ponto  
    ponto.play();
  }
}


