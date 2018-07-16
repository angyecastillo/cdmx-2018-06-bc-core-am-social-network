//login es la instania del proveedor del servicio
var provider = new firebase.auth.GoogleAuthProvider();

$('#login').click(function(){
  firebase.auth()
    .signInWithPopup(provider)
    .then(function(result){
      console.log(result.user);
      guardarDatos(result.user);
      //hide propiedad para ocultar el boton
      $('#login').hide();
      //aqui colocamos la foto de google
      $('#root').append("<img src='"+result.user.photoURL+"'/>");
     });
});
// esta funion guarda los datos automaticamente
function guardarDatos(user){
  var usuario= {
    uid:user.uid,
    nombre:user.displayName,
    email:user.email,
    foto:user.photoURL
  }
  firebase.database().ref("TalentMom/" + user.uid)
  .set(usuario)
}
// aqui vamos a escribir en la base de datos
$('#guardar').click(function(){
  firebase.database().ref("TalentMom")
  .set({
    nombre:"Linda",
    edad:"20",
    sexo:"Mujer"
  })
})
// aki leo de la base de guardarDatos
firebase.database().ref("TalentMom")
.on("child_added",function(s){
  var user= s.val();
  $('#root').append("<img width='100px' src='"+user.foto+"'/>");
})
