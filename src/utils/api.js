import { BASE_URL } from "./constants";

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
  return fetch(`${BASE_URL}/items`).then(handleServerResponse);
}

function addItem({ name, imageUrl, weather }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  return fetchWithToken(`${BASE_URL}/items`, {
    method: "POST",
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
      owner: currentUser._id,
    }),
  });
}

function deleteItem(id) {
  return fetchWithToken(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
  });
}

function updateUserProfile({ name, avatar }) {
  const token = localStorage.getItem("jwt");
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(handleServerResponse);
}

function addCardLike({ itemId }) {
  return fetchWithToken(`${BASE_URL}/items/${itemId}/likes`, {
    method: "PUT",
  });
}

function removeCardLike({ itemId }) {
  return fetchWithToken(`${BASE_URL}/items/${itemId}/likes`, {
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
};
