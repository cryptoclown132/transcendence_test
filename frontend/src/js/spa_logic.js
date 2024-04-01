let state = { 
	bodyText: "<div id=userIsNotAuth></div>",
	currPage: "home",
  chatObj: {},
  chatOpen: false,
  // groupChatName: "",
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



state.bodyText = document.body.innerHTML;
// console.log(state.bodyText);


// state.currPage = url;
  // window.history.pushState(state, null, "");
window.history.pushState(state, null, url);
  // render(state);
}
  
  
// Tell your browser to give you old state and re-render on back
window.onpopstate = async function (event) {
	if (event.state)
		state = event.state;
	// let stateJson = JSON.stringify(event.state);

  // console.log(state.chatObj);

  console.log('currpage rt:', state.currPage);
	if (state.currPage === 'chat' || state.currPage === 'group_chat') {
    console.log('inside chat if');

		await sendDataToBackend('get_current_users_chats')
		await sendDataToBackend('get_blocked_by_user')
		await sendDataToBackend('get_blocked_user') // NEW since 02.02


    // showSiteHideOthers('chat')
    // hideDiv('messageSide');
    // document.getElementById('right-heading-name').textContent = "";
    // chat_avatar.src = "../img/ballWithEye.jpg";

    // state.bodyText 
  }
	if (state.currPage === 'group_chat') {
    console.log('inside group chat if')
		await handleClickedOnChatElement(state.chatObj);
  }
  if (state.currPage === 'invites')
    await requestInvites();

	render(state);
	// attachEventListeners();
};

async function handleClickEvent(event) {
  // console.log(event);
	if (event.target.closest('#homeButton'))
		showSiteHideOthers('homeSite');
  else if (event.target.closest('#gameButton'))
      gameSiteClicked();
  else if (event.target.closest('#statsButton'))
		showSiteHideOthers('statsSite');
  else if (event.target.closest('#showChatButton')){
    await sendDataToBackend('get_current_users_chats')
    await sendDataToBackend('get_blocked_by_user')
    await sendDataToBackend('get_blocked_user') // NEW since 02.02
    
    console.log(document.body.innerHTML);
    showSiteHideOthers('chat')
    hideDiv('messageSide');
    document.getElementById('right-heading-name').textContent = "";
    chat_avatar.src = "../img/ballWithEye.jpg";
		// await chatSiteClicked();
  }
  else if (event.target.closest('#profileButton'))
		showSiteHideOthers('profileSite');
  else if (event.target.closest('#creatorsButton'))
		showSiteHideOthers('creatorsSite');
  else if (event.target.closest('#logoutButton'))
		await logoutUser();
  else if (event.target.closest('#renderInv'))
      invSiteClicked();
  else if (event.target.closest('#goBackToStart'))
    gameSiteClicked();

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
    // await sendMessage();
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
      // await openChat();
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
  
      if (state === 'private')
        await showPrivateChatModal()
      else
        await showPublicChatModal()
	}
  else if (event.target.closest('#challengeUserToGame')) {
      console.log('In inviting through chat')
      // const username = websocket_obj.username;
      sendDataToBackend('get_user_in_current_chat')
      console.log('get_user_in_current_chat ', websocket_obj.userInCurrentChat)

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
	
  else if (event.target.closest('#loginUserButton'))
    loginUserButton();
  else if (event.target.closest('#RegisterUserButton'))
    RegisterUserButton();
  else if (event.target.closest('#changeToLoginPageButton'))
    changeToLoginPageButton();
  else if (event.target.closest('#changeToRegisterPageButton'))
    changeToRegisterPageButton();
}





function gameSiteClicked() {
  document.getElementById('start-screen').classList.remove('hidden');
  document.getElementById('invites-screen').classList.add('hidden');
  document.getElementById('waitingScreen').classList.add('hidden');
  document.getElementById('game-screen').classList.add('hidden');
  document.getElementById('winningScreen').classList.add('hidden');
  document.getElementById('endScreen').classList.add('hidden');
  showSiteHideOthers('gameSite');
}

async function chatSiteClicked() {
  await sendDataToBackend('get_current_users_chats')
  await sendDataToBackend('get_blocked_by_user')
  await sendDataToBackend('get_blocked_user') // NEW since 02.02
  showSiteHideOthers('chat')
  hideDiv('messageSide');
  document.getElementById('right-heading-name').textContent = "";
  chat_avatar.src = "../img/ballWithEye.jpg";
}

function invSiteClicked() {
  state.currPage = 'invites';
  handleButtonClick("");
}

async function sendMessage() {
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

async function openChat() {
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