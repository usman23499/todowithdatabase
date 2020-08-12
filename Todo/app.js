var list=document.getElementById("list");
function getfirebasedata(){
    firebase.database().ref('Todo').once('value',function(data){
        var Fulllist=data.val();
        
       Object.values(Fulllist).forEach((value) => {
         
           var li=document.createElement('li'); // li ka tag create hogaya
           var p=document.createElement('p');
           var litext=document.createTextNode(value);
           var delbutton=document.createElement("button");
           var deltext=document.createTextNode("Delete");
           var editbutton=document.createElement("button");
           var edittext=document.createTextNode("Edit");
       
           p.setAttribute("class","todotext");
           p.appendChild(litext);
       
           delbutton.appendChild(deltext);
           delbutton.setAttribute("class","btn ");  // give a class 
           delbutton.setAttribute("onclick","deleteItem(this)") //ab ye he pure li aae ge
       
           editbutton.appendChild(edittext);
           editbutton.setAttribute("class","btn ");  // give a class 
           editbutton.setAttribute("onclick","editItem(this)") //ab ye he pure li aae ge
           
           
           
           
           li.appendChild(p);// li ke inder li text daldo
           //<li>usman</li>
       
           li.appendChild(delbutton);
           li.appendChild(editbutton);
           list.appendChild(li);
       
           
       });


    })   
}

getfirebasedata()


function addthis(){
    var todo_item=document.getElementById("todoitem");
    var li=document.createElement('li'); // li ka tag create hogaya
    var p=document.createElement('p');
    var litext=document.createTextNode(todo_item.value);
    var delbutton=document.createElement("button");
    var deltext=document.createTextNode("Delete");
    var editbutton=document.createElement("button");
    var edittext=document.createTextNode("Edit");

    p.setAttribute("class","todotext");
    p.appendChild(litext);

    delbutton.appendChild(deltext);
    delbutton.setAttribute("class","btn ");  // give a class 
    delbutton.setAttribute("onclick","deleteItem(this)") //ab ye he pure li aae ge

    editbutton.appendChild(edittext);
    editbutton.setAttribute("class","btn ");  // give a class 
    editbutton.setAttribute("onclick","editItem(this)") //ab ye he pure li aae ge
    
    
    
    
    li.appendChild(p);// li ke inder li text daldo
    //<li>usman</li>

    li.appendChild(delbutton);
    li.appendChild(editbutton);
    list.appendChild(li);



    firebase.database().ref('Todo').push(todo_item.value);
    
    
    todo_item.value="";

    //console.log(li) //to cheak at all the time

}
function deleteall(){
    list.innerHTML="";  // inner html for html ke lea
    firebase.database().ref('Todo').remove()
}
function deleteItem(e){




firebase.database().ref('Todo').once('value',function(data){
    var Fulllist=data.val();
Object.keys(Fulllist).forEach((key,index)=>{
    
if(e.parentNode.childNodes[0].childNodes[0].nodeValue === Fulllist[key]){

    firebase.database().ref('Todo/'+key).remove();
}

})

}) 


// to target parent of e (puri li list aae ge e main)
e.parentNode.remove() // ab parent ke node delete ho jae ge







}
function editItem(e){





//   console.log(e.parentNode.innerText) is se pura text aajae  button name ke sath

// console.log(e.parentNode.childNodes[0].nodeValue) // ab text aa aje ga wara childnode se string miain value aae ge 
var edititemvalue=e.parentNode.childNodes[0].childNodes[0].nodeValue;
var update=prompt("Enter New Text",edititemvalue);






firebase.database().ref('Todo').once('value',function(data){
    var Fulllist=data.val();
Object.keys(Fulllist).forEach((key,index)=>{
    
if(edititemvalue == Fulllist[key]){

    firebase.database().ref('Todo/'+key).set(update);
    
}

})

}) 




e.parentNode.childNodes[0].childNodes[0].nodeValue=update;

}


