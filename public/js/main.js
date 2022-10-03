const button = document.querySelector(".btn-primary");

button?.addEventListener("click", (e) => {
  e.preventDefault();
  location.href = "/home";
});
