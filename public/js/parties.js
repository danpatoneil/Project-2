// // Get the form element
const createPartyForm = document.getElementById('create-party-form');
// Add event listener to the form submission
createPartyForm.addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get the party name input value
  const partyNameInput = document.getElementById('party-name');
  const partyName = partyNameInput.value.trim();
    console.log(partyName);
//api call to create new party
  const response = await fetch('/api/parties/', {
    method: 'POST',
    body: JSON.stringify({name:partyName}),
    headers: {
        'Content-Type': 'application/json'
    }
  })
  console.log(response);
  if (response.ok){
    loadParties()
  }

  // Reset the form
  createPartyForm.reset();
});
// runs loadParties on page load
document.addEventListener('DOMContentLoaded', loadParties());

    //gets a list of all parties owned by the logged in user
async function loadParties() {
    const response = await fetch('/api/parties/owned/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    //I tried to get the handlebars {{each}} to work but I couldn't load the api call in the other api call that loads the page and thus the HTML didn't know what "parties" meant so I had to do it in js. if you know how to do it in handlebars from here, please feel free to
    if (response.ok) {
        const parties = await response.json();
        const partyList = document.getElementById('party-list');
        partyList.innerHTML = '';
        parties.forEach(party => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            const header = document.createElement('h5')
            header.textContent = party.name;
            link.href = `party-details/${party.id}`;
            listItem.classList = 'mb-4 text-center'
            link.classList = 'mb-4 text-white';
            link.appendChild(header);
            listItem.appendChild(link);
            partyList.appendChild(listItem);
        });
    } else {
        console.error('Failed to fetch parties');
    }
}
