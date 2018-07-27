// FUNCION DE REGISTRO CON EMAIL Y PASSWORD
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
          alert('El password es');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        //console.log(errorMessage);
        // ...
      });
  }


$('#btnGoogle').click(function(){
    authGoogle();
})

$('#btnFacebook').click(function(){
    authFacebook();
})
  
const authGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    authentication (provider);
}

const authFacebook = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    authentication (provider);
} 

// FUNCION DE AUTENTICACION CON RRSS

const authentication = (provider) => {
    firebase.auth().signInWithPopup(provider)
    .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // Envia a la vista del muro
        location.href = '../views/home.html';
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
}


// LOGIN 
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
  
  function observador() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log('Existe Usuario Activo');
        location.href = '../views/home.html'
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
    