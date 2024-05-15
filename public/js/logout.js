const gamersGalaLogout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace('/'); // Redirect to the homepage
  } else {
    alert('Failed to log out.'); 
  }
};
// Add an event listener to the logout button
const gamersGalaLogoutButton = document.querySelector('#gamers-gala-logout');
if (gamersGalaLogoutButton) {
  gamersGalaLogoutButton.addEventListener('click', gamersGalaLogout);
}