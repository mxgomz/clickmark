const horarios = ["09h","10h","11h","12h","15h","16h","17h","18h"];
const indisponiveis = ["12h","17h"];

const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close");
const horariosDiv = document.getElementById("horarios");

document.querySelectorAll(".dias .disponivel").forEach(dia => {
  dia.addEventListener("click", () => {
    horariosDiv.innerHTML = "";
    horarios.forEach(h => {
      const btn = document.createElement("div");
      btn.textContent = h;
      btn.classList.add("horario");
      if (indisponiveis.includes(h)) {
        btn.classList.add("indisponivel");
      } else {
        btn.addEventListener("click", () => {
          alert(`Horário ${h} solicitado para o dia ${dia.textContent}`);
          modal.style.display = "none";
        });
      }
      horariosDiv.appendChild(btn);
    });
    modal.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });
