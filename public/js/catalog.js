createDatatable()

var firebaseConfig = {
    apiKey: "AIzaSyBAQrO4SzPFy9-Z-KDy6_fd-oeB1xZdpms",
    authDomain: "sigh-f23a7.firebaseapp.com",
    projectId: "sigh-f23a7",
    storageBucket: "sigh-f23a7.appspot.com",
    messagingSenderId: "608231546457",
    appId: "1:608231546457:web:a4c25eae85c1b8f126db48"
  };
  
  
  firebase.initializeApp(firebaseConfig);
  let db = firebase.firestore();
  let ref = db.collection('procedures_catalog');

  let cacheSt = localStorage.getItem("catalog_pro")
  let pCache = JSON.parse(cacheSt)

if(pCache == null){
  getCatalogFromDatabase()
  
}else{
  getCatalogFromCache()
}


function getCatalogFromDatabase(){


  ref.onSnapshot((querySnapshot) => {

    let ctx = 0
    let catalogProcedures = []

      pro = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if(pro.length > 0){

          $('#tb-data').DataTable().destroy()
          $("#tbody").html(
            pro.map((d) => {

              ctx++

              catalogProcedures.push(d)

                return `
                <tr style="cursor: pointer" onclick="setData('${encodeURIComponent(JSON.stringify(d))}')">

                <td><strong>${ctx}</strong></td>
                <td>${d.codigo}</td>
                <td>${d.Procedimiento}</td>
                <td>${d.tarifa_nivel_2}</td>
                <td>${d.tarifa_nivel_3}</td>
                </tr>`;
             
            })
            .join("")
        );

        //console.log(students)
        createDatatable()
        localStorage.setItem("catalog_pro",JSON.stringify(catalogProcedures))
      }
  }, (error) => {
    console.log(error)
}); 
}

function getCatalogFromCache(){

  let ctx = 0
  
$('#tb-data').DataTable().destroy()
          $("#tbody").html(
            pCache.map((d) => {

              ctx++

                return `
                <tr style="cursor: pointer" onclick="setData('${encodeURIComponent(JSON.stringify(d))}')">

                <td><strong>${ctx}</strong></td>
                <td>${d.codigo}</td>
                <td>${d.Procedimiento}</td>
                <td>${d.tarifa_nivel_2}</td>
                <td>${d.tarifa_nivel_3}</td>
                </tr>`
             
              })
              .join("")
          );
        createDatatable()
        getCatalogFromDatabase()
}


  function createDatatable(){

    $('#tb-data').DataTable({
        language: {
              "decimal": "",
              "emptyTable": "No hay información",
              "info": "Mostrando _START_ a _END_ de _TOTAL_ datos",
              "infoEmpty": "Mostrando 0 to 0 of 0 datos",
              "infoFiltered": "(Filtrado de _MAX_ total datos)",
              "infoPostFix": "",
              "thousands": ",",
              "lengthMenu": "Mostrar _MENU_ datos",
              "loadingRecords": "Cargando...",
              "processing": "Procesando...",
              "search": "Buscar en la lista:",
              "zeroRecords": "Sin resultados encontrados",
              "paginate": {
                  "first": "Primero",
                  "last": "Ultimo",
                  "next": "Siguiente",
                  "previous": "Anterior"
              }
       },scrollY: '50vh',scrollX: true, sScrollXInner: "100%",
       scrollCollapse: true,
      });
  
      var table = $('#tb-data').DataTable();
      $('#container').css( 'display', 'block' );
      table.columns.adjust().draw();

}

function insertData(data){

  let ctx = 0

  document.getElementById("tbody").innerHTML = ""
  $('#tb-data').DataTable().destroy()

  $("#tbody").html(data.map((d) => {

      
      ctx++

            return `
            <tr style="cursor: pointer;">
            <td class="minText2">${ctx}</td>
            <td class="minText2">${d.codigo}</td>
            <td class="minText2">${d.Procedimiento}</td>
            <td class="minText2">${d.tarifa_nivel_2}</td>
            <td class="minText2">${d.tarifa_nivel_3}</td>
            </tr>`;
        })
        .join("")
    );

    createDatatable()

}