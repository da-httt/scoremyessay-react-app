import { getBaseURL, getToken, removeUserSession } from "../../../Utils/Common";

const api = getBaseURL();
export function getUserInfo(setUsername, setAvatar, history) {
  api
    .get("/users/me", {
      headers: { Authorization: "Bearer " + getToken() },
    })
    .then((response) => {
      setUsername(response.data.info.name);
      api
        .get("/avatars/" + response.data.info.user_id, {
          headers: { Authorization: "Bearer " + getToken() },
        })
        .then((response) => {
          setAvatar(response.data.image_base64);
        });
    })
    .catch((error) => {
      if (error.response.data.detail === "Could not validate credentials") {
        removeUserSession();
        history.push("/Home");
      }
    });
}
