import { getBaseURL, getToken, getTokenType } from "../../../Utils/Common";
import { formatTitle, showMessage } from "../../commonFormat";

const api = getBaseURL();
export async function getOrdersWaiting(
  orderID,
  setStudentID,
  setStudent,
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
    .get("/orders/waiting/" + orderID, {
      headers: { Authorization: "Bearer " + getToken() },
    })
    .then((response) => {
      setStudentID(response.data.student_id);
      api
        .get("/users/" + response.data.student_id, {
          headers: { Authorization: getTokenType() + " " + getToken() },
        })
        .then((response) => {
          setStudent(response.data.name);
        });
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

export async function getUser(setTeacherID){
    api
        .get("/users/me", {
          headers: { Authorization: "Bearer " + getToken() },
        })
        .then((response) => {
          setTeacherID(response.data.info.user_id);
        });
}

export async function getOptions(setOptions){
    api.get("/options").then((response) => {
        setOptions(response.data.data);
      });
}

export function getImage(orderID, setBase64Image){
    api
        .get("/orders/image/" + orderID, {
          headers: { Authorization: "Bearer " + getToken() },
        })
        .then((response) => {
          setBase64Image(response.data.image_base64);
        });
}

export function putReceiveOrder(orderID, teacherID, setLoading, history ){
  api
      .put(
        "/orders/assign/" + orderID + "?teacher_id=" + teacherID,
        {},
        {
          headers: { Authorization: "Bearer " + getToken() },
        }
      )
      .then(() => {
        setLoading(false);
        showMessage("Bài viết của bạn đã được lưu về chấm!", "success");
        history.push("/HomeTeacherPage");
      })
      .catch((error) => {
        if (error.response) {
          setLoading(false);
          showMessage(error.response.data.detail, "error");
        }
      });
}