import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { getUserFollowingRequests } from '../../Services/Actions/UserProfile/userFollowingRequestsAction';
import Header from '../Header';
import LeftSidebar from '../LeftSidebar';
import RightSidebar from '../RightSidebar';
import ConnectionPlaceMenu from './ConnectionPlaceMenu/ConnectionPlaceMenu';
import ConnectionSub from './ConnectionSub';
import Followers from './Followers';
import FollowingScreen from './FollowingScreen';
import PendingRequest from './PendingRequest';
import SociomateScreen from './SociomateScreen';
import './Style.css'
// import MarketplaceMenu from './MarketplaceMenu';

const Connection = () => {


    return (
        <>
            <Header></Header>
            <div className="page-body container-fluid profile-page">
                <LeftSidebar></LeftSidebar>
                <div className="page-center">
                    {/* <MarketplaceMenu></MarketplaceMenu> */}
                    <div className="mp-head-blk mp-head-blk-new col-lg-12 d-flex">
                        <h2 className="col-lg-6 p-0">Connection</h2>

                        <div className="col-lg-6">
                            <ul className="mp-right-btns">
                                <li>
                                    <div className="search-box-mp">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon iw-16 icon-light"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                        <input type="text" className="form-control search-type" placeholder="find friends..." />
                                    </div>
                                </li>
                                <li>
                                    <a href="/" className="mp-filter-btn" data-bs-toggle="modal" data-bs-target="#mpfiltermodel">
                                        <img src="/assets/images/icons/sliders.png" alt="slider" className='ml-2' />
                                        Filter
                                    </a>
                                </li>
                                <li>
                                    <NavLink to="/MpSell" className="mp-sell-btn">Setting</NavLink>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <ConnectionPlaceMenu />

                    {/* PENDING REQUEST */}
                    <PendingRequest></PendingRequest>
                    <Followers></Followers>
                    <FollowingScreen></FollowingScreen>
                    <SociomateScreen></SociomateScreen>
                    <ConnectionSub></ConnectionSub>

                </div>
                <RightSidebar></RightSidebar>
            </div>
            {/* <Models></Models> */}
        </>
    )
}

export default Connection