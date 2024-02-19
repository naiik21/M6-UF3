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
    event.dataTransfer.fitxers

    fitxers = fitxers.concat(Array.from(event.dataTransfer.files));
    console.log(fitxers)
    showFiles()
});

button.addEventListener("click", function (e) {
    e.preventDefault();
    input.click();
});

input.addEventListener("change", function (event) {
    fitxers = fitxers.concat(Array.from(input.files));
    console.log(fitxers)
    showFiles()
    input.value = null;
});


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
    console.log(docType)
    // console.log(file)
    // console.log(index)
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

function removeBtn(i) {
    fitxers.splice(i, 1)
    console.log(fitxers)
    showFiles()
}
