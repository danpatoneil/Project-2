const itemForm = document.querySelector('#addItemFormBody');
const gamesList = document.querySelector('#ownedGamesList');
const consolesList = document.querySelector('#ownedConsolesList');
const controllersList = document.querySelector('#ownedControllersList');



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
// gamesButton.addEventListener('click', async () => {
  
//   gamesModal.style.display = 'block';
// });

// consoleButton.addEventListener('click', () => {
//   consoleModal.style.display = 'block';
// });

// controllersButton.addEventListener('click', () => {
//   controllersModal.style.display = 'block';
// });

addItemButton.addEventListener('click', () => {
  itemForm.innerHTML = "";
  itemForm.innerHTML=`<div class="form-group">
              <label for="itemCategory">Item Category</label>
              <select id="itemCategory">
                <option>Game</option>
                <option>Console</option>
                <option>Controller</option>
              </select>
            </div>
            <div class="form-group">
              <label for="itemName">Item Name</label>
              <input type="text" class="form-control" id="itemName" placeholder="Enter item name">
            </div>`;
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
  saveButton.setAttribute('state', 'search');
  addItemModal.style.display = 'none';
  window.location.reload(true);
});



// save button on the add item modal
const saveButton = document.querySelector('#saveButton');
saveButton.addEventListener('click', async (event) => {
  //event.preventDefault();
  let itemName = "";
  let itemCategory = ""; 
  debugger;
  const buttonState = saveButton.getAttribute('state');
  console.log(buttonState);
  
  // Get the values from the form
  if(buttonState === "search"){
    itemName = document.querySelector('#itemName').value.trim();
    itemCategory = document.querySelector('#itemCategory').value.trim();
  }else{
    itemCategory = saveButton.getAttribute('category');
  }
  console.log(itemCategory);

  if(buttonState === "search" && itemCategory.toLowerCase() != 'controller' ){
    console.log('loop 1');
    itemForm.innerHTML = ""; 
    const response = await fetch('/api/igdb/', {
          method: 'POST',
          body: JSON.stringify({ itemName, itemCategory }),
          headers: { 'Content-Type': 'application/json' }
      });

    if(response.ok){
      const data = await response.json();
      
      // console.log(data);

      const wrapper = document.createElement('div');
      
      for(let i = 0; i< data.length; i++){
        let div = document.createElement('div');
        div.setAttribute('class', 'form-check');
        let input = document.createElement('input');
        let label = document.createElement('label');
        input.setAttribute('type', 'radio');
        input.setAttribute('class', 'form-check-input');
        input.setAttribute('name', 'Selection');
        input.setAttribute('value', data[i].name);
        label.textContent = data[i].name;
        input.setAttribute(`${itemCategory.toLowerCase()}Id`, data[i].id);
        div.append(input);
        div.append(label);
        wrapper.append(div);
      }
      itemForm.append(wrapper);
      saveButton.setAttribute('state', 'save');
      saveButton.setAttribute('category', itemCategory);
      saveButton.textContent = "Save";


    }else{
      console.log('nothing returned');
    }
  
  
  } else {
    console.log('loop 2');

    // if(itemCategory.toLowerCase()!='controller'){
    //   itemCategory = saveButton.getAttribute('category');
    // }

    if(itemCategory.toLowerCase() === 'game'){
      let gameId;
      const gameChoices = document.getElementsByName('Selection');
      //console.log(gameChoices);
      for(let i =0;i<gameChoices.length;i++){
        if(gameChoices[i].checked){
          console.log(gameChoices[i].value);
          console.log(gameChoices[i].getAttribute('gameId'));
          gameId = gameChoices[i].getAttribute('gameId');
        }
      }
      itemCategory +='s';

      const response = await fetch(`/api/hardware/${itemCategory.toLowerCase()}/${gameId}`, {
        method: 'POST',
        body: JSON.stringify({ game_id: gameId }),
        headers: { 'Content-Type': 'application/json' }
      });

      saveButton.setAttribute('state', 'search');
      window.location.reload(true);

    }else if(itemCategory.toLowerCase() === 'console'){
      let consoleId;
      const consoleChoices = document.getElementsByName('Selection');
      //console.log(consoleChoices);
      for(let i =0;i<consoleChoices.length;i++){
        if(consoleChoices[i].checked){
          console.log(consoleChoices[i].value);
          console.log(consoleChoices[i].getAttribute('consoleId'));
          consoleId = consoleChoices[i].getAttribute('consoleId');
        }
      }
      itemCategory +='s';

      const response = await fetch(`/api/hardware/${itemCategory.toLowerCase()}/${consoleId}`, {
        method: 'POST',
        body: JSON.stringify({ console_id: consoleId }),
        headers: { 'Content-Type': 'application/json' }
      });

      saveButton.setAttribute('state', 'search');
      window.location.reload(true);
    }else if(itemCategory.toLowerCase() === 'controller'){
      console.log('Save controller');
      let catController = itemCategory;
      catController +='s';
      const response = await fetch(`/api/hardware/${catController.toLowerCase()}/${itemName}`, {
        method: 'POST'
      });

      saveButton.setAttribute('state', 'search');
      window.location.reload(true);
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


if(window.location.href.indexOf('inventory') >-1){
  document.addEventListener('DOMContentLoaded', async ()=>{
    const response = await fetch(`/api/hardware/`, {
      method: 'GET',
      });
      if(response.ok){
        const inventoryData = await response.json();
        // console.log(inventoryData.consoleUsers);
        //console.log(inventoryData.controllers);
        // console.log(inventoryData.gameUsers);
  
        for(let i=0; i<inventoryData.gameUsers.length; i++){
          const rez=await fetch(`/api/igdb/game/${inventoryData.gameUsers[i].game_id}`,{
            method: 'POST'
          });
          if(rez.ok){
            const gamesData = await rez.json();
            for(let i=0; i<gamesData.length; i++){
              let li = document.createElement('li');
              let inner = `<img src="${gamesData[i].cover}" width="20px" >  <span class="inventoryList">${gamesData[i].name}</span>  <button itemcategory="games" itemid="${gamesData[i].id}"class="delete-trigger btn btn-outline-danger btn-sm" aria-label="Delete" type="button">
              <span aria-hidden="true">&times;</span>
            </button>`;
              //let img = document.createElement('img');
              //img.src = gamesData[i].cover;
              //console.log(img);
              //console.log(inner);
              // li.append(img);
              // li.textContent = gamesData[i].name;
              li.innerHTML = inner;
              gamesList.append(li);
              //console.log(img.src);
            }
          }
        }
  
        for(let i=0; i<inventoryData.consoleUsers.length; i++){
          const rez=await fetch(`/api/igdb/platform/${inventoryData.consoleUsers[i].console_id}`,{
            method: 'POST'
          });
          if(rez.ok){
            const platformData = await rez.json();
            for(let i=0; i<platformData.length; i++){
              let li = document.createElement('li');
              let inner = `<img src="${platformData[i].logo}" width="20px" >  <span class="inventoryList">${platformData[i].name}</span>  <button itemcategory="consoles" itemid="${platformData[i].id}" class="delete-trigger btn btn-outline-danger btn-sm" aria-label="Delete" type="button">
              <span aria-hidden="true">&times;</span>
            </button>`;
              li.innerHTML = inner;
              // let img = document.createElement('img');
              // img.src = platformData[i].logo;
              // img.setAttribute('width', '20px');
              // li.append(img);
              // li.textContent = platformData[i].name;
              consolesList.append(li);
              // //console.log(platformData[i].logo);
            }
          }
        }

        for(let i=0; i<inventoryData.controllers.length; i++){
          let li = document.createElement('li');   
          let inner = `<span class="inventoryList">${inventoryData.controllers[i].description}</span>  <button itemcategory="controllers" itemid="${inventoryData.controllers[i].id}" class="delete-trigger btn btn-outline-danger btn-sm" aria-label="Delete" type="button">
              <span aria-hidden="true">&times;</span>
            </button>`;
          li.innerHTML = inner;   
          //li.textContent = inventoryData.controllers[i].description;
          controllersList.append(li);
        }
  
      }else{
        console.log('error');
      }

      
    // Section of code suggested by Xpert Learning Assistant
    // Select all buttons with the class "delete-trigger"
    const deleteButtons = document.querySelectorAll('.delete-trigger');

    // Iterate over the selected buttons and add an event listener to each
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(event) {

            //console.log("Button Clicked");
            // Get the game id from the button's data attribute
            const itemId = button.getAttribute('itemid');
            const category = button.getAttribute('itemcategory');
            // Call a function to handle the deletion of the game entry with the gameId
            deleteGameEntry(itemId, category);
        });
    });

    // Function to handle the deletion of a game entry
    
  });


  

}

async function deleteGameEntry(itemId, category) {
  // Add your logic here to delete the game entry with the given gameId
  
  const response = await fetch(`/api/hardware/${category}/${itemId}`, {method:'DELETE'});
  if(response.ok){
    console.log(`Deleting game entry with ID: ${itemId} in CATEGORY: ${category}`);
    window.location.reload(true);
  }else{
    console.log(`Could not delete`);
  }


}


