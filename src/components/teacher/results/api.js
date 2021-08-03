import { getBaseURL, getToken, getTokenType } from "../../../Utils/Common";
import { formatTitle, showMessage } from "../../commonFormat";

const api = getBaseURL();

export function postRatings(
  orderID,
  rate,
  comment,
  setResponse,
  setLoadResponse
) {
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
    .then(() => {
      setLoadResponse(false);
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


export async function getOrders(orderID, setTitle, setContent, setTitleS, setSpinning) {
  await api
    .get("/orders/" + orderID, {
      headers: { Authorization: getTokenType() + " " + getToken() },
    })
    .then((response) => {
      setTitle(response.data.essay.title);
      setContent(response.data.essay.content);
      formatTitle(response.data.essay.title, setTitleS);
      setSpinning(false);
    });
}

export async function getSpellingErrors(
  orderID,
  setTopic,
  setSpelling,
  setNumSentence,
  setAverage,
  setNumErrors
) {
  await api
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
  await api
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

export async function getComments(orderID, setSentences) {
  await api
    .get("/essay_comments/" + orderID, {
      headers: { Authorization: getTokenType() + " " + getToken() },
    })
    .then((response) => {
      const data = response.data;
      setSentences(data.essay_comments);
    });
}
export async function getRatings(orderID, setResponse, setRate, setComment) {
  await api
    .get("ratings/" + orderID, {
      headers: { Authorization: getTokenType() + " " + getToken() },
    })
    .then((response) => {
      setResponse(false);
      setRate(response.data.stars);
      setComment(response.data.comment);
    })
    .catch((error) => {
      if (error.response)
        if (error.response.status === 404) {
          setResponse(true);
          setRate(0);
          setComment(null);
        }
    });
}
