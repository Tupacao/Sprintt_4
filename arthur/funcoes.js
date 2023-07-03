
/* Definiçaõ das váriavéis da tela Financias*/

// Supondo que o array 'informacoes' esteja armazenado no Local Storage com a chave 'dados'
var informacoes = parseFloat(localStorage.getItem('informacoes'));

let salario_enfermeiros = 0;
let salario_tecnico = 0;
let contador_enfermeiro = 0;
let contador_tecnico = 0;
let soma_gastos_enfermeiros = 0;
let soma_gastos_tecnicos = 0;


function getInformacoes() {
  return JSON.parse(localStorage.getItem('informacoes')) || [];
}

var informacoes = getInformacoes();


for(let i = 0; i < informacoes.length; i++){
  let informacao = informacoes[i];

  if(informacao.cargo === 'tecnico'){  
    salario_tecnico+= parseFloat(informacao.salario);
    contador_tecnico++;
    soma_gastos_tecnicos += parseFloat(informacao.total);
  }
  else{
    salario_enfermeiros+= parseFloat(informacao.salario);
    contador_enfermeiro++;
    soma_gastos_enfermeiros += parseFloat(informacao.total);
  }
  
}

/*  Cálculos que ocorreram na tela de financias */

const media_sal_enfermeiros = salario_enfermeiros / contador_enfermeiro;
const media_sal_tecnico = salario_tecnico / contador_tecnico;
const gasto_total = soma_gastos_enfermeiros + soma_gastos_tecnicos;



function InserirDadosCabeca() {
  
  let dado1 = document.querySelector('span.mediaenfermeiros');;
  let dado2 = document.querySelector('span.mediatecnicos');
  let dado3 = document.querySelector('span.nenfermeiros');
  let dado4 = document.querySelector('span.ntecnico');
  let dado5 = document.querySelector('span.ngastosenfermeiros');
  let dado6 = document.querySelector('span.ngastostecnico');
  let dado7 = document.querySelector('span.gastostotais');

  dado1.innerHTML = `R$${media_sal_enfermeiros},00`
  dado2.innerHTML = `R$${media_sal_tecnico},00`
  dado3.innerHTML = `R$${salario_enfermeiros},00`
  dado4.innerHTML = `R$${salario_tecnico},00`
  dado5.innerHTML = `R$${soma_gastos_enfermeiros},00`
  dado6.innerHTML = `R$${soma_gastos_tecnicos},00`
  dado7.innerHTML = `R$${gasto_total},00`

  localStorage.setItem('media_enfermeiro', media_sal_enfermeiros.toString());
  localStorage.setItem('media_tecnico', media_sal_tecnico.toString());

}
