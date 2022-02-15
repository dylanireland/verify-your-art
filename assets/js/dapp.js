const walletConnectModal = document.getElementById("walletConnectModal");
const actionbutton = document.getElementById("actionbutton");

const metamaskButton = document.getElementById("metamaskButton");
const magicButton = document.getElementById("magicButton");

const modal = document.getElementById("modal");

if (metamaskButton) {
  metamaskButton.onclick = function () {
    getAccounts().then(() => {
      actionbutton.innerHTML = "Upload File";
    }).catch((error) => {
      console.log(error);
    });
  }
}

if (magicButton) {
  magicButton.onclick = function () {
    moveToEmail();
  }
}

if (walletConnectModal) {
  walletConnectModal.addEventListener('click', function(event) {
    if (event.target.matches("#walletConnectModal")) {
      walletConnectModal.style.display = "none";
      if (document.getElementById("emailFormDiv")) {
        document.getElementById("emailFormDiv").remove();
        metamaskButton.style.display = "flex";
        magicButton.style.display = "flex";
        modal.appendChild(metamaskButton);
        modal.appendChild(magicButton);
      }
    }
  });
}

function moveToEmail() {
  metamaskButton.style.display = "none";
  magicButton.style.display = "none";
  const html = "<div id='emailFormDiv'><h3>Please enter your email address</h3><form id='emailForm' action='javascript:connectToMagicWithEmail();'><label><input id='emailField' type='email' name='email' placeholder='Email'></input><span class='colorific'>Email</span></label><input id='submitEmail' class='button' type='submit' value='Sign In'></form></div>";
  modal.innerHTML = html;
}

function actionRouting() {
  if (actionbutton.value == "Connect Wallet") {
    walletConnectModal.style.display = "block";
  } else if (actionbutton.value == "Upload File") {
    document.getElementById("uploadfilebutton").click();
  } else if (actionbutton.value == "Verify") {

  }
}

function connectToMagicWithEmail() {
  const email = document.getElementById("emailField").value;
  //Do email verification here
  getMagic(email).then(() => {
    walletConnectModal.style.display = "none";
    actionbutton.value = "Upload File";
  }).catch((error) => {
    console.log(error);
  });
}

function placeImage(input) {
  try {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(input.files[0]);
      reader.onload = function (e) {
        document.getElementById('image').src = e.target.result;
        actionbutton.value = "Verify";
      };

    }
  } catch (error) {
    console.log(error);
  }

}
