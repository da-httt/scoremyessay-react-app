import { getBaseURL, getToken, getTokenType } from "../../../Utils/Common";
import { formatTitle, showMessage } from "../../commonFormat";

const api = getBaseURL();
export function getOrderInfo(
  orderID,
  setTeacherID,
  setStatusWriting,
  setTitle,
  setContent,
  setTitleS,
  setTeacher,
  setSpinning
) {
  api
    .get("/orders/" + orderID, {
      headers: { Authorization: getTokenType() + " " + getToken() },
    })
    .then((response) => {
      setSpinning(false);
      setTeacherID(response.data.teacher_id);
      setStatusWriting(response.data.status_id);
      setTitle(response.data.essay.title);
      setContent(response.data.essay.content);
      formatTitle(response.data.essay.title, setTitleS);
      if (response.data.status_id !== 1) {
        api
          .get("/users/" + response.data.teacher_id, {
            headers: { Authorization: getTokenType() + " " + getToken() },
          })
          .then((response) => {
            setTeacher(response.data.name);
          });
      }
    });
}

export function getSpellingErrors(
  orderID,
  setTopic,
  setSpelling,
  setNumSentence,
  setAverage,
  setNumErrors
) {
  api
    .get("/spelling_errors/" + orderID, {
      headers: { Authorization: getTokenType() + " " + getToken() },
    })
    .then((response) => {
      setTopic(response.data.predicted_topic);
      setSpelling(response.data.spelling_errors);
      setNumSentence(response.data.number_of_sentences);
      setAverage(response.data.average_sentence_length);
      setNumErrors(response.data.num_errors);
    });
}

export function getComments(orderID, setSentences) {
  api
    .get("/essay_comments/" + orderID, {
      headers: { Authorization: getTokenType() + " " + getToken() },
    })
    .then((response) => {
      const data = response.data;
      setSentences(data.essay_comments);
    });
}

export function getResults(orderID, setIsCriteria, setGrade, setGradeComment, setReview, setCommentGeneral, setCriteriaResults, setExtraResults){
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
            if (data.extra_results !== null)
              setExtraResults(data.extra_results);
          });
}

export function getRating(orderID, setResponse, setRate, setComment) {
  api
    .get("ratings/" + orderID, {
      headers: { Authorization: getTokenType() + " " + getToken() },
    })
    .then((response) => {
      setResponse(false);
      setRate(response.data.stars);
      setComment(response.data.comment);
    })
    .catch((error) => {
      if (error.response) setResponse(true);
      setRate(0);
      setComment(null);
    });
}

export function postRating(orderID, rate, comment, setResponse, setLoadResponse){
  api
      .post(
        "ratings/" + orderID,
        {
          stars: rate,
          comment: comment,
        },
        {
          headers: { Authorization: "Bearer " + getToken() },
        }
      )
      .then((response) => {
        showMessage("Cảm ơn bạn đã phản hồi!", "success");
        setResponse(false);
      })
      .catch((error) => {
        if (error.response) {
          setLoadResponse(false);
          showMessage(error.response.data.detail, "error");
        }
      });
}