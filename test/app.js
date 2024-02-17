

  const editButton = document.getElementById("editButton");
  const saveButton = document.getElementById("saveButton");
  const globalStatsButton = document.getElementById("globalStatsButton");
  const statsButton = document.getElementById("statsButton");
  const userStats = document.getElementById("userStats");
  const globalStats = document.getElementById("globalStats");


// if (!editButton.hasEventListener) {
editButton.addEventListener('click', function () {
toggleEdit();
});
saveButton.addEventListener('click', function () {
saveChanges();
});
//   editButton.hasEventListener = true;
// }
globalStatsButton.addEventListener('click', function() {
    console.log("gloabl statst");
    globalStats.classList.remove("hidden");
    userStats.classList.add("hidden");
});

statsButton.addEventListener('click', function() {
    console.log("normal stats");
    globalStats.classList.add("hidden");
    userStats.classList.remove("hidden");
});


function toggleEdit() {
  let inputs = document.querySelectorAll('input[readonly]');

  inputs.forEach(input => input.removeAttribute('readonly'));
  editButton.style.display = 'none';
  saveButton.style.display = 'block';
}

function saveChanges() {
  let emailValue = document.getElementById("email").value;
  let locationValue = document.getElementById("location").value;
  let ageValue = document.getElementById("age").value;

  document.getElementById("email").setAttribute('readonly', true);
  document.getElementById("location").setAttribute('readonly', true);
  document.getElementById("age").setAttribute('readonly', true);
  editButton.style.display = 'block';
  saveButton.style.display = 'none';
}
