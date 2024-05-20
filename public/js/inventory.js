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
const closeButtonGames = document.querySelector('#gamesModal .close');
const closeButtonConsole = document.querySelector('#consoleModal .close');
const closeButtonControllers = document.querySelector('#controllersModal .close');
const closeButtonAddItem = document.querySelector('#addItemModal .close');

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



// save button on the add item modal
const saveButton = document.querySelector('#saveButton');
saveButton.addEventListener('click', async (event) => {
  //event.preventDefault();

  
 
  const buttonState = saveButton.getAttribute('state');
  console.log(buttonState);
  if(buttonState === "search"){
    // Get the values from the form
    const itemName = document.querySelector('#itemName').value.trim();
    const itemCategory = document.querySelector('#itemCategory').value.trim();
    itemForm.innerHTML = ""; 
    if(itemCategory.toLowerCase() === 'controller'){

    }else{
      const response = await fetch('/api/igdb/', {
            method: 'POST',
            body: JSON.stringify({ itemName, itemCategory }),
            headers: { 'Content-Type': 'application/json' }
        });
  
        if(response.ok){
          const data = await response.json();
          

          const wrapper = document.createElement('div');
          
          for(let i = 0; i< data.length; i++){
            let div = document.createElement('div');
            div.setAttribute('class', 'form-check');
            let input = document.createElement('input');
            let label = document.createElement('label');
            input.setAttribute('type', 'radio');
            input.setAttribute('class', 'form-check-input');
            input.setAttribute('name', 'gameSelection');
            input.setAttribute('value', data[i].name);
            label.textContent = data[i].name;
            input.setAttribute('gameId', data[i].id);
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
      
    }
  } else {
    itemCategory = saveButton.getAttribute('category');

    if(itemCategory.toLowerCase() === 'game'){
      let gameId;
      const gameChoices = document.getElementsByName('gameSelection');
      console.log(gameChoices);
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
        // console.log(inventoryData.controllers);
        // console.log(inventoryData.gameUsers);
  
        for(let i=0; i<inventoryData.gameUsers.length; i++){
          const rez=await fetch(`/api/igdb/game/${inventoryData.gameUsers[i].game_id}`,{
            method: 'POST'
          });
          if(rez.ok){
            const gamesData = await rez.json();
            for(let i=0; i<gamesData.length; i++){
              let li = document.createElement('li');
              let img = document.createElement('img');
              img.src = gamesData[i].cover;
              li.append(img);
              li.textContent = gamesData[i].name;
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
              let img = document.createElement('img');
              img.src = platformData[i].logo;
              img.setAttribute('width', '20px');
              li.append(img);
              li.textContent = platformData[i].name;
              consolesList.append(li);
              //console.log(platformData[i].logo);
            }
          }
        }
  
      }else{
        console.log('error');
      }
  });
}



