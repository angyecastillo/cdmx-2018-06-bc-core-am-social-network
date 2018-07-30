// Evento pra publicar post en el muro
let myTaextarea = document.getElementById('myTextarea');
let btnPost = document.getElementById('btnPost');
const post = document.getElementById('post');
const btnLike = document.getElementById('btnLike');
let likeCounter = document.getElementById('likeCounter');
let counter = 0;
const btnLogout = document.getElementById('btnLogout1');
/*const  displayName = usuario => {
  document.getElementById('Nombre').innerHTML= user.displayName;
  console.log(funcion);
};
guardarDatos(result.user);
function guardarDatos(user){
  var usuario= {
    uid:user.uid,
    nombre:user.displayName,
    email:user.email,
    foto:user.photoURL
  }
  firebase.database().ref("Talent-Mom/" + user.uid)
  .set(usuario)
}
firebase.database().ref("Talent-Mom")
.on("child_added",function(s){
  var user= s.val();
  $('#imagen').append("<img width='50px' src='"+user.foto+"'/>");
})*/

const validaTextarea = () => {
  if (myTaextarea.value == "" || myTaextarea.value == "   "){
    alert('Escribe un post para publicar');
    console.log('el input está vacio');

  }else{
    //btnPost.disable = "disable";
    console.log('el input está lleno');
    //btnPost.disable = false;
    printPost();
  }
};


const printPost = () => {
  let myPost = myTextarea.value;
    const finalPost = `
    <div class="card bg-light margin-bottom">
    <div class="card-body">
      <h5 class="card-title">Nombre de Usuario</h5>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
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
  validaTextarea ();
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
