// función inicial para imprimir el primer publicación
let myTextarea = document.getElementById('myTextarea');
let btnPost = document.getElementById('btnPost');

btnPost.addEventListener("click", event => {
  let myPost = myTextarea.value;
  document.getElementById("post").innerHTML = myPost;
});