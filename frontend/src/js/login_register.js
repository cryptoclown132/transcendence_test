
function addEventListenersNotAuth() {

  function initUserData(data, username, password, age) {
    showDiv('userIsAuth')
    hideDiv('userIsNotAuth')
    websocket_obj.username = username
    websocket_obj.password = password
    websocket_obj.age = age
    console.log('INIT USER DATA: USER_ID: ', data.user_id)
    websocket_obj.user_id = data.user_id
  }


  // BUTTON TO LOGIN
  document.getElementById('loginUserButton').addEventListener('click', function () {
    const usernameElement = document.getElementById('loginUsername')
    const passwordElement = document.getElementById('loginPassword')
    usernameElement.style.border = ""
    passwordElement.style.border = ""

    const url = `${window.location.origin}/user/check_user_credentials/${usernameElement.value}/${passwordElement.value}/`
    fetch(url)
      .then(response => {
        if (!response.ok) {
          document.getElementById("wrong-password").classList.remove("hidden");
          switch (response.status) {
            case 404:
              document.getElementById("loginUsername").style.border = "1px solid red";
              document.getElementById("wrong-password").innerHTML = "This User does not exist!";
              throw new Error('This User does not exist!');
            case 401:
              document.getElementById("loginPassword").style.border = "1px solid red";
              document.getElementById("wrong-password").innerHTML = "Credentials are wrong!";
              throw new Error('Credentials are wrong!');
            default:
              document.getElementById("wrong-password").innerHTML = "Unexpected Error: Failed to check Credentials!";
              throw new Error('Unexpected Error: Failed to check Credentials')
          }
        }
        document.getElementById("wrong-password").classList.add("hidden");
        return response.json();
      })
      .then(data => {
        initUserData(data, usernameElement.value, passwordElement.value, 69)
        showDiv('showUserProfile')
        
        state.bodyText = document.body.innerHTML;
        window.history.replaceState(state, null, "");

        establishWebsocketConnection()
      })
      .catch(error => {
        setErrorWithTimout('info_login', error, 9999999)
        console.log('Error during login:', error);
      });
  });


  // BUTTON TO REGISTER
  document.getElementById('RegisterUserButton').addEventListener('click', function () {
    const usernameElement = document.getElementById('registerUsername')
    const passwordElement = document.getElementById('registerPassword')
    usernameElement.style.border = ""
    passwordElement.style.border = ""

    const age = document.getElementById('registerAge').value;

    const url = `${window.location.origin}/user/account/create/${usernameElement.value}/${passwordElement.value}/${age}/`
    fetch(url)
      .then(response => {
        if (!response.ok) {
          document.getElementById("wrong-register").classList.remove("hidden");
          switch (response.status) {
            case 409:
              document.getElementById("registerUsername").style.border = "1px solid red";
              document.getElementById("wrong-register").innerHTML = "This Username already exist!";
              throw new Error('This Username already exist')
            default:
              document.getElementById("wrong-register").innerHTML = "Unexpected Error: Failed to create new Account!";
              throw new Error('Unexpected Error: Failed to create new Account')
          }
        }
        document.getElementById("wrong-register").classList.add("hidden");
        showDiv('loginPage');
        hideDiv('registerPage');
        return response.json();
      })
      .then(data => {
        initUserData(data, usernameElement.value, passwordElement.value, age)
        showDiv('showUserProfile')

        state.bodyText = document.body.innerHTML;
        window.history.replaceState(state, null, "");

        establishWebsocketConnection()
      })
      .catch(error => {
        setErrorWithTimout('info_register', error, 9999999)
        console.log('Error during login:', error);
      });
  });


  // BUTTON TO CHANGE TO LOGIN PAGE
  document.getElementById('changeToLoginPageButton').addEventListener('click', function () {
    showDiv('loginPage')
    hideDiv('registerPage')
    document.getElementById("wrong-register").classList.add("hidden");
    document.getElementById('registerUsername').value = null;
    document.getElementById('registerAge').value  = null;
    document.getElementById('registerPassword').value  = null;
    document.getElementById("registerUsername").style.border = "";
    document.getElementById("registerPassword").style.border = "";
    const info_register = document.getElementById('info_register')
    info_register.style.display = 'none';
  });

  // BUTTON TO CHANGE TO REGISTER PAGE
  document.getElementById('changeToRegisterPageButton').addEventListener('click', function () {
    hideDiv('loginPage')
    showDiv('registerPage')
    document.getElementById("wrong-password").classList.add("hidden");
    document.getElementById('loginUsername').value = null;
    document.getElementById('loginPassword').value  = null;
    document.getElementById("loginUsername").style.border = "";
    document.getElementById("loginPassword").style.border = "";
    const info_login = document.getElementById('info_login')
    info_login.style.display = 'none';
  });
}
