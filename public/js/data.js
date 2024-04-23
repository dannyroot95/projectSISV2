
window.addEventListener('storage', function (event) {
  if (event.key === 'content' || event.key === 'user') {
      // Se ejecutará cuando haya cambios en 'content' o 'user' en otras pestañas
      var storedContent = localStorage.getItem('content');
      var storedUser = localStorage.getItem('user');

      if (storedContent && storedUser) {
          var content = JSON.parse(storedContent);
          var user = JSON.parse(storedUser);
          setContent(content, user);
      }
  }
});


let cache = localStorage.getItem("content")
let user = localStorage.getItem("user")

if(cache != "" && cache != null){
  console.log(user)
  setContentFromCache(cache)
}

function setContentFromCache(content){

 
    var scriptElement = document.createElement('script');
    scriptElement.src = '/js/script.js';
    scriptElement.type = 'text/javascript';

    var scriptElement2 = document.createElement('script');
    scriptElement2.src = '/js/modules.js';
    scriptElement2.type = 'text/javascript';

    document.getElementById("start").innerHTML = content

    document.head.appendChild(scriptElement);
    document.head.appendChild(scriptElement2);

    let z = JSON.parse(user)

    document.getElementById("nameuser").innerHTML = z.Usuario 
    document.getElementById("typeuser").innerHTML = z.Descripcion

  }

  function logout(){

    localStorage.removeItem("content")
    localStorage.removeItem("user")

    location.reload()

  }