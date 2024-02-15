let fitxers = [];
let accions = ['dragover', 'drgaleave', 'drop'];

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

dropArea.addEventListener('dragover', function () {
    dropArea.classList.add('active');
    dragDropText.innerHTML = "Drop to upload files"
});

dropArea.addEventListener('dragleave', function () {
    dropArea.classList.remove('active');
    dragDropText.innerHTML = "Drag & Drop files"
});

dropArea.addEventListener("drop", (event) => {
    event.dataTransfer.files

    fitxers = fitxers.concat(Array.from(event.dataTransfer.files));
    showFiles(event, fitxers.indexOf(files))
});


function showFiles(file, index) {
    if (fitxers.length != 0) {
        processFile(file, index)
    }
}

function processFile(file, index) {
    const validExtensions = ["image/jpeg", "image/jpg", "image/png",
        "image/gif"];
    const docType = file.type;
    console.log(file)
    console.log(index)
    if (!validExtensions.includes(docType)) {
        fitxers.splice(index + 1, index)
        alert("No es una imatge")
    }
}

