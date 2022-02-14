const magic = new Magic('pk_live_C0CA55EAA4B85524');

/* 3. Implement Render Function */
const render = async () => {
  let html = '';

  /*
    For this tutorial, our callback route is simply "/callback"
  */
  if (window.location.pathname === '/callback') {
    try {
      /* Complete the "authentication callback" */
      await magic.auth.loginWithCredential();

      /* Get user metadata including email */
      const userMetadata = await magic.user.getMetadata();

      html = `
        <h1>Current user: ${userMetadata.email}</h1>
        <button onclick="handleLogout()">Logout</button>
      `;
    } catch {
      /* In the event of an error, we'll go back to the login page */
      window.location.href = window.location.origin;
    }
  } else {
    const isLoggedIn = await magic.user.isLoggedIn();

    /* Show login form if user is not logged in */
    html = `
      <h1>Please sign up or login</h1>
      <form onsubmit="handleLogin(event)">
        <input type="email" name="email" required="required" placeholder="Enter your email" />
        <button type="submit">Send</button>
      </form>
    `;

    if (isLoggedIn) {
      /* Get user metadata including email */
      const userMetadata = await magic.user.getMetadata();
      html = `
        <h1>Current user: ${userMetadata.email}</h1>
        <button onclick="handleLogout()">Logout</button>
      `;
    }
  }

  document.getElementById('app').innerHTML = html;
};


/* 4. Implement Login Handler */
const handleLogin = async e => {
  e.preventDefault();
  const email = new FormData(e.target).get('email');
  const redirectURI = `${window.location.origin}/callback`; // 👈 This will be our callback URI
  if (email) {
    /* One-liner login 🤯 */
    await magic.auth.loginWithMagicLink({ email, redirectURI }); // 👈 Notice the additional parameter!
    render();
  }
};

/* 5. Implement Logout Handler */
const handleLogout = async () => {
  await magic.user.logout();
  render();
};
