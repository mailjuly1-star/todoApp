const todosOverlay = document.getElementById("todosOverlay");

export function showLoader() {
  todosOverlay.style.display = "flex";
}

export function hideLoader() {
  todosOverlay.style.display = "none";
}
