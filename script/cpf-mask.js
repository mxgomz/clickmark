const cpfInput = document.getElementById('cpf');

cpfInput.addEventListener('input', (e) => {
  let v = e.target.value;
  v = v.replace(/\D/g, '').slice(0, 11);
  v = v.replace(/^(\d{3})(\d)/, '$1.$2');
  v = v.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
  v = v.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
  e.target.value = v;
});
