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
  return fetch(`${baseUrl}/items`).then(handleServerResponse);
}

function addItem({ name, imageUrl, weather }) {
  return fetchWithToken(`${baseUrl}/items`, {
    method: "POST",
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  });
}

function deleteItem(id) {
  return fetchWithToken(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  });
}

function updateUserProfile({ name, avatar }) {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(handleServerResponse);
}

function addCardLike({ itemId }) {
  return fetchWithToken(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
  });
}

function removeCardLike({ itemId }) {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
  });
}

export {
  getItems,
  addItem,
  deleteItem,
  handleServerResponse,
  updateUserProfile,
  addCardLike,
  removeCardLike,
  fetchWithToken,
  baseUrl,
};
