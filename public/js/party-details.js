// Function to handle the search form submission

const searchModal = document.querySelector('#searchModal');
document.querySelector('#searchModalButton').addEventListener('click', () => {
    searchModal.style.display = 'block';
    // searchModal.ariaHidden = false;
});
// Add event listeners to the search form and close button
document.getElementById('search-players-form').addEventListener('submit', handleSearchFormSubmit);
document.getElementById('searchModal').addEventListener('hidden.bs.modal', handleCloseButton);
getAttendees();

async function handleSearchFormSubmit(event) {
  event.preventDefault();

  // Get the search input value
  const searchInput = document.getElementById('search').value.trim();

  // Perform the search based on the input values
  // Your code here...
  const response = await fetch('/api/friends/'+searchInput, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json'
    }
  });
  if(response.ok){

  }
}
//gets all attendees of the party
async function getAttendees() {
    const response = await fetch('/api/parties/attendees/'+partyData.id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(response.ok){
        const data = await response.json()
        const attendees = data.attendees;
        // console.log(attendees);
        return attendees;
    }
}

// Function to handle the close button in the search modal
function handleCloseButton() {
  // Close the search modal
  $('#searchModal').modal('hide');
}












