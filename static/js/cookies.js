const cookiesDialog = document.querySelector(".cookies-dialog");
const cookiesButton = document.querySelector(".cookies-button");

cookiesButton.addEventListener("click", () => {
  localStorage.setItem("cookiesDialogAccepted", "true");
  cookiesDialog.close();
});

setTimeout(() => {
  if (!localStorage.getItem("cookiesDialogAccepted")) {
    cookiesDialog.show();
  }
}, 1000);
