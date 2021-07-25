import { getBaseURL, getToken } from "../../../Utils/Common";

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
  setLevel
) {
  api
    .get("/orders/" + orderID, {
      headers: { Authorization: "Bearer " + getToken() },
    })
    .then((response) => {
      setSentdate(response.data.sent_date);
      setTotalPrice(response.data.total_price + " VNĐ");
      const essay = response.data.essay;
      const options = response.data.option_list;
      setOptionsTotal(options);
      setTitle(essay.title);
      setTitleSub(essay.title.slice(0, 50));
      setContent(essay.content);
      setType(essay.type_id);
      if (essay.type_id === 0) {
        setLevel(0);
      } else {
        setLevel(1);
      }
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
