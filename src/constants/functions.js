function getFreightTerm(monthIndex) {
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

  return months[monthIndex]
}

function dateToBrDate(date) {
  let dateObj = new Date(date)
  dateObj.toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).replace(/\//g, '-')

  const year = dateObj.getFullYear() < 10 ? "0" + dateObj.getFullYear() : dateObj.getFullYear()
  const month = dateObj.getMonth() < 10 ? "0" + (dateObj.getMonth() + 1) : dateObj.getMonth() + 1
  const day = dateObj.getDate() < 10 ? "0" + dateObj.getDate() : dateObj.getDate()

  return day + "/" + month + "/" + year
}

/** VALIDATION INPUTS **/
function emailValidation(e, data) {
  let dataInfos = data

  dataInfos["email"] = e.target.value;
  let emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRex.test(e.target.value)) {
    dataInfos["emailState"] = "has-success";
  } else {
    dataInfos["emailState"] = "has-danger";
  }

  return dataInfos
}

function nameValidation(e, data) {
  let dataInfos = data
  dataInfos["name"] = e.target.value;
  if (e.target.value.length >= 3) {
    dataInfos["nameState"] = "has-success";
  } else {
    dataInfos["nameState"] = "has-danger";
  }
  return dataInfos
}

function passwordValidation(e, data) {
  let dataInfos = data
  dataInfos["password"] = e.target.value;
  if (e.target.value.length >= 8) {
    dataInfos["passwordState"] = "has-success";
    if (e.target.value === dataInfos.confirmPassword)
      dataInfos["confirmPasswordState"] = "has-success"
    else if (e.target.value !== dataInfos.confirmPassword && dataInfos.confirmPassword.length >= 5)
      dataInfos["confirmPasswordState"] = "has-danger"
  } else {
    dataInfos["passwordState"] = "has-danger";
  }
  return dataInfos
}

function confirmPasswordValidation(e, data) {
  let dataInfos = data
  dataInfos["confirmPassword"] = e.target.value;
  if (e.target.value === dataInfos.password && e.target.value.length >= 8) {
    dataInfos["confirmPasswordState"] = "has-success";
  } else {
    dataInfos["confirmPasswordState"] = "has-danger";
  }
  return dataInfos
}

function phoneValidation(e, data) {
  let dataInfos = data
  dataInfos["phone"] = mTel(e.target.value)

  if (dataInfos.phone.length === 14) {
    dataInfos["phoneState"] = "has-success";
  } else {
    dataInfos["phoneState"] = "has-danger";
  }

  return dataInfos
}

function cpfValidation(e, data) {
  let dataInfos = data
  dataInfos["cpf"] = mCpf(e.target.value)

  if (dataInfos.cpf.length === 14) {
    dataInfos["cpfState"] = "has-success";
  } else {
    dataInfos["cpfState"] = "has-danger";
  }

  return dataInfos
}

function streetValidation(e, data) {
  let dataInfos = data
  dataInfos["street"] = e.target.value;

  if (e.target.value.length >= 3) {
    dataInfos["streetState"] = "has-success";
  } else {
    dataInfos["streetState"] = "has-danger";
  }

  return dataInfos
}

function neighborhoodValidation(e, data) {
  let dataInfos = data
  dataInfos["neighborhood"] = e.target.value;

  if (e.target.value.length >= 3) {
    dataInfos["neighborhoodState"] = "has-success";
  } else {
    dataInfos["neighborhoodState"] = "has-danger";
  }

  return dataInfos
}

function numberValidation(e, data) {
  let dataInfos = data
  dataInfos["number"] = e.target.value;

  if (e.target.value.length !== 0) {
    dataInfos["numberState"] = "has-success";
  } else {
    dataInfos["numberState"] = "has-danger";
  }

  return dataInfos
}

function cityValidation(e, data) {
  let dataInfos = data
  dataInfos["city"] = e.target.value;

  if (e.target.value.length >= 3) {
    dataInfos["cityState"] = "has-success";
  } else {
    dataInfos["cityState"] = "has-danger";
  }

  return dataInfos
}

function stateValidation(e, data) {
  let dataInfos = data
  dataInfos["state"] = e.target.value;

  if (e.target.value.length >= 2) {
    dataInfos["stateState"] = "has-success";
  } else {
    dataInfos["stateState"] = "has-danger";
  }

  return dataInfos
}

