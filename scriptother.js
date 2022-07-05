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