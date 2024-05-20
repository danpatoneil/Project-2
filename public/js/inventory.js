// Get references to the buttons
const gamesButton = document.querySelector('#gamesModalButton');
const consoleButton = document.querySelector('#consoleModalButton');
const controllersButton = document.querySelector('#controllersModalButton');
const addItemButton = document.querySelector('#addItemModalButton');

// Get references to the modals
const gamesModal = document.querySelector('#gamesModal');
const consoleModal = document.querySelector('#consoleModal');
const controllersModal = document.querySelector('#controllersModal');
const addItemModal = document.querySelector('#addItemModal');

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

addItemButton.addEventListener('click', () => {
  addItemModal.style.display = 'block';
  
});

// Get references to the close buttons
const closeButtonGames = document.querySelector('#gameClose');
const closeButtonConsole = document.querySelector('#consoleClose');
const closeButtonControllers = document.querySelector('#controllerClose');
const closeButtonAddItem = document.querySelector('#addItemClose');

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

closeButtonAddItem.addEventListener('click', () => {
  addItemModal.style.display = 'none';
});


const itemForm = document.querySelector('#addItemFormBody');
// save button on the add item modal
const saveButton = document.querySelector('#saveButton');
saveButton.addEventListener('click', async (event) => {
  //event.preventDefault();

  // Get the values from the form
  const itemName = document.querySelector('#itemName').value.trim();
  const itemCategory = document.querySelector('#itemCategory').value.trim();
  itemForm.innerHTML = "";


  if(itemCategory === 'Controller'){

  }else{
    const response = await fetch('/igdb/', {
          method: 'POST',
          body: JSON.stringify({ itemName, itemCategory }),
          headers: { 'Content-Type': 'application/json' }
      });
 
      if(response.ok){
        const data = await response.json();
        

        const wrapper = document.createElement('div');
        
        for(i = 0; i< data.length; i++){
          let div = document.createElement('div');
          div.setAttribute('class', 'form-check');
          let input = document.createElement('input');
          let label = document.createElement('label');
          input.setAttribute('type', 'radio');
          input.setAttribute('class', 'form-check-input');
          input.setAttribute('name', 'gameSelection');
          input.setAttribute('value', `option${i+1}`);
          label.textContent = data[i].name;
          div.append(input);
          div.append(label);
          wrapper.append(div);
        }
        itemForm.append(wrapper);
        saveButton.textContent = "Save";


      }else{
        console.log('nothing returned');
      }
    
  }
  
  
  
  
  
  // Create a new item object
  // const newItem = {
  //   name: itemName,
  //   category: itemCategory,
  // };

  // // Save the new item
  // saveItem(newItem);

  // // Close the modal
  // addItemModal.style.display = 'none';
});






