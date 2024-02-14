function handleDOMChangesProfile() {
  
    const sidebar = document.getElementById("sidebar")
    const sidebarToggle = document.getElementById("sidebar-toggler");
  
    const profileSite = document.getElementById("profileSite");
  
    sidebarToggle.addEventListener('click', function () {
        console.log("profile shrinkin");
      if (sidebar.classList.contains("show-sidebar")) 
        profileSite.classList.add("shrink");
      else
        profileSite.classList.remove("shrink");
    });
  }
  
  
  const observerProfile = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      // Check if the desired elements are added or modified
      handleDOMChangesProfile();
    });
  });
  
  // Start observing the DOM
  observerProfile.observe(document.body, { childList: true, subtree: true });