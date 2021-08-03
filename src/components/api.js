import { getBaseURL } from "../Utils/Common"

const api = getBaseURL()

export function getTypes(setTypes) {
    api.get('/types',).then(response => {
        setTypes(response.data.data)
    })
}