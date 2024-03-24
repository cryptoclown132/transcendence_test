
// BUTTON TO SEND MESSAGE IN CHAT
function addEventListenersIsAuth() {

  function loadContentGame(file, targetId) {
    fetch(file)
        .then(response => response.text())
        .then(html => {
          document.getElementById(targetId).innerHTML = html;
          gameDom();
        })
        .catch(error => console.error('Error loading content:', error));
  }
  loadContentGame('html/game.html', 'gameSite');

  function loadContentChat(file, targetId) {
    fetch(file)
        .then(response => response.text())
        .then(html => {
          document.getElementById(targetId).innerHTML = html;
          chatDom();
        })
        .catch(error => console.error('Error loading content:', error));
  }
  loadContentChat('html/chat.html', 'chat');

  function loadContentProfile(file, targetId) {
    fetch(file)
        .then(response => response.text())
        .then(html => {
          document.getElementById(targetId).innerHTML = html;
          // chatDom();
        })
        .catch(error => console.error('Error loading content:', error));
  }
  loadContentProfile('html/profile.html', 'profileSite');


  function loadStats(file, targetId) {
    fetch(file)
        .then(response => response.text())
        .then(html => {
          document.getElementById(targetId).innerHTML = html;
          // chatDom();
        })
        .catch(error => console.error('Error loading content:', error));
  }
  loadStats('html/stats.html', 'statsSite');

  function loadCreators(file, targetId) {
    fetch(file)
        .then(response => response.text())
        .then(html => {
          document.getElementById(targetId).innerHTML = html;
          // chatDom();
        })
        .catch(error => console.error('Error loading content:', error));
  }
  loadCreators('html/creators.html', 'creatorsSite');

  document.addEventListener('click', async function(event) {   
    if (event.target.closest('#homeButton'))
      showSiteHideOthers('homeSite');
    else if (event.target.closest('#gameButton'))
      showSiteHideOthers('gameSite');
    else if (event.target.closest('#statsButton'))
      showSiteHideOthers('statsSite');
    else if (event.target.closest('#showChatButton')) {
      await sendDataToBackend('get_current_users_chats')
      await sendDataToBackend('get_blocked_by_user')
      await sendDataToBackend('get_blocked_user') // NEW since 02.02
      showSiteHideOthers('chat')
    }
    else if (event.target.closest('#profileButton'))
      showSiteHideOthers('profileSite');
      else if (event.target.closest('#creatorsButton'))
      showSiteHideOthers('creatorsSite');
    else if (event.target.closest('#logoutButton'))
      await logoutUser();

    else if (event.target.closest('#renderInv')) ////check again!!!!!!!!!!!!!!!!!!!!!!!!
      handleButtonClick("");


    else if (event.target.closest('#sendMessageButton')) {
      const isBlocked = websocket_obj.blocked_by && websocket_obj.blocked_by.includes(websocket_obj.chat_name);
      if (isBlocked) {
        $('#userBlockedYouWarning').modal('show');
        return
      }
      websocket_obj.message = document.getElementById('messageInput').value
      websocket_obj.sender = websocket_obj.username
      document.getElementById('messageInput').value = ''
      await sendDataToBackend('send_chat_message')
      await sendDataToBackend('get_online_stats')
      await sendDataToBackend('get_chat_messages')
    }
    
    else if (event.target.closest('#invite_user_button')) {
      const invited_user_name = document.getElementById('invite_user').value
      document.getElementById('invite_user').value = ''
      await inviteUser(invited_user_name)
    }
    
    else if (event.target.closest('#creat_public_chat_button'))
      await createPublicChat()

    else if (event.target.closest('#create_private_chat_button'))
      await createPrivateChat()
    
    else if (event.target.closest('#close_button_clicked_user')) {
      const public_chat_backdrop = document.getElementById('publicChatModal')
      public_chat_backdrop.style.opacity = 1;
    }

    else if (event.target.closest('#goToChatButton')) {
      const clicked_user = document.getElementById('backdropClickedUserLabel')
      let chatNameToFind = clicked_user.textContent;
      let foundChat = websocket_obj.chat_data.find(chat=> chat.chat_name === chatNameToFind);
      if (foundChat) {
        await handleClickedOnChatElement(foundChat);
        document.getElementById('publicChatModal').style.opacity = 1
        $('#staticBackdropProfile').modal('hide');
        $('#backdropClickedUser').modal('hide');
      } else {
        websocket_obj.new_private_chat_name = chatNameToFind
        await sendDataToBackend('set_new_private_chat')
        await sendDataToBackend('get_current_users_chats')
        document.getElementById('goToChatButton').textContent = 'Go to Chat'
        hideDiv('create_chat_alert')
      }
    }

    else if (event.target.closest('#blockUserButton')) {
      await sendDataToBackend('block_user')
      $('#backdropPrivateProfile').modal('hide');
    }
    
    else if (event.target.closest('#unblockUserButton')) {
      await sendDataToBackend('unblock_user')
      $('#backdropPrivateProfile').modal('hide');
    }
    
    else if (event.target.closest('#right-heading-name')) {
      const state = document.getElementById('right-heading-name').dataset.state
      console.log('STATE: ', state)
  
      if (state === 'private') {
        await showPrivateChatModal()
      } else {
        await showPublicChatModal()
      }
    }
    
    else if (event.target.closest('#challengeUserToGame')) {
      console.log('In inviting through chat')
      // const username = websocket_obj.username;
      sendDataToBackend('get_user_in_current_chat')
      console.log('get_user_in_current_chat ', websocket_obj.userInCurrentChat)
  
      function findOtherUserName(users, username) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].user_name !== username) {
                return users[i].user_name;
            }
        }
        return null; // Return null if the username is not found
    }
      const invited_username = findOtherUserName(websocket_obj.userInCurrentChat, websocket_obj.username);
      console.log('invited_username ', invited_username)
      // const invited_username = 'test'
      websocket_obj.invited_id = invited_username
      
      try {
        const response = await fetch(`${window.location.origin}/user/game/create/${websocket_obj.username}/${websocket_obj.invited_id}`);
        const data = await response.json();
        console.log('DATA ', data);
        // websocket_obj.active_game = data.id;
    
        if (response.ok) {
        displayError(null);
        websocket_obj.active_game = data.id;
        // console.log(data.id); // Check the console for the result
    
        // Perform actions on successful login, e.g., set isLoggedIn and userData
            console.log(data);
        } else {
        displayError(data.error);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        displayError('Error fetching user data');
      }
  
    }
    


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
            switch (response.status) {
              case 404:
                document.getElementById("loginUsername").style.border = "1px solid red";
                throw new Error('This User does not exist!');
              case 401:
                document.getElementById("loginPassword").style.border = "1px solid red";
                throw new Error('Credentials are wrong!');
              default:
                throw new Error('Unexpected Error: Failed to check Credentials')
            }
          }
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
            switch (response.status) {
              case 409:
                document.getElementById("registerUsername").style.border = "1px solid red";
                throw new Error('This Username already exist')
              default:
                throw new Error('Unexpected Error: Failed to create new Account')
            }
          }
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
      document.getElementById('loginUsername').value = null;
      document.getElementById('loginPassword').value  = null;
      document.getElementById("loginUsername").style.border = "";
      document.getElementById("loginPassword").style.border = "";
      const info_login = document.getElementById('info_login')
      info_login.style.display = 'none';
    });

    
  });
}


