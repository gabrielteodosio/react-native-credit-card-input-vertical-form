export const removeNonNumber = (string = "") => string.replace(/[^\d]/g, "");
export const removeLeadingSpaces = (string = "") => string.replace(/^\s+/g, "");

export const isValidCpf = (value) => /^((\d{3})[.]?(\d{3})[.]?(\d{3})[-]?(\d{2}))*$/i.test(value) && _validateCpf(value);

function _validateCpf (cpf) {
  cpf = cpf.replace(/[^\d]+/g, '')

  if (
    cpf.length !== 11 ||
    cpf === '00000000000' ||
    cpf === '11111111111' ||
    cpf === '22222222222' ||
    cpf === '33333333333' ||
    cpf === '44444444444' ||
    cpf === '55555555555' ||
    cpf === '66666666666' ||
    cpf === '77777777777' ||
    cpf === '88888888888' ||
    cpf === '99999999999'
  ) {
    return false
  }

  let add = 0
  for (let i = 0; i < 9; i++) {
    add += parseInt(cpf.charAt(i)) * (10 - i)
  }

  let rev = 11 - (add % 11)
  if (rev === 10 || rev === 11) { rev = 0 }
  if (rev !== parseInt(cpf.charAt(9))) { return false }

  add = 0
  for (let i = 0; i < 10; i++) {
    add += parseInt(cpf.charAt(i)) * (11 - i)
  }

  rev = 11 - (add % 11)
  if (rev === 10 || rev === 11) { rev = 0 }
  if (rev !== parseInt(cpf.charAt(10))) { return false }

  return true
}
