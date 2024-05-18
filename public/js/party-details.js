// Function to handle the search form submission
function handleSearchFormSubmit(event) {
  event.preventDefault();
  
  // Get the search input value
  const searchInput = document.getElementById('search').value.trim();
  
  // Get the search by select value
  const searchBySelect = document.getElementById('searchBy');
  const searchBy = searchBySelect.options[searchBySelect.selectedIndex].value;
  
  // Perform the search based on the input values
  // Your code here...
}

// Function to handle the close button in the search modal
function handleCloseButton() {
  // Close the search modal
  $('#searchModal').modal('hide');
}

// Add event listeners to the search form and close button
document.getElementById('search-players-form').addEventListener('submit', handleSearchFormSubmit);
document.getElementById('searchModal').addEventListener('hidden.bs.modal', handleCloseButton);
