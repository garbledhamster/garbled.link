// Initialize Feather Icons
feather.replace();

let selectedTitle = "";
let selectedURL = "";

// Toggle LEFT Navigation Menu
function toggleNavMenu() {
  const navMenu = document.getElementById("nav-menu");
  const toggler = document.getElementById("navbar-toggler");
  navMenu.classList.toggle("show");
  toggler.classList.toggle("open");
}

// Toggle RIGHT Navigation Menu
function toggleNavMenuRight() {
  const navMenuRight = document.getElementById("nav-menu-right");
  const togglerRight = document.getElementById("navbar-toggler-right");
  navMenuRight.classList.toggle("show");
  togglerRight.classList.toggle("open");
}

/**
 * Select a Project
 * @param {string} title        - The project's title or domain.
 * @param {string} url          - The project's URL to load in the iframe.
 * @param {string} description  - A short explanation of the project's purpose.
 */
function selectProject(title, url, description) {
  selectedTitle = title;
  selectedURL = url;
  const mdContent = document.getElementById("md-content");

  // Show the description for now (before loading the project)
  mdContent.innerHTML = `
    <h2>${title}</h2>
    <p>${description}</p>
    <p><strong>Project selected.</strong> Click "Show Project" to view.</p>
  `;

  // Hide iframe and show cover
  const cover = document.getElementById("cover");
  const iframe = document.getElementById("iframe-app");
  iframe.style.display = "none";
  cover.style.display = "flex";

  // Close the left nav menu after selection
  toggleNavMenu();
}

// Show Project in Iframe
function showProject() {
  if (selectedURL) {
    const cover = document.getElementById("cover");
    const iframe = document.getElementById("iframe-app");
    cover.style.display = "none";
    iframe.style.display = "block";
    iframe.src = selectedURL;
  } else {
    alert("Please select a project from the menu first.");
  }
}

// Dynamically build the left menu
function buildLeftMenu(leftMenuData) {
  const leftMenuContainer = document.getElementById("left-menu-content");
  
  leftMenuData.forEach(categoryObj => {
    // Create category heading
    const categoryHeading = document.createElement("div");
    categoryHeading.innerHTML = `<strong>${categoryObj.category}</strong>`;
    leftMenuContainer.appendChild(categoryHeading);
    
    // For each item in this category
    categoryObj.items.forEach(item => {
      const link = document.createElement("a");
      link.href = "#";
      link.innerText = item.label;
      link.onclick = () => selectProject(item.label, item.url, item.description);
      leftMenuContainer.appendChild(link);
    });
  });
}

// Dynamically build the right menu
function buildRightMenu(rightMenuData) {
  const rightMenuContainer = document.getElementById("right-menu-content");
  
  rightMenuData.forEach(categoryObj => {
    // Create category heading
    const categoryHeading = document.createElement("div");
    categoryHeading.innerHTML = `<strong>${categoryObj.category}</strong>`;
    rightMenuContainer.appendChild(categoryHeading);
    
    // For each item in this category
    categoryObj.items.forEach(item => {
      // Just direct links here, no iframe logic
      const link = document.createElement("a");
      link.href = item.url;
      link.innerText = item.label;
      link.target = "_blank"; 
      rightMenuContainer.appendChild(link);
    });
  });
}

function adjustViewportHeight() {
  const vh = window.innerHeight * 0.01; // 1% of the viewport height
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

// Call on load
adjustViewportHeight();
window.addEventListener("resize", adjustViewportHeight);

// Fetch and Parse YAML Menus
fetch("data/menus.yaml")
  .then(response => response.text())
  .then(yamlText => {
    // Parse the YAML text into a JS object
    const data = jsyaml.load(yamlText);

    // Build the left & right menus
    buildLeftMenu(data.leftMenu);
    buildRightMenu(data.rightMenu);
  })
  .catch(error => {
    console.error("Error loading or parsing menus.yaml:", error);
  });

// Optional Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(function(registration) {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch(function(error) {
      console.log("Service Worker registration failed:", error);
    });
}
