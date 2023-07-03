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

    nome.textContent = paciente.Nome;
    area.textContent = paciente.ÁreaHospital;
    necessidade.textContent = paciente.NecessidadeCuidados;

    linha.appendChild(nome);
    linha.appendChild(area);
    linha.appendChild(necessidade);

    tabela.getElementsByTagName("tbody")[0].appendChild(linha);
  }
}

exibirDados();

function filtro() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("filtro");
  filter = input.value.toUpperCase();
  table = document.getElementById("tabela");
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
