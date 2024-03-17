let btnEdit = document.querySelectorAll(".btnEdit");
btnEdit.forEach(el => {
    el.addEventListener("click", function () {

        let formData = new FormData();
        formData.append("id", this.getAttribute("idProd"));

        let options = {
            method: 'POST',
            body: formData
        }

        fetch("getProducte.php", options)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                console.log("edit");
                document.getElementById("nomProducte").value = data.nom;
                document.getElementById("addEdit").value = data.addEdit;
            })
            .catch((error) => { });

    })
})

let btnDelete = document.querySelectorAll(".btnDelete");
btnDelete.forEach(el => {
    el.addEventListener("click", function () {

        let formData = new FormData();
        formData.append("id", this.getAttribute("idProd"));
        formData.append("delete", this.getAttribute("idDelete"));

        let options = {
            method: 'POST',
            body: formData
        }

        fetch("getProducte.php", options)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                console.log("delete");
                // document.getElementById("nomProducte").value = data.nom;
                // document.getElementById("addEdit").value = data.addEdit;
            })
            .catch((error) => { });

    })
})
