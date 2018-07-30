(function() {

  // validacion de email y password
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogout = document.getElementById('btnLogout');
  
    // Añadir Evento login
    btnLogin.addEventListener('click', event => {
      //Obtener email y pass
      console.log('funciona');
      const email = txtEmail.value;
      const pass = txtPassword.value;
      const auth = firebase.auth();
      // Sign in
      const promise = auth.signInWithEmailAndPassword(email, pass);
      promise.catch(e => console.log(e.message));
  
    });
  
    // Añadir evento signup
    btnSignUp.addEventListener('click', event => {
  
      // Obtener email y pass
      //  comprobar que el email sea real
      const email = txtEmail.value;
      const pass = txtPassword.value;
      const auth = firebase.auth();
      // Sign in
      const promise = auth.createUserWithEmailAndPassword(email, pass);
      promise.catch(e => console.log(e.message));
    });
  
    btnLogout.addEventListener('click', event => {
      firebase.auth().signOut();
    });
  
    // Añadir un listener en tiempo real
     firebase.auth().onAuthStateChanged( firebaseUser => {
      if(firebaseUser) {
        console.log(firebaseUser);
        location.assign('home.html');
        btnLogout.classList.remove('hide');
  
      } else {
        console.log('no logueado');
        btnLogout.classList.add('hide');
      }
    });
  }());
  
  let $name = $('#name');
  let $apellido = $('#last_name');
  let $emailRegistro = $('#email_register');
  let $passwordRegistro = $('#password_register');
  let $register = $('#register');
  let $emailLogin = $('#email');
  let $passwordLogin = $('#password');
  let $login = $('#login');
  // let $logout = $('#logout');
  
  // funcion para iniciar sesioon con Google
  let providerg = new firebase.auth.GoogleAuthProvider();
  $('#loginGoogle').click(function() {
    firebase.auth()
      .signInWithPopup(providerg)
      .then(function(result) {
        console.log(result.user);
        datosUsuario(result.user);
        // $('#loginGoogle').hide();
      });
  // observador();
  });
  
  
  // funcion para iniciar sesion con facebook
  let providerf = new firebase.auth.FacebookAuthProvider();
  $('#loginFacebook').click(function() {
    firebase.auth()
      .signInWithPopup(providerf)
      .then(function(result) {
        console.log(result.user);
        datosUsuario(result.user);
        // $('#loginFacebook').hide();
      });
    // observador();
  });
  
  /* let muro = () => {
    location.href = '../view/home.html';
  };
 */  
  // Funcion para guardar los datos del usuaio en Firebase
  const datosUsuario = (user) =>{
    let database = firebase.database();
    let usuario = {
      uid: user.uid,
      nombre: user.displayName,
      correo: user.email,
      foto: user.photoURL
    };
    database.ref('Usuarios/' + user.uid)
      .set(usuario);
  };