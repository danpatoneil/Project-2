// Get the form element
const createPartyForm = document.getElementById('create-party-form');

// Add event listener to the form submission
createPartyForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get the party name input value
  const partyNameInput = document.getElementById('party-name');
  const partyName = partyNameInput.value.trim();

  // Log the party name to the console
  console.log('Party Name:', partyName);

  // Reset the form
  createPartyForm.reset();
});
