// Função para obter as informações salvas no localStorage
function getInformacoes() {
  return JSON.parse(localStorage.getItem('informacoes')) || [];
}

// Função para exibir as informações na tabela
function exibirInformacoes() {
  var informacoes = getInformacoes();
  var tabela = document.getElementById('tabelaCRUD');

  // Limpar tabela
  tabela.getElementsByTagName('tbody')[0].innerHTML = ' ';


  for (var i = 0; i < informacoes.length; i++) {
    var informacao = informacoes[i];

    var linha = document.createElement('tr');
    var colunaNome = document.createElement('td');
    var colunaHoras = document.createElement('td');
    var colunaSalario = document.createElement('td');
    var colunaTotal = document.createElement('td');
    var colunaCargo = document.createElement('td');

    colunaNome.textContent = informacao.nome;
    colunaHoras.textContent = informacao.horas;
    colunaSalario.textContent = informacao.salario;
    colunaTotal.textContent = informacao.total;
    colunaCargo.textContent = informacao.cargo;

    linha.appendChild(colunaNome);
    linha.appendChild(colunaHoras);
    linha.appendChild(colunaSalario);
    linha.appendChild(colunaTotal);
    linha.appendChild(colunaCargo);


    tabela.getElementsByTagName('tbody')[0].appendChild(linha);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  exibirInformacoes();
});

function filtro(){
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("filtro");
  filter = input.value.toUpperCase();
  table = document.getElementById("tabelaCRUD");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td");
      for (var j = 0; j < td.length; j++) {
          var tdata = td[j];
          if (tdata) {
              txtValue = tdata.textContent || tdata.innerText;
              if (txtValue.toUpperCase().indexOf(filter) > -1) {
                  tr[i].style.display = "";
                  break;
              } else {
                  tr[i].style.display = "none";
              }
          }
      }
  }
}