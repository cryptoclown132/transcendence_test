const sidebar = document.getElementById("sidebar")
const sidebarToggle = document.getElementById("sidebar-toggler");

sidebarToggle.addEventListener('click', function () {
    // if (!sidebar.classList.contains("show-sidebar"))
    sidebar.classList.toggle("show-sidebar");
    // else
    //     sidebar.classList.remove("show-sidebar");
})