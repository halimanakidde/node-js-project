document.getElementById("logoutBtn").addEventListener("click", () => {
  alert("Logging out...");
  window.location.href = "login.html"; // redirect example
});

document.getElementById("woodForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Wood stock registered successfully!");
});

document.getElementById("furnitureForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Furniture stock registered successfully!");
});
