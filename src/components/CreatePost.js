import React, { Component, useRef, useState, useEffect } from 'react';
import DateTimePicker from "react-datetime-picker";

// Use for snakebar
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../Services/Actions/SocialFeed/getAllUserPostsAction';
import { loadProfileByUserId } from '../Services/Actions/UserProfile/getUserProfileByUserIdAction';
import { loadArticleCategory } from '../Services/Actions/SocialFeed/getArticleCategoryAction';
import { loadEventCategory } from '../Services/Actions/SocialFeed/getEventCategoryAction';
import { loadColors } from '../Services/Actions/SocialFeed/getColorsAction';
import { loadAlertLevel, loadAlertRange } from '../Services/Actions/SocialFeed/getAlertDataAction';
import AddInYourPost from './AddInYourPost';
import PostDisplayType from './PostDisplayType';
import ColorModal from './post-components/Modals/ColorModal';

export default function CreatePost() {
    const [value2, onChange2] = useState(new Date());
    const [value3, onChange3] = useState(new Date());
    // this is used for event post
    const [startTime, startOnChange] = useState(new Date());
    const [endTime, endOnChange] = useState(new Date());
    const [postData, setPostData] = useState({
        postType: "text",
        caption: "",
        displayLocation: "",
        schedule: "",
        isScheduled: "",
        feelingId: "",
        feelingCategoryId: "",
        allowComments: 1,

        mentionIds: null,
        hashTags: [],
        taggedUserIds: null,

        locationLAT: "",
        locationLONG: "",
        location1: "",
        location2: "",
        location3: "",
        "thoughtForeColor": "#fff",
        "thoughtBackColor": "",
    })
    // Media File Preview of media post
    const [file, setFile] = useState([]);
    const [postMedia, setPostMedia] = useState('');

    // Media File Preview of event post
    const [eventCoverImage, setEventCoverImage] = useState();
    const [postMedia2, setPostMedia2] = useState('');

    // thought color selection
    const [selectedColor, setSelectedColor] = useState('#9acd32');

    // get all article category
    const { articleCategory } = useSelector(state => state.getArticleCategoryData)
    // get all event category
    const { eventCategory } = useSelector(state => state.getEventCategoryData)
    // get all colors
    const { colors } = useSelector(state => state.getColorsData)



    function handleChange(e, identifier) {
        if (identifier === 'media') {
            console.log(e.target.files);
            setFile([...file, ...e.target.files]);
            setPostMedia(e.target.files[0]);
        }
        else {
            setEventCoverImage(URL.createObjectURL(e.target.files[0]));
            setPostMedia2(e.target.files[0]);
        }


    }




    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    // Snackbar Code
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: 'success', content: '' });

    const [tempPollOption, setTempPollOption] = useState({
        seq1: '',
        seq2: ''
    })

    const [pollOptionCount, setPollOptionCount] = useState([1, 2]);

    // get user profile by user id 
    const { userProfileByUserId } = useSelector(state => state.getUserProfileByUserIdData);
    // get all alert range
    const { alertRange } = useSelector(state => state.getAlertData)
    // get all alert level
    const { alertLevel } = useSelector(state => state.getAlertData)

    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadProfileByUserId());
    }, [])


    //   Create Post BG 
    const bgNoneRef = useRef(null);
    const bgRef = useRef(null);
    // Create Thought Post 
    const clickGradient = (e, colorCode) => {
        bgRef.current.classList.add("d-block");
        bgNoneRef.current.classList.add("d-none");
        mediaRef.current.classList.remove("d-block");
        alertRef.current.classList.remove("d-block");
        RecommendationRef.current.classList.remove("d-block");
        gradientMainBlockRef.current.classList.remove("d-none");
        setSelectedColor(colorCode)
        setPostData({ ...postData, postType: 'thought', thoughtForeColor: "#fff", thoughtBackColor: colorCode })

    };
    const closeBgClick = (e) => {
        bgRef.current.classList.remove("d-block");
        bgNoneRef.current.classList.remove("d-none");
    };

    // Create Media Post 
    const mediaRef = useRef(null);
    const gradientMainBlockRef = useRef(null);
    const clickMedia = (e) => {
        mediaRef.current.classList.add("d-block");
        bgNoneRef.current.classList.add("d-none");
        bgRef.current.classList.remove("d-block");
        gradientMainBlockRef.current.classList.add("d-none");
        alertRef.current.classList.remove("d-block");
        RecommendationRef.current.classList.remove("d-block");
    };
    const closeMediaClick = (e) => {
        mediaRef.current.classList.remove("d-block");
        bgNoneRef.current.classList.remove("d-none");
        gradientMainBlockRef.current.classList.remove("d-none");
        setFile("")
    };

    // Create Recommendation Post 
    const RecommendationRef = useRef(null);
    const clickRecommendation = (e) => {
        RecommendationRef.current.classList.add("d-block");
        setPostData({ ...postData, postType: 'recommendation' })
        bgNoneRef.current.classList.add("d-none");
        mediaRef.current.classList.remove("d-block");
        alertRef.current.classList.remove("d-block");
        //gradient Button
        gradientMainBlockRef.current.classList.add("d-none");
        opneGradientRef.current.classList.remove("d-none");
        colorListRef.current.classList.remove("d-block");
        colorToggleRef.current.classList.remove("d-block");
        colorListRef.current.classList.add("d-none");
        colorToggleRef.current.classList.add("d-none");
    };

    // Create Article Post
    const articleRef = useRef(null);
    // const clickArticle = (e) => {
    //     articleRef.current.classList.add("d-block");
    //     bgNoneRef.current.classList.add("d-none");
    //     bgRef.current.classList.remove("d-block");
    //     mediaRef.current.classList.remove("d-block");
    //     eventRef.current.classList.remove("d-block");
    //     pollRef.current.classList.remove("d-block");
    //     alertRef.current.classList.remove("d-block");
    //     dispatch(loadArticleCategory())
    //     setPostData({ postType: 'article' })
    // };



    // Create Alert Post
    const alertRef = useRef(null);
    const clickAlert = (e) => {
        alertRef.current.classList.add("d-block");
        bgNoneRef.current.classList.add("d-none");
        bgRef.current.classList.remove("d-block");
        mediaRef.current.classList.remove("d-block");
        RecommendationRef.current.classList.remove("d-block");
        //gradient Button
        gradientMainBlockRef.current.classList.add("d-none");
        opneGradientRef.current.classList.remove("d-none");
        colorListRef.current.classList.remove("d-block");
        colorToggleRef.current.classList.remove("d-block");
        colorListRef.current.classList.add("d-none");
        colorToggleRef.current.classList.add("d-none");
        setPostData({ postType: 'alert' })
        dispatch(loadAlertLevel())
        dispatch(loadAlertRange())
    };

    // Show Color Plate 
    const colorListRef = useRef(null);
    const colorToggleRef = useRef(null);
    const opneGradientRef = useRef(null);
    const clickColorShow = (e) => {
        colorListRef.current.classList.add("d-block");
        colorToggleRef.current.classList.add("d-block");
        opneGradientRef.current.classList.add("d-none");
        colorListRef.current.classList.remove("d-none");
        colorToggleRef.current.classList.remove("d-none");
        dispatch(loadColors())
    };
    const clickColorHide = (e) => {
        opneGradientRef.current.classList.remove("d-none");
        colorListRef.current.classList.remove("d-block");
        colorToggleRef.current.classList.remove("d-block");
        colorListRef.current.classList.add("d-none");
        colorToggleRef.current.classList.add("d-none");
    };

    //Event Popup Function
    const eventPopup = () => {
        dispatch(loadEventCategory())
        setPostData({ postType: 'event' })
    }
    //Poll Popup Function
    const pollPopup = () => {
        setPostData({ ...postData, postType: 'poll' })
    }
    const pollDataHandler = (e) => {
        const { name, value } = e.target;
        setTempPollOption({ ...tempPollOption, [name]: value })
    }

    const optionIncrementHandler = (e) => {
        e.preventDefault();
        if (pollOptionCount.length < 10) {
            const nextData = `seq${pollOptionCount.length + 1}`
            setPollOptionCount([...pollOptionCount, pollOptionCount.length + 1]);
            setTempPollOption({ ...tempPollOption, [nextData]: '' })
        }
    }


    // create post functionality
    const createPostHandler = (e) => {
        e.preventDefault();
        console.log(postData)
        if (!postData.caption) { setOpen(true); setAlert({ sev: "error", content: "Please Enter Caption !", }); }
        else {
            axios.get('https://api.ipgeolocation.io/ipgeo?apiKey=c1016d597c494a02aa190877148a5688')
                .then((res) => {
                    postData.locationLAT = res.data.latitude;
                    postData.locationLONG = res.data.longitude;
                    postData.location1 = res.data.country_name;
                    postData.location2 = res.data.state_prov;
                    postData.location3 = res.data.city;
                    console.log(res.data)
                    console.log(postMedia)
                    if (file.length>0) {
                        postData.postType = 'media';
                        const formData = new FormData();
                        formData.append('files', postMedia);
                        file.map((imgObj) => {
                            return formData.append("files", imgObj);
                        })
                        formData.append('uploadFor', 'postMedia');
                        axios.post(`${process.env.REACT_APP_IPURL}/admin/UploadFile`, formData, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` } })
                            .then((res) => {
                                console.log(res.data)
                                postData.mediaList = [];
                                res.data.data.successResult.forEach((img,i)=>{
                                    postData.mediaList.push({
                                    "fileType": "image",
                                    "fileURL": img,
                                    "caption": "Caption",
                                    "sequence": i
                                })
                                })
                               
                                dispatch(addPost(postData));
                                setPostData({
                                    "postType": "text",
                                    "caption": "",
                                    "displayLocation": "",
                                    "schedule": "",
                                    "isScheduled": "",
                                    "feelingId": "",
                                    "feelingCategoryId": "",
                                    "allowComments": 0,

                                    "mentionIds": null,
                                    "hashTags": [],
                                    "taggedUserIds": null,

                                    "locationLAT": "",
                                    "locationLONG": "",
                                    "location1": "",
                                    "location2": "",
                                    "location3": ""
                                })
                                setFile('');
                                setOpen(true);
                                setAlert({ sev: "success", content: "Post Add Successfully !", });
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    }
                    else if (postData.postType === 'poll') {
                        if (tempPollOption.seq1 === '' && tempPollOption.seq2 === '') {
                            setOpen(true); setAlert({ sev: "error", content: "Please Enter Poll Options !", });
                        }
                        else {
                            const polOpt = [];
                            for (let key in tempPollOption) {
                                polOpt.push({ optionText: tempPollOption[key], sequence: +key.slice(3) })
                            }
                            postData.pollOptions = polOpt;
                            postData.pollStartTime = value2;

                            postData.pollEndTime = value3;
                            dispatch(addPost(postData));
                            // pollRef.current.classList.remove("d-block");
                            // bgNoneRef.current.classList.remove("d-none");

                            setPostData({
                                "postType": "text",
                                "caption": "",
                                "displayLocation": "",
                                "schedule": "",
                                "isScheduled": "",
                                "feelingId": "",
                                "feelingCategoryId": "",
                                "allowComments": 0,
                                "pollOptions": [],

                                "mentionIds": null,
                                "hashTags": [],
                                "taggedUserIds": null,

                                "locationLAT": "",
                                "locationLONG": "",
                                "location1": "",
                                "location2": "",
                                "location3": ""
                            })
                            setTempPollOption({
                                seq1: '',
                                seq2: ''
                            })
                            setPollOptionCount([1, 2])
                            document.getElementById('popupclose3').click();
                            setOpen(true);
                            setAlert({ sev: "success", content: "Post Add Successfully !", });
                        }
                    }
                    else if (postData.postType === 'event') {
                        postData.eventStartTime = startTime;
                        postData.eventEndTime = endTime;
                        if (postData.caption === '' || postData?.eventCategoryId === '' || eventCoverImage === '' || postData.eventStartTime === '' || postData.eventEndTime === '' || !postData?.eventDescription || postData.eventDescription === '' || !postData?.eventAddress || postData.eventAddress === '') {
                            setOpen(true); setAlert({ sev: "error", content: "Please Fill All Data !", });
                        }
                        else {
                            const formData = new FormData();
                            formData.append('files', postMedia2);
                            formData.append('uploadFor', 'postMedia');
                            axios.post(`${process.env.REACT_APP_IPURL}/admin/UploadFile`, formData, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` } })
                                .then(res => {
                                    postData.eventCoverImageURL = res.data.data.successResult[0];
                                    dispatch(addPost(postData));
                                    // eventRef.current.classList.remove("d-block");
                                    // bgNoneRef.current.classList.remove("d-none");
                                    document.getElementById('popupclose').click();
                                    setPostData({
                                        "postType": "text",
                                        "caption": "",
                                        "displayLocation": "",
                                        "schedule": "",
                                        "isScheduled": "",
                                        "feelingId": "",
                                        "feelingCategoryId": "",
                                        "allowComments": 0,
                                        "pollOptions": [],

                                        "mentionIds": null,
                                        "hashTags": [],
                                        "taggedUserIds": null,

                                        "locationLAT": "",
                                        "locationLONG": "",
                                        "location1": "",
                                        "location2": "",
                                        "location3": "",
                                        eventCategoryId: '',
                                        eventDescription: '',
                                        eventAddress: '',

                                    })

                                    setPostMedia('')
                                    setEventCoverImage('')

                                    setOpen(true);
                                    setAlert({ sev: "success", content: "Post Add Successfully !", });

                                })
                                .catch(err => {
                                    console.log(err)
                                })

                        }
                    }
                    else if (postData.postType === 'alert') {
                        if (!postData?.alertLevelId || !postData?.alertRangeMeter) {
                            setOpen(true); setAlert({ sev: "error", content: "Please Fill All Data !", });
                        }
                        else {

                            dispatch(addPost(postData));
                            alertRef.current.classList.remove("d-block");
                            bgNoneRef.current.classList.remove("d-none");
                            setPostData({
                                "postType": "text",
                                "caption": "",
                                "displayLocation": "",
                                "schedule": "",
                                "isScheduled": "",
                                "feelingId": "",
                                "feelingCategoryId": "",
                                "allowComments": 0,
                                "pollOptions": [],

                                "mentionIds": null,
                                "hashTags": [],
                                "taggedUserIds": null,

                                "locationLAT": "",
                                "locationLONG": "",
                                "location1": "",
                                "location2": "",
                                "location3": "",
                                alertRangeMeter: '',
                                alertLevelId: ''
                            })
                            setOpen(true);
                            setAlert({ sev: "success", content: "Post Add Successfully !", });

                        }
                    }
                    else if (postData.postType === 'thought') {
                        if (!postData?.caption) {
                            setOpen(true); setAlert({ sev: "error", content: "Please Fill Caption !", });
                        }
                        else {
                            dispatch(addPost(postData));
                            bgRef.current.classList.remove("d-block");
                            bgNoneRef.current.classList.remove("d-none");
                            setPostData({
                                "postType": "text",
                                "caption": "",
                                "displayLocation": "",
                                "schedule": "",
                                "isScheduled": "",
                                "feelingId": "",
                                "feelingCategoryId": "",
                                "allowComments": 0,
                                "pollOptions": [],

                                "mentionIds": null,
                                "hashTags": [],
                                "taggedUserIds": null,

                                "locationLAT": "",
                                "locationLONG": "",
                                "location1": "",
                                "location2": "",
                                "location3": "",
                                alertRangeMeter: '',
                                alertLevelId: ''
                            })
                            setOpen(true);
                            setAlert({ sev: "success", content: "Post Add Successfully !", });
                        }
                    }
                    else {
                        dispatch(addPost(postData));
                        setPostData({
                            "postType": "text",
                            "caption": "",
                            "displayLocation": "",
                            "schedule": "",
                            "isScheduled": "",
                            "feelingId": "",
                            "feelingCategoryId": "",
                            "allowComments": 0,

                            "mentionIds": null,
                            "hashTags": [],
                            "taggedUserIds": null,

                            "locationLAT": "",
                            "locationLONG": "",
                            "location1": "",
                            "location2": "",
                            "location3": ""
                        })
                        setOpen(true);
                        setAlert({ sev: "success", content: "Post Add Successfully !", });
                    }

                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    // Cancel Snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <div className="create-post">
                <div className="static-section">
                    <div className="card-title create-port-title">

                        <PostDisplayType postData={postData} setPostData={setPostData} />

                        <div className="golive-more-blk">
                            <div className="create-btn-livetrad">
                                <a className="btntrad">
                                    <img src="/assets/images/hotspot_pulse-1.svg" />Go Live
                                </a>
                            </div>
                            <div className="settings more-settings-blk">
                                <div className="setting-btn ms-2 setting-dropdown no-bg">
                                    <div className="btn-group custom-dropdown arrow-none dropdown-sm">
                                        <div role="button" data-bs-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false" className="morebtn-cust"> More
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="iw-14"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                        </div>
                                        <div className="dropdown-menu dropdown-menu-right custom-dropdown more-post-type-dropdown">
                                            <ul>
                                                <li>
                                                    <a onClick={clickMedia}><img src="/assets/images/Media.png" /> Media</a>
                                                </li>
                                                <li>
                                                    <a onClick={(e) => clickGradient(e, '#9acd32')}><img src="/assets/images/Thought.png" /> Thought</a>
                                                </li>
                                                <li>
                                                    <a ><img src="/assets/images/Go_live.png" /> Go Live</a>
                                                </li>
                                                <li>
                                                    <a data-bs-toggle="modal" data-bs-target="#createPostEvent" onClick={eventPopup}><img src="assets/images/Event.png" /> Event</a>
                                                </li>
                                                <li>
                                                    <a data-bs-toggle="modal" data-bs-target="#createPostPodcast"><img src="assets/images/Audio.png" /> Podcsat</a>
                                                </li>
                                                <li>
                                                    <a data-bs-toggle="modal" data-bs-target="#createPostArticle"><img src="assets/images/Blog.png" /> Articles</a>
                                                </li>
                                                <li>
                                                    <a onClick={clickRecommendation}><img src="/assets/images/Recommendation.png" /> Recommendation</a>
                                                </li>
                                                <li>
                                                    <a data-bs-toggle="modal" data-bs-target="#createPostPoll" onClick={pollPopup}><img src="/assets/images/Poll.png" /> Poll</a>
                                                </li>
                                                <li>
                                                    <a onClick={clickAlert}><img src="/assets/images/Threat.png" /> Alert</a>
                                                </li>
                                                <li>
                                                    <a data-bs-toggle="modal" data-bs-target="#createPostSell"><img src="assets/images/Sell.png" /> Sell</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gradiant Section */}
                    <div className="search-input input-style icon-right" ref={bgNoneRef}>
                        <div className="creatpost-profile-blk">
                            <img src={userProfileByUserId.profileImage} className="img-fluid" alt="profile" />
                        </div>
                        <textarea name="message" className="form-control enable" cols="30" rows="10" placeholder="What’s  going on? #Hashtag... @Mention." spellCheck="false" value={postData.caption} onChange={(e) => { setPostData({ ...postData, caption: e.target.value }) }}></textarea>
                        {/* <input type="text" className="form-control enable" placeholder="write something here.."/> */}
                        <a className="pen-icon-creatpost">
                            <img src={userProfileByUserId.profileImage} className="img-fluid icon" alt="pen" />
                        </a>
                    </div>

                    {/* Media Section */}
                    <div className="media-create-post-block" ref={mediaRef}>
                        <div className="search-input input-style icon-right">
                            <div className="creatpost-profile-blk">
                                <img src={userProfileByUserId.profileImage} className="img-fluid" alt="profile" />
                            </div>
                            <textarea name="message" className="form-control enable" cols="30" rows="10" placeholder="What’s  going on? #Hashtag... @Mention." spellCheck="false" value={postData.caption} onChange={(e) => { setPostData({ ...postData, caption: e.target.value }) }}></textarea>
                            <a className="pen-icon-creatpost">
                                <img src="/assets/images/pen-solid-2.png" className="img-fluid icon" alt="pen" />
                            </a>
                        </div>
                        <div className="images-videos-block">
                            <a className="media-img-vid-close" onClick={closeMediaClick}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="iw-20 ih-20"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </a>
                            <input id='media-input' className="choose-file" type="file" onChange={(e) => handleChange(e, 'media')} multiple accept=".jpg,.jpeg,.png" />
                            {file.length >= 1 && <div className='d-flex'>
                                <button className="media-img-vid-edit" >
                                    <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" className="icon-font-light  mr-1"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                                    Edit all
                                </button>
                                <button className="media-img-vid-addmore" onClick={() => document.getElementById('media-input').click()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="addpost-option-btn mr-1" width="17" height="17" viewBox="0 0 21 21" fill="#A6A6A6"><path fillRule="evenodd" clipRule="evenodd" d="M16.625 1.75H4.375C2.8875 1.75 1.75 2.8875 1.75 4.375V16.625C1.75 18.1125 2.8875 19.25 4.375 19.25H16.625C18.1125 19.25 19.25 18.1125 19.25 16.625V4.375C19.25 2.8875 18.1125 1.75 16.625 1.75ZM3.5 4.375C3.5 3.85 3.85 3.5 4.375 3.5H16.625C17.15 3.5 17.5 3.85 17.5 4.375V11.025L14.6125 8.1375C14.2625 7.7875 13.7375 7.7875 13.3875 8.1375L4.1125 17.4125C3.7625 17.325 3.5 16.975 3.5 16.625V4.375ZM6.475 17.5H16.625C17.15 17.5 17.5 17.15 17.5 16.625V13.475L14 9.975L6.475 17.5ZM7.4375 9.625C8.6625 9.625 9.625 8.6625 9.625 7.4375C9.625 6.2125 8.6625 5.25 7.4375 5.25C6.2125 5.25 5.25 6.2125 5.25 7.4375C5.25 8.6625 6.2125 9.625 7.4375 9.625ZM7.875 7.4375C7.875 7.175 7.7 7 7.4375 7C7.175 7 7 7.175 7 7.4375C7 7.7 7.175 7.875 7.4375 7.875C7.7 7.875 7.875 7.7 7.875 7.4375Z"></path></svg>
                                    Add Photo/Videos
                                </button>
                            </div>
                            }
                            <img src={file[0] ? `${URL.createObjectURL(file[0])}` : "assets/images/image-preview.jpg"} />
                            {
                                file.length > 1 && <div className="row">
                                    {
                                        file.slice(1).map((img) => {
                                            return <div className="col-4" key={img.lastModified}>
                                                <a className="media-img-close-icon" onClick={()=>{setFile(file.filter(file=>file.lastModified!==img.lastModified))}}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="iw-20 ih-20">
                                                    <line x1="18" y1="6" x2="6" y2="18" stroke="#000"></line>
                                                    <line x1="6" y1="6" x2="18" y2="18" stroke="#000"></line>
                                                    </svg>
                                                </a>
                                                <img src={`${URL.createObjectURL(img)}`} />
                                            </div>
                                        })
                                    }
                                </div>
                            }

                        </div>
                    </div>

                    {/* Recomendation Section */}
                    <div className="search-input input-style icon-right recommendation-block" ref={RecommendationRef}>
                        <div className="creatpost-profile-blk">
                            <img src={userProfileByUserId.profileImage} className="img-fluid" alt="profile" />
                        </div>
                        <textarea name="message" className="form-control enable" maxLength={'150'} cols="30" rows="10" placeholder="I am seeking recommendation for " spellCheck="false" value={postData?.caption} onChange={(e) => setPostData({ ...postData, caption: e.target.value })}></textarea>
                        {/* <input type="text" className="form-control enable" placeholder="write something here.."/> */}
                        <a className="pen-icon-creatpost">
                            <img src="/assets/images/pen-solid-2.png" className="img-fluid icon" alt="pen" />
                        </a>
                    </div>

                    {/* Alert Section */}
                    <div className="alert-create-post-block" ref={alertRef}>
                        <div className="user-profile-cp">
                            <img src={userProfileByUserId.profileImage} className="img-fluid" alt="profile" />
                            <h4>{userProfileByUserId.fullName}</h4>
                        </div>
                        <div className="custom-fixed-height-blk">
                            <form className="theme-form form-sm">
                                <div className="row  g-3">
                                    <div className="form-group col-md-12">
                                        <h4 className="create-alert-head">#creatalert</h4>
                                        {/* <label>Description</label> */}
                                        <div className="create-alert-textarea">
                                            <textarea rows="5" className="form-control" maxLength={'320'} value={postData?.caption} placeholder="Define the threat..." onChange={(e) => setPostData({ ...postData, caption: e.target.value })}></textarea>
                                            <p className="input-hints">Max 320 Characters</p>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label><svg viewBox="0 0 24 24" width="12" height="12" stroke="#FF822E" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> Alert Level</label>
                                        <select id="inputState" className="form-control" value={postData?.alertLevelId} onChange={(e) => setPostData({ ...postData, alertLevelId: e.target.value })}>
                                            <option value="">Select...</option>
                                            {
                                                alertLevel && alertLevel.map((lev) => {
                                                    return <option value={lev.id} key={lev.id}>{lev.name}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label><svg viewBox="0 0 24 24" width="12" height="12" stroke="#16C31E" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> Post Alert within</label>
                                        <select id="inputState" className="form-control" value={postData?.alertRangeMeter} onChange={(e) => setPostData({ ...postData, alertRangeMeter: e.target.value })}>
                                            <option value="">Select...</option>
                                            {
                                                alertRange && alertRange.map((ran, i) => {
                                                    return <option value={ran.distance} key={i}>{`${ran.distance} ${ran.unit}`}</option>
                                                })
                                            }

                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="create-bg">
                        <div className="bg-post gr-1" ref={bgRef} id="bg-post">
                            <div className="input-sec" style={{ background: selectedColor }}>
                                <input type="text" className="form-control enable text-white thought-input"
                                    placeholder="What's going on" value={postData?.caption} onChange={(e) => setPostData({ ...postData, caption: e.target.value })} />
                                <div className="close-icon" onClick={closeBgClick}>
                                    <a>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="iw-20 ih-20"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="gradient-bg-block" ref={gradientMainBlockRef}>
                            <img className="opengradient-box" ref={opneGradientRef} onClick={clickColorShow} src="assets/images/colorgroupbtn.png" />
                            <ul className="gradient-bg d-none" ref={colorListRef}>
                                <li className="closearrow-btn" onClick={clickColorHide}></li>
                                {
                                    colors && colors.map(({
                                        id,
                                        colorHexCode
                                    }) => {
                                        return <li onClick={(e) => clickGradient(e, colorHexCode)} className="gr-1" style={{ background: colorHexCode }} key={id}></li>
                                    }).slice(0, 16)
                                }

                            </ul>
                            <a className="bg-color-btn d-none" ref={colorToggleRef} data-bs-toggle="modal" data-bs-target="#bgColorModel"><img src="assets/images/bg-color.png" /></a>
                        </div>
                        {/* More Colors Modal */}
                        <ColorModal colors={colors} clickGradient={clickGradient} />
                    </div>
                </div>

                <AddInYourPost createPostHandler={createPostHandler} postData={postData} setPostData={setPostData} clickMedia={clickMedia} pollOptions={tempPollOption} />

                {/* <ul className="create-btm-option">
            <li>
                <input className="choose-file" type="file"/>
                <h5><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="iw-14"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>album</h5>
            </li>
            <li id="feeling-btn" onClick={onfeelingClick}>
                <h5><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="iw-15"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>feelings & acitivity</h5>
            </li>
            <li id="checkin-btn" onClick={onplaceClick}>
                <h5><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="iw-15"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>check in</h5>
            </li>
            <li id="friends-btn" onClick={onfriendClick}>
                <h5><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="iw-15"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>tag friends</h5>
            </li>
        </ul> */}


            </div>

            {/* Event Model Block */}
            <div className="modal fade" id="createPostEvent" tabIndex="-1" role="dialog" aria-labelledby="createPostEventTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered create-post-model-block" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <a data-bs-dismiss="modal" aria-label="Close" className="popupclose-button" id="popupclose"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-dark close-btn"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></a>
                            <div className="create-post">
                                <div className="static-section">
                                    <div className="card-title create-port-title">
                                        <PostDisplayType postData={postData} setPostData={setPostData} />
                                    </div>
                                    <div className="event-create-post-block">
                                        <div className="user-profile-cp">
                                            <img src={userProfileByUserId.profileImage} className="img-fluid" alt="profile" />
                                            <h4>{userProfileByUserId.fullName}</h4>
                                        </div>
                                        <form className="theme-form form-sm">
                                            <div className="row  g-3">
                                                <div className="form-group col-12">
                                                    <label>Event Category</label>
                                                    <select id="inputState" className="form-control" value={postData?.eventCategoryId} onChange={(e) => setPostData({ ...postData, eventCategoryId: e.target.value })}>
                                                        <option value="">Select...</option>
                                                        {
                                                            eventCategory && eventCategory.map((event) => {
                                                                return <option value={event.id} key={event.id}>{event.name}</option>
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div className="form-group col-md-12">
                                                    <label>Event Title*</label>
                                                    <input type="text" className="form-control" maxLength={'64'} required value={postData?.caption} onChange={(e) => setPostData({ ...postData, caption: e.target.value })} />
                                                    <p className="input-hints">Max 64 Characters</p>
                                                </div>
                                                <div className="form-group col-md-12">
                                                    <label>Upload Event Cover Photo</label>
                                                    <div className="upload-image-blk">
                                                        <input type="file" onChange={(e) => handleChange(e, 'event')} />
                                                        <img src={eventCoverImage} className="event-img-prev" />
                                                    </div>
                                                </div>
                                                <div className="form-group col-md-12">
                                                    <label>Description</label>
                                                    <textarea rows="3" className="form-control" value={postData?.eventDescription} onChange={(e) => setPostData({ ...postData, eventDescription: e.target.value })}></textarea>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label>Event Start Date</label>
                                                    <DateTimePicker className="form-control" placeholder="dd-mm-yyyy" onChange={startOnChange} value={startTime} />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label>Event End Date</label>
                                                    <DateTimePicker className="form-control" placeholder="dd-mm-yyyy" onChange={endOnChange} value={endTime} />
                                                </div>

                                                <div className="form-group col-md-12">
                                                    <label>Address or Link to event</label>
                                                    <input type="text" className="form-control" required value={postData?.eventAddress} onChange={(e) => setPostData({ ...postData, eventAddress: e.target.value })} />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <AddInYourPost createPostHandler={createPostHandler} postData={postData} setPostData={setPostData} clickMedia={clickMedia} pollOptions={tempPollOption} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*Article Model Block  */}
            <div className="modal fade" id="createPostArticle" tabIndex="-1" role="dialog" aria-labelledby="createPostArticleTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered create-post-model-block" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <a data-bs-dismiss="modal" aria-label="Close" className="popupclose-button" id="popupclose2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-dark close-btn"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></a>
                            <div className="create-post">
                                <div className="static-section">
                                    <div className="card-title create-port-title">
                                        <PostDisplayType postData={postData} setPostData={setPostData} />
                                    </div>

                                    <div className="article-create-post-block">
                                        <div className="user-profile-cp">
                                            <img src={userProfileByUserId.profileImage} className="img-fluid" alt="profile" />
                                            <h4>{userProfileByUserId.fullName}</h4>
                                        </div>
                                        <form className="theme-form form-sm">
                                            <div className="row  g-3">
                                                <div className="form-group col-12">
                                                    <label>Article Catagory</label>
                                                    <select id="inputState" className="form-control">
                                                        <option value="">Select...</option>
                                                        {
                                                            articleCategory && articleCategory.map((art) => {
                                                                return <option value={art.id} key={art.id}>{art.name}</option>
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div className="form-group col-md-12">
                                                    <label>Article Title*</label>
                                                    <input type="text" className="form-control" maxLength={'16'} required />
                                                    <p className="input-hints">Min 3 and Max 16 Characters</p>
                                                </div>
                                                <div className="form-group col-md-12">
                                                    <label>Upload banner Image</label>
                                                    <div className="upload-image-blk">
                                                        <input type="file" onChange={handleChange} />
                                                        <img src={file} className="event-img-prev" />
                                                    </div>
                                                </div>
                                                <div className="form-group col-md-12">
                                                    <label>Description</label>
                                                    <textarea rows="3" className="form-control"></textarea>
                                                </div>
                                                <div className="form-group col-md-12">
                                                    <label>Add tags</label>
                                                    <input type="text" className="form-control" maxLength={'16'} />
                                                    <p className="input-hints">Min 3 and Max 16 Characters</p>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <AddInYourPost createPostHandler={createPostHandler} postData={postData} setPostData={setPostData} clickMedia={clickMedia} pollOptions={tempPollOption} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Poll Model Block */}
            <div className="modal fade" id="createPostPoll" tabIndex="-1" role="dialog" aria-labelledby="createPostPollTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered create-post-model-block" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <a data-bs-dismiss="modal" aria-label="Close" className="popupclose-button" id="popupclose3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-dark close-btn"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></a>
                            <div className="create-post">
                                <div className="static-section">
                                    <div className="card-title create-port-title">
                                        <PostDisplayType postData={postData} setPostData={setPostData} />
                                    </div>
                                    <div className="poll-create-post-block">
                                        <div className="user-profile-cp">
                                            <img src={userProfileByUserId.profileImage} className="img-fluid" alt="profile" />
                                            <h4>{userProfileByUserId.fullName}</h4>
                                        </div>
                                        <form className="theme-form form-sm">
                                            <div className="row  g-3">
                                                <div className="form-group col-12">
                                                    <label>Poll Question</label>
                                                    <input type="text" className="form-control" value={postData?.caption} required onChange={(e) => { setPostData({ ...postData, caption: e.target.value }) }} />
                                                </div>
                                                <div className="poll-option-blk">
                                                    {
                                                        pollOptionCount && pollOptionCount.map((option, i) => {
                                                            return <div className="form-group col-md-12" key={i}>
                                                                <label>Option {option}</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    required
                                                                    name={`seq${option}`}
                                                                    value={tempPollOption[`seq${option}`]}
                                                                    onChange={pollDataHandler} />
                                                            </div>
                                                        })
                                                    }
                                                    <div className='d-flex justify-content-end no-account-blk'>
                                                        {pollOptionCount.length < 10 && <button className='button-anchor' onClick={optionIncrementHandler}>Add More Option</button>}
                                                    </div>
                                                </div>
                                                <div className="form-group col-md-12">
                                                    <label>Poll Duration</label>
                                                    <p className="poll-duration-cont">This poll will be automatically disabled after the selected time duration</p>
                                                    <div className="row">
                                                        <div className="col-md-12 search-input schedule-input"><DateTimePicker className="form-control" placeholder="dd-mm-yyyy" onChange={onChange2} value={value2} /></div>
                                                        <div className="col-md-12 search-input schedule-input mt-3"><DateTimePicker className="form-control" placeholder="dd-mm-yyyy" onChange={onChange3} value={value3} /></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <AddInYourPost createPostHandler={createPostHandler} postData={postData} setPostData={setPostData} clickMedia={clickMedia} pollOptions={tempPollOption} />

                            </div>
                        </div>
                    </div>
                </div>
            </div >

            {/* Podcast Model Block */}
            <div div className="modal fade" id="createPostPodcast" tabIndex="-1" role="dialog" aria-labelledby="createPostPodcastTitle" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered create-post-model-block" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <a data-bs-dismiss="modal" aria-label="Close" className="popupclose-button" id="popupclose"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-dark close-btn"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></a>
                            <div className="create-post">
                                <div className="static-section">
                                    <div className="card-title create-port-title">
                                        <PostDisplayType postData={postData} setPostData={setPostData} />
                                    </div>
                                    <div className="article-create-post-block">
                                        <div className="user-profile-cp">
                                            <img src={userProfileByUserId.profileImage} className="img-fluid" alt="profile" />
                                            <h4>{userProfileByUserId.fullName}</h4>
                                        </div>
                                        <form className="theme-form form-sm">
                                            <div className="row  g-3">
                                                <div className="form-group col-12">
                                                    <label>Podcast Type</label>
                                                    <select id="inputState" className="form-control">
                                                        <option>Live Podcast</option>
                                                        <option>Upload Recorded Poadcast</option>
                                                        <option>Create New Poadcast Series</option>
                                                    </select>
                                                </div>
                                                <div className="form-group col-12">
                                                    <label>Podcast Category</label>
                                                    <select id="inputState" className="form-control">
                                                        <option>Education</option>
                                                        <option>Politics & Crupption</option>
                                                        <option>Food</option>
                                                        <option>Science</option>
                                                        <option>Geogrophy</option>
                                                        <option>Social Work & Management</option>
                                                        <option>Internationa Economy Management system</option>
                                                        <option>Sports</option>
                                                        <option>Tour & Travels</option>
                                                        <option>Party</option>
                                                        <option>Art & Craft</option>
                                                        <option>Journey</option>
                                                        <option>Birds & Aminals</option>
                                                        <option>Business</option>
                                                        <option>Software Development</option>
                                                        <option>Infrastructure Development</option>
                                                        <option>Astrology</option>
                                                        <option>Medical & Health</option>
                                                    </select>
                                                </div>
                                                <div className="form-group col-md-12">
                                                    <label>Podcast Title</label>
                                                    <input type="text" className="form-control" required />
                                                    <p className="input-hints">Max 120 Characters</p>
                                                </div>
                                                <div className="form-group col-md-12">
                                                    <label>Upload podcast cover Image</label>
                                                    <div className="upload-image-blk">
                                                        <input type="file" onChange={handleChange} />
                                                        <img src={file} className="event-img-prev" />
                                                    </div>
                                                </div>
                                                <div className="form-group col-md-12">
                                                    <label>Upload Voice</label>
                                                    <div className="upload-image-blk">
                                                        <input type="file" />
                                                        <div className="audio-preview-blk">
                                                            <audio controls controlsList="nodownload noplaybackrate">
                                                                <source src="assets/images/audio/audio-file.mp3" type="audio/mpeg" />
                                                            </audio>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group col-md-12">
                                                    <label>Paid (Optional)</label>
                                                    <div className="row">
                                                        <div className="col-3">
                                                            <select id="inputState" className="form-control">
                                                                <option>$</option>
                                                                <option>€</option>
                                                                <option>₹</option>
                                                                <option>£</option>
                                                                <option>¥</option>
                                                                <option>J$</option>
                                                                <option>₩</option>
                                                                <option>₮</option>
                                                                <option>ƒ</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-9">
                                                            <input type="text" className="form-control" placeholder="Enter amount..." />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group col-md-12">
                                                    <label>About Podcast</label>
                                                    <textarea rows="3" className="form-control" maxLength={'1200'}></textarea>
                                                    <p className="input-hints">Max 1200 Characters</p>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <AddInYourPost createPostHandler={createPostHandler} postData={postData} setPostData={setPostData} clickMedia={clickMedia} pollOptions={tempPollOption} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sell Model Post */}
            <div div className="modal fade" id="createPostSell" tabIndex="-1" role="dialog" aria-labelledby="createPostSellTitle" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered create-post-model-block" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <a data-bs-dismiss="modal" aria-label="Close" className="popupclose-button" id="popupclose"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-dark close-btn"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></a>
                            <div className="create-post">
                                <div className="static-section">
                                    <div className="card-title create-port-title">
                                        <PostDisplayType postData={postData} setPostData={setPostData} />
                                    </div>
                                    <div className="event-create-post-block">
                                        <div className="user-profile-cp">
                                            <img src="assets/images/my-profile.jpg" className="img-fluid" alt="profile" />
                                            <h4>Kelin jasen</h4>
                                        </div>
                                        <form className="theme-form form-sm">
                                            <div className="row  g-3">
                                                <div className="form-group col-12">
                                                    <label>Product Category</label>
                                                    <select id="inputState" className="form-control">
                                                        <option>Electronic</option>
                                                        <option>Furniture</option>
                                                        <option>Toy & Baby</option>
                                                        <option>Grocery</option>
                                                        <option>Fashin</option>
                                                        <option>Appliances</option>
                                                    </select>
                                                </div>
                                                <div className="form-group col-md-12">
                                                    <label>Product Title*</label>
                                                    <input type="text" className="form-control" placeholder="Enter your product title..." required />
                                                    <p className="input-hints">Max 84 Characters</p>
                                                </div>
                                                <div className="form-group col-md-12">
                                                    <label>Upload Product Image</label>
                                                    <div className="upload-image-blk">
                                                        <input type="file" onChange={handleChange} />
                                                        <img src={file} className="event-img-prev" />
                                                    </div>
                                                </div>
                                                <div className="form-group col-md-12">
                                                    <label>Price</label>
                                                    <div className="row">
                                                        <div className="col-3">
                                                            <select id="inputState" className="form-control">
                                                                <option>$</option>
                                                                <option>€</option>
                                                                <option>₹</option>
                                                                <option>£</option>
                                                                <option>¥</option>
                                                                <option>J$</option>
                                                                <option>₩</option>
                                                                <option>₮</option>
                                                                <option>ƒ</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-9">
                                                            <input type="text" className="form-control" placeholder="Enter amount..." required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group col-md-12">
                                                    <label>Product Description</label>
                                                    <textarea rows="3" className="form-control" placeholder="Enter product description here..."></textarea>
                                                    <p className="input-hints">Max 600 Characters</p>
                                                </div>
                                                <div className="form-group col-md-12">
                                                    <label>Product Location</label>
                                                    <div className="icon-input-block">
                                                        <input type="text" className="form-control" placeholder="Enter your product Location..." required />
                                                        <span className="form-iconbox-blk"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" className="iw-18 ih-18"><path d="M9.875 2.34316V2.55471L10.0836 2.58972C12.8052 3.04635 14.955 5.19502 15.4085 7.9161L15.4433 8.125H15.6551H16.875C17.3592 8.125 17.75 8.51581 17.75 9C17.75 9.48419 17.3592 9.875 16.875 9.875H15.6551H15.4433L15.4085 10.0839C14.9549 12.8051 12.8051 14.9549 10.0839 15.4085L9.875 15.4433V15.6551V16.875C9.875 17.3592 9.48419 17.75 9 17.75C8.51581 17.75 8.125 17.3592 8.125 16.875V15.6551V15.4433L7.9161 15.4085C5.19502 14.955 3.04635 12.8052 2.58972 10.0836L2.55471 9.875H2.34316H1.125C0.641708 9.875 0.25 9.48404 0.25 9C0.25 8.51596 0.641708 8.125 1.125 8.125H2.34316H2.55471L2.58972 7.91637C3.04633 5.19496 5.19496 3.04633 7.91637 2.58972L8.125 2.55471V2.34316V1.125C8.125 0.641708 8.51596 0.25 9 0.25C9.48404 0.25 9.875 0.641708 9.875 1.125V2.34316ZM6.4375 9C6.4375 7.58416 7.58416 6.4375 9 6.4375C10.4158 6.4375 11.5625 7.58416 11.5625 9C11.5625 10.4158 10.4158 11.5625 9 11.5625C7.58416 11.5625 6.4375 10.4158 6.4375 9ZM4.25 9C4.25 11.6236 6.37638 13.75 9 13.75C11.6236 13.75 13.75 11.6236 13.75 9C13.75 6.37638 11.6236 4.25 9 4.25C6.37638 4.25 4.25 6.37638 4.25 9Z" fill="#B9B9B9" stroke="white" strokeWidth="0.5" /></svg></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <AddInYourPost createPostHandler={createPostHandler} postData={postData} setPostData={setPostData} clickMedia={clickMedia} pollOptions={tempPollOption} />

                            </div>
                        </div>
                    </div>
                </div>
            </div >

            <Stack spacing={2} sx={{ width: '100%' }} id="stack">
                {/* Snackbar */}
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={1500} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={alert.sev} sx={{ width: '100%' }}>
                        {alert.content}
                    </Alert>
                </Snackbar>
            </Stack>
        </>
    );
} 
