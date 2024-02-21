
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
          chatDom();
        })
        .catch(error => console.error('Error loading content:', error));
  }
  loadContentProfile('html/profile.html', 'profileSite');

  // document.getElementById('homeButton').addEventListener('click', function () {
  //   showSiteHideOthers('homeSite')
  // })

  // document.getElementById('showChatButton').addEventListener('click', async function () {
  //   await sendDataToBackend('get_current_users_chats')
  //   await sendDataToBackend('get_blocked_by_user')
  //   await sendDataToBackend('get_blocked_user') // NEW since 02.02
  //   showSiteHideOthers('chat')
  // })


  // document.addEventListener('DOMContentLoaded', function() {
  //   document.addEventListener('click', async function(event) {   
  //     if (event.target.id === 'homeButton')
  //       showSiteHideOthers('homeSite');
  //     if (event.target.id === 'gameButton')
  //       showSiteHideOthers('gameSite');
  //     if (event.target.id === 'nothingButton')
  //       showSiteHideOthers('nothingSite');
  //     if (event.target.id === 'profileButton')
  //       showSiteHideOthers('profileSite');
  //     if (event.target.id === 'showChatButton') {
  //       await sendDataToBackend('get_current_users_chats');
  //       await sendDataToBackend('get_blocked_by_user');
  //       await sendDataToBackend('get_blocked_user'); // NEW since 02.02
  //       showSiteHideOthers('chat');
  //     } 
  //   });
  // });


  document.addEventListener('click', async function(event) {   
    if (event.target.id === 'homeButton')
      showSiteHideOthers('homeSite');
    if (event.target.id === 'gameButton')
      showSiteHideOthers('gameSite');
    if (event.target.id === 'nothingButton')
      showSiteHideOthers('nothingSite');
    if (event.target.id === 'profileButton')
      showSiteHideOthers('profileSite')
    if (event.target.id === 'showChatButton') {
      await sendDataToBackend('get_current_users_chats')
      await sendDataToBackend('get_blocked_by_user')
      await sendDataToBackend('get_blocked_user') // NEW since 02.02
      showSiteHideOthers('chat')
    }
  });

// document.addEventListener('click', function(event) {
//   if (event.target.id === 'profileButton')
//     showSiteHideOthers('profileSite')
// });

  // document.getElementById('gameButton').addEventListener('click', async function () {
  //   showSiteHideOthers('gameSite')
  // })

  // document.getElementById('nothingButton').addEventListener('click', async function () {
  //   showSiteHideOthers('nothingSite')
  // })

  document.getElementById('profileButton').addEventListener('click', function () {
    showSiteHideOthers('profileSite')})
}



let state = { 
  bodyText: "<div id=userIsNotAuth></div>",
  currPage : "home",
//   idxState : 0
};

function showSiteHideOthers(site_to_show) {
  console.log(site_to_show);

  const sites = ['gameSite', 'nothingSite', 'homeSite', 'chat', 'profileSite'];
  sites.forEach(site => {
    if (site === site_to_show) showDiv(site)
    else hideDiv(site)
  });

  const sidebar = document.getElementById("sidebar")
  const sidebarToggle = document.getElementById("sidebar-toggler");

  const homeSite = document.getElementById("homeSite");
  const homeImage = document.getElementById("centered-image");

  const chat = document.getElementById("chat");
  const gameSite = document.getElementById("gameSite");
  const profileSite = document.getElementById("profileSite");


  homeSite.classList.remove("shrink");
  homeImage.classList.remove("shrink");
  chat.classList.remove("shrink");
  gameSite.classList.remove("shrink");
  profileSite.classList.remove("shrink");

  sidebar.classList.remove("show-sidebar");


  state.currPage = site_to_show;
  state.bodyText = document.body.innerHTML;
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
        const url = `http://127.0.0.1:6969/user/upload/avatar/${websocket_obj.username}/`
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
  console.log(element_id);
  document.getElementById(element_id).classList.remove('hidden');
}

function render() {
	document.body.innerHTML = state.bodyText;
}


// (function initialize() {
//   window.history.replaceState(state, null, "");
//   render(state);
// })();

function handleButtonClick(url) {
	window.history.pushState(state, null, url);
	// render(state);
}


// Tell your browser to give you old state and re-render on back
window.onpopstate = function (event) {
	if (event.state)
		state = event.state;
	let stateJson = JSON.stringify(event.state);

	
  render(state);
  // attachEventListeners();
};

//render without sidebar or close the sidebar
//logout button is not working while navigating



function handleDOMChanges() {
  const sidebar = document.getElementById("sidebar")
  const sidebarToggle = document.getElementById("sidebar-toggler");

  const homeSite = document.getElementById("homeSite");
  const homeImage = document.getElementById("centered-image");

  const chat = document.getElementById("chat");
  const gameSite = document.getElementById("gameSite");
  const profileSite = document.getElementById("profileSite");


  //shrink doesnt works as expected
  if (!sidebarToggle.hasEventListener) {
    sidebarToggle.addEventListener('click', function () {
      sidebar.classList.toggle("show-sidebar");
      
      if (sidebar.classList.contains("show-sidebar")){
        homeSite.classList.add("shrink");
        homeImage.classList.add("shrink");
        chat.classList.add("shrink");
        gameSite.classList.add("shrink");
        profileSite.classList.add("shrink");
      }
      else {
        homeSite.classList.remove("shrink");
        homeImage.classList.remove("shrink");
        chat.classList.remove("shrink");
        gameSite.classList.remove("shrink");
        profileSite.classList.remove("shrink");
      }
    });
    sidebarToggle.hasEventListener = true; 
  }
}


const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    // Check if the desired elements are added or modified
    handleDOMChanges();
  });
});

// Start observing the DOM
observer.observe(document.body, { childList: true, subtree: true });
