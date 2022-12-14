import * as types from '../../Constants/index';
import axios from 'axios';

const getGroup = (getGroupAdministrater) => ({
    type: types.GET_GROUP_ADMINISTRATER,
    payload: getGroupAdministrater,
})

export const getGroupAdministraterAction = (id) => {
    return function (dispatch) {

        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const grpBody = ({
                "groupId": id
            })
            axios.post(`https://apiserver.msgmee.com/group/administrater/get`, grpBody, {
                headers: {
                    Authorization: 'Bearer ' + user.token
                }
            })
                .then((res) => {
                    // console.log("all groups by administrater:", res.data.data);
                    dispatch(getGroup(res.data.data.successResult))
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    };
};