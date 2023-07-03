
/* Definiçaõ das váriavéis da tela Financias*/

const informacoes2 = JSON.parse(localStorage.getItem('dadosArea'));
const media1 = JSON.parse(localStorage.getItem('media_enfermeiro'));
const media2 = JSON.parse(localStorage.getItem('media_tecnico'));

let enfermeiros = 0;
let tecnicos = 0;

for (let i = 0; i < informacoes2.length; i++){
  let infos = informacoes2[i];
  let tratamento1, tratamento2, tratamento3;

  tratamento1 = parseFloat(infos.capacidade) * 0.1;
  tratamento2 = tratamento1 * 0.2;
  tratamento3 = tratamento1 * 0.05;

  enfermeiros += Math.round(tratamento2);
  tecnicos += Math.round(tratamento3);
}

const soma_gastos_total = (enfermeiros*parseFloat(media1)) + (tecnicos*parseFloat(media2));
let somaaa = soma_gastos_total + 25000;

function Contratar () {

  let insere1 = document.querySelector('span.ncontratar-enfermeiro');
  let insere2 = document.querySelector('span.ncontratar-tecnico');
  let insere3 = document.querySelector('span.gastotal');
  
  insere1.innerHTML = enfermeiros;
  insere2.innerHTML = tecnicos;
  insere3.innerHTML = soma_gastos_total;
}