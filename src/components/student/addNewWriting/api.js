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
  setLoading
) {
  api
    .get("/orders/" + orderID, {
      headers: { Authorization: "Bearer " + getToken() },
    })
    .then((response) => {
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
        if (
          error.response.status === 401 ||
          error.response.status === 400 ||
          error.response.status === 403
        ) {
          showMessage(error.response.data.detail, "error");
        } else {
          showMessage("Something went wrong. Please try again later!", "error");
        }
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

export function postWriting(
  props,
  status_id,
  title,
  content,
  type,
  optionsTotal,
  base64Image,
  setLoading,
  messageSuccess,
  linkSuccess
) {
  return api
    .post(
      "/orders?status_id=" + status_id,
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
        .then(() => {
          setLoading(false);
          showMessage(messageSuccess, "success");
          props.history.push(linkSuccess);
        })
        .catch((error) => {
          if (error.response) {
            setLoading(false);
            if (
              error.response.status === 401 ||
              error.response.status === 400
            ) {
              showMessage(error.response.data.detail, "error");
            } else {
              showMessage(
                "Something went wrong. Please try again later!",
                "error"
              );
            }
          }
        });
    })
    .catch((error) => {
      if (error.response) {
        setLoading(false);
        if (error.response.status === 401 || error.response.status === 400) {
          showMessage(error.response.data.detail, "error");
        } else {
          showMessage("Something went wrong. Please try again later!", "error");
        }
      }
    });
}

export function postWritingWasSaved(
  props,
  orderID,
  title,
  content,
  type,
  optionsTotal,
  status_id,
  setLoading,
  messageSuccess,
  linkSuccess
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
        status_id: status_id,
      },
      {
        headers: { Authorization: "Bearer " + getToken() },
      }
    )
    .then((response) => {
      setLoading(false);
      showMessage(messageSuccess, "success");
      props.history.push(linkSuccess);
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
