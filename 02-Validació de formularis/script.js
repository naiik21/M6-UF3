let validacio = [false, false, false, false, false];
let nom = document.querySelector("#nom");
let email = document.querySelector("#email");
let contrasenya = document.querySelector("#contrasenya");
let confirm_contrasenya = document.querySelector("#confirm_contrasenya");
let adreca_postal = document.querySelector("#adreca_postal");


nom.addEventListener('focusout', function () {
    if (nom.value != 0) {
        nom.style.border = '1px solid green';
        validacio.splice(0, 1, true)
    } else {
        nom.style.border = '1px solid red';
        validacio.splice(0, 1, false)
    }
});

email.addEventListener('focusout', function () {
    if (validateEmail(email.value)) {
        email.style.border = '1px solid green';
        validacio.splice(1, 1, true)
    } else {
        email.style.border = '1px solid red';
        validacio.splice(1, 1, false)
    }
});
function validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
    } else {
        return false;
    }
}

contrasenya.addEventListener("input", function () {
    let count = 0;
    if (entre8i15Char(contrasenya.value)) {
        document.querySelector("#caracters").style.color = 'green';
        count++;
    } else {
        document.querySelector("#caracters").style.color = 'red';
    }
    if (mayus(contrasenya.value)) {
        document.querySelector("#mayus").style.color = 'green';
        count++;
    } else {
        document.querySelector("#mayus").style.color = 'red';
    }
    if (minus(contrasenya.value)) {
        document.querySelector("#minus").style.color = 'green';
        count++;
    } else {
        document.querySelector("#minus").style.color = 'red';
    }
    if (num(contrasenya.value)) {
        document.querySelector("#numero").style.color = 'green';
        count++;
    } else {
        document.querySelector("#numero").style.color = 'red';
    }
    if (especial(contrasenya.value)) {
        document.querySelector("#especial").style.color = 'green';
        count++;
    } else {
        document.querySelector("#especial").style.color = 'red';
    }

    if (count == 5) {
        contrasenya.style.border = '1px solid green';
        validacio.splice(2, 1, true)
    } else {
        contrasenya.style.border = '1px solid red';
        validacio.splice(2, 1, false)
    }
})
function entre8i15Char(contrasenya) {
    if (contrasenya.length >= 8 && contrasenya.length <= 15) {
        return true
    } else {
        return false
    }
}
function mayus(contrasenya) {
    let upperCaseLetters = /[A-Z]/;
    if (contrasenya.match(upperCaseLetters)) {
        return true
    } else {
        return false
    }
}
function minus(contrasenya) {
    let lowerCaseLetters = /[a-z]/;
    if (contrasenya.match(lowerCaseLetters)) {
        return true
    } else {
        return false
    }
}
function num(contrasenya) {
    let number = /[0-9]/;
    if (contrasenya.match(number)) {
        return true
    } else {
        return false
    }
}
function especial(contrasenya) {
    let specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (contrasenya.match(specialChars)) {
        return true
    } else {
        return false
    }
}

confirm_contrasenya.addEventListener("input", function () {
    if (contrasenya.value == confirm_contrasenya.value) {
        confirm_contrasenya.style.border = '1px solid green';
        validacio.splice(3, 1, true)
    } else {
        confirm_contrasenya.style.border = '1px solid red';
        validacio.splice(3, 1, false)
    }
})

adreca_postal.addEventListener("focusout", function () {
    if (adreca_postal.value.length != 0) {
        adreca_postal.style.border = '1px solid green';
        validacio.splice(4, 1, true)
    } else {
        adreca_postal.style.border = '1px solid red';
        validacio.splice(4, 1, false)
    }
})

function enviar() {
    const falso = (element) => element == false;
    console.log(validacio)
    if (validacio.some(falso) || validacio.length == 0) {

        alert("Registre incorrecte")
    } else {
        alert("T'has registrat correctament")
    }
}




