// function signin() {
//     "bout to signin with "+document.querySelector(".user").value+" and pass "+document.querySelector(".passw").value
//     lightdm.authenticate(document.querySelector(".user").value)
//     lightdm.respond(document.querySelector(".passw").value)
//     lightdm.start_session("")
// }
gup = (key) => {
  address = window.location.search
  parameterList = new URLSearchParams(address)
  return parameterList.get(key)
}
function loginUsr(user) {
  // Update visual things

  lightdm.cancel_authentication()
  lightdm.authenticate(user.username)
}
function getPicOf(user) {
  for (let i in lightdm.users) {
    if (lightdm.users[i].username == user && lightdm.users[i].image){
      return lightdm.users[i].image
    }
  }
  return "placeholder.png"
}

function reqPass(user, name, logged_in) {
  if (logged_in) {
    window.location.href = "login.html?user=" + user.username + "&name=" + name + "&lock=true"
  } else { window.location.href = "login.html?user=" + user.username + "&name=" + name + "&lock=false" }
}
function setup() {
  document.querySelector("#eraseme").innerHTML = "";
  let users = lightdm.users;
  if (gup("return") != "true") {
    for (let i in users) {
      if (users[i].logged_in) {
        window.location.href = "login.html?user=" + users[i].username + "&name=" + users[i].display_name + "&lock=true"
      }
    }
  }
  for (let i = 0; i < users.length; i++) {
    var button = document.createElement("button")
    button.innerHTML = "<img style=height:43px;border-radius:100%;margin-right:5px src='"+getPicOf(users[i].username)+"'>"+users[i].display_name;
    button.addEventListener("click", () => {
      reqPass(users[i], users[i].display_name, users[i].logged_in)

    })
    document.querySelector("#users").appendChild(button)
  }
  var button = document.createElement("button")
  button.innerHTML = "Other user";
  button.addEventListener("click", () => {
    window.location.href = "other.html"
  }); document.querySelector("#users").appendChild(button)
  if (lightdm.has_guest_account) {
    var button = document.createElement("button")
    button.innerHTML = "Guest session";
    button.addEventListener("click", () => {
      lightdm.authenticate_as_guest()
      setTimeout(() => { lightdm.start_session("pantheon") }, 500)
    }); document.querySelector("#users").appendChild(button)
  }
  var button = document.createElement("button")
  button.innerHTML = "Shutdown options";
  button.addEventListener("click", () => {
    window.location.href = "shutdown.html"
  }); document.querySelector("#users").appendChild(button)

}
window.addEventListener("GreeterReady", setup);