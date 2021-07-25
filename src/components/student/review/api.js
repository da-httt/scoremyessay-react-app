import { getBaseURL, getToken } from "../../../Utils/Common";

const api = getBaseURL();
export function getReview(setReviews){
    api
        .get("/users/me", {
          headers: { Authorization: "Bearer " + getToken() },
        })
        .then((response) => {
          api
            .get("ratings?student_id=" + response.data.info.user_id, {
              headers: { Authorization: "Bearer " + getToken() },
            })
            .then((response) => {
              setReviews(response.data.data);
            });
        });
}