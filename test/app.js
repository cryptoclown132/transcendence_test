document.addEventListener('DOMContentLoaded', function() {
    var trigger = document.querySelector('.hamburger');
    var overlay = document.querySelector('.overlay');
    var isClosed = false;
  
    trigger.addEventListener('click', function() {
      hamburger_cross();
    });
  
    function hamburger_cross() {
      if (isClosed) {
        overlay.style.display = 'none';
        trigger.classList.remove('is-open');
        trigger.classList.add('is-closed');
        isClosed = false;
      } else {
        overlay.style.display = 'block';
        trigger.classList.remove('is-closed');
        trigger.classList.add('is-open');
        isClosed = true;
      }
    }
  
    var offcanvasToggle = document.querySelectorAll('[data-toggle="offcanvas"]');
    offcanvasToggle.forEach(function(item) {
      item.addEventListener('click', function() {
        var wrapper = document.getElementById('wrapper');
        wrapper.classList.toggle('toggled');
      });
    });
  });
  