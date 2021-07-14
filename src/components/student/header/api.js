import { message } from 'antd';
import { getBaseURL, getToken, removeUserSession } from '../../../Utils/Common';

const api = getBaseURL();
export function getInfo(setUsername, setAvatar, props) {
    api.get("/users/me", {
        headers: { Authorization: "Bearer " + getToken() },
      })
      .then((response) => {
        setUsername(response.data.info.name);
        api.get("/avatars/" + response.data.info.user_id, {
            headers: { Authorization: "Bearer " + getToken() },
          })
          .then((response) => {
            setAvatar(response.data.image_base64);
          });
      })
      .catch((error) => {
        if (error.response.data.detail === "Could not validate credentials") {
          message.info({content: "Phiên của bạn đã hết hạn. Vui lòng đăng nhập lại!", className: "message"});
          removeUserSession();
          props.history.push("/Home");
        }
      });
  }