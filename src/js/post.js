// Evento pra publicar post en el muro
const myTaextarea = document.getElementById('myTextarea');
const btnPost = document.getElementById('btnPost');
const post = document.getElementById('post');
const btnLike = document.getElementById('btnLike');
const likeCounter = document.getElementById('likeCounter');
let counter = 0;
const strTextarea = myTextarea;


// función que nos permite validar que el input no imprima en pantalla mensajes vacíos
const validaTextarea = () => {
  const strTextarea = myTextarea.value;
  console.log(strTextarea.value);
  if (strTextarea.trim() === "") {
    alert('Ups aún no has escrito nada, escribe un mensaje para publicar');
    console.log('el input está vacio');
  } else {
    console.log('el input está lleno');
    printPost();
  }
};

// función que nos permite recuperar el valor validado del input del muro para imprimir en pantalla
const printPost = () => {
  let myPost = strTextarea.value;
  myTextarea.value = '';
  const finalPost = `
    <div class="card bg-light margin-bottom">
    <div class="card-body">
      <h5 class="card-title mb-1">Nombre de Usuario</h5>
      <p class="card-text mt-1"><small class="text-muted">Last updated 3 mins ago</small></p>
      <p class="card-text">${myPost} </p>

    </div>
    <div class="card-footer">
      <a href="#" class="card-link">EDITAR</a>
      <a href="#" class="card-link">ELIMINAR</a>
      <a id="btnLike" class="float-right"><i class="fas fa-heart"  onClick="addLike()"></i> <span id="likeCounter" class="">0</span> </div></a>
  </div>`

    post.innerHTML += finalPost;
    console.log(myPost);
     
 
}

const validar = () => {
  validaTextarea();
};

const addLike = () => {
  counter = counter + 1;
  document.getElementById('likeCounter').textContent = counter;
}

const cerrar = () => {
    firebase.auth().signOut()
    .then(function(){
        alert("Nos vemos pronto...")

    })
    .catch(function(error){
        alert(error)
    })
    location.href = ('../index.html');
};
