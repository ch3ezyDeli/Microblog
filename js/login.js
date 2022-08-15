
$(function(){
  let $sessionCookie = Cookies.get("sessionCookie");
  if($sessionCookie == 'true'){
    location.href = "home.html";
  }
  let $userInput = $('#username');
  let $passInput = $('#password');
  const $loginMessage = $('#login-message');
  $('#login-btn').on('click', function (){
    let $valUser = $userInput.val();
    let $hashPass = md5($passInput.val());
    const $idCookie = Cookies.get("user");
    const $passwordCookie = Cookies.get("passwordCookie");
    
    if( $idCookie !== $valUser) {
      $loginMessage.empty();
      $userInput.addClass('border-red-500');
      $loginMessage.text('User Not Found');
    } else if ($passwordCookie != $hashPass) {
      $loginMessage.empty();
      $userInput.removeClass('border-red-500');
      $passInput.addClass('border-red-500');
      $loginMessage.text('Incorrect Password! Please Try Again.');
      
    } else {
        Cookies.set('sessionCookie', 'true');
        location.href = "home.html";
    }
  });
  showPassword();
})

function showPassword() {
const togglePassword = document.querySelector('#showPassword');
const password = document.querySelector('#password');
    
    togglePassword.addEventListener('click', function (e) {

      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
      // toggle the eye / eye slash icon
      this.classList.toggle('text-light-blue-400');
      this.classList.toggle('text-gray-500');
  });
};

