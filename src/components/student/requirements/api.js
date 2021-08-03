import { getBaseURL, getToken } from "../../../Utils/Common";
import { formatTitle } from "../../commonFormat";

const api = getBaseURL();
export function getOrderInfo(
  orderID,
  setSentdate,
  setTotalPrice,
  setOptionsTotal,
  setTitle,
  setTitleSub,
  setContent,
  setType,
  setSpinning
) {
  api
    .get("/orders/" + orderID, {
      headers: { Authorization: "Bearer " + getToken() },
    })
    .then((response) => {
      setSentdate(response.data.sent_date);
      setTotalPrice(response.data.total_price);
      const essay = response.data.essay;
      const options = response.data.option_list;
      setOptionsTotal(options);
      setTitle(essay.title);
      formatTitle(essay.title, setTitleSub);
      setContent(essay.content);
      setType(essay.type_id);
      setSpinning(false);
    });
}

export function getOptions(setOptions) {
  api.get("/options").then((response) => {
    setOptions(response.data.data);
  });
}

export function getBase64Image(orderID, setBase64Image) {
  api
    .get("/orders/image/" + orderID, {
      headers: { Authorization: "Bearer " + getToken() },
    })
    .then((response) => {
      setBase64Image(response.data.image_base64);
    });
}
