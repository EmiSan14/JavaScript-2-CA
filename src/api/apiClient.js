export async function apiFetch(endpoint, page) {
  const URL = "https://v2.api.noroff.dev/social";
  const apiKey = "";
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
    const response = await fetch(
      `${URL}${endpoint}?limit=100&page=${page}`,
      options,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error message:", error);
  }
}

export async function apiLoginOrRegisterAttempt(
  endpoint,
  email,
  password,
  name,
) {
  const URL = "https://v2.api.noroff.dev/";
  const credentials = {
    email: email,
    password: password,
  };
  if (name) {
    const { name: name, ...credentials } = credentials;
  }
  console.log("credentials:", credentials);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  };

  try {
    const response = await fetch(`${URL}${endpoint}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error message:", error);
  }
}
