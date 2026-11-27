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
    if (endpoint === "/posts") {
      const response = await fetch(
        `${URL}${endpoint}?limit=100&page=${page}`,
        options,
      );
      const data = await response.json();
      return data;
    }
    if (endpoint === "/profiles") {
      const response = await fetch(`${URL}${endpoint}`, options);
      const data = await response.json();
      return data;
    } else {
      const response = await fetch(`${URL}${endpoint}`, options);
      if (!response.ok) {
        const errorData = await response.json();
        return errorData.statusCode;
      }
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log("Error message:", error);
  }
}

export async function apiPOST(endpoint, value1, value2, value3) {
  const URL = "https://v2.api.noroff.dev/";
  const apiKey = "";
  const accessToken = sessionStorage.getItem("accessToken");
  let credentials;
  let options;
  if (endpoint === "auth/login" || "auth/register") {
    if (!value3) {
      credentials = {
        email: value1,
        password: value2,
      };
    } else {
      credentials = {
        name: value3,
        email: value1,
        password: value2,
      };
    }
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    };
  }
  if (endpoint === "social/posts") {
    if (!value2) {
      credentials = {
        title: value1,
      };
    } else {
      credentials = {
        title: value1,
        body: value2,
      };
    }
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
      body: JSON.stringify(credentials),
    };
  }

  try {
    const response = await fetch(`${URL}${endpoint}`, options);
    if (!response.ok) {
      const errorData = await response.json();
      return errorData.errors[0].message;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function apiPUT(endpoint, accessToken, userOrId, updateObject) {
  const URL = "https://v2.api.noroff.dev/";
  const apiKey = "";
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  };

  try {
    // When updating a post
    if (updateObject) {
      const updatedOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify(updateObject),
      };
      const response = await fetch(`${URL}${endpoint}`, updatedOptions);
      console.log("options", options);
      if (!response.ok) {
        const errorData = await response.json();
        return errorData.errors[0].message;
      }
      return `Post successfully updated. Page will reload`;
    } else {
      // Following or unfollowing user
      const response = await fetch(`${URL}${endpoint}`, options);
      console.log("options", options);
      if (!response.ok) {
        const errorData = await response.json();
        return errorData.errors[0].message;
      }
      const data = await response.json();
      if (endpoint === `social/profiles/${userOrId}/follow`) {
        return `You are now following ${userOrId}`;
      }
      if (endpoint === `social/profiles/${userOrId}/unfollow`) {
        return `You have unfollowed ${userOrId}`;
      } else {
        return `Post successfully updated`;
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function apiDELETE(endpoint, accessToken) {
  const URL = "https://v2.api.noroff.dev/";
  const apiKey = "";
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  };
  try {
    const response = await fetch(`${URL}${endpoint}`, options);
    console.log("response:", response);
    console.log(response.status);
    if (!response.ok) {
      const errorData = await response.json();
      return errorData.errors[0].message;
    }
    if (response.status === 204) {
      return "Post successfully deleted. Page will reload";
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
