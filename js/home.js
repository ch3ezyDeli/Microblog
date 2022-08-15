$(function() {
  let $sessionCookie = Cookies.get("sessionCookie");
  if($sessionCookie == undefined){
    location.href = "login.html";
  }
  const $postButton = $('#status-btn');
  const $postChits = $('#chit-posts');
  let $nameDisplay = Cookies.get("nameCookie");
  let $userDisplay = Cookies.get("user");
  let $inputCounter = $('#char-counter');
  let $status = $('#input-status');
  let $imgInput = $('#image-input');
  let $imgPreview = $('#img-preview');
  let $nameId = Cookies.get("nameCookie")
  $('#name-id').text($nameId)
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  
  let $imageUrl = profilePicture();
  function profilePicture(){
    $(document).ready(function (){    
      if ($imageUrl === null){
        $('.user-avatar').attr("src", '../img/avatar.png');
          return $imageUrl = '../img/avatar.png';
        }else{
          $('.user-avatar').attr("src", localStorage.getItem("profile-picture"));
          return $imageUrl = localStorage.getItem("profile-picture")
        }     
  }) 
  }
  
function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          $($imgPreview)
              .attr('src', e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
  }
}
$($imgInput).change(function() {
  readURL(this);
  
});
  
  function postStatus(){
    let $postDate = new Date();
    let $postTime = $postDate.getHours() + ":" + $postDate.getMinutes() + ":" + $postDate.getSeconds();
    let dd = String($postDate.getDate()).padStart(2, '0');
    let mm = String($postDate.getMonth() + 1).padStart(2, '0'); 
    let yyyy = $postDate.getFullYear();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    $postDate = months[mm]  + ' ' +dd + ', ' + yyyy;
    const $maxLength = 150;
    let $valStatus = $status.val();
    let $statusLength = $valStatus.length;
    let $valImageSrc = $imgPreview.attr("src");
    $(document).ready(function (){
      let $imageUrl = localStorage.getItem("profile-picture");
      if ($imageUrl === null){
          return $imageUrl = '../img/avatar.png';
        }else{
          return $imageUrl = localStorage.getItem("profile-picture")
        }     
  }) 
    if($statusLength > $maxLength){
      Toast.fire({
        icon: 'error',
        title: "<h5 style='color:#ffffff'>" + 'Exceed The 150 character limit' + '</h5>',
      })

    }else{
      return(
        "<div class= 'post--hover py-5 px-5' id ='posted-status'>" +
    "<div class='upper__content flex flex-wrap'>"+ 
    "<div id='profile__container'>"+
        '<img src='+$imageUrl +' alt="" class="user-avatar" width ="45">'+
      '</div>'+
      "<div class='name__header ml-2'>"+
        "<a class='font-bold trend__link' href='/profile.html'>" + $nameDisplay +"</a>"+
       " <p class='text-gray-400 text-xs'>"+ $postDate +" "+ $postTime +"</p>" +
      "</div>" +
      "<div class='col-auto'>" +
        "<a class ='text-xs' href='/profile.html'>" + " @" +$userDisplay + "</a>" +
      "</div>" +
      "<div class='post__buttons ml-auto'>" +
        "<button class='delete__button px-2 hover:text-red-400 text-lg'>" +
          "<i class='bi bi-trash-fill'></i>" +
        "</button>" +
        "<button class='edit__button px-2 hover:text-green-400 text-lg'>" +
          "<i class='bi bi-pencil-square'></i>" +
        "</button>" +
      "</div>" + 
     "</div>" +

     "<p class='break-all'  id='post-body'>" + $valStatus +"</p>" + 
     "<img src='" + $valImageSrc +"' alt='' width='250'>" +
   "</div>"
       );
      
    }
  }
  
  
  $status.keyup(function(){
    let $valStatus = $status.val();
    let $statusLength = $valStatus.length;
    let $maxChar = 150 - $statusLength;
    $inputCounter.text( $maxChar + '/'+'150');
  });
  $postButton.click(function(){
    let $postStatus = postStatus();
    let $valImageSrc = $imgPreview.attr("src");
    $.trim($($status).val()).length > 0;
    if($status.val() === "" && $valImageSrc ===""){

    }else{
    $postChits.prepend($($postStatus).hide().fadeIn(500));
    $status.val("");
    $inputCounter.text( "150" + '/'+'150')
    $imgInput.val("");
    $imgPreview.attr("src","")
    
    }
  });

  $('#logout-button').on('click',function(){
    Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure you want to log out?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, I am sure!'
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("nameCookie");
        Cookies.remove("user");
        Cookies.remove("passwordCookie");
        Cookies.remove('sessionCookie', 'true');
        Cookies.remove('sessionCookie', 'true');
        localStorage.removeItem('profile-picture')
        location.href = "login.html";
      }
    })
  });
  profilePicture();
});
