let nom = document.querySelector("#validationNom");
let cognoms = document.querySelector("#validationCognoms");
let dni = document.querySelector("#validationDNI");
let username = document.querySelector("#validationUsername");
let email = document.querySelector("#validationEmail");
let telefon = document.querySelector("#validationTelf");


function validateInput(input, feedbackId, validationFunction, errorMessage) {
  if (input.value.trim() === "") {
    $(input).removeClass("is-valid").addClass("is-invalid");
    $(document.querySelector(feedbackId)).html(errorMessage);
  } else {
    if (validationFunction(input.value.trim())) {
      $(input).removeClass("is-invalid").addClass("is-valid");
      $(document.querySelector(feedbackId)).html("");
    } else {
      $(input).removeClass("is-valid").addClass("is-invalid");
      $(document.querySelector(feedbackId)).html(errorMessage);
    }
  }
}

function validateNIF_NIE(value) {
  var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
  var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
  var nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
  var str = value.toString().toUpperCase();

  if (!nifRexp.test(str) && !nieRexp.test(str)) return false;

  var nie = str
    .replace(/^[X]/, '0')
    .replace(/^[Y]/, '1')
    .replace(/^[Z]/, '2');

  var letter = str.substr(-1);
  var charIndex = parseInt(nie.substr(0, 8)) % 23;

  if (validChars.charAt(charIndex) === letter) return true;

  return false;
}


function validateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  } else {
    return false;
  }
}

function validateTelefon(telefon) {
  var phoneno = /^\d{9}$/;
  if (telefon.match(phoneno)) {
    return true;
  } else {
    return false;
  }
}

function createUsername(nom, cognoms, dni) {
  let username = "";
  cognoms = cognoms.replace(" ", "")
  username += nom.slice(0, 1).toLowerCase();
  username += cognoms.slice(0, 1).toUpperCase();
  username += cognoms.slice(1, 4).toLowerCase();
  for (let n = 0; n < 8; n += 2) {
    username += dni.slice(n, n + 1).toLowerCase();
  }
  document.querySelector("#validationUsername").value = username;
}



$('#form-user-register').submit(function (e) {
  e.preventDefault();
});

$(nom).on('focusout', function () {
  validateInput(
    nom,
    "#feedbackNom",
    function (value) { return value !== ""; },
    "Aquest camp no pot estar buit"
  );
});

$(cognoms).on('focusout', function () {
  validateInput(
    cognoms,
    "#feedbackCognoms",
    function (value) { return value !== ""; },
    "Aquest camp no pot estar buit"
  );
});

$(dni).on('focusout', function () {
  validateInput(
    dni,
    "#feedbackDNI",
    function (value) { return validateNIF_NIE(value); },
    "DNI/NIE incorrecte"
  );
});

$(email).on('focusout', function () {
  validateInput(
    email,
    "#feedbackEmail",
    function (value) { return validateEmail(value); },
    "Email incorrecte"
  );
});

$(telefon).on('focusout', function () {
  validateInput(
    telefon,
    "#feedbackTelf",
    function (value) { return validateTelefon(value); },
    "Telefon incorrecte"
  );
});