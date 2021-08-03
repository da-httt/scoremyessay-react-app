import { getBaseURL, getToken } from "../../../Utils/Common";

const api = getBaseURL();
export function getRating(setAverageRating, setReviews, setSpinning) {
  api
    .get("/users/me", {
      headers: { Authorization: "Bearer " + getToken() },
    })
    .then(async (response) => {
      setSpinning(false);
      await api
        .get("ratings/teacher/" + response.data.info.user_id, {
          headers: { Authorization: "Bearer " + getToken() },
        })
        .then((response) => {
          setAverageRating(response.data.average_rating);
        });

      await api
        .get("ratings", {
          headers: { Authorization: "Bearer " + getToken() },
        })
        .then((response) => {
          setReviews(response.data.data);
        });
    });
}
