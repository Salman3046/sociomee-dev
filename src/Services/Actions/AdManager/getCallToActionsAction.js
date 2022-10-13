import * as types from '../../Constants/AdManager/index';
import axios from "axios";

const getCallToActions = (callToActions) => ({
    type: types.GET_CALL_TO_ACTIONS,
    payload: callToActions,
});

// send user following request
export const loadCallToActions = () => {
    return function (dispatch) {
        let user = JSON.parse(localStorage.getItem('sociomeeUser'));
        if (user?.token) {
            axios.post(`${process.env.REACT_APP_IPURL}/ads/adMaster/adType/subTypes/CallToActionMaster`, {},
                { headers: { Authorization: `Bearer ${user?.token}` } })
                .then((res) => {
                    console.log(res.data.data)
                    dispatch(getCallToActions(res.data.data.successResult))
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    };
};