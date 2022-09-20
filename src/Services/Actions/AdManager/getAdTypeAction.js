import * as types from '../../Constants/AdManager/index';
import axios from "axios";

const getAdType = (adType) => ({
    type: types.GET_TYPE,
    payload: adType,
});

// send user following request
export const loadAdType = () => {
    return function (dispatch) {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user?.token) {
            const data = {
                "pageIndex": 1,
                "pageSize":10
            }
            axios.post(`${process.env.REACT_APP_IPURL}/ads/adMaster/adType`, data,
                { headers: { Authorization: `Bearer ${user.token}` } })
                .then((res) => {
                    console.log(res.data)
                    dispatch(getAdType(res.data.data.successResult))
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    };
};