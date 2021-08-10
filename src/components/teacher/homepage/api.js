import { getBaseURL, getToken, getTokenType } from "../../../Utils/Common";

const api = getBaseURL();

export async function getStatus(setStatus) {
  api.get("/status").then((response) => {
    const status = response.data.data;
    setStatus(status);
  });
}

export async function getOrders(setOrders, setOrders2,setSpinning) {
  api
    .get("/orders", {
      headers: { Authorization: getTokenType() + " " + getToken() },
    })
    .then((response) => {
      const orders = response.data.data;
      setOrders(orders);
      setOrders2(orders);
      setSpinning(false);
    });
}

export async function getStatistics(setStatistic, setStatistics, setRating) {
  api
    .get("/statistics/me", {
      headers: { Authorization: "Bearer " + getToken() },
    })
    .then((response) => {
      setStatistic([response.data]);
      setStatistics(response.data);
      api
        .get("ratings/teacher/" + response.data.user_id, {
          headers: { Authorization: "Bearer " + getToken() },
        })
        .then((response) => {
          setRating(response.data.average_rating);
        });
    });
}

export async function getDeadline(setDeadline) {
  api
    .get("/deadlines", {
      headers: { Authorization: "Bearer " + getToken() },
    })
    .then((response) => {
      setDeadline([response.data]);
    });
}
