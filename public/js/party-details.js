// Function to handle the search form submission

const searchModal = document.querySelector("#searchModal");
const searchInput = document.getElementById("search-players-form");
const closeButton = document.querySelector("#searchModal .btn-close");
let firstTarget;


// Add event listeners to the search form and close button
document
  .querySelector("#searchModalButton")
  .addEventListener("click", modalOpen);
closeButton.addEventListener("click", modalClose);

async function modalOpen() {
  searchModal.classList.add("show");
  searchModal.style.display = "block";
  const friendsList = await getFriendsList();
  const select = document.getElementById("friendsList");
  select.innerHTML = "";
  for (const friend of friendsList) {
    const option = document.createElement("option");
    option.innerHTML = `${friend.username}, ${friend.email}`;
    option.value = friend.id;
    select.appendChild(option);
  }
  const submitButton = document.querySelector(
    '#add-friends button[type="submit"]'
  );
  submitButton.addEventListener("click", handleAddFriends);
}

function modalClose() {
  searchModal.classList.remove("show");
  searchModal.style.display = "none";
}

async function getFriendsList() {
  // Your code here...
  const response = await fetch("/api/friends/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    return await response.json();
  }
}

async function handleAddFriends(event) {
  event.preventDefault();
  //select friends list, write all selected friends to new array of numbers, for each number add that user id to the party with the API call
  const selectedElement = document.getElementById("friendsList");
  const selectedValues = Array.from(selectedElement.selectedOptions).map(
    (option) => option.value
  );
  for (const friend of selectedValues) {
    const response = await fetch("/api/parties/attendees/" + partyData.id, {
      method: "POST",
      body: JSON.stringify({ user_id: friend }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const data = await response.json();
      console.log(data);
    }
  }
  renderInvitedList();
  modalClose();
}
//gets all attendees of the party
async function getAttendees() {
  const response = await fetch("/api/parties/attendees/" + partyData.id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    const attendees = data.attendees;
    // console.log(attendees);
    return attendees;
  }
}
//renders the list of friends invited to this party to the page
async function renderInvitedList() {
  const attendees = await getAttendees();
  const invitedList = document.getElementById("invited-list");
  invitedList.innerHTML = "";
  renderHardwareTable(partyData.owner_id);
  for (const attendee of attendees) {
    const li = document.createElement("li");
    const row = document.createElement("div");
    row.classList.add("row");

    const h5Col = document.createElement("div");
    h5Col.classList.add("col");
    const h5 = document.createElement("h5");
    h5.innerHTML = attendee.username;
    h5Col.appendChild(h5);

    const deleteButtonCol = document.createElement("div");
    deleteButtonCol.classList.add("col-auto");
    const deleteButton = document.createElement("h6");
    deleteButton.innerHTML = "❌";
    deleteButtonCol.appendChild(deleteButton);

    row.appendChild(h5Col);
    row.appendChild(deleteButtonCol);

    li.appendChild(row);
    li.id = attendee.id;
    li.addEventListener('click', function(event) {
        renderInvitedList()
        li.classList.add('bg-dark');
        handleTableTarget(attendee.id, event.target===deleteButton)
    })
    invitedList.appendChild(li);
  }
}

function handleTableTarget(attendeeId, isDelete){
    console.log(attendeeId);
    console.log(isDelete);
    renderHardwareTable(attendeeId);
}

async function changeTableTarget() {}

async function renderHardwareTable(id) {
  // console.log(id)
  const response = await fetch("/api/hardware/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json()
  console.log(data)
  
}
renderInvitedList();
