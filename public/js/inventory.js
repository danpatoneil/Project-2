// Get references to the buttons
const gamesButton = document.querySelector('#gamesModalButton');
const consoleButton = document.querySelector('#consoleModalButton');
const controllersButton = document.querySelector('#controllersModalButton');

// Get references to the modals
const gamesModal = document.querySelector('#gamesModal');
const consoleModal = document.querySelector('#consoleModal');
const controllersModal = document.querySelector('#controllersModal');

// Add event listeners to the buttons
gamesButton.addEventListener('click', () => {
  gamesModal.style.display = 'block';
});

consoleButton.addEventListener('click', () => {
  consoleModal.style.display = 'block';
});

controllersButton.addEventListener('click', () => {
  controllersModal.style.display = 'block';
});
