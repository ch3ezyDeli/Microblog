
$(function (){
    let $sessionCookie = Cookies.get("sessionCookie");
    if($sessionCookie == "true"){
      location.href = "home.html?=true";
    }
    let $name = $('#reg-name');
    let $user = $('#reg-username');
    let $pass = $('#reg-password');
    let $confirmPassword = $('#confirm-password');

    const $filter = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,10}$/;
    const $messName = $('#input-one');
    const $messUser = $('#input-two');
    const $messPass = $('#input-three');
    const $messConfirmPass = $('#input-four');

    let $nameLength
    let $userLength;
    let $passChar;

    function checkName(){
        let $valName = $name.val();
        if ($valName.length === 0 ){
            $name.addClass('border-red-500');
            $messName.text('Please insert your name');
            $nameLength = false;
            return $nameLength;
        }else{
            $messName.empty();
            $name.removeClass('border-red-500');
            $name.addClass('border-green-500');
            $nameLength = true;
            return $nameLength;
        }
    }
    function checkUsername(){
        let $userVal = $user.val();
        if ($userVal.length > 3 && $userVal.length < 21){
            $user.addClass('border-green-500');
            $user.removeClass('border-red-500');
            $messUser.empty();
            $userLength = true;
            return $userLength;
        }else{
            $messUser.text('Require 4 characters or more').addClass('text-red-500');
            $user.removeClass('border-green-500');
            $user.addClass('border-red-500');
            $userLength = false;
            return $userLength;
        }

    }

    function checkPassword(){
        let $valPass = $pass.val();
        let $valConfirm = $confirmPassword.val();
        if ( !$valPass ){
            $messPass.empty();
            $messConfirmPass.empty();
            $confirmPassword.removeClass('border-red-500').removeClass('border-green-500');
            $lengthMatched = 'empty password'
            return $lengthMatched;

        } else if( $valPass.length < 6 ){
            $messPass.text('Require 6 characters').addClass('text-red-500');
            $messConfirmPass.empty();
            $confirmPassword.removeClass('border-green-500');
            $lengthMatched = 'less than 6'
            return $lengthMatched;

        }else{
            $messPass.empty();
            if ($valPass == $valConfirm) {
                $confirmPassword.removeClass('border-red-500').addClass('border-green-500');
                
                $messConfirmPass.addClass('text-green-500').text('Password Matched');
                if (!$filter.test($valPass)){
                    $pass.addClass('border-red-500');
                    $messPass.text('Must contain at least one number, one uppercase letter and one lowercase letter').addClass('text-red-500');
                    $passChar = false;
                    return $passChar
                }else{
                    $pass.addClass('border-green-500');
                    $passChar = true;
                    return $passChar + $valPass;
                }       
            }else {
                $pass.removeClass('border-red-500').removeClass('border-green-500');
                $messConfirmPass.removeClass('text-green-500');
                $messConfirmPass.addClass('text-red-500').text('Password Not Matched');
                $confirmPassword.addClass('border-red-500').removeClass('border-green-500');
                $lengthMatched = 'not matching password';
                return $lengthMatched;
            }    
        }
    } 
    function registrationCookie(){
        let $hashedPassword = md5($pass.val());
        Cookies.set("nameCookie", $name.val());
        Cookies.set("user", $user.val());
        Cookies.set("passwordCookie", $hashedPassword );
        location.href = "login.html" 
    } 
    $name.focusout(checkName);
    $pass.add($confirmPassword).keyup(checkPassword);
    $user.focusout(checkUsername);
    $('#reg-btn').click(function(){
        if($nameLength === true && $userLength === true && $passChar === true){
            registrationCookie();
        }
    })
    function showPassword(){
        const $showButton = document.querySelector('#show-btn');
        const $password = document.querySelector('#reg-password');
        const $confirmPassword = document.querySelector('#confirm-password');
        
        $showButton.addEventListener('click', function (e) {
            const $type = $password.getAttribute('type') === 'password' ? 'text' : 'password';
            $password.setAttribute('type', $type);
            $confirmPassword.setAttribute('type',$type);
            this.classList.toggle('text-light-blue-400');
            this.classList.toggle('text-gray-500');
        });
    }  
    showPassword();
});