// dont add sidebar to push state
function showSiteHideOthers(site_to_show) {
  console.log(site_to_show);

  const sites = ['gameSite', 'statsSite', 'homeSite', 'chat', 'profileSite', 'creatorsSite'];//gameSiteStart, gameSiteInvite, gameSitePlay, gameSiteEnd
  sites.forEach(site => {
    if (site === site_to_show) showDiv(site)
    else hideDiv(site)
  });
  state.currPage = site_to_show;
  // state.bodyText = document.body.innerHTML;
  handleButtonClick("");
}



function submitForm() {
  const img = document.getElementById('profilePictureInput')
  if (img.files && img.files[0]) {
      const file = img.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageData = e.target.result;
        const formData = new FormData();
        formData.append('avatar', file);
        // if response good, assign new image && display Image
        const url = `${window.location.origin}/user/upload/avatar/${websocket_obj.username}/`
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
          websocket_obj.avatar = imageData
          displayImagePreview(imageData);
        })
        .catch(error => {
            console.error('Error:', error);
        });
      };
    reader.readAsDataURL(file);
  }
}

function displayImagePreview(imageData) {
  document.getElementById('previewImage').src = imageData;
  document.getElementById('previewContainer').style.display = 'block';
}

function setErrorWithTimout(element_id, error_message, timout) {
  const obj = document.getElementById(element_id)
  obj.textContent = error_message;
  obj.style.display = 'block';
  obj.style.color = 'red'
  setTimeout(function() {
    obj.style.display = 'none';
  }, timout);
}

