import { getBaseURL, getToken } from "../../../Utils/Common";

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

export function getJobs(setJobs){
    api.get("/jobs").then((response) => {
        const jobs = response.data.data;
        setJobs(jobs);
      });
}
