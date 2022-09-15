import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { loadAllUserFollowers } from '../../Services/Actions/Common/getUserFollowersAction';
import { blockUser } from '../../Services/Actions/Common/userBlockUnblockAction';
import './Style.css'

const Followers = () => {
    const { getUserFollowers } = useSelector(state => state.GetUserFollowersData)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAllUserFollowers())
    }, [])

    // BLOCK USER
    const handleBlock = (id) => {
        dispatch(blockUser(id));
    };
    return (
        <>
            <div className="mppage-heading">
                <div className="group-custom-block">
                    <div className="heading-podcast-blk">
                        <h3>Followers</h3>
                        <NavLink to="/FollowersScreen" className="single-ancor-blk">See All →</NavLink>
                    </div>
                    <div className="row">
                        {
                            getUserFollowers && getUserFollowers.rows?.slice(0, 8).map((request) => {
                                return <div className="col-lg-3 col-12 p-1">
                                    <div className="mp-releted-pro-blk mp-releted-pro-blk-new content-mp-block d-flex justify-content-between">
                                        <div className="media-body d-none d-md-block">
                                            <div class="media media-new d-none d-sm-flex">
                                                <div class="user-img">
                                                    <img src={request.profileImage || 'https://sociomee-dev.s3.ap-south-1.amazonaws.com/userProfileDp/LhXHReJcWmnBW.jpg'} className="img-fluid bg-img connection-profile connection-profile-new" alt="shivam singh" />
                                                    <span class="available-stats online"></span>
                                                </div>
                                                <div class="media-body d-none d-md-block pl-2">
                                                    <h4 className='m-0'>{request.fullName || 'name'}</h4>
                                                    <span>{request.userName || 'userName'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <button className="gallery-img-sublink gallery-img-sublink-new request-group-dots">
                                            <a href="#" className="dropbtn-gal" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="iw-14 ih-14"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle>
                                                </svg>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right custom-dropdown drop-menu-gal drop-menu-gal-new-follower">
                                                <ul>
                                                    <li>
                                                        <a href="#" className='green-text'><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="icon-font-light iw-16 ih-16 "><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>Follow back</a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className=''><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="icon-font-light iw-16 ih-16 "><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>Remove Follower</a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className='orange-text'
                                                            onClick={() => {
                                                                handleBlock(request.id);
                                                            }}>
                                                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="icon-font-light iw-16 ih-16 "><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>Block User</a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className='red-text'><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="icon-font-light iw-16 ih-16"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>Report User</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            })
                        }
                        {
                            getUserFollowers.length <= 0 && <h3 className='text-center'>No Followers Found</h3>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Followers