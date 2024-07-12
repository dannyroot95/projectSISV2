
function addHistory(num) {
    const value = document.getElementById("valueHistory").value;
    
    if (value !== "") {

        document.getElementById("loader").style.display = "block";
        
        const data = { type: 1, value: value };
        
        fetch(`${url}/get-history-patient`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            insertData(data[0],num)
            document.getElementById("valueHistory").value = ""
            document.getElementById("loader").style.display = "none";
           
        })
        .catch(err => {
            console.log(err);
            document.getElementById("loader").style.display = "none";
        });
    } else {
        Swal.fire(
            'Oops!',
            'Complete los campos!',
            'info'
        );
    }
}

function insertData(data,n){

    document.getElementById("name"+n).innerHTML = data.ApellidoPaterno+" "+data.ApellidoMaterno+" "+data.PrimerNombre
    document.getElementById("history"+n).value = data.historia

}
