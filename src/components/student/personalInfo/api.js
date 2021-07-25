import { getBaseURL, getToken } from "../../../Utils/Common";
import { showMessage } from "../../messageComponent";

const api = getBaseURL();
export function getPersonalInfo(
  setMail,
  setName,
  setID,
  setBirthday,
  setAddress,
  setGender,
  setJobID,
  setPhone,
  setBase64Image
) {
  api
    .get("/users/me", {
      headers: { Authorization: "Bearer " + getToken() },
    })
    .then((response) => {
      setMail(response.data.email);
      const info = response.data.info;
      setName(info.name);
      setID(info.user_id);
      setBirthday(info.date_of_birth);
      setAddress(info.address);
      setGender(info.gender_id);
      setJobID(info.job_id);
      setPhone(info.phone_number);
      api
        .get("/avatars/" + info.user_id, {
          headers: { Authorization: "Bearer " + getToken() },
        })
        .then((response) => {
          setBase64Image(response.data.image_base64);
        });
    });
}

export function getGenders(setGenders) {
  api.get("/genders").then((response) => {
    const genders = response.data.data;
    setGenders(genders);
  });
}

export function getStatistic(setStatistic) {
  api
    .get("/statistics/me", {
      headers: { Authorization: "Bearer " + getToken() },
    })
    .then((response) => {
      setStatistic(response.data);
    });
}

export function getJobs(setJobs) {
  api.get("/jobs").then((response) => {
    const jobs = response.data.data;
    setJobs(jobs);
  });
}

export function putChangeInfo(
  id,
  name,
  address,
  birthday,
  gender,
  jobID,
  phone,
  setLoadInfo,
  setEdit
) {
  api
    .put(
      "/users/" + id,
      {
        name: name,
        address: address,
        date_of_birth: birthday,
        gender_id: gender,
        job_id: jobID,
        phone_number: phone,
      },
      {
        headers: { Authorization: "Bearer " + getToken() },
      }
    )
    .then(() => {
      setLoadInfo(false);
      setEdit(true);
      showMessage("Thông tin của bạn đã được cập nhật!", "success");
    })
    .catch((error) => {
      if (error.response) {
        setLoadInfo(false);
        showMessage(error.response.data.detail, "error");
      }
    });
}

export function putChangeAvatar(id, base64Image, setLoadAvt, setEditAvt) {
  api
    .put(
      "/avatars/" + id,
      {
        base64: base64Image,
      },
      {
        headers: { Authorization: "Bearer " + getToken() },
      }
    )
    .then(() => {
      setLoadAvt(false);
      setEditAvt(true);
      showMessage("Ảnh đại diện của bạn đã được cập nhật!", "success");
    })
    .catch((error) => {
      if (error.response) {
        setLoadAvt(false);
        showMessage(error.response.data.detail, "error");
      }
    });
}

export function putChangePassword(pass, setLoadPass, setEditPass){
  api
        .put(
          "/change_password/me?new_password=" + pass.toString(),
          {},
          {
            headers: { Authorization: "Bearer " + getToken() },
          }
        )
        .then((response) => {
          setLoadPass(false);
          showMessage("Mật khẩu của bạn đã được cập nhật!", "success");
          setEditPass(true);
        })
        .catch((error) => {
          if (error.response) {
            setLoadPass(false);
              showMessage(error.response.data.detail, "error");
          }
        });
}
