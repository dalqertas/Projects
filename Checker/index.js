
document.addEventListener('DOMContentLoaded', function (event) {
    var todo = document.getElementById("todolist");
    if (localStorage.getItem("Tasks") !== null) {
        var list = JSON.parse(localStorage.getItem("Tasks"));
        for (var i = 0; i < list.length; i++) {
            addTask(list[i], false);
        }
    }
    if (localStorage.getItem("Done") !== null) {
        var list = JSON.parse(localStorage.getItem("Done"));
        for (var i = 0; i < list.length; i++) {
            addDone(list[i], false);
        }
    }
});
function addClicked() {
    var task = document.getElementById("todo").value;
    addTask(task, true);
}
function addTask(myInput, local){
    var myTasks=document.getElementById("todolist");
    if (myInput === ""){
        console.log("empty list");
    }
    else{
        var newEl= document.createElement('li');
        newEl.classList.add('list-group-item');
        newEl.classList.add('list-group-item-info');
        console.log(myInput);

        //Chechbox
        var checkBox= document.createElement("input");
        checkBox.type="checkbox";
        checkBox.id=myInput;
        checkBox.addEventListener("change", checked);
        checkBox.addEventListener("change", currentCommentDeleteTask);

        
        //Delete
        
        var deleteBtn = document.createElement("button"); // <button>
        deleteBtn.innerText = "X";
        deleteBtn.classList.add("btn");
        deleteBtn.classList.add("btn-sm");
        deleteBtn.classList.add("my-0");
        deleteBtn.classList.add("float-right");
        deleteBtn.classList.add("mr-2");
        deleteBtn.addEventListener("click", currentCommentDeleteTask);

        newEl.appendChild(checkBox);
        newEl.appendChild(document.createTextNode(myInput));
        newEl.appendChild(deleteBtn);
        myTasks.insertBefore(newEl,myTasks.childNodes[0]);

        document.getElementById("todo").value="";
        
        if (local) {
            // Add to local storage
            if (localStorage.getItem("Tasks") !== null) {
                var list = [];
                list = JSON.parse(localStorage.getItem("Tasks"));
                list.unshift(myInput);
                localStorage.setItem("Tasks", JSON.stringify(list));
            } else {
                var list = [];
                list.unshift(myInput);
                localStorage.setItem("Tasks", JSON.stringify(list));
            }
        }
    }
    
}

function enterpressalert(e, textarea) {
    var code = (e.keyCode);
    if (code == 13) { //Enter keycode
        addClicked();
    }
}
function currentCommentDeleteTask() {

        // Delete from local storage
        list = JSON.parse(localStorage.getItem("Tasks"));
        console.log("Deleting index: " + list.indexOf(this.parentNode.childNodes[0].nodeValue));
        list.splice(list.indexOf(this.parentNode.childNodes[0].nodeValue), 1);
        localStorage.setItem("Tasks", JSON.stringify(list));
        this.parentNode.remove();
    
}
function currentCommentDeleteDone() {

    // Delete from local storage
    list = JSON.parse(localStorage.getItem("Done"));
    console.log("Deleting index: " + list.indexOf(this.parentNode.childNodes[0].nodeValue));
    list.splice(list.indexOf(this.parentNode.childNodes[0].nodeValue), 1);
    localStorage.setItem("Done", JSON.stringify(list));
    this.parentNode.remove();

}
function checked() {
    var  listitem=this.id;
    console.log(this.id);

    addDone(listitem, true);
}
function addDone(myInput, local){
    var myDone=document.getElementById("donelist");

        var newEl= document.createElement('li');
        newEl.classList.add('list-group-item');
        newEl.classList.add('list-group-item-info');
        console.log(myInput);

        //Chechbox
        var checkBox= document.createElement("input");
        checkBox.type="checkbox";
        checkBox.checked=true;
        checkBox.disabled=true;
        
        //Delete
        
        var deleteBtn = document.createElement("button"); // <button>
        deleteBtn.innerText = "X";
        deleteBtn.classList.add("btn");
        deleteBtn.classList.add("btn-sm");
        deleteBtn.classList.add("my-0");
        deleteBtn.classList.add("float-right");
        deleteBtn.classList.add("mr-2");
        deleteBtn.addEventListener("click", currentCommentDeleteDone);

        newEl.appendChild(checkBox);
        var text=document.createTextNode(myInput);
        var span=document.createElement('span');
        span.style.textDecoration="line-through";
        span.appendChild(text);
        newEl.appendChild(span);
        newEl.appendChild(deleteBtn);
        myDone.insertBefore(newEl,myDone.childNodes[0]);

        
        if (local) {
            // Add to local storage
            if (localStorage.getItem("Done") !== null) {
                var list = [];
                list = JSON.parse(localStorage.getItem("Done"));
                list.unshift(myInput);
                localStorage.setItem("Done", JSON.stringify(list));
            } else {
                var list = [];
                list.push(myInput);
                localStorage.setItem("Done", JSON.stringify(list));
            
        }
    }
    
}
function clearall(){
    console.log("iclicked");
    var list =[];
    $("#donelist").empty();
    localStorage.setItem("Done", JSON.stringify(list));
}

