
$(function(){
  let postChits = $('#chit-posts');
  const $postBefore = $('#post-before');
  let end = 10;
  let start = 0;
function getData(){ 
    start += 10; 
    let $users = ('https://jsonplaceholder.typicode.com/users'); 
    let $post = ('https://jsonplaceholder.typicode.com/posts?_start='+start +'&_limit='+ end);
    const requestUsers = axios.get($users);
    const requestPosts = axios.get($post);
    axios.all([requestUsers, requestPosts])
    .then(function (results) {
      let user = results[0].data;
      const posts = results[1].data; 
      posts.forEach(function(post,index) {    
        let $getDate = new Date(Date.now()) ;
        let $getTime = $getDate.getHours() + ":" + $getDate.getMinutes() + ":" + $getDate.getSeconds() ;
        let dd = String($getDate.getDate()).padStart(2, '0');
        let mm = String($getDate.getMonth() + 1).padStart(2, '0'); 
        let yyyy = $getDate.getFullYear();
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        $getDate = months[mm]  + ' ' +dd + ', ' + yyyy;
        let randomIndex = Math.floor(Math.random() * 10);
        let idIndex = posts[index].userId;
        const $getNames = user[randomIndex].name;
        const $getUsers = user[randomIndex].username;
        const $getPosts = posts[index].body;
        $postBefore.before($(postData($getNames, $getUsers, $getPosts, $getDate, $getTime)).hide().fadeIn(300));
      });
    })
  };

function postData($postName, $postUser, $postStatus, $postDate, $postTime){
   return(
    "<div class= 'post--hover py-5 px-5' id ='posted-status' loading ='lazy'>" +
    "<div class='upper__content flex flex-wrap'>"+ 
       "<img class='pb-2 mx-2 inline-block flex-initial' src='../img/avatar.png' alt='avatar' width='50'/>"+
      "<div class='name__header'>"+
        "<h1 class='font-bold'>" + $postName +"</h1>"+
       " <p class='text-gray-400 text-xs'>"+ $postDate +" "+ $postTime +"</p>" +
      "</div>" +
      "<div class='col-auto'>" +
        "<p class ='text-xs'>" + " @" +$postUser + "</p>" +
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
     "<p class='break-all'  id='post-body'>" + $postStatus +"</p>" + 
   "</div>"
  )
}

$('#show-more').click(function(){
  if(start <= 100){
    return start, end, getData();   
  }else{
    Swal.fire({
      text: 'No More Chits to Show',
      icon: 'warning',
      timer: 3000
    })
  }
})

getData();

});



