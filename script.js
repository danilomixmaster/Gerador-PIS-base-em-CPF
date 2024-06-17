// Função para formatar o CPF
function formatCPF(input) {
  // Não permitir mais de 14 caracteres
  if (input.value.length >= 14) return; 

  // Remover todos os caracteres não numéricos
  let cpf = input.value.replace(/\D+/g, ''); 

  // Adicionar formatação XXX.XXX.XXX-XX
  cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); 

  // Atribuir o valor formatado ao campo de CPF
  input.value = cpf;

  // Atualizar a posição do cursor
  let cursorPosition = input.selectionStart;
  input.setSelectionRange(cursorPosition, cursorPosition);
}

// Função para validar o CPF
function validarCPF(CPF) {
  // Verificar se o CPF é igual a "00000000000" ou se o comprimento é diferente de 11 caracteres
  if (CPF === "00000000000" || CPF.length!== 11) return false;

  // Implementar a lógica de validação do CPF
  for (let j = 0; j < 2; ++j) {
    let soma = 0;
    for (let i = 0; i < 9 + j; ++i) {
      soma += parseInt(CPF[i]) * (10 + j - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto!== parseInt(CPF[9 + j])) return false;
  }
  return true;
}

// Função para validar o PIS
function validarPIS(PIS) {
  // Remover todos os caracteres não numéricos do PIS
  const multiplicadorBase = "3298765432";
  let total = 0;
  const numeroPIS = PIS.replace(/\D/g, '');

  // Verificar se o comprimento do PIS é diferente de 11 caracteres ou se é composto por 11 vezes o mesmo dígito
  if (numeroPIS.length!== 11 || numeroPIS.match(/(\d)\1{10}/)) {
    return false;
  }

  // Implementar a lógica de validação do PIS
  for (let i = 0; i < 10; i++) {
    total += parseInt(numeroPIS[i]) * parseInt(multiplicadorBase[i]);
  }

  let resto = 11 - (total % 11);
  resto = resto === 10 || resto === 11? 0 : resto;
  return resto === parseInt(numeroPIS[10]);
}

// Função para gerar o PIS
function gerarPIS() {
  // Limpar o PIS gerado
  document.getElementById("resultado").innerHTML = ""; 

  // Limpar a mensagem de erro
  document.getElementById("error-message").innerHTML = ""; 

  // Remover formatação do CPF
  const CPF = document.getElementById("CPF").value.replace(/\D+/g, ''); 

  // Verificar se o CPF é válido
  if (!validarCPF(CPF)) {
    document.getElementById("error-message").innerHTML = "CPF inválido!";
    return;
  }

  // Gerar o PIS
  let PIS = "8" + CPF.substring(0, 9);
  for (let i = 0; i < 10; i++) {
    if (validarPIS(PIS + i)) {
      document.getElementById("resultado").innerHTML = "PIS gerado: " + PIS + i;
      return;
    }
  }
  document.getElementById("resultado").innerHTML = "Não foi possível gerar um PIS válido.";
}