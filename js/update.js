


$(function(){   
    const $postChits = $('#chit-posts');
    let state = true;

    $postChits.on('click', ".delete__button", function(){        
        $("#posted-status").remove();
    });
    $postChits.on('click', ".edit__button", function(){
        
        let $body = $(this).parent().parent().parent().find("#post-body");
        state = !state;
        const $textarea = '<textarea name="" maxlength="150" id="edit-input" cols="20" rows="2" placeholder ="Edit your status here." class="p-3 focus:border-blue-500 w-full resize-none bg-blue-accent rounded-lg">' +'</textarea>'
        const $saveButton = "<div class='flex mx-auto justify-end' id ='edit__div'> <button class='post__button rounded-lg mx-2 float-right p-1 px-2' id='save-button'>Save</button></div>"
        
        if(state === false){
        $($body).append($textarea);
        $($body).append($saveButton)
        $('#save-button').click(function(){
            $body.text($("#edit-input").val())
            
        }); 
        
        }else{
            $('#edit-input').detach();
            $('#edit__div').detach();
        }
        console.log(state); 
    })
});