import { handleServerResponse } from "./api";
import { BASE_URL } from "./constants";

export const register = ({ name, email, password, avatar }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      avatar,
    }),
  }).then(handleServerResponse);
};

export const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then(handleServerResponse)
    .then((data) => {
      return {
        email: data.email,
        name: data.name,
        avatar: data.avatar,
        token: data.token,
        _id: data._id,
      };
    });
};

export const getCurrentUser = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};
