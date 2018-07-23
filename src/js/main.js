// Initialize Firebase
const config = {
  apiKey: "AIzaSyDVH3W9bV3MsZbXx4EqpV4Fg2RwlV0yhGM",
  authDomain: "red-social-dc1b2.firebaseapp.com",
  databaseURL: "https://red-social-dc1b2.firebaseio.com",
  projectId: "rFed-social-dc1b2",
  storageBucket: "red-social-dc1b2.appspot.com",
  messagingSenderId: "159262835837"
};
firebase.initializeApp(config);


//login es la instania del proveedor del servicio
var provider = new firebase.auth.GoogleAuthProvider();

function registrer() {
  //console.log('diste un click');
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('the password es');
      } else {
        alert(errorMessage);
      }

      console.log(error);
      //console.log(errorMessage);
      // ...
    });
}



/*function ingreso() {
  var emailLogin = document.getElementById('emailLogin').value;
  var passwordLogin = document.getElementById('passwordLogin').value;
  firebase.auth().signInWithEmailAndPassword(emailLogin, passwordLogin)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ...
    });
}*/

//FUNCION DE AUTENTICACIÓN CON FACEBOOK

let btnFacebook = document.getElementById('btnFacebook');

btnFacebook.addEventListener("click", function () {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
      //alert("Entraste con FACEBOOK Felicidades!!!");
      location.href = '../views/home.html';
      console.log(result);
    }).catch(function (error) {
      alert("error");
      console.log(error);
    })
  })


function ingreso() {
  var emailLogin = document.getElementById('emailLogin').value;
  var passwordLogin = document.getElementById('passwordLogin').value;
  firebase.auth().signInWithEmailAndPassword(emailLogin, passwordLogin)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ...

    })
}


function ingreso() {
  var emailLogn = document.getElementById('emailLogn').value;
  var passwordLogin = document.getElementById('passwordLogin').value;
  firebase.auth().signInWithEmailAndPassword(emailLogn, passwordLogin)
  .catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

}
function observador() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log('Existe Usuario Activo');
      aparece();
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      console.log('No Existe Usuario Activo');
      // ...
    }
  });

}
observador();

function aparece() {
  var contenido = document.getElementById('contenido');
  contenido.innerHTML = "Usuario activo";
}

$('#login').click(function () {
  firebase.auth()
    .signInWithPopup(provider)
    .then(function (result) {
      console.log(result.user);
      guardarDatos(result.user);
      //hide propiedad para ocultar el boton
      $('#login').hide();
      //aqui colocamos la foto de google
      $('#root').append("<img src='" + result.user.photoURL + "'/>");
    });
});
// esta funion guarda los datos automaticamente
function guardarDatos(user) {
  var usuario = {
    uid: user.uid,
    nombre: user.displayName,
    email: user.email,
    foto: user.photoURL
  }
  firebase.database().ref("TalentMom/" + user.uid)
    .set(usuario)
}
// aqui vamos a escribir en la base de datos
$('#guardar').click(function () {
  firebase.database().ref("TalentMom")
    .set({
      nombre: "Linda",
      edad: "20",
      sexo: "Mujer"
    })
})
// aki leo de la base de guardarDatos
firebase.database().ref("TalentMom")
  .on("child_added", function (s) {
    var user = s.val();
    $('#root').append("<img width='100px' src='" + user.foto + "'/>");
  })
