var firebaseConfig = {
  apiKey: "AIzaSyA1t7WkE5kHRJ5YPSBxwynvLNm3SdaESkA",
  authDomain: "kwitter-533c9.firebaseapp.com",
  databaseURL: "https://kwitter-533c9-default-rtdb.firebaseio.com",
  projectId: "kwitter-533c9",
  storageBucket: "kwitter-533c9.appspot.com",
  messagingSenderId: "262835391818",
  appId: "1:262835391818:web:2c06b019f9e09c97d345b3",
  measurementId: "G-PKEZH3W8RS"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var myName = localStorage.getItem("user");
document.getElementById("myName").innerHTML = "Welcome " + myName + " !";
function addRoom(){
  var room_name = document.getElementById("input_room_name").value;
  firebase.database().ref("/").child(room_name).update({
    purpose : "to add a room"
  });
}
function getData(){
  firebase.database().ref("/").on("value",function(snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function(childSnapshot){
      chlidKey = childSnapshot.key;
      room_names = chlidKey;
      row = "<div class='room_name' id=" + room_names + " onclick='redirectToRoomName(this.id)' >#"+ room_names +"</div><hr>";
      document.getElementById("output").innerHTML += row;
    })
  })
}

getData();

function redirectToRoomName(name){
  localStorage.setItem("room_name",name);
  window.location = "page.html";
}
function logout(){
  localStorage.removeItem("user");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}