function zipcodeValidation(e, data) {
  let dataInfos = data
  dataInfos["zipcode"] = mZipcode(e.target.value);

  if (e.target.value.length === 9) {
    dataInfos["zipcodeState"] = "has-success";
  } else {
    dataInfos["zipcodeState"] = "has-danger";
  }

  return dataInfos
}

function complementValidation(e, data) {
  let dataInfos = data
  dataInfos["complement"] = e.target.value;
  dataInfos["complementState"] = "has-success";

  return dataInfos
}

function dateOfBirthValidation(e, data) {
  let dataInfos = data
  dataInfos["dateOfBirth"] = e.target.value;

  if (dataInfos.dateOfBirth.length === 10)
    dataInfos["dateOfBirthState"] = "has-success";
  else
    dataInfos["dateOfBirthState"] = "has-danger";

  return dataInfos
}

function cardNumberValidation(e, data) {
  let dataInfos = data
  dataInfos["number"] = mCardNumber(e.target.value)

  if (dataInfos.number.length === 19)
    dataInfos["numberState"] = "has-success"
  else
    dataInfos["numberState"] = "has-danger"

  return dataInfos
}

function cardNameValidation(e, data) {
  let dataInfos = data
  dataInfos["name"] = e.target.value.toUpperCase()

  if (dataInfos.name.length >= 3)
    dataInfos["nameState"] = "has-success"
  else
    dataInfos["nameState"] = "has-danger"

  return dataInfos
}

function cardDateValidation(e, data) {
  let dataInfos = data
  dataInfos["date"] = mDateMY(e.target.value, dataInfos.date)

  if (dataInfos.date.length === 5 || dataInfos.date.length === 7)
    dataInfos["dateState"] = "has-success"
  else
    dataInfos["dateState"] = "has-danger"

  return dataInfos
}

function cardCodValidation(e, data) {
  let dataInfos = data
  dataInfos["cod"] = e.target.value

  if (dataInfos.cod.length === 3)
    dataInfos["codState"] = "has-success"
  else
    dataInfos["codState"] = "has-danger"

  return dataInfos
}

/* REGEX FOR VALIDATION */
function mTel(tel) {
  tel = tel.replace(/\D/g, "")
  tel = tel.replace(/^(\d)/, "($1")
  tel = tel.replace(/(.{3})(\d)/, "$1)$2")
  if (tel.length === 9) {
    tel = tel.replace(/(.{1})$/, "-$1")
  } else if (tel.length === 10) {
    tel = tel.replace(/(.{2})$/, "-$1")
  } else if (tel.length === 11) {
    tel = tel.replace(/(.{3})$/, "-$1")
  } else if (tel.length === 12) {
    tel = tel.replace(/(.{4})$/, "-$1")
  } else if (tel.length > 12) {
    tel = tel.replace(/(.{4})$/, "-$1")
  }
  return tel;
}

function mCpf(cpf) {
  cpf = cpf.replace(/\D/g, "")
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
  return cpf
}

function mZipcode(cep) {
  cep = cep.replace(/\D/g, "")
  cep = cep.replace(/^(\d{5})(\d)/, "$1-$2")
  cep = cep.replace(/\.(\d{3})(\d)/, "$1-$2")
  return cep
}

function mCardNumber(number) {
  var v = number.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  var matches = v.match(/\d{4,16}/g);
  var match = matches ? matches[0] : ""
  var parts = []

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4))
  }

  if (parts.length) {
    return parts.join(' ')
  } else {
    return number
  }
}

function mDateMY(currentDate, oldDate) {
  if (currentDate.length === 0) {
    return currentDate
  }
  if (currentDate.length === 1) {
    return currentDate
  }
  else if (currentDate.length === 2) {
    return currentDate
  }
  else if (currentDate.length === 3 && oldDate.length === 2) {
    return oldDate + "/" + currentDate.substring(currentDate.length - 1, currentDate.length)
  }
  else if (currentDate.length === 3 && oldDate.length === 4) {
    return currentDate.substring(0, 2)
  }
  else if (!currentDate.includes("/"))
    return oldDate

  return currentDate
}

const inputValidation = {
  emailValidation,
  nameValidation,
  passwordValidation,
  confirmPasswordValidation,
  phoneValidation,
  cpfValidation,
  streetValidation,
  neighborhoodValidation,
  numberValidation,
  cityValidation,
  stateValidation,
  zipcodeValidation,
  complementValidation,
  dateOfBirthValidation,
  cardNumberValidation,
  cardNameValidation,
  cardDateValidation,
  cardCodValidation
}


/** VALIDATION INPUTS **/
export {
  getFreightTerm,
  dateToBrDate,
  inputValidation
}