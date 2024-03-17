//Variables
let fitxers = [];
let accions = ['dragover', 'drgaleave', 'drop'];

//Elements del html
let dropArea = document.querySelector('.drop-area');
let dragDropText = document.querySelector("h2");
let button = document.querySelector("button");
let input = document.querySelector("#input-file");
let preview = document.querySelector("#preview");

accions.forEach(evt => {
    dropArea.addEventListener(evt, prevDefault);
    function prevDefault(e) {
        e.preventDefault();
    }
});

//Event quan pases per sobre del div
dropArea.addEventListener('dragover', function () {
    dropArea.classList.add('active');
    dragDropText.innerHTML = "Drop to upload files"
});

//Event quan sorts del div
dropArea.addEventListener('dragleave', function () {
    dropArea.classList.remove('active');
    dragDropText.innerHTML = "Drag & Drop files"
});

//Event quan deixas un archiu en el div
dropArea.addEventListener("drop", (event) => {
    event.dataTransfer.fitxers
    //Fica l'achiu en l'array
    fitxers = fitxers.concat(Array.from(event.dataTransfer.files));
    showFiles()
});

//Al fer clik al boto per poder seleccionar archiu
button.addEventListener("click", function (e) {
    e.preventDefault();
    input.click();
});
input.addEventListener("change", function (event) {
    fitxers = fitxers.concat(Array.from(input.files));
    showFiles()
    input.value = null; // El declarem com a null per poder ficar-hi més
    console.log("hola")
});

// Comproba que s'hagin ficat archius
function showFiles() {
    preview.innerHTML = ""
    if (fitxers.length != 0) {
        let index = 0;
        fitxers.forEach((fitxer) => {
            processFile(fitxer, index)
            index++;
        })
    }
}


function processFile(file, index) {
    const validExtensions = ["image/jpeg", "image/jpg", "image/png",
        "image/gif"];
    const docType = file.type;
    // COmprobem que siguin fotos
    if (!validExtensions.includes(docType)) {
        fitxers.splice(index, 1)
        alert("No es una imatge")
    } else {
        let reader = new FileReader();
        reader.readAsDataURL(file);

        let prev = `<div class="previewImage">
                    <img id="img${index}" src="${reader.result}"/>
                    <span>${file.name}</span>
                    <span onclick="removeBtn(${index})" class="material-symbols-outlined removeBtn">c</span>
                    </div>`;

        // Les imprimim en el html
        preview.innerHTML += prev
        reader.addEventListener(
            "load",
            function () {
                let img = document.getElementById(`img${index}`)
                img.src = reader.result;
            },
            false,
        );
    }
}

// Funció per poder eliminar les imatges
function removeBtn(i) {
    fitxers.splice(i, 1)
    console.log(fitxers)
    showFiles()
}
