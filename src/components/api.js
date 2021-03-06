import { getBaseURL } from "../Utils/Common"

const api = getBaseURL()

export async function getTypes(setTypes) {
    api.get('/types',).then(response => {
        setTypes(response.data.data)
    })
}