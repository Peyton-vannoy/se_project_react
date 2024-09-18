const baseUrl = "http://localhost:3001";

const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

const fetchWithToken = (url, options) => {
  const token = localStorage.getItem("jwt");
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
  return fetch(url, { ...options, headers }).then(handleServerResponse);
};

function getItems() {
  return fetchWithToken(`${baseUrl}/items`).then(handleServerResponse);
}

function addItem({ name, imageUrl, weather }) {
  return fetchWithToken(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(handleServerResponse);
}

function deleteItem(id) {
  return fetchWithToken(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(handleServerResponse);
}

export { getItems, addItem, deleteItem, handleServerResponse, baseUrl };
