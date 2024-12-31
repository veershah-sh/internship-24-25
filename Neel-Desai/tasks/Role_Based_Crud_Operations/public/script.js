// Event listener for role selection
document.getElementById('role-select').addEventListener('change', function () {
  const selectedRole = this.value;
  toggleForms(selectedRole);
  fetchData(selectedRole);  // Fetch and display the data for the selected role
});

// Function to toggle forms based on role
function toggleForms(role) {
  document.querySelectorAll('.role-form').forEach(form => (form.style.display = 'none'));
  const roleForm = document.getElementById(`${role}-form`);
  if (roleForm) roleForm.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function() {
  const selectedRole = document.getElementById('role-select').value; // Default is 'farmer'
  toggleForms(selectedRole);
  fetchData(selectedRole);  // Fetch and display the data for the default role (Farmer)
});

// Initialize the default form
toggleForms(document.getElementById('role-select').value);

// Form submission handler
document.querySelectorAll('.role-form').forEach(form => {
  form.addEventListener('submit', handleFormSubmit);
});

// Handle form submissions
async function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  const selectedRole = document.getElementById('role-select').value;

  data.role = capitalizeFirstLetter(selectedRole);

  try {
    const response = await fetch('/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error(await response.text());
    alert(`${data.role} form submitted successfully!`);
    form.reset();
    fetchData(selectedRole); // Refresh the table based on the selected role
  } catch (error) {
    console.error('Error submitting form:', error);
    alert(`Error: ${error.message}`);
  }
}

// Capitalize the first letter of a string
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Fetch and display data based on selected role
async function fetchData(role = '') {
  try {
    const response = await fetch(`/api/view-data?role=${role}`);
    if (!response.ok) throw new Error('Failed to fetch data');

    const users = await response.json();
    populateTable(users);
  } catch (error) {
    console.error('Error fetching data:', error);
    alert(`Error fetching data: ${error.message}`);
  }
}

// Populate table with data
// Populate table with data
function populateTable(users) {
  const tableBody = document.querySelector('#data-table tbody');
  
  if (users.length === 0) {
    // Display "No records found" if there are no users for the selected role
    tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center;">No records found</td></tr>`;
  } else {
    // Otherwise, populate the table with the user data
    tableBody.innerHTML = users.map(userToTableRow).join('');
  }
}


// Convert user data to a table row
function userToTableRow(user) {
  return `
    <tr data-id="${user._id}">
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td>${user.survey_number || ''}</td>
      <td>${user.role}</td>
      <td>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </td>
    </tr>
  `;
}

// Handle table actions
// Handle table actions (Delete, Edit)
document.querySelector('#data-table').addEventListener('click', async event => {
  const row = event.target.closest('tr');
  if (event.target.classList.contains('delete')) {
    await handleDelete(row);
  } else if (event.target.classList.contains('edit')) {
    handleEdit(row);
  }
});

// Delete a user
async function handleDelete(row) {
  const userId = row.dataset.id;

  try {
    const response = await fetch(`/api/delete-data/${userId}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete user');
    
    // Remove the row from the table
    row.remove();

    alert('User deleted successfully');

    // After deleting, fetch the updated data and populate the table
    const selectedRole = document.getElementById('role-select').value;
    fetchData(selectedRole); // Fetch and update the table based on the current selected role
  } catch (error) {
    console.error('Error deleting user:', error);
    alert(`Error: ${error.message}`);
  }
}

// Edit a user
// Edit a user
function handleEdit(row) {
  const userId = row.dataset.id;
  const cells = row.querySelectorAll('td');
  const [name, email, phone, surveyNumber, role] = [...cells].map(cell => cell.textContent);

  // Convert the row into editable fields
  row.innerHTML = `
    <td><input type="text" value="${name}" class="editable" name="name" /></td>
    <td><input type="email" value="${email}" class="editable" name="email" /></td>
    <td><input type="tel" value="${phone}" class="editable" name="phone" /></td>
    <td><input type="text" value="${surveyNumber}" class="editable" name="survey_number" /></td>
    <td>
      <select class="editable" name="role">
        <option value="farmer" ${role === 'Farmer' ? 'selected' : ''}>Farmer</option>
        <option value="operator" ${role === 'Operator' ? 'selected' : ''}>Operator</option>
      </select>
    </td>
    <td>
      <button class="save">Save</button>
      <button class="cancel">Cancel</button>
    </td>
  `;

  // Add event listeners for "Save" and "Cancel" buttons
  row.querySelector('.save').addEventListener('click', () => saveEdit(row, userId));
  row.querySelector('.cancel').addEventListener('click', () => cancelEdit(row, userId));
}

// Save the edited data
// Save the edited data
async function saveEdit(row, userId) {
  const cells = row.querySelectorAll('.editable');
  const updatedData = {
    name: cells[0].value,
    email: cells[1].value,
    phone: cells[2].value,
    survey_number: cells[3].value,
    role: capitalizeFirstLetter(cells[4].value), // Capitalize the first letter of the role
  };

  try {
    // Send the updated data to the server
    const response = await fetch(`/api/update-data/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) throw new Error('Failed to update user');

    // After the data is updated, fetch the latest data for the selected role
    alert('User updated successfully');
    fetchData(document.getElementById('role-select').value); // Reload table data based on selected role
  } catch (error) {
    console.error('Error updating user:', error);
    alert(`Error: ${error.message}`);
  }
}

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}



// Cancel edit and revert to the original table data
function cancelEdit(row, userId) {
  fetchData(document.getElementById('role-select').value); // Reload table data
}


// Initial fetch of data
fetchData();
