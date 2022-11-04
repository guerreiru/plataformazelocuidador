export const validateCNS = (cns) => {
  if (!cns) {
    return true;
  }

  var validateSize = cns.length === 15;
  var validateFirstNumber = ['1', '2', '7', '8', '9'].includes(cns[0]);

  if (validateSize && validateFirstNumber) {
    //CNS Iniciados em 7, 8 ou 9
    if (['7', '8', '9'].includes(cns[0])) {
      var soma = cns
        .split('')
        .reduce((total, value, index) => total + value * (15 - index), 0);
      return soma % 11 === 0;
    } else {
      //CNS Iniciados em 1, 2
      var pis = cns.substring(0, 11);
      var soma = pis
        .split('')
        .reduce((total, value, index) => total + value * (15 - index), 0);

      var resto = soma % 11;
      var dv = resto === 0 ? 0 : 11 - resto;

      var result =
        dv === 10 ? `${pis}001${11 - ((soma + 2) % 11)}` : `${pis}000${dv}`;
      return result === cns;
    }
  }

  return false;
};
