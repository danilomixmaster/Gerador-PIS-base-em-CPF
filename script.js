function formatCPF(input) {
    if (input.value.length >= 14) return; // não permitir mais de 14 caracteres

    let cpf = input.value.replace(/\D+/g, ''); // remove todos os caracteres não numéricos
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); // adicione formatação
    input.value = cpf;

    // Atualize a posição do cursor
    let cursorPosition = input.selectionStart;
    input.setSelectionRange(cursorPosition, cursorPosition);
  }

  function validarCPF(CPF) {
    if (CPF === "00000000000" || CPF.length!== 11) return false;

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

  function validarPIS(PIS) {
    const multiplicadorBase = "3298765432";
    let total = 0;
    const numeroPIS = PIS.replace(/\D/g, '');

    if (numeroPIS.length!== 11 || numeroPIS.match(/(\d)\1{10}/)) {
      return false;
    }

    for (let i = 0; i < 10; i++) {
      total += parseInt(numeroPIS[i]) * parseInt(multiplicadorBase[i]);
    }

    let resto = 11 - (total % 11);
    resto = resto === 10 || resto === 11? 0 : resto;
    return resto === parseInt(numeroPIS[10]);
  }

  function gerarPIS() {
    document.getElementById("resultado").innerHTML = ""; // Limpar o PIS gerado
    document.getElementById("error-message").innerHTML = ""; // Limpar a mensagem de erro
    const CPF = document.getElementById("CPF").value.replace(/\D+/g, ''); // remove formatting
    if (!validarCPF(CPF)) {
      document.getElementById("error-message").innerHTML = "CPF inválido!";
      return;
    }

    let PIS = "8" + CPF.substring(0, 9);
    for (let i = 0; i < 10; i++) {
      if (validarPIS(PIS + i)) {
        document.getElementById("resultado").innerHTML = "PIS gerado: " + PIS + i;
        return;
      }
    }
    document.getElementById("resultado").innerHTML = "Não foi possível gerar um PIS válido.";
  }
  document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("CPF").focus();
  });