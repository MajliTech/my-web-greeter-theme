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
  setTimeout(() => {lightdm.start_session(lightdm.sessions[0].key);},500)} else {
    document.querySelector("#login").style="background-color:red";
  }
})
function getBackOf(user) {
  for (let i in lightdm.users) {
    if (lightdm.users[i].username == user && lightdm.users[i].background){
      return lightdm.users[i].background
    }
  }
  return "odin-dark.jpg"
}
function getPicOf(user) {
  for (let i in lightdm.users) {
    if (lightdm.users[i].username == user && lightdm.users[i].image){
      return lightdm.users[i].image
    }
  }
  return "placeholder.png"
}
function loginUsr() {
  var username = gup("user");
  lightdm.cancel_authentication()
  lightdm.authenticate(username)
  
  setTimeout(() => {lightdm.respond(document.querySelector("#pass").value)},200)
  document.querySelector("#login").style="background-color:yellow"
}
function prepare(){
  let users = lightdm.users
  var username = gup("user");
  var name = gup("name");
  document.querySelector(".name").innerHTML = decodeURI(name);
  document.querySelector("#pp").src = getPicOf(username);
  document.body.style.backgroundImage = "url('"+getBackOf(username)+"')"
  if (gup("lock")=="true") {
    document.querySelector("#islocked").innerHTML = "Locked session"
  }
}
function clickPress(event) {
  if (event.keyCode == 13) {
  loginUsr();
  }
}
window.addEventListener("GreeterReady", prepare);