const userList = document.getElementById("userList");
const modal = document.getElementById("modal");
const userDetails = document.getElementById("userDetails");
const closeModal = document.getElementById("closeModal");

async function fetchUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) throw new Error("Network error");
    const users = await response.json();
    displayUsers(users);
  } catch (error) {
    userList.innerHTML = `<p style="color: red;">Error loading users: ${error.message}</p>`;
  }
}

function displayUsers(users) {
  users.forEach((user) => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.textContent = user.name;
    card.addEventListener("click", () => showDetails(user));
    userList.appendChild(card);
  });
}

function showDetails(user) {
  userDetails.innerHTML = `
    <h2>${user.name}</h2>
    <p><strong>Username:</strong> ${user.username}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Phone:</strong> ${user.phone}</p>
    <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
    <p><strong>Company:</strong> ${user.company.name}</p>
    <p><strong>Address:</strong> ${user.address.suite}, ${user.address.street}, ${user.address.city}, ${user.address.zipcode}</p>
  `;
  modal.classList.remove("hidden");
}

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Load users on page load
fetchUsers();
