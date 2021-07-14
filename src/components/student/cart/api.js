import { getBaseURL, getToken, getTokenType } from '../../../Utils/Common';

const api = getBaseURL();

export function getOrders(setOrders, setOrders2){
    api.get('/orders/saved', {
        headers: { Authorization: getTokenType() + ' ' + getToken() }
    }).then(response => {
        const orders = response.data.data;
        setOrders(orders);
        setOrders2(orders);

    })
}