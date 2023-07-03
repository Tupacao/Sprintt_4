
function getInformacoes() {
  return JSON.parse(localStorage.getItem('dadosArea')) || [];
}

function exibirInformacoes() {
  var informacao = getInformacoes();
  var tabela = document.getElementById("tabelaCRUD");

  tabela.getElementsByTagName("tbody")[0].innerHTML = " ";

  for (var i = 0; i < dadosArea.length; i++) {
    var informacao = dadosArea[i];

    var linha = document.createElement('tr');
    var colunaArea = document.createElement('td');
    var colunaCapacidade = document.createElement('td');
    var colunaAcoes = document.createElement('td')
    var botaoExcluir = document.createElement('button');
    var botaoEditar = document.createElement('button');
    

    colunaArea.textContent = dadosArea.NomeÁrea;
    colunaArea.textContent = dadosArea.CapacidadePacientes;

    botaoEditar.textContent = "Editar";
    botaoEditar.addEventListener(
      "click"(function (index) {
        return function () {
          editarInformacao(index);
        };
      })(i)
    );

    botaoExcluir.textContent = "Excluir";
    botaoExcluir.addEventListener(
      "click",
      (function (index) {
        return function () {
          excluirInformacao(index);
        };
      })(i)
    );
    
    colunaAcoes.appendChild(botaoEditar);
    colunaAcoes.appendChild(botaoExcluir);
    
    linha.appendChild(colunaArea);
    linha.appendChild(colunaCapacidade);

    tabela.getElementsByTagName('tbody')[0].appendChild(linha);

  }
}

function editarInformacao(index) {
  var dadosArea = getInformacoes();

  var informacao = dadosArea[index];

  document.getElementById('NomeArea').value = dadosArea.NomeÁrea;
  document.getElementById('Cap').value = dadosArea.CapacidadePacientes;

  dadosArea.splice(index, 1);
  localStorage.setItem('dadosArea', JSON.stringify(dadosArea));

  editarInformacao();
}

function excluirInformacao(index){
  var informacao = getInformacoes();

  dadosArea.splice(index, 1);
  localStorage.setItem('dadosArea', JSON.stringify(dadosArea));

  excluirInformacao();
}
excluirInformacao();
