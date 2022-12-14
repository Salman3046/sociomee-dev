import React, { Component, useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { loadAllGroupsByUserId } from '../../Services/Actions/Group/getAllGroupsByUserIdAction';
import { useDispatch, useSelector } from 'react-redux'
import { loadAllUserGroups } from '../../Services/Actions/Group/getAllUserGroupsAction';

export default function GroupMenu() {

    let dispatch = useDispatch();
    
    // const { allGroupsByUserId } = useSelector(state => state.getAllGroupsByUserData);
    // console.log("hey there........", allGroupsByUserId)
    // const allGroups = allGroupsByUserId.length;
    // useEffect(() => {
    //     dispatch(loadAllGroupsByUserId());
    // }, []);

    const { allUserGroups } = useSelector(state => state.getAllUserGroupsData);
    console.log("hey there........", allUserGroups)
    const allGroups = allUserGroups.length;
    useEffect(() => {
        dispatch(loadAllUserGroups());
    }, []);

    return (
        <>
            <div className="profile-menu section-t-space">
                <ul>
                    <li>
                        <NavLink to="/Group">
                            <h6>All Groups ({allGroups})</h6>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/OwnedGroup">
                            <h6>Owned (23)</h6>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/JoinedGroup">
                            <h6>Joined (18)</h6>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/InviteGroup">
                            <h6>Invite by Groups (32)</h6>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/GroupJointRequest">
                            <h6>Group Join Request (12)</h6>
                        </NavLink>
                    </li>
                </ul>
                <ul className="right-menu d-xl-flex d-none">
                    <li>
                        <a href="#" data-bs-toggle="modal" data-bs-target="#createGroup">
                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="iw-14 ih-14"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            <h6>Create Group</h6>
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
} 