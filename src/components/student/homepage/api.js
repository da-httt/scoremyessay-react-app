import { getBaseURL, getToken, getTokenType } from "../../../Utils/Common";
import { showMessage } from "../../messageComponent";

const api = getBaseURL();

export function getStatus(setStatus) {
  api.get("/status").then((response) => {
    setStatus(response.data.data);
  });
}

export function getOrders(setOrders, setOrders2) {
  api
    .get("/orders", {
      headers: { Authorization: getTokenType() + " " + getToken() },
    })
    .then((response) => {
      const orders = response.data.data;
      setOrders(orders);
      setOrders2(orders);
    });
}

export function getStatistic(setStatistic, setStatistics) {
  api
    .get("/statistics/me", {
      headers: { Authorization: "Bearer " + getToken() },
    })
    .then((response) => {
      setStatistic([response.data]);
      setStatistics(response.data);
    });
}

export function getTopUser(setTopUsers) {
  api
    .get("/top_users", {
      headers: { Authorization: "Bearer " + getToken() },
    })
    .then((response) => {
      setTopUsers(response.data.top_users);
    });
}

export function deleteEssay(ID) {
  api
    .delete("orders/" + ID, {
      headers: { Authorization: "Bearer " + getToken() },
    })
    .then(() => {
      showMessage("Bài viết của bạn đã được hủy thành công!", "success");
      window.location.reload();
    })
    .catch((err) => {
      showMessage(err.response.data.detail, "error");
    });
}
