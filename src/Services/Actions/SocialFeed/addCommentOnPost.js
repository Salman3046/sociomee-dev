import * as types from '../../Constants/SocialFeed/index';
import axios from 'axios';
import { loadAllUserPosts } from '../SocialFeed/getAllUserPostsAction';
import { loadAllCommments } from './getAllCommentsAction';


const commentAdded = () => ({
    type: types.ADD_COMMENT_ON_POST,
});

// add comment on post
export const addCommentOnPost = (comment) => {
    let user = JSON.parse(localStorage.getItem('user'));
   
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_IPURL}/post/addComment/`, comment, {headers: { Authorization: `Bearer ${user.token ? user?.token : ''}` }})
            .then((res) => {
                dispatch(commentAdded(res.data));
                dispatch(loadAllUserPosts());
                dispatch(loadAllCommments({ postId: comment.postId, pageSize: 4 }));

            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// add like on comment
export const addLikeOnComment = (like) => {
    let user = JSON.parse(localStorage.getItem('user'));
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_IPURL}/post/setCommentLike`, like, { headers: { Authorization: `Bearer ${user.token ? user?.token : ''}` } })
            .then((res) => {
                console.log(res.data)
                dispatch(loadAllUserPosts());

            })
            .catch((error) => {
                console.log(error);
            })
    };
};

