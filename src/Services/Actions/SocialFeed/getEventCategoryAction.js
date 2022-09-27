import * as types from '../../Constants/SocialFeed/index';
import axios from 'axios';

const getEventCategory = (eventCategory) => ({
    type: types.GET_EVENT_CATEGORY,
    payload: eventCategory,
});

// get all event category
export const loadEventCategory = () => {
    return function (dispatch) {
        let user = JSON.parse(localStorage.getItem('sociomeeUser'));
       
        if (user) {
            axios.post(`${process.env.REACT_APP_IPURL}/post/getEventCategory`,{},{headers: { Authorization: `Bearer ${user?.token}` }})
                .then((res) => {
                    dispatch(getEventCategory(res.data.data.successResult.rows))
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    };
};
