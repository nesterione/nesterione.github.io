/**
icomments не закос под apple - а всего лишь сокращение igor's comments 

для включения комментариве нужно подключить на вашем сайте 

icomments.js и 
icomments.css

*/

var icommentData = {};
icommentData.urlget = "http://services.nesterenya.com/blog/comments/get/";
icommentData.urlput = "http://services.nesterenya.com/blog/comments/add/"

document.addEventListener("DOMContentLoaded", function(event) { 
    
    // сформировать навигацию 
    var icomments = document.querySelector('#icomments'),
    data = icomments.dataset;
    icommentData.id = data.commentid;
  
    
   var placeForNav = document.getElementById("icomments");
    placeForNav.innerHTML = patternNavigation;
    
    loadComments(); 
});

var patternNavigation = 
    '<div class="nav">'+
           '   <div class="section">'+
                  ' Добавить комментарий:'+
                '</div>'+
               '<div class="section">'+
                  '  <label for="icomments-user">Ваше имя:</label>'+
                    '<input id="icomments-user" class="input" type="text" value="" />'+
                '</div>'+
               ' <div class="section">'+
                   ' <label for="icomments-text">Текст коментария :</label>'+
                  '  <textarea id = "icomments-text" class="input"  ></textarea>'+
                '</div>'+
               ' <div class="section">'+
                   ' <button class="btn" onclick="addComment()">Добавить комментарий</button>'+
                '</div>'+
            '</div>'+
            '<div class="comments">'+
                   '<p>Комментарии:</p>'+
                   '<div id="icomments-container">'  +
                   '</div>'+
            '</div>';
	
   function getCommentNode(user, date, text) {
        p = document.createElement("p"); 
        b = document.createElement("b");
        b.textContent = user; 
        p.appendChild(b);
        
        span = document.createElement("span");
        var dd = new Date(date);
        span.textContent = " "+dd.getDate() +"."+dd.getMonth() +"."+dd.getFullYear()+" "+dd.getHours()+":"+dd.getMinutes()+":"+dd.getSeconds() ;
        p.appendChild(span);
         div = document.createElement("div");
         div.textContent = text;
        
        
        divComment = document.createElement("div");
        divComment.appendChild(p);
        divComment.appendChild(div);
        divComment.className += " comment";

        return divComment;
    }
      
	function loadComments() {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', icommentData.urlget+icommentData.id, false);
		xhr.send();
        
		if (xhr.status != 200) {
		  // обработать ошибку
		  alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
		} else {
		  // вывести результат
            var data = JSON.parse(xhr.responseText);
            data.forEach( function(item) {
                // TODO
                    var  com =     getCommentNode (item.user, item.date, item.text);
                    var commentContainer = document.getElementById("icomments-container");
                    commentContainer.appendChild(com);
            }); 
		}
	}



      function addComment() {
       var xhr = new XMLHttpRequest();
		xhr.open('PUT',icommentData.urlput+icommentData.id, false); 
        
        var userNode = document.getElementById('icomments-user');
        var textNode = document.getElementById('icomments-text')
          
        var data = {};
        data.user = userNode.value;
        data.text = textNode.value;
        
          if(data.text.trim()==="") {
              alert("Введите текст комментария");
               return;
          }
          
        var string = JSON.stringify(data);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhr.send(string);

		if (xhr.status != 200) {
		  // обработать ошибку
		  alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
		} else {
		              
            if(data.user.trim()==="") {
                data.user = "аноним";
             }

            // Очистить поля
            userNode.value = "";
            textNode.value = "";
            
             var  com =   getCommentNode (data.user, new Date(), data.text);
             var commentContainer = document.getElementById("icomments-container");
             commentContainer.appendChild(com);
             commentContainer.insertBefore(com, commentContainer.firstChild);
            
		}
}