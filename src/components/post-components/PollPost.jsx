import React from 'react'
import { useDispatch } from 'react-redux';
import { addAnswerOnPollPost } from '../../Services/Actions/addAnswerOnPollPostAction'
import { loadAllUserPosts } from '../../Services/Actions/getAllUserPostsAction'

const PollPost = ({ poll, pageSize, setOpen, setAlert }) => {

    const dispatch = useDispatch();

    // submit poll's answer
    const selectPollOption = (postId, pollOptionId) => {
        // console.log(postId, pollOptionId)
        dispatch(addAnswerOnPollPost({ postId: postId, pollOptionId: pollOptionId }))
        setOpen(true);
        setAlert({ sev: "success", content: "Poll Submitted ✔️", });
        setTimeout(() => {
            dispatch(loadAllUserPosts(pageSize))
        }, 1000)
    }

    return (
        <>
            {/* <label>Poll</label> */}
            <div className="form-check">
                {/* <p>Total Participant: 234y</p> */}
                <div className="poll-homeoption-blk">
                    {
                        poll.pollOptions && poll.pollOptions.sort((a, b) => a.sequence - b.sequence).map((pollOpt) => {
                            return <div className="poll-radio-blk" key={pollOpt.pollOptionId}>
                                <input className="radio_animated"
                                    type="radio"
                                    name={poll.postType}
                                    id="radio1"
                                    onChange={() => selectPollOption(poll.postId, pollOpt.pollOptionId)} />
                                <label htmlFor="option1">{pollOpt.optionText}</label>
                            </div>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default PollPost
