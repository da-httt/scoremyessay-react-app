import { getBaseURL, getToken, getTokenType } from "../../../Utils/Common";
import { showMessage } from "../../commonFormat";

const api = getBaseURL();

export async function getStatus(setStatus) {
  await api.get("/status").then((response) => {
    setStatus(response.data.data);
  });
}

export async function getOrders(setOrders, setOrders2, setSpinning) {
  await api
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

export async function getStatistic(setStatistic, setStatistics) {
  await api
    .get("/statistics/me", {
      headers: { Authorization: "Bearer " + getToken() },
    })
    .then((response) => {
      setStatistic([response.data]);
      setStatistics(response.data);
    });
}

export async function getTopUser(setTopUsers) {
  await api
    .get("/top_users", {
      headers: { Authorization: "Bearer " + getToken() },
    })
    .then((response) => {
      setTopUsers(response.data.top_users);
    });
}

export async function deleteEssay(ID) {
  await api
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
