const { NODE_ENV } = process.env;
const BASE_URL = NODE_ENV === "development" ? "http://localhost:5000" : "tbd"; // Once we deploy, we need to change this

// Here I think there needs to be a helper function to delete the posts
export const deleteUserPost = async (userId, postId) => {
  const response = await fetch(
    `${BASE_URL}/api/users/${userId}/posts/${postId}`,
    {
      body: JSON.stringify(userId),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    }
  );
  const json = await response.json();
  const token = json.token;

  window.localStorage.setItem("journal-app", token);
  return json.response;
};
