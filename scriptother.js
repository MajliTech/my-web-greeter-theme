gup = (key) => {
  
  // Address of the current window
  address = window.location.search

  // Returns a URLSearchParams object instance
  parameterList = new URLSearchParams(address)

  // Returning the respected value associated
  // with the provided key
  return parameterList.get(key)
}
lightdm.authentication_complete.connect(() => {
  if (lightdm.is_authenticated) {
  document.querySelector("#login").style="background-color:green";
    var username = document.querySelector("#user").value
    if (islocked(username)) {
      document.querySelector("#islocked").innerHTML = "Locked session"
    }
    document.body.style.backgroundImage = "url('"+getBackOfEnd(username)+"')";  
    document.querySelector(".name").innerHTML = getNameOf(username);
    document.querySelector("#pp").src = getPicOfEnd(username);
    setTimeout(() => {
      lightdm.start_session(lightdm.sessions[0].key)},800);
    } else {
    document.querySelector("#login").style="background-color:red";
  }
})
function getNameOf(user){
  for (let i in lightdm.users) {
    if (lightdm.users[i].username == user && lightdm.users[i].display_name){
      return lightdm.users[i].display_name
    }
  }
  return "Other account"
}

function islocked(user) {
  for (let i in lightdm.users) {
    if (lightdm.users[i].username==user){
      return lightdm.users[i].logged_in
    }
    
  }
  return false
}
function getBackOfEnd(user) {
  for (let i in lightdm.users) {
    if (lightdm.users[i].username == user && lightdm.users[i].background){
      return lightdm.users[i].background
    }
  }
  return "odin-dark.jpg"
}
function getPicOfEnd(user) {
  for (let i in lightdm.users) {
    if (lightdm.users[i].username == user && lightdm.users[i].image){
      return lightdm.users[i].image
    }
  }
  return "placeholder.png"
}
function getBackOf(user) {
  return "odin-dark.jpg"
}
function getPicOf(user) {
  return "placeholder.png"
}
function loginUsr() {
  var username = document.querySelector("#user").value;
  lightdm.cancel_authentication()
  lightdm.authenticate(username)
  
  setTimeout(() => {lightdm.respond(document.querySelector("#pass").value)},200)
  document.querySelector("#login").style="background-color:yellow"
}
function prepare(){
  document.querySelector("#pp").src = getPicOf("");
  document.body.style.backgroundImage = "url('"+getBackOf("")+"')"
}
function clickPress(event) {
  if (event.keyCode == 13) {
  loginUsr();
  }
}
window.addEventListener("GreeterReady", prepare);