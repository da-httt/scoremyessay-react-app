import { getBaseURL } from "../../Utils/Common";
import { showMessage } from "../commonFormat";

const api = getBaseURL();

export function getLevels(setLevels) {
  api.get("/levels").then((response) => {
    const levels = response.data.data;
    setLevels(levels);
  });
}

export function getGenders(setGenders) {
  api.get("/genders").then((response) => {
    const genders = response.data.data;
    setGenders(genders);
  });
}

export function getJobs(setJobs) {
  api.get("/jobs").then((response) => {
    const jobs = response.data.data;
    setJobs(jobs);
  });
}

export function registerTeacherAcc(
  name,
  gender,
  email,
  address,
  job,
  tel,
  birthday,
  level,
  base64Image,
  coverLetter,
  history,
  setLoading
) {
  api
    .post("/signup/teacher", {
      name: name,
      gender_id: gender,
      email: email,
      address: address,
      job_id: job,
      phone_number: tel,
      date_of_birth: birthday,
      level_id: level,
      avatar: base64Image,
      cover_letter: coverLetter,
    })
    .then(() => {
      setLoading(false);
      showMessage("Bạn đã đăng ký tài khoản thành công!", "success");
      history.push("/Home");
    })
    .catch((error) => {
      if (error.response) {
        setLoading(false);
        showMessage(error.response.data.detail, "error");
      }
    });
}

export function registerStudentAcc(
  email,
  password,
  name,
  address,
  birthday,
  gender,
  job,
  tel,
  history,
  setLoading
) {
  api
    .post("/signup", {
      email: email,
      password: password,
      name: name,
      address: address,
      date_of_birth: birthday,
      gender_id: gender,
      job_id: job,
      phone_number: tel,
    })
    .then(() => {
      showMessage("Bạn đã đăng ký tài khoản thành công!", "success");
      history.push("/Home");
    })
    .catch((error) => {
      if (error.response) {
        setLoading(false);
        showMessage(error.response.data.detail, "error");
      }
    });
}