async function setMessageWithTimout(element_id, message, timout) {
  const obj = document.getElementById(element_id)
  obj.textContent = message;
  obj.style.display = 'block';
  obj.style.color = 'green'
  setTimeout(async function() {
    obj.style.display = 'none';
  }, timout);
}

function hideDiv(element_id) {
  document.getElementById(element_id).classList.add('hidden')
}

function showDiv(element_id) {
  document.getElementById(element_id).classList.remove('hidden')
}

let state = { 
  bodyText: "<div id=userIsNotAuth></div>",
  currPage : "home",
//   idxState : 0
};


function render() {
	document.body.innerHTML = state.bodyText;
}


// (function initialize() {
//   window.history.replaceState(state, null, "");
//   render(state);
// })();

function handleButtonClick(url) {
  console.log("handleButtonClick");
  state.bodyText = document.body.innerHTML;
  // state.currPage = url;
	// window.history.pushState(state, null, "");
  window.history.pushState(state, null, url);
	// render(state);
}


// Tell your browser to give you old state and re-render on back
window.onpopstate = async function (event) {
	if (event.state)
		state = event.state;
	let stateJson = JSON.stringify(event.state);

  if (state.currPage === 'chat') {
    await sendDataToBackend('get_current_users_chats')
    await sendDataToBackend('get_blocked_by_user')
    await sendDataToBackend('get_blocked_user') // NEW since 02.02
    // showSiteHideOthers('chat')
  }
	
  render(state);
  // attachEventListeners();
};

//render without sidebar or close the sidebar
//logout button is not working while navigating

function rmSidebar() {
  const sidebar = document.getElementById("sidebar")

  sidebar.classList.remove("show-sidebar");
}

function rmShrinkForSites() {
  const homeSite = document.getElementById("homeSite");
  const homeImage = document.getElementById("centered-image");
  const chat = document.getElementById("chat");
  const gameSite = document.getElementById("gameSite");
  const profileSite = document.getElementById("profileSite");
  const statsSite = document.getElementById("statsSite");
  
  homeSite.classList.remove("shrink");
  homeImage.classList.remove("shrink");
  chat.classList.remove("shrink");
  gameSite.classList.remove("shrink");
  profileSite.classList.remove("shrink");
  statsSite.classList.remove("shrink");
}

function rmSidebarToggle() {
  const sidebarToggle = document.getElementById("sidebar-toggler");

  sidebarToggle.classList.add("hidden");
}

function addShrinkForSites() {
  const homeSite = document.getElementById("homeSite");
  const homeImage = document.getElementById("centered-image");
  const chat = document.getElementById("chat");
  const gameSite = document.getElementById("gameSite");
  const profileSite = document.getElementById("profileSite");
  const statsSite = document.getElementById("statsSite");
  
  homeSite.classList.add("shrink");
  homeImage.classList.add("shrink");
  chat.classList.add("shrink");
  gameSite.classList.add("shrink");
  profileSite.classList.add("shrink");
  statsSite.classList.add("shrink");
}

function addSidebarToggle() {
  const sidebarToggle = document.getElementById("sidebar-toggler");

  setTimeout(function() {
    sidebarToggle.classList.remove("hidden");
  }, 600);
}

