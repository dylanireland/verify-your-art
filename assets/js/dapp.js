const walletConnectModal = document.getElementById("walletConnectModal");
const actionbutton = document.getElementById("actionbutton");

const metamaskButton = walletConnectModal.getElementsByClassName("left");
const magicButton = walletConnectModal.getElementsByClassName("right");

const modal = document.getElementById("modal");

if (!!metamaskButton && metamaskButton.length > 0) {
  metamaskButton[0].onclick = function () {
    getAccounts().then(() => {
      actionbutton.innerHTML = "Upload File";
    }).catch((error) => {
      console.log(error);
    });
  }
}

if (!!magicButton && magicButton.length > 0) {
  magicButton[0].onclick = function () {
    moveToEmail();
    getMagic().then(() => {
      actionbutton.innerHTML = "Upload File";
    }).catch((error) => {
      console.log(error);
    });
  }
}

if (!!walletConnectModal) {
  actionbutton.onclick = function () {
    walletConnectModal.style.display = "block";
  }

  walletConnectModal.onclick = function () {
    walletConnectModal.style.display = "none";
  }
}

function moveToEmail() {
  modal.getElementsByClassName("left")[0].style.display = "none";
  modal.getElementsByClassName("right")[0].style.display = "none";
  const html = "<div id='emailFormDiv'><form><input type='email' required><input type='submit'></form></div>";
  modal.appendChild(html);
}
