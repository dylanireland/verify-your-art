
const m = new Magic('pk_live_A3E1A7E0521D8F0C');
m.preload;
var provider;

if (window.ethereum != null) {
  provider = new ethers.providers.Web3Provider(window.ethereum);
} else {
  console.log("No Provider");
}

// MetaMask requires requesting permission to connect users accounts

async function getAccounts() {
  try {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log(signer);
  } catch (error) {
    console.log(error);
  }
}

async function getMagic(email) {
  try {
    await m.auth.loginWithMagicLink({ email: email });
  } catch (error) {
    console.log("Magic error: " + error);
  }
}
