const areas = JSON.parse(localStorage.getItem("dadosArea"));

function Areas() {
  let str = `<option value="ruim">Áreas</option>`;

  for (let i = 0; i < areas.length; i++) {
    let areass = areas[i];

    str += `<option value="opcao${i + 1}">${areass.area}</option>`;
  }

  document.querySelector("#area").innerHTML = str;
}

const buttonElement = document.querySelector("#enviar");

buttonElement.addEventListener("click", function () {
  let dado = document.querySelector("#area option:checked").value;
  let dado2 = document.querySelector("#fugulin option:checked").value;
  let dado3 = document.querySelector("#PN").value;

  if (dado !== "ruim" && dado2 !== "errado" && dado3 !== "") {
    const nomeInput = document.querySelector("#PN");
    const areaSelect = document.querySelector("#area");
    const necessidadeSelect = document.querySelector("#fugulin");

    const nome = nomeInput.value;
    const area = areaSelect.options[areaSelect.selectedIndex].text;
    const necessidade =
      necessidadeSelect.options[necessidadeSelect.selectedIndex].text;

    const pacienteData = {
      Nome: nome,
      ÁreaHospital: area,
      NecessidadeCuidados: necessidade,
    };

    const data = localStorage.getItem("dadosPacientes");
    let dadosPacientes = [];

    if (data) {
      dadosPacientes = JSON.parse(data);
    }

    dadosPacientes.push(pacienteData);

    localStorage.setItem("dadosPacientes", JSON.stringify(dadosPacientes));

    alert("Dados salvos com sucesso");

    nomeInput.value = "";
    areaSelect.value = "opcao1";
    necessidadeSelect.selectedIndex = 0;
  } else {
    alert("Nome, área ou nescessidade não selecionada");
  }
});

function exibirDados() {
  var data = localStorage.getItem("dadosPacientes");
  var dadosPacientes = JSON.parse(data);
  var tabela = document.getElementById("tabela");

  for (let i = 0; i < dadosPacientes.length; i++) {
    var paciente = dadosPacientes[i];

    var linha = document.createElement("tr");
    var nome = document.createElement("td");
    var area = document.createElement("td");
    var necessidade = document.createElement("td");
    var colunaAcoes = document.createElement("td");
    var botaoEditar = document.createElement("button");
    var botaoExcluir = document.createElement("button");

    nome.textContent = paciente.Nome;
    area.textContent = paciente.ÁreaHospital;
    necessidade.textContent = paciente.NecessidadeCuidados;

    botaoEditar.textContent = "Editar";
    botaoEditar.addEventListener(
      "click",
      (function (index) {
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

    linha.appendChild(nome);
    linha.appendChild(area);
    linha.appendChild(necessidade);
    linha.appendChild(colunaAcoes);

    tabela.getElementsByTagName("tbody")[0].appendChild(linha);
  }
}

function excluirInformacao(index) {
  var data = localStorage.getItem("dadosPacientes");
  var dadosPacientes = JSON.parse(data);

  dadosPacientes.splice(index, 1);

  localStorage.setItem("dadosPacientes", JSON.stringify(dadosPacientes));

  var tabela = document.getElementById("tabela");
  tabela.getElementsByTagName("tbody")[0].innerHTML = "";

  exibirDados();
}
function editarInformacao(index) {
  var data = localStorage.getItem("dadosPacientes");
  var dadosPacientes = JSON.parse(data);

  var paciente = dadosPacientes[index];

  document.getElementById("PN").value = paciente.Nome;
  document.getElementById("area").value = paciente.ÁreaHospital;
  document.getElementById("fugulin").value = paciente.NecessidadeCuidados;
  
  dadosPacientes.splice(index, 1);
  localStorage.setItem("dadosPacientes", JSON.stringify(dadosPacientes));
  
  exibirDados();
}
exibirDados();
