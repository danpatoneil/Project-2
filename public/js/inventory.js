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

// Get references to the close buttons
const closeButtonGames = document.querySelector('#gamesModal .close');
const closeButtonConsole = document.querySelector('#consoleModal .close');
const closeButtonControllers = document.querySelector('#controllersModal .close');

// Add event listeners to the close buttons
closeButtonGames.addEventListener('click', () => {
  gamesModal.style.display = 'none';
});

closeButtonConsole.addEventListener('click', () => {
  consoleModal.style.display = 'none';
});

closeButtonControllers.addEventListener('click', () => {
  controllersModal.style.display = 'none';
});

