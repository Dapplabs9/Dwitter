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
  var username = localStorage.getItem("user");
  var roomname = localStorage.getItem("room_name");

  function send(){
      msg = document.getElementById("msg_input").value;
      firebase.database().ref(roomname).push({
          name:username,
          message:msg,
          like:0
      });
      document.getElementById("msg_input").innerHTML = "";
  }
  function getData(){
      firebase.database().ref("/"+roomname).on("value",function (snapshot){
          document.getElementById("output").innerHTML = "";
          snapshot.forEach(function (childSnapshot){
              childKey = childSnapshot.key;
              childData = childSnapshot.val();
              if (childKey != "purpose") {
                  firebase_message_id = childKey;
                  firebase_message_data = childData;
                  
                  name = firebase_message_data["name"];
                  message = firebase_message_data["message"];
                  like = firebase_message_data["like"];
                  var name_code = "<h4>" + name + "<img src='tick.png' class='tick'>" + "</h4>";
                  var message_code = "<h4 class='message'>" + message + "</h4>";
                  var btn_like_code = "<button class='btn btn-warning' value="+ like + "id="+firebase_message_id +"onclick='updateLike(this.id)'>";
                  var span_code = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
                  var program = name_code + message_code + btn_like_code + span_code;
                  document.getElementById("output").innerHTML += program;
              }
          })
      })
  }
  getData();
  function update_like(message_id){
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      firebase.database().ref(roomname).child(button_id).update({
          like:updated_likes
      });
  }
  function logout(){
    localStorage.removeItem("user");
    localStorage.removeItem("room_name");
    window.location = "index.html";
  }