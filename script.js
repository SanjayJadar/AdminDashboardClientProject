document.addEventListener("DOMContentLoaded", function() {
  const createButton = document.querySelector(".create-button");

  createButton.addEventListener("click", function() {
      window.location.href = "form.html"; // Redirect to the form page
  });
}); 


// Store Data in localStorage 

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("input-form");

  form.addEventListener("submit", function(event) {
      event.preventDefault();

      const collaborator = document.getElementById("collaborator").value;
      const projectName = document.getElementById("project-name").value;
      const description = document.getElementById("description").value;
      const assignedTo = document.getElementById("assigned-to").value;

      if (collaborator && projectName && description && assignedTo) {
          const data = {
              collaborator,
              projectName,
              description,
              assignedTo
          };
          localStorage.setItem(Date.now().toString(), JSON.stringify(data));

          alert("Data stored successfully!");

          window.location.href = "index.html"; // Redirect to the main page
      } else {
          alert("Please fill in all fields.");
      }
  });
});



// Display Data on Screen 

document.addEventListener("DOMContentLoaded", function() {
  const tableBody = document.querySelector(".right-table tbody");

  // Fetch data from local storage and populate the table
  for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const data = JSON.parse(localStorage.getItem(key));
      const rowData = `<tr>
          <td>${data.collaborator}</td>
          <td>${data.projectName}</td>
          <td>${data.description}</td>
          <td>${data.assignedTo}</td>
          <td>
              <button class="reject">Reject</button>
              <button class="edit">📝</button>
          </td>
      </tr>`;
      tableBody.insertAdjacentHTML("beforeend", rowData);
  }
});






document.addEventListener("DOMContentLoaded", function() {
  const tableBody = document.querySelector(".right-table tbody");

  // Fetch data from local storage and populate the table
  function populateTable() {
      tableBody.innerHTML = ""; // Clear existing table rows
      for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          const data = JSON.parse(localStorage.getItem(key));
          const rowData = `<tr data-key="${key}">
              <td>${data.collaborator}</td>
              <td>${data.projectName}</td>
              <td>${data.description}</td>
              <td>${data.assignedTo}</td>
              <td>
                  <button class="reject">Reject</button>
                  <button class="edit">📝</button>
              </td>
          </tr>`;
          tableBody.insertAdjacentHTML("beforeend", rowData);
      }
  }

  populateTable(); // Populate table on page load

  // Delete data from local storage and remove row from table
  function deleteData(key) {
    if (confirm("Are you sure you want to reject this entry?")) {
        localStorage.removeItem(key);
        populateTable(); // Repopulate table after deletion
    }   
   }

  // Edit data and update local storage
  function editData(key) {
      const data = JSON.parse(localStorage.getItem(key));
      const collaborator = prompt("Enter new collaborator:", data.collaborator);
      const projectName = prompt("Enter new project name:", data.projectName);
      const description = prompt("Enter new description:", data.description);
      const assignedTo = prompt("Enter new assigned to:", data.assignedTo);

      if (collaborator && projectName && description && assignedTo) {
          const newData = {
              collaborator,
              projectName,
              description,
              assignedTo
          };
          localStorage.setItem(key, JSON.stringify(newData));
          populateTable(); // Repopulate table after editing
      }
  }

  // Event delegation for button clicks
  tableBody.addEventListener("click", function(event) {
      if (event.target.classList.contains("reject")) {
          const row = event.target.closest("tr");
          const key = row.dataset.key;
          deleteData(key);
      } else if (event.target.classList.contains("edit")) {
          const row = event.target.closest("tr");
          const key = row.dataset.key;
          editData(key);
      }
  });
});






// Search Data


document.addEventListener("DOMContentLoaded", function() {
  const tableBody = document.querySelector(".right-table tbody");
  const searchInput = document.getElementById("search-input");

  // Function to filter and display data based on search query
  function filterData(query) {
      tableBody.innerHTML = ""; // Clear existing table rows

      // Fetch data from local storage and filter based on query
      for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          const data = JSON.parse(localStorage.getItem(key));
          if (
              data.collaborator.toLowerCase().includes(query.toLowerCase()) ||
              data.projectName.toLowerCase().includes(query.toLowerCase()) ||
              data.description.toLowerCase().includes(query.toLowerCase()) ||
              data.assignedTo.toLowerCase().includes(query.toLowerCase())
          ) {
              const rowData = `<tr data-key="${key}">
                  <td>${data.collaborator}</td>
                  <td>${data.projectName}</td>
                  <td>${data.description}</td>
                  <td>${data.assignedTo}</td>
                  <td>
                      <button class="reject">Reject</button>
                      <button class="edit">📝</button>
                  </td>
              </tr>`;
              tableBody.insertAdjacentHTML("beforeend", rowData);
          }
      }
  }

  // Initial table population
  filterData("");

  // Real-time search
  searchInput.addEventListener("input", function() {
      filterData(searchInput.value);
  });

  // Other code for create, edit, and reject functionalities...
});
