const usuarios = [
  { cpf: "123.456.789-00", nome: "João Silva", nascimento: "1998-02-10", senha: "" },
  { cpf: "987.654.321-00", nome: "Maria Souza", nascimento: "2001-07-22", senha: "" },
  { cpf: "555.333.111-99", nome: "Carlos Oliveira", nascimento: "1995-12-01", senha: "" },
  { cpf: "111.222.333-44", nome: "Fernanda Lima", nascimento: "2000-05-30", senha: "" },
];

function onlyDigits(str = "") { return String(str).replace(/\D/g, ""); }
function formatCPF(cpf) {
  const d = onlyDigits(cpf).slice(0,11).padEnd(11, "0");
  return d.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}
function displaySenha(s) { return s ? "••••••••" : "<i>Não definida</i>"; }

function carregarTabela(lista = usuarios) {
  const tbody = document.getElementById("tabelaUsuarios");
  tbody.innerHTML = "";

  if (!lista.length) {
    tbody.innerHTML = `<tr><td colspan="5" style="padding:18px; color:#666">Nenhum registro encontrado.</td></tr>`;
    return;
  }

  lista.forEach(user => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${formatCPF(user.cpf)}</td>
      <td>${user.nome}</td>
      <td>${new Date(user.nascimento).toLocaleDateString('pt-BR')}</td>
      <td>${displaySenha(user.senha)}</td>
      <td><button class="senha-btn" data-cpf="${user.cpf}">Inserir Senha</button></td>
    `;
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll('.senha-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cpf = e.currentTarget.dataset.cpf;
      abrirModalSenha(cpf);
    });
  });
}

function filtrarPorCPF() {
  const termoRaw = document.getElementById('buscaCPF').value || "";
  const termo = onlyDigits(termoRaw);
  if (!termo) { carregarTabela(usuarios); return; }

  const filtrados = usuarios.filter(u => onlyDigits(u.cpf).includes(termo));
  carregarTabela(filtrados);
}

function atualizarLista() {
  alert('Lista atualizada (simulada).');
  carregarTabela(usuarios);
}

const modal = document.getElementById('senhaModal');
const modalUser = document.getElementById('modalUser');
const modalPassword = document.getElementById('modalPassword');
const modalSave = document.getElementById('modalSave');
const modalCancel = document.getElementById('modalCancel');

let modalCpfAtivo = null;

function abrirModalSenha(cpf) {
  modalCpfAtivo = cpf;
  const user = usuarios.find(u => onlyDigits(u.cpf) === onlyDigits(cpf));
  modalUser.textContent = `${user.nome} — ${formatCPF(user.cpf)}`;
  modalPassword.value = user.senha || "";
  modal.setAttribute('aria-hidden', 'false');
  modalPassword.focus();
}

function fecharModal() {
  modalCpfAtivo = null;
  modal.setAttribute('aria-hidden', 'true');
  modalPassword.value = "";
}

modalSave.addEventListener('click', () => {
  const novaSenha = modalPassword.value.trim();
  if (!novaSenha) {
    if (!confirm('Senha vazia — deseja realmente salvar em branco?')) return;
  }
  const user = usuarios.find(u => onlyDigits(u.cpf) === onlyDigits(modalCpfAtivo));
  if (user) {
    user.senha = novaSenha;
    carregarTabela(usuarios);
    alert(`Senha definida para ${user.nome}`);
  }
  fecharModal();
});

modalCancel.addEventListener('click', fecharModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) fecharModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') fecharModal();
});

document.getElementById('buscaCPF').addEventListener('input', filtrarPorCPF);

window.addEventListener('load', () => carregarTabela(usuarios));
