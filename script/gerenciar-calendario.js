const horariosPadrao = ["09h", "10h", "11h", "12h", "15h", "16h", "17h", "18h"];
const diasContainer = document.getElementById("dias");
const modal = document.getElementById("modal");
const diaSelecionadoSpan = document.getElementById("diaSelecionado");
const closeBtn = document.querySelector(".close");
const horariosBox = document.getElementById("horariosBox");
const listaHorarios = document.getElementById("listaHorarios");

let calendario = JSON.parse(localStorage.getItem("calendario")) || {};
let diaSelecionado = null;

for (let i = 1; i <= 30; i++) {
  const diaDiv = document.createElement("div");
  diaDiv.textContent = i;

  const status = calendario[i]?.status || "disponivel";
  diaDiv.classList.add(status);

  diaDiv.addEventListener("click", () => abrirModal(i));
  diasContainer.appendChild(diaDiv);
}

function abrirModal(dia) {
  diaSelecionado = dia;
  diaSelecionadoSpan.textContent = dia;
  horariosBox.style.display = "none";
  modal.style.display = "flex";
}

document.getElementById("btnDisponivel").addEventListener("click", () => mudarStatus("disponivel"));
document.getElementById("btnIndisponivel").addEventListener("click", () => mudarStatus("indisponivel"));
document.getElementById("btnFechado").addEventListener("click", () => mudarStatus("fechado"));
document.getElementById("btnHorarios").addEventListener("click", () => gerenciarHorarios());

function mudarStatus(novoStatus) {
  calendario[diaSelecionado] = calendario[diaSelecionado] || { horarios: {} };
  calendario[diaSelecionado].status = novoStatus;
  salvar();
  atualizarVisual();
  modal.style.display = "none";
}

function gerenciarHorarios() {
  horariosBox.style.display = "block";
  listaHorarios.innerHTML = "";

  const horarios = calendario[diaSelecionado]?.horarios || {};
  horariosPadrao.forEach(h => {
    const div = document.createElement("div");
    div.textContent = h;
    div.classList.add(horarios[h] === "ocupado" ? "ocupado" : "disponivel");
    div.addEventListener("click", () => alternarHorario(h, div));
    listaHorarios.appendChild(div);
  });
}

function alternarHorario(h, div) {
  calendario[diaSelecionado].horarios[h] =
    calendario[diaSelecionado].horarios[h] === "ocupado" ? "disponivel" : "ocupado";
  salvar();
  div.classList.toggle("ocupado");
  div.classList.toggle("disponivel");
}

function salvar() {
  localStorage.setItem("calendario", JSON.stringify(calendario));
}

function atualizarVisual() {
  document.querySelectorAll(".dias div").forEach(diaDiv => {
    const dia = diaDiv.textContent;
    const status = calendario[dia]?.status || "disponivel";
    diaDiv.className = "";
    diaDiv.classList.add(status);
  });
}

closeBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });
