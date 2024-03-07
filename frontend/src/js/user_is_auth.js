
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

  document.addEventListener('click', async function(event) {   
    console.log(event.target);
    console.log(event.target.id);
    
    if (event.target.id === 'homeButton')
      showSiteHideOthers('homeSite');
    else if (event.target.id === 'gameButton')
      showSiteHideOthers('gameSite');
    else if (event.target.id === 'statsButton')
      showSiteHideOthers('statsSite');
    else if (event.target.id === 'showChatButton') {
      await sendDataToBackend('get_current_users_chats')
      await sendDataToBackend('get_blocked_by_user')
      await sendDataToBackend('get_blocked_user') // NEW since 02.02
      showSiteHideOthers('chat')
    }
    else if (event.target.closest('#profileButton'))
      showSiteHideOthers('profileSite');

    var trigger = document.querySelector('.hamburger');
    var overlay = document.querySelector('.overlay');
    if (!trigger.hasEventListener) {
      trigger.hasEventListener = true;
        trigger.addEventListener('click', function() {
          event.stopPropagation();
          if (document.getElementById("sidebar-toggler").classList.contains("is-closed")) {
            console.log("shop closes");
            console.log(document.getElementById("sidebar-toggler").classList.contains("is-closed"));
            
            overlay.style.display = 'block';
            trigger.classList.remove('is-closed');
            trigger.classList.add('is-open');
            addShrinkForSites();
           
          }
          else {
            console.log(document.getElementById("sidebar-toggler").classList.contains("is-closed"));
            console.log("shop opens");
            overlay.style.display = 'none';
            trigger.classList.remove('is-open');
            trigger.classList.add('is-closed');
            
            rmShrinkForSites();
          }
        });
        var offcanvasToggle = document.querySelectorAll('[data-toggle="offcanvas"]');
        offcanvasToggle.forEach(function(item) {
          item.addEventListener('click', function() {
            var wrapper = document.getElementById('wrapper');
            wrapper.classList.toggle('toggled');
          });
        });
    } 
  });
}


// dont add sidebar to push state
function showSiteHideOthers(site_to_show) {
  console.log(site_to_show);

  const sites = ['gameSite', 'statsSite', 'homeSite', 'chat', 'profileSite'];
  sites.forEach(site => {
    if (site === site_to_show) showDiv(site)
    else hideDiv(site)
  });


  if (!document.getElementById("sidebar-toggler").classList.contains("is-closed")) {
   
    var trigger = document.querySelector('.hamburger');
    var overlay = document.querySelector('.overlay');
    overlay.style.display = 'none';
    trigger.classList.remove('is-open');
    trigger.classList.add('is-closed');
    
    var wrapper = document.getElementById('wrapper');
    wrapper.classList.toggle('toggled');
    rmShrinkForSites();
  }








  // rmSidebar();

  // rmShrinkForSites();
  // addSidebarToggle();

  state.currPage = site_to_show;
  state.bodyText = document.body.innerHTML;
  handleButtonClick("");
}

/* function showSiteHideOthers(site_to_show) {
  const sites = ['gameSite', 'nothingSite', 'homeSite', 'chat'];
  sites.forEach(site => {
    if (site === site_to_show) showDiv(site)
    else hideDiv(site)
  });
} */

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

