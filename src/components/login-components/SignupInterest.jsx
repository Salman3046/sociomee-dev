import { Autocomplete, TextField } from '@mui/material';
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios';
import { useEffect } from 'react';


const SignupInterest = () => {

    const user = JSON.parse(localStorage.getItem('user'))
    const errorRef = useRef(null);
    const [error, setError] = useState('')

    let navigate = useNavigate();
    const [interestData, setInterestData] = useState([]);
    const [getAllInterest, setGetAllInterest] = useState([]);
    const [searchValue, setSearchValue] = useState("")


    const interestsHandler = (interest) => {
        errorRef.current.classList.add('d-none');
        const exists = interestData?.find(inter => inter.id === interest.id);
        if (exists) {
            setInterestData(interestData?.filter(int => int.id !== interest.id))
        }
        else {
            setInterestData([...interestData, interest])
        }
    }

    // User Registration
    const registerUser = (ev) => {
        ev.preventDefault();
        console.log(interestData)
        if (!interestData) { errorRef.current.classList.remove('d-none'); setError("Please Select Interests"); }
        else if (interestData.length < 3) { errorRef.current.classList.remove('d-none'); setError("Please select at least 3 interests"); }
        else {
            const interest = interestData.map((val) => val.id)
            const body = { interestIds: interest }
            const config = {
                headers: { Authorization: `Bearer ${user?.token}` }
            };
            axios.post('https://apiserver.msgmee.com/user/addInterests', body, config)
                .then((res) => {
                    if (res.data.data?.successResult) {

                        navigate('/Home')
                    }
                    else {
                        errorRef.current.classList.remove('d-none');
                        setError('Please Enter Valid Email Address')
                    }
                })
                .catch((err) => {
                    errorRef.current.classList.remove('d-none');
                    setError(err)
                })
        }
    }


    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${user?.token}` }
        };
        const body = { searchKey: "" }
        axios.post('https://apiserver.msgmee.com/admin/getAllInterests', body, config)
            .then((res) => {
                setGetAllInterest(res.data.data?.successResult?.rows)
            })
            .catch((err) => {
                errorRef.current.classList.remove('d-none');
                setError(err)
            })
    }, [])

    return (
        <>
            <section className="login-section">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-4 col-lg-5 col-md-6 col-sm-8 col-12 m-auto">
                            <div className="login-header-section">
                                <div className="logo-sec"><Link className="" to="/"><img src="/assets/images/logo.png" alt="logo" className="img-fluid" /></Link></div>
                            </div>
                            <div className="login-form">
                                <div className="signup-progress-bar">
                                    <div className="su-progress active"></div>
                                    <div className="su-progress active"></div>
                                    <div className="su-progress active"></div>
                                    <div className="su-progress active"></div>
                                    <div className="su-progress active"></div>
                                </div>
                                <div>
                                    <div className="login-title">
                                        <h2>Choose your Interests</h2>
                                    </div>
                                    <div className="login-discription">
                                        <h4>Please select <b>at least 3 interests</b> for a better in-app experience</h4>
                                    </div>
                                    <hr />
                                    <div className="form-sec">
                                        <div>
                                            <form className="theme-form">
                                                <div className="form-group">
                                                    {/* Mui Autocomplete multiselect*/}
                                                    {/* <Autocomplete
                                                        multiple
                                                        limitTags={2}
                                                        id="multiple-limit-tags"
                                                        options={getAllInterest}
                                                        getOptionLabel={(option) => option.name}
                                                        renderInput={(params) => (
                                                            <TextField {...params} label="Interest" placeholder="Select Favourite" />
                                                        )}
                                                        onChange={(e, params) => setInterestData(params)} 
                                                    />*/}
                                                    <div class="form-group search-group-box">
                                                        <input type="text" class="form-control" placeholder="Search..." value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
                                                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="#B9B9C3" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="input-icon iw-20 ih-20">
                                                            <circle cx="11" cy="11" r="8"></circle>
                                                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                                        </svg>
                                                    </div>
                                                    <div className="interest-list-blk">
                                                        <ul>
                                                            {
                                                                getAllInterest && getAllInterest
                                                                ?.filter(intr => intr.name.match(new RegExp(searchValue, "i")))
                                                                .map((intr) => {
                                                                    return <li key={intr.id}>
                                                                        <div className="form-check checkbox_animated">
                                                                            <input type="checkbox" className="form-check-input" id={intr.name} onChange={() => interestsHandler(intr)} checked={interestData.some(data=>data.id===intr.id)}/>
                                                                            <label className="form-check-label" htmlFor={intr.name}>
                                                                                {intr.name}
                                                                                <img src={intr.icon_url}
                                                                                    class="icon"
                                                                                    height="20"
                                                                                    width="20" />
                                                                            </label>
                                                                        </div>
                                                                    </li>
                                                                })
                                                            }
                                                        </ul>
                                                        <p className="error-input-msg text-center d-none" ref={errorRef}>{error}</p>
                                                    </div>
                                                </div>
                                                <div className="btn-section">
                                                    <button className="btn btn-solid btn-lg" onClick={registerUser} disabled={interestData.length < 3}>CONTINUE</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default SignupInterest