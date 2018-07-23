/*// función inicial para imprimir el primer publicación
let myTextarea = document.getElementById('myTextarea');
let btnPost = document.getElementById('btnPost');

btnPost.addEventListener("click", event => {
  let myPost = myTextarea.value;
  document.getElementById("post").innerHTML = myPost;
});
*/

// Evento pra publicar post en el muro
let myTaextarea = document.getElementById('myTextarea');
let btnPost = document.getElementById('btnPost');
const post = document.getElementById('post');
const btnLike = document.getElementById('btnLike');
let likeCounter = document.getElementById('likeCounter');
let counter = 0;

const validaTextarea = () => {
  if (myTaextarea.value == "" || myTaextarea.value == "   "){
    alert('Escribe un post para publicar');
    console.log('el input está vacio');
    //e.preventDefault();
   // btnPost.setAttribute('disabled', );
   // btnPost.disable = true;
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


btnPost.addEventListener('click', validar);
//btnLike.addEventListener('click', addLike);

/*btnPost.addEventListener('click', event => {
  let myPost = myTextarea.value; 
  const finalPost = `<div class="">${myPost} </div>` 
   post.innerHTML  += finalPost;
   console.log(myPost);
    //myTextarea = " ";
    // console.log(myTaextrea.value);
    
});*/
