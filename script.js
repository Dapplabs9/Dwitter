function add(){
    var username = document.getElementById("name_input").value;
    localStorage.setItem("user",username);
    window.location = "room.html";
}