$(function(){
    const $sessionCookie = Cookies.get('sessionCookie')
    if($sessionCookie == undefined){
        location.href = "login.html";
    }

    let $nameDisplay = Cookies.get("nameCookie");
    let $userDisplay = Cookies.get("user");
    let $currentPassword = Cookies.get("passwordCookie");
    const $saveButton = $('#save-button');
    const $backButton = $('#back-button');
    let $newPassMess = $('#newpass-message');
    const $filter = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,10}$/;
    let $imgInput = $('#image-input');
    let $avatar = $('.user-avatar')
     
    $($saveButton).on('click' ,function(){
        let $nameInput = $('#name-input').val();
        let $usernameInput = $('#username-input').val();
        let $newPassInputVal = $('#new-password-input').val();
        let $newPassInput = $('#new-password-input');
        let $confirmPassInputVal = $('#confirm-password-input').val();
        let $confirmPassInput = $('#confirm-password-input');
        let $currentPassInputVal = $('#current-password-input').val();
        let $hashedCurrentPassword = md5($currentPassInputVal);
        if($nameInput !="" && $usernameInput !="" && $newPassInputVal != ""){
            Cookies.set("user", $usernameInput);
            Cookies.set("nameCookie", $nameInput);
            if ($newPassInputVal.length < 5 ){
                $($newPassMess).text("Please Enter 6 or more Characters");
            }else if(!$filter.test($newPassInputVal)){
                $($newPassMess).empty();
                $($newPassMess).text("Must contain at least one uppercase/lowercase and one number.");
                
            }
            else{
                $($newPassMess).empty();
                if($newPassInputVal === $confirmPassInputVal){
                    $($confirmPassInput).add($newPassInput).addClass('border-2').addClass('border-green-500');
                    if($currentPassword === $hashedCurrentPassword){
                        let $hashedPassword = md5($newPassInputVal);
                        Cookies.set("passwordCookie", $hashedPassword );
                        Swal.fire({
                            text: 'Password Changed Succesfully',
                            icon: 'success',
                            confirmButtonText: 'OK'
                          }).then(function(isConfirm){
                            location.href = '/home.html';
                          });
                    }
                }
            }
        }else if($nameInput !="" && $usernameInput ===""){
            Cookies.set("nameCookie", $nameInput);           
            Swal.fire({
                text: 'Name Changed Succesfully',
                icon: 'success',
                confirmButtonText: 'OK'
              }).then(function(isConfirm){
                location.href = '/home.html';
              });
        }else if($usernameInput !="" && $nameInput ===""){
            Cookies.set("nameCookie", $usernameInput);
            Swal.fire({
                text: 'Username Changed Succesfully',
                icon: 'success',
                confirmButtonText: 'OK'
              }).then(function(isConfirm){
                location.href = '/home.html';
              });
        }else if($nameInput !="" && $usernameInput !=""){
            Cookies.set("user", $usernameInput);
            Cookies.set("nameCookie", $nameInput);
            Swal.fire({
                text: 'Name and Username Changed Succesfully',
                icon: 'success',
                confirmButtonText: 'OK'
              }).then(function(isConfirm){
                location.href = '/home.html';
              });
        }else{
            if ($newPassInputVal.length < 5 ){
                $($newPassMess).text("Please Enter 6 or more Characters");
            }else if(!$filter.test($newPassInputVal)){
                $($newPassMess).empty();
                $($newPassMess).text("Must contain at least one uppercase/lowercase and one number.");
            }
            else{

                if($newPassInputVal === $confirmPassInputVal){
                    $($confirmPassInput).add($newPassInput).addClass('border-2').addClass('border-green-500');
                    if($currentPassword === $hashedCurrentPassword){
                        let $hashedPassword = md5($newPassInputVal);
                        Cookies.set("passwordCookie", $hashedPassword );
                        Swal.fire({
                            text: 'Password Changed Succesfully',
                            icon: 'success',
                            confirmButtonText: 'OK'
                          }).then(function(isConfirm){
                            location.href = '/home.html';
                          });     
                    }
                }
            }
        }
    }); 
    $($backButton).click( function(){
        location.href = '/home.html'
    });
     $(document).ready(function(){
        const $imageUrl = localStorage.getItem("profile-picture");
        if ($imageUrl === null){
            return $imageUrl = '../img/avatar.png';
          }
        $('.user-avatar').attr("src", $imageUrl);
    }) 
    $('#name-id').text($nameDisplay);
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
      
            reader.onload = function (e) {
                $($avatar)
                    .attr('src', e.target.result);
                    
            };
            $($saveButton).on('click', function(){
                localStorage.setItem('profile-picture', reader.result);
                Swal.fire({
                    text: 'Profile Picture Changed!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  })
               });
            reader.readAsDataURL(input.files[0]);
        }
      }
      $($imgInput).change(function() {
        readURL(this);
        
      });
      function showPassword(){
        const $showButton = document.querySelector('#show-btn');
        const $password = document.querySelector('#new-password-input');
        const $confirmPassword = document.querySelector('#confirm-password-input');
        const $currentPassword = document.querySelector('#current-password-input');
        
        $showButton.addEventListener('click', function (e) {
        
            const $type = $password.getAttribute('type') === 'password' ? 'text' : 'password';
            $password.setAttribute('type', $type);
            $confirmPassword.setAttribute('type',$type);
            $currentPassword.setAttribute('type',$type);
            this.classList.toggle('text-light-blue-400');
            this.classList.toggle('text-gray-500');
        });
    } 
    showPassword();
});