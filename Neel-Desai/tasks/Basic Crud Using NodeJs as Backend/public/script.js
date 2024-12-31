document.getElementById('farmer-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());
  if (!isValidEmail(data.farmer_email)) {
    alert('Please enter a valid email address.');
    return;
  }

  try {
    const response = await fetch('/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert('Form submitted successfully!');
      event.target.reset();
      fetchData();
    } else {
      const errorMessage = await response.text();
      alert(errorMessage || 'Error submitting form.');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    alert(`Error submitting form: ${error.message || 'Unknown error'}`);
  }
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function fetchData() {
  try {
    const response = await fetch('/api/view-data');
    if (!response.ok) {
      throw new Error('Failed to fetch data from the server');
    }
    const users = await response.json();
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = '';

    if (users.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center;">No records found</td>
        </tr>
      `;
      return;
    }

    const fragment = document.createDocumentFragment();
    users.forEach(user => {
      const row = document.createElement('tr');
      row.setAttribute('data-id', user._id);
      row.innerHTML = `
        <td><span class="view-mode">${user.farmer_name}</span><input class="edit-mode" type="text" value="${user.farmer_name}" style="display:none" /></td>
        <td><span class="view-mode">${user.farmer_email}</span><input class="edit-mode" type="email" value="${user.farmer_email}" style="display:none" /></td>
        <td><span class="view-mode">${user.farmer_phone}</span><input class="edit-mode" type="text" value="${user.farmer_phone}" style="display:none" /></td>
        <td><span class="view-mode">${user.survey_number}</span><input class="edit-mode" type="text" value="${user.survey_number}" style="display:none" /></td>
        <td>
          <button class="enable-edit view-mode">Update</button>
          <button class="save-edit edit-mode" style="display:none">Save</button>
          <button class="cancel-edit edit-mode" style="display:none">Cancel</button>
          <button class="delete">Delete</button>
        </td>
      `;
      fragment.appendChild(row);
    });
    tableBody.appendChild(fragment);
  } catch (error) {
    console.error('Error fetching data:', error);
    alert(`Error fetching data: ${error.message || 'Unknown error'}`);
  }
}

function toggleEditMode(userId, isEditMode) {
  const row = document.querySelector(`tr[data-id="${userId}"]`);
  row.querySelectorAll('.view-mode').forEach(el => (el.style.display = isEditMode ? 'none' : 'inline'));
  row.querySelectorAll('.edit-mode').forEach(el => (el.style.display = isEditMode ? 'inline-block' : 'none'));
}

async function saveEdit(userId) {
  const row = document.querySelector(`tr[data-id="${userId}"]`);
  const farmerName = row.querySelectorAll('input.edit-mode')[0].value;
  const farmerEmail = row.querySelectorAll('input.edit-mode')[1].value;
  const farmerPhone = row.querySelectorAll('input.edit-mode')[2].value;
  const surveyNumber = row.querySelectorAll('input.edit-mode')[3].value;

  if (!isValidEmail(farmerEmail)) {
    alert('Please enter a valid email address.');
    return;
  }

  try {
    const response = await fetch(`/api/update/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        farmer_name: farmerName,
        farmer_email: farmerEmail,
        farmer_phone: farmerPhone,
        survey_number: surveyNumber,
      }),
    });

    if (response.ok) {
      alert('Record updated successfully!');
      fetchData();
    } else {
      const errorMessage = await response.text();
      alert(`Error updating record: ${errorMessage || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Error updating data:', error);
    alert(`Error updating record: ${error.message || 'Unknown error'}`);
  }
}



async function handleDelete(userId) {
  if (!confirm('Are you sure you want to delete this record?')) return;

  try {
    const response = await fetch(`/api/delete-data/${userId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Record deleted successfully!');
      fetchData();
    } else {
      alert('Error deleting record.');
    }
  } catch (error) {
    console.error('Error deleting data:', error);
    alert(`Error deleting record: ${error.message || 'Unknown error'}`);
  }
}

document.querySelector('#data-table').addEventListener('click', event => {
  const target = event.target;
  const row = target.closest('tr');
  const userId = row?.getAttribute('data-id');

  if (target.matches('.enable-edit')) toggleEditMode(userId, true);
  if (target.matches('.save-edit')) saveEdit(userId);
  if (target.matches('.cancel-edit')) cancelEdit(userId);
  if (target.matches('.delete')) handleDelete(userId);
});

fetchData();
