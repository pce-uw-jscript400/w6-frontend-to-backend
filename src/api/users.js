const { NODE_ENV } = process.env;
// const BASE_URL = NODE_ENV === "development" ? "http://localhost:5000" : "tbd"; // Once we deploy, we need to change this
const { REACT_APP_API_DOMAIN } = process.env;
const BASE_URL = REACT_APP_API_DOMAIN;

export const getAllUsers = async () => {
  const token = window.localStorage.getItem("journal-app");
  const response = await fetch(`${BASE_URL}/api/users`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    method: "GET"
  });
  const json = await response.json();
  console.log("### log out getAllUsers response", json);
  return json.response;
};
