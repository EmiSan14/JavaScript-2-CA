require("dotenv").config();

export async function apiFetch() {
  const URL = "https://v2.api.noroff.dev/social";
  const endpoint = "/posts";
  const apiKey = process.env.APIKEY_JS_TWO;
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRW1pU2FuMTQiLCJlbWFpbCI6ImVtaXNhbjA2OTUyQHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzk1NDQ3MjkwfQ.1JETIUSvotcSZgkvx84Djz4xHRx6mvSHg42JkAGQDjc";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  };

  try {
    const response = await fetch(`${URL}${endpoint}`, options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Error message:", error);
  }
}
