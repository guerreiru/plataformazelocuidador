export const validateCPF = (cpf) => {
  if (!cpf) {
    return false;
  }

  cpf = cpf.replace(/\D/g, '');
  if (cpf.toString().length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }
  var result = true;
  [9, 10].forEach(function (j) {
    var soma = 0,
      r;
    cpf
      .split(/(?=)/)
      .splice(0, j)
      .forEach(function (e, i) {
        soma += parseInt(e, 10) * (j + 2 - (i + 1));
      });
    r = soma % 11;
    r = r < 2 ? 0 : 11 - r;
    if (r.toString() !== cpf.substring(j, j + 1)) {
      result = false;
    }
  });
  return result;
};

export const validateEmail = (email) => {
  // eslint-disable-next-line no-useless-escape
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
};
