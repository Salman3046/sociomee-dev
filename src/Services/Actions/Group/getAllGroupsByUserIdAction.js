import * as types from '../../Constants/index';
import axios from 'axios';

const getAllGroupsByUserId = (allGroupsByUserId) => ({
    type: types.GET_ALL_GROUPS_BY_USER_ID,
    payload: allGroupsByUserId,
});
 
// get all post by user id 
export const loadAllGroupsByUserId = () => {
    return function (dispatch) {

        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            axios.post(`https://apiserver.msgmee.com/user/getGroupOfUser`,{userId: user.id }, {
                headers: {
                    Authorization: 'Bearer ' + user.token
                }
            })
                .then((res) => {
                    console.log("all groups by uid:", res.data.data);
                    dispatch(getAllGroupsByUserId(res.data.data.successResult.rows))
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    };
};
