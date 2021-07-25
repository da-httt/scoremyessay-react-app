import { getBaseURL, getToken } from "../../../Utils/Common";
import { showMessage } from "../../messageComponent";

const api = getBaseURL();

export function getInfoWriting(
  orderID,
  setOptionsTotal,
  setOptionTime,
  setOptionScore,
  setTitle,
  setContent,
  setType,
  setLevel,
  setLoading,
  setSpinning
) {
  api
    .get("/orders/" + orderID, {
      headers: { Authorization: "Bearer " + getToken() },
    })
    .then((response) => {
      setSpinning(false);
      const essay = response.data.essay;
      const optionsS = response.data.option_list;
      setOptionsTotal(optionsS);
      setOptionTime(optionsS[optionsS.length - 1]);
      optionsS.pop();
      setOptionScore(optionsS);
      setTitle(essay.title);
      setContent(essay.content);
      setType(essay.type_id);
      if (essay.type_id === 0) {
        setLevel(0);
      } else {
        setLevel(1);
      }
    })
    .catch((error) => {
      if (error.response) {
        setLoading(false);
        showMessage(error.response.data.detail, "error");
      }
    });
}

export function getLevels(setLevels) {
  api.get("/levels").then((response) => {
    setLevels(response.data.data);
  });
}
export function getOptions(setOptions) {
  api.get("/options").then((response) => {
    setOptions(response.data.data);
  });
}

export function getImage(orderID, setBase64Image) {
  api
    .get("/orders/image/" + orderID, {
      headers: { Authorization: "Bearer " + getToken() },
    })
    .then((response) => {
      setBase64Image(response.data.image_base64);
    });
}

const callSuccessApiSaved = (props, setLoading) => {
  setLoading(false);
  showMessage("Bài viết của bạn đã được lưu vào giỏ hàng!", "success");
  props.history.push("/HomeStudentPage/Cart");
};

const callSuccessApiPayment = (props, setLoading) => {
  setLoading(false);
  showMessage(
    "Bài viết của bạn đã được thanh toán và đang tìm giáo viên chấm!",
    "success"
  );
  props.history.push("/HomeStudentPage");
};

export function apiPostWriting(
  props,
  title,
  content,
  type,
  optionsTotal,
  base64Image,
  isSaved,
  setLoading
) {
  api
    .post(
      "/orders",
      {
        essay: {
          title: title,
          content: content,
          type_id: type,
        },
        option_list: optionsTotal,
      },
      {
        headers: { Authorization: "Bearer " + getToken() },
      }
    )
    .then((response) => {
      api
        .put(
          "orders/image/" + response.data.order_id,
          {
            base64: base64Image,
          },
          {
            headers: { Authorization: "Bearer " + getToken() },
          }
        )
        .then((response) => {
          if (isSaved) {
            callSuccessApiSaved(props, setLoading);
          } else {
            api
              .post(
                "orders/payment/" +
                  response.data.order_id +
                  "?payment_type=CREDIT_CARD",
                {},
                { headers: { Authorization: "Bearer " + getToken() } }
              )
              .then(() => {
                callSuccessApiPayment(props, setLoading);
              })
              .catch((error) => {
                setLoading(false);
                showMessage(error.response.data.detail, "error");
              });
          }
        })
        .catch((error) => {
          setLoading(false);
          showMessage(error.response.data.detail, "error");
        });
    })
    .catch((error) => {
      if (error.response) {
        setLoading(false);
        showMessage(error.response.data.detail, "error");
      }
    });
}

export function apiPostWritingWasSaved(
  props,
  orderID,
  title,
  content,
  type,
  optionsTotal,
  isSaved,
  setLoading
) {
  api
    .put(
      "/orders/saved/" + orderID,
      {
        essay: {
          title: title,
          content: content,
          type_id: type,
        },
        option_list: optionsTotal,
      },
      {
        headers: { Authorization: "Bearer " + getToken() },
      }
    )
    .then((response) => {
      if (isSaved) {
        callSuccessApiSaved(props, setLoading);
      } else {
        api
          .post(
            "orders/payment/" +
              response.data.order_id +
              "?payment_type=CREDIT_CARD",
            {},
            { headers: { Authorization: "Bearer " + getToken() } }
          )
          .then(() => {
            callSuccessApiPayment(props, setLoading);
          })
          .catch((error) => {
            setLoading(false);
            if (error.response.data.detail === "All Teachers are busy") {
              showMessage(
                "Tất cả giáo viên hiện đang bận, bài viết của bạn đã được lưu trong giỏ hàng. Vui lòng đăng bài lại trong vài phút sau!",
                "info"
              );
            } else {
              showMessage(error.response.data.detail, "error");
            }
            props.history.push("/HomeStudentPage/Cart");
          });
      }
    })
    .catch((error) => {
      if (error.response) {
        setLoading(false);
        showMessage(error.response.data.detail, "error");
      }
    });
}

export function deleteWriting(props, orderID, setLoadDel) {
  api
    .delete("orders/saved/" + orderID, {
      headers: { Authorization: "Bearer " + getToken() },
    })
    .then(() => {
      setLoadDel(false);
      showMessage("Bài viết của bạn đã được hủy!", "success");
      props.history.push("/HomeStudentPage/Cart");
    })
    .catch((error) => {
      if (error.response) {
        setLoadDel(false);
        if (error.response.status === 401 || error.response.status === 400) {
          showMessage(error.response.data.detail, "error");
        } else {
          showMessage("Something went wrong. Please try again later!", "error");
        }
      }
    });
}

export function getInfoCard(
  total,
  setInfoCard,
  setIsHasCard,
  setCallApiPaymentMethod
) {
  api
    .get("/credit_card/me", {
      headers: { Authorization: "Bearer " + getToken() },
    })
    .then((response) => {
      if (response.data.provider !== null) {
        if (response.data.balance < total) {
          showMessage(
            "Hiện tài khoản của bạn không đủ tiền! Vui lòng kiểm tra lại",
            "info"
          );
        } else {
          setInfoCard(response.data);
          setIsHasCard(true);
          setCallApiPaymentMethod(true);
        }
      } else {
        setInfoCard(response.data);
        setIsHasCard(false);
        setCallApiPaymentMethod(true);
      }
    });
}

export function putInfoCreditCard(
  provider,
  accountNo,
  expiryDate,
  setIsHasCard,
  setInfoCard,
  setCallApiPaymentMethod,
  totalPrice
) {
  api
    .put(
      "/credit_card/me",
      {
        provider: provider,
        account_no: accountNo,
        expiry_date: expiryDate,
      },
      {
        headers: { Authorization: "Bearer " + getToken() },
      }
    )
    .then(() => {
      getInfoCard(
        totalPrice,
        setInfoCard,
        setIsHasCard,
        setCallApiPaymentMethod
      );
    })
    .catch((error) => {
      setIsHasCard(false);
      showMessage(error.response.data.detail, "error");
    });
}
