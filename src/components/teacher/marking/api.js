import { getBaseURL, getToken, getTokenType } from "../../../Utils/Common";
import { formatTitle, showMessage } from "../../commonFormat";

const api = getBaseURL();
export async function getOrder(
  orderID,
  setStudentID,
  setStudent,
  setDeadline,
  setTitleS,
  setSpinning
) {
  api
    .get("/orders/" + orderID, {
      headers: { Authorization: getTokenType() + " " + getToken() },
    })
    .then((response) => {
      const order = response.data;
      setStudentID(order.student_id);
      api
        .get("/users/" + order.student_id, {
          headers: { Authorization: getTokenType() + " " + getToken() },
        })
        .then((response) => {
          setStudent(response.data.name);
        });
      setDeadline(order.deadline);
      formatTitle(order.essay.title, setTitleS);
      setSpinning(false);
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

export async function getComments(orderID, setTitle, setContent, setSentences) {
  api
    .get("/essay_comments/" + orderID, {
      headers: { Authorization: getTokenType() + " " + getToken() },
    })
    .then((response) => {
      const data = response.data;
      setTitle(data.title);
      setContent(data.content);
      setSentences(data.essay_comments);
    });
}

export async function getResults(
  orderID,
  setIsCriteria,
  setGrade,
  setGradeComment,
  setReview,
  setCommentGeneral,
  setCriteriaResults,
  setExtraResults
) {
  api
    .get("/results/" + orderID, {
      headers: { Authorization: getTokenType() + " " + getToken() },
    })
    .then((response) => {
      const data = response.data;
      setIsCriteria(data.isCriteria);
      setGrade(data.grade);
      setGradeComment(data.grade_comment);
      setReview(data.review);
      setCommentGeneral(data.comment);
      if (data.criteria_results !== null)
        setCriteriaResults(data.criteria_results);
      if (data.extra_results !== null) setExtraResults(data.extra_results);
    });
}

export function saveResults(
  orderID,
  grade,
  gradeComment,
  review,
  commentGeneral,
  criteriaResults,
  extraResults,
  comments,
  setLoadSave2
) {
  api
    .put(
      "/results/" + orderID + "?status_id=2",
      {
        grade: grade,
        grade_comment: gradeComment,
        review: review,
        comment: commentGeneral,
        criteria_results: criteriaResults,
        extra_results: extraResults,
      },
      {
        headers: { Authorization: "Bearer " + getToken() },
      }
    )
    .then(() => {
      api
        .put(
          "/essay_comments/" + orderID,
          {
            comments: comments,
          },
          {
            headers: { Authorization: "Bearer " + getToken() },
          }
        )
        .then(() => {
          setLoadSave2(false);
          showMessage("Bài chấm của bạn đã được lưu lại!", "success");
        })
        .catch((error) => {
          if (error.response) {
            setLoadSave2(false);
            showMessage(error.response.data.detail, "error");
          }
        });
    })
    .catch((error) => {
      if (error.response) {
        setLoadSave2(false);
        showMessage(error.response.data.detail, "error");
      }
    });
}

export function putResults(
  props,
  orderID,
  grade,
  gradeComment,
  review,
  commentGeneral,
  criteriaResults,
  extraResults,
  comments,
  setLoadDone2
) {
  api
    .put(
      "/results/" + orderID + "?status_id=3",
      {
        grade: grade,
        grade_comment: gradeComment,
        review: review,
        comment: commentGeneral,
        criteria_results: criteriaResults,
        extra_results: extraResults,
      },
      {
        headers: { Authorization: "Bearer " + getToken() },
      }
    )
    .then(() => {
      api
        .put(
          "/essay_comments/" + orderID,
          {
            comments: comments,
          },
          {
            headers: { Authorization: "Bearer " + getToken() },
          }
        )
        .then(() => {
          setLoadDone2(false);
          showMessage("Bài chấm của bạn đã chấm xong!", "success");
          props.history.push("/HomeTeacherPage");
        })
        .catch((error) => {
          if (error.response) {
            setLoadDone2(false);
            showMessage(error.response.data.detail, "error");
          }
        });
    })
    .catch((error) => {
      if (error.response) {
        setLoadDone2(false);
        showMessage(error.response.data.detail, "error");
      }
    });
}
