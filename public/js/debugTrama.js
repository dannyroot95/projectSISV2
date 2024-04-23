var aff= 0
function searchAndUpdateAtentionFromAfiliate(LASTNAME1,LASTNAME2,FIRSTNAME){

    fetch(`${url}/affiliate-by-name/${LASTNAME1}/${LASTNAME2}/${FIRSTNAME}`,{
        method: 'get',
        headers: {
          'Accept': 'application/json'
        }
    })
      .then(response => response.json())
      .then(data => {
        
        aff++
        console.log(data[0])

      }).catch(err => {
        console.log(err)
      }); 

}