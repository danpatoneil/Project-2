const gamersGalaSignupFormHandler = async (event) => {
  event.preventDefault();
  const username = document.querySelector('#username').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (username && email && password) {
    try {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Sign up failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      alert('An error occurred while signing up. Please try again.');
    }
  }
};

const gamersGalaSignupForm = document.querySelector('#signup-form');
if (gamersGalaSignupForm) {
  gamersGalaSignupForm.addEventListener('submit', gamersGalaSignupFormHandler);
}