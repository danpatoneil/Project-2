
const gamersGalaLoginFormHandler = async (event) => {
  event.preventDefault();
  
  const username = document.querySelector('#username-gamers-gala-login').value.trim();
  const password = document.querySelector('#password-gamers-gala-login').value.trim();
  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  }
};

const gamersGalaLoginForm = document.querySelector('.gamers-gala-login-form');
if (gamersGalaLoginForm) {
gamersGalaLoginForm.addEventListener('submit', gamersGalaLoginFormHandler);
}