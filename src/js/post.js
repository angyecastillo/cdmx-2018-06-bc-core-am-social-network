// función logout 
const cerrar = () => {
    firebase.auth().signOut()
    .then(function(){
        alert("Nos vemos pronto...")

    })
    .catch(function(error){
        alert(error)
    })
    location.href = ('index.html');
};



// Elementos para publicar post en el muro
const myTaextarea = document.getElementById('myTextarea');
const btnPost = document.getElementById('btnPost');
const strTextarea = myTextarea;
const post = document.getElementById('container-post');
/*const btnLike = document.getElementById('btnLike');
let counter = 0;
const likeCounter = document.getElementById('likeCounter');
*/
let refPost;

// envía post a firebase
const init = () => {
  btnPost.addEventListener('click', sendPostFirebase);
  refPost = firebase.database().ref().child('posts');
  getPostOfFirebase();
}

// creamos los elementos que conforman el post dentro del DOM
const creatNewPostElements = (postString) => {
  const postItem = document.createElement('div');
  const cardBody = document.createElement('div');
  const h5 = document.createElement('h5');
  const dateParagraph = document.createElement('small');
  const postParagraph = document.createElement('p');
  const editInput = document.createElement('input'); // tipo texto
  const cardFooter = document.createElement('div');
  const editAtag = document.createElement('button');
  const deleteAtag = document.createElement('button');
  const likeAtag = document.createElement('button');
  const likeSpan = document.createElement('span');
  const likeicon = document.createElement('i');

  editInput.type = 'text';

  // asignamos clases a los elementos
  postItem.className = 'card bg-light mb-3';
  cardBody.className = 'card-body';
  h5.className = 'card-title mb-0 pb-0';
  dateParagraph.className = 'text-muted mt-0';
  postParagraph.className = 'card-text editMode';
  editInput.setAttribute('style','display:none;');
  cardFooter.className = 'card-footer';
  editAtag.className = 'edit btn btn-link d-inline p-2';
  editAtag.innerHTML = 'EDITAR';
  deleteAtag.className = 'delete btn btn-link d-inline p-2';
  deleteAtag.innerHTML = 'ELIMINAR';
  likeAtag.className = 'float-right like btn btn-link';
  likeicon.className = 'fas fa-heart';
  likeSpan.innerHTML = ' 0';

  postParagraph.innerHTML = postString;

  //creando dinamicamente las cajas de post dentro del DOM
  postItem.appendChild(cardBody);
  cardBody.appendChild(h5);
  cardBody.appendChild(dateParagraph);
  cardBody.appendChild(postParagraph);
  cardBody.appendChild(editInput);
/*   postItem.appendChild(cardFooter); */
  postItem.appendChild(editAtag);
  postItem.appendChild(deleteAtag);
  postItem.appendChild(likeAtag);
  /* cardFooter.appendChild(editAtag);
  cardFooter.appendChild(deleteAtag);
  cardFooter.appendChild(likeAtag); */
  likeAtag.appendChild(likeicon);
  likeAtag.appendChild(likeSpan);

  return postItem;
}

const addPost = (key, postCollection) => {
  //console.log('probando agregar post');
  //nos muestra la colección de post guardados en firebase
  const postItem = creatNewPostElements(postCollection.messagePost);
  // console.log(postCollection.messagePost); 
  postItem.setAttribute('data-keypost', key);
  console.log(postItem);
  post.appendChild(postItem);
  bindPostEvents(postItem);
}

const bindPostEvents = (messagePost, likePostEvent) => {
  const editAtag = messagePost.querySelector('button.edit');
  const deleteAtag = messagePost.querySelector('button.delete');
/*   const likePost = messagePost.querySelector('button'); */
  // console.log(editAtag, deleteAtag);
  
  editAtag.addEventListener('click', editPost);
  deleteAtag.addEventListener('click', deletePost);
  /* likePost.addEventListener('change', likePostEvent); */
}

const editPost = () => {
  const postItem = event.target.parentNode;
  // console.log(event.target.parentNode);
  const keyPostItem = event.target.parentNode.dataset.keypost;
  const editInput = postItem.querySelector('input[type=text]');
  // editInput.setAttribute('display', 'block');
  // const postParagraph = postItem.querySelector('p[class= editMode]');
  // console.log(postParagraph);
  const editAtag = event.target;
  //console.log(postItem.classList.contains('editMode'));    
  const containsClass = postItem.classList.contains('editMode');
  // console.log(containsClass);
  const refPostToEdit = refPost.child(keyPostItem);
  //console.log(refPost.child(keyPostItem));

  refPostToEdit.once('value', (snapshot) => {
    //console.log(snapshot.val());
    const data = snapshot.val();

    if (containsClass){
      console.log(containsClass, postItem);
      refPostToEdit.update({
        messagePost : editInput.value
      })
      editAtag.innerHTML = 'EDITAR';
      postItem.classList.remove('editMode');
      editInput.value = '';
    }else{
      console.log('entrando a modo edición');
      editAtag.innerHTML = 'GUARDAR ';
      // console.log(editInput);
      editInput.setAttribute('style','display:block;');
      // console.log(data);
      // console.log(data.messagePost);
      
      editInput.value = data.messagePost;
      postItem.classList.add('editMode')
    }
    
  })
  
}

const deletePost = () => {
  // console.log(event.target.parentNode.dataset.keypost);
  const keyPostItem = event.target.parentNode.dataset.keypost;
  const refPostToDelete = refPost.child(keyPostItem);
  // console.log(refPost.child(keyPostItem));
  refPostToDelete.remove();
}

const getPostOfFirebase = () => {
  refPost.on('value', (snapshot) => {
    post.innerHTML = '';
    const data = snapshot.val()
    for (var key in data) {
      addPost(key, data[key])
    }
  })

}

const sendPostFirebase = () => {
  refPost.push({
    messagePost: myTaextarea.value,
    // date : ,
  });
  myTaextarea.value = '';
}

window.onload = init


/* 
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
    <div class="card bg-light mb-3">
    <div class="card-body">
      <h5 id="user-name" class="card-title mb-0 pb-0">Nombre de Usuario</h5>
      <p class="card-text mt-0"><small class="text-muted">Last updated 3 mins ago</small></p>
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


btnPost.addEventListener('click', validar); */
//btnLike.addEventListener('click', addLike);

/*btnPost.addEventListener('click', event => {
  let myPost = myTextarea.value; 
  const finalPost = `<div class="">${myPost} </div>` 
   post.innerHTML  += finalPost;
   console.log(myPost);
    //myTextarea = " ";
    // console.log(myTaextrea.value);
    
});*/
