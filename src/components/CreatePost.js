import React, { useRef, useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";

// Use for snakebar
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../Services/Actions/SocialFeed/getAllUserPostsAction";
import { loadProfileByUserId } from "../Services/Actions/UserProfile/getUserProfileByUserIdAction";
import { loadArticleCategory } from "../Services/Actions/SocialFeed/getArticleCategoryAction";
import { loadEventCategory } from "../Services/Actions/SocialFeed/getEventCategoryAction";
import { loadColors } from "../Services/Actions/SocialFeed/getColorsAction";
import {
  loadAlertLevel,
  loadAlertRange,
} from "../Services/Actions/SocialFeed/getAlertDataAction";
import AddInYourPost from "./AddInYourPost";
import PostDisplayType from "./PostDisplayType";
import ColorModal from "./post-components/Modals/ColorModal";
import CreateEventModal from "./post-components/Modals/CreateEventModal";
import CreateArticleModal from "./post-components/Modals/CreateArticleModal";
import CreatePollModal from "./post-components/Modals/CreatePollModal";
import CreatePodcastModal from "./post-components/Modals/CreatePodcastModal";
import CreateSellModal from "./post-components/Modals/CreateSellModal";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CreatePost() {
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
    thoughtForeColor: "#fff",
    thoughtBackColor: "",
  });
  // Media File Preview of media post
  const [mediaPost, setMediaPost] = useState([]);

  // thought color selection
  const [selectedColor, setSelectedColor] = useState("#9acd32");

  const [tempPollOption, setTempPollOption] = useState({
    seq1: "",
    seq2: "",
  });

  // Snackbar Code
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ sev: "success", content: "" });

  const [pollOptionCount, setPollOptionCount] = useState([1, 2]);

  // get all colors
  const { colors } = useSelector((state) => state.getColorsData);

  // get user profile by user id
  const { userProfileByUserId } = useSelector(
    (state) => state.getUserProfileByUserIdData
  );
  // get all alert range
  const { alertRange } = useSelector((state) => state.getAlertData);
  // get all alert level
  const { alertLevel } = useSelector((state) => state.getAlertData);

  let dispatch = useDispatch();

  //   Create Post BG
  const bgNoneRef = useRef(null);
  const bgRef = useRef(null);

  // Create Media Post
  const mediaRef = useRef(null);
  const gradientMainBlockRef = useRef(null);

  // Create Recommendation Post
  const RecommendationRef = useRef(null);

  // Create Alert Post
  const alertRef = useRef(null);

  // Show Color Plate
  const colorListRef = useRef(null);
  const colorToggleRef = useRef(null);
  const openGradientRef = useRef(null);

  // Create Thought Post
  const clickGradient = (e, colorCode) => {
    bgRef.current.classList.add("d-block");
    bgNoneRef.current.classList.add("d-none");
    mediaRef.current.classList.remove("d-block");
    alertRef.current.classList.remove("d-block");
    RecommendationRef.current.classList.remove("d-block");
    gradientMainBlockRef.current.classList.remove("d-none");
    setSelectedColor(colorCode);
    setPostData({
      ...postData,
      postType: "thought",
      thoughtForeColor: "#fff",
      thoughtBackColor: colorCode,
    });
  };
  const closeBgClick = (e) => {
    bgRef.current.classList.remove("d-block");
    bgNoneRef.current.classList.remove("d-none");
  };

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
    setMediaPost("");
  };

  const clickRecommendation = (e) => {
    RecommendationRef.current.classList.add("d-block");
    setPostData({ ...postData, postType: "recommendation" });
    bgNoneRef.current.classList.add("d-none");
    mediaRef.current.classList.remove("d-block");
    alertRef.current.classList.remove("d-block");
    //gradient Button
    gradientMainBlockRef.current.classList.add("d-none");
    openGradientRef.current.classList.remove("d-none");
    colorListRef.current.classList.remove("d-block");
    colorToggleRef.current.classList.remove("d-block");
    colorListRef.current.classList.add("d-none");
    colorToggleRef.current.classList.add("d-none");
  };

  const clickAlert = (e) => {
    alertRef.current.classList.add("d-block");
    bgNoneRef.current.classList.add("d-none");
    bgRef.current.classList.remove("d-block");
    mediaRef.current.classList.remove("d-block");
    RecommendationRef.current.classList.remove("d-block");
    //gradient Button
    gradientMainBlockRef.current.classList.add("d-none");
    openGradientRef.current.classList.remove("d-none");
    colorListRef.current.classList.remove("d-block");
    colorToggleRef.current.classList.remove("d-block");
    colorListRef.current.classList.add("d-none");
    colorToggleRef.current.classList.add("d-none");
    setPostData({ postType: "alert" });
    dispatch(loadAlertLevel());
    dispatch(loadAlertRange());
  };

  const clickColorShow = (e) => {
    colorListRef.current.classList.add("d-block");
    colorToggleRef.current.classList.add("d-block");
    openGradientRef.current.classList.add("d-none");
    colorListRef.current.classList.remove("d-none");
    colorToggleRef.current.classList.remove("d-none");
    dispatch(loadColors());
  };
  const clickColorHide = (e) => {
    openGradientRef.current.classList.remove("d-none");
    colorListRef.current.classList.remove("d-block");
    colorToggleRef.current.classList.remove("d-block");
    colorListRef.current.classList.add("d-none");
    colorToggleRef.current.classList.add("d-none");
  };

  //Event Popup Function
  const eventPopup = () => {
    dispatch(loadEventCategory());
    setPostData({ postType: "event" });
  };
  //article Popup Function
  const articlePopup = () => {
    dispatch(loadArticleCategory());
    setPostData({ postType: "article" });
  };
  //Poll Popup Function
  const pollPopup = () => {
    setPostData({ ...postData, postType: "poll" });
  };

  const handleChange = (e, identifier) => {
    if (identifier === "media") {
      setMediaPost([...mediaPost, ...e.target.files]);
    } else {
      setPostData({ ...postData, eventCoverImageURL: e.target.files[0] });
    }
  };

  // create post functionality
  const createPostHandler = (e) => {
    e.preventDefault();
    console.log(postData);
    if (!postData.caption) {
      setOpen(true);
      setAlert({ sev: "error", content: "Please Enter Caption !" });
    } else {
      axios
        .get(
          "https://api.ipgeolocation.io/ipgeo?apiKey=c1016d597c494a02aa190877148a5688"
        )
        .then((res) => {
          postData.locationLAT = res.data.latitude;
          postData.locationLONG = res.data.longitude;
          postData.location1 = res.data.country_name;
          postData.location2 = res.data.state_prov;
          postData.location3 = res.data.city;
          console.log(res.data);
          if (mediaPost.length > 0) {
            postData.postType = "media";
            console.log(mediaPost);
            if (mediaPost.length <= 5) {
              const formData = new FormData();
              mediaPost.map((imgObj) => {
                return formData.append("files", imgObj);
              });
              formData.append("uploadFor", "postMedia");
              axios
                .post(
                  `${process.env.REACT_APP_IPURL}/admin/UploadFile`,
                  formData,
                  {
                    headers: {
                      Authorization: `Bearer ${
                        JSON.parse(localStorage.getItem("user")).token
                      }`,
                    },
                  }
                )
                .then((res) => {
                  console.log(res.data);
                  if (res.data.success) {
                    postData.mediaList = [];
                    res.data.data.successResult.forEach((img, i) => {
                      postData.mediaList.push({
                        fileType: mediaPost[i].type.slice(0, 5),
                        fileURL: img,
                        caption: "Caption",
                        sequence: i,
                      });
                    });

                    dispatch(addPost(postData));
                    setPostData({
                      postType: "text",
                      caption: "",
                      displayLocation: "",
                      schedule: "",
                      isScheduled: "",
                      feelingId: "",
                      feelingCategoryId: "",
                      allowComments: 0,

                      mentionIds: null,
                      hashTags: [],
                      taggedUserIds: null,

                      locationLAT: "",
                      locationLONG: "",
                      location1: "",
                      location2: "",
                      location3: "",
                    });
                    setMediaPost("");
                    setOpen(true);
                    setAlert({
                      sev: "success",
                      content: "Post Add Successfully !",
                    });
                  } else {
                    setOpen(true);
                    setAlert({
                      sev: "error",
                      content: `${res.data.data.errorResult}`,
                    });
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            } else {
              setOpen(true);
              setAlert({
                sev: "error",
                content:
                  "Max Image Upload Limit Exceed: Allowed Limit 5 Images !",
              });
            }
          } else if (postData.postType === "poll") {
            if (tempPollOption.seq1 === "" && tempPollOption.seq2 === "") {
              setOpen(true);
              setAlert({
                sev: "error",
                content: "Please Enter Poll Options !",
              });
            } else if (!postData?.pollStartTime || !postData?.pollEndTime) {
              setOpen(true);
              setAlert({
                sev: "error",
                content: "Please Select Start & End Time !",
              });
            } else {
              const polOpt = [];
              for (let key in tempPollOption) {
                if (tempPollOption[key] !== "") {
                  polOpt.push({
                    optionText: tempPollOption[key],
                    sequence: +key.slice(3),
                  });
                }
              }
              postData.pollOptions = polOpt;
              dispatch(addPost(postData));
              // pollRef.current.classList.remove("d-block");
              // bgNoneRef.current.classList.remove("d-none");

              setPostData({
                postType: "text",
                caption: "",
                displayLocation: "",
                schedule: "",
                isScheduled: "",
                feelingId: "",
                feelingCategoryId: "",
                allowComments: 0,
                pollOptions: [],

                mentionIds: null,
                hashTags: [],
                taggedUserIds: null,

                locationLAT: "",
                locationLONG: "",
                location1: "",
                location2: "",
                location3: "",
              });
              setTempPollOption({
                seq1: "",
                seq2: "",
              });
              setPollOptionCount([1, 2]);
              document.getElementById("popupclose3").click();
              setOpen(true);
              setAlert({ sev: "success", content: "Post Add Successfully !" });
            }
          } else if (postData.postType === "event") {
            if (
              postData.caption === "" ||
              postData?.eventCategoryId === "" ||
              postData?.eventCoverImageURL === "" ||
              postData.eventStartTime === "" ||
              postData.eventEndTime === "" ||
              !postData?.eventDescription ||
              postData.eventDescription === "" ||
              !postData?.eventAddress ||
              postData.eventAddress === ""
            ) {
              setOpen(true);
              setAlert({ sev: "error", content: "Please Fill All Data !" });
            } else {
              const formData = new FormData();
              formData.append("files", postData.eventCoverImageURL);
              formData.append("uploadFor", "postMedia");
              axios
                .post(
                  `${process.env.REACT_APP_IPURL}/admin/UploadFile`,
                  formData,
                  {
                    headers: {
                      Authorization: `Bearer ${
                        JSON.parse(localStorage.getItem("user")).token
                      }`,
                    },
                  }
                )
                .then((res) => {
                  postData.eventCoverImageURL = res.data.data.successResult[0];
                  dispatch(addPost(postData));
                  // eventRef.current.classList.remove("d-block");
                  // bgNoneRef.current.classList.remove("d-none");
                  document.getElementById("popupclose").click();
                  setPostData({
                    postType: "text",
                    caption: "",
                    displayLocation: "",
                    schedule: "",
                    isScheduled: "",
                    feelingId: "",
                    feelingCategoryId: "",
                    allowComments: 0,
                    pollOptions: [],

                    mentionIds: null,
                    hashTags: [],
                    taggedUserIds: null,

                    locationLAT: "",
                    locationLONG: "",
                    location1: "",
                    location2: "",
                    location3: "",
                    eventCategoryId: "",
                    eventDescription: "",
                    eventAddress: "",
                  });
                  setOpen(true);
                  setAlert({
                    sev: "success",
                    content: "Post Add Successfully !",
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          } else if (postData.postType === "alert") {
            if (!postData?.alertLevelId || !postData?.alertRangeMeter) {
              setOpen(true);
              setAlert({ sev: "error", content: "Please Fill All Data !" });
            } else {
              dispatch(addPost(postData));
              alertRef.current.classList.remove("d-block");
              bgNoneRef.current.classList.remove("d-none");
              setPostData({
                postType: "text",
                caption: "",
                displayLocation: "",
                schedule: "",
                isScheduled: "",
                feelingId: "",
                feelingCategoryId: "",
                allowComments: 0,
                pollOptions: [],

                mentionIds: null,
                hashTags: [],
                taggedUserIds: null,

                locationLAT: "",
                locationLONG: "",
                location1: "",
                location2: "",
                location3: "",
                alertRangeMeter: "",
                alertLevelId: "",
              });
              setOpen(true);
              setAlert({ sev: "success", content: "Post Add Successfully !" });
            }
          } else if (postData.postType === "thought") {
            if (!postData?.caption) {
              setOpen(true);
              setAlert({ sev: "error", content: "Please Fill Caption !" });
            } else {
              dispatch(addPost(postData));
              bgRef.current.classList.remove("d-block");
              bgNoneRef.current.classList.remove("d-none");
              setPostData({
                postType: "text",
                caption: "",
                displayLocation: "",
                schedule: "",
                isScheduled: "",
                feelingId: "",
                feelingCategoryId: "",
                allowComments: 0,
                pollOptions: [],

                mentionIds: null,
                hashTags: [],
                taggedUserIds: null,

                locationLAT: "",
                locationLONG: "",
                location1: "",
                location2: "",
                location3: "",
                alertRangeMeter: "",
                alertLevelId: "",
              });
              setOpen(true);
              setAlert({ sev: "success", content: "Post Add Successfully !" });
            }
          } else {
            dispatch(addPost(postData));
            setPostData({
              postType: "text",
              caption: "",
              displayLocation: "",
              schedule: "",
              isScheduled: "",
              feelingId: "",
              feelingCategoryId: "",
              allowComments: 0,

              mentionIds: null,
              hashTags: [],
              taggedUserIds: null,

              locationLAT: "",
              locationLONG: "",
              location1: "",
              location2: "",
              location3: "",
            });
            setOpen(true);
            setAlert({ sev: "success", content: "Post Add Successfully !" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // Cancel Snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    dispatch(loadProfileByUserId());
  }, []);

  return (
    <>
      <div className="create-post">
        <div className="static-section">
          <div className="card-title create-port-title">
            <PostDisplayType postData={postData} setPostData={setPostData} />

            <div className="golive-more-blk">
              <div className="create-btn-livetrad">
                <a className="btntrad">
                  <img src="/assets/images/hotspot_pulse-1.svg" />
                  Go Live
                </a>
              </div>
              <div className="settings more-settings-blk">
                <div className="setting-btn ms-2 setting-dropdown no-bg">
                  <div className="btn-group custom-dropdown arrow-none dropdown-sm">
                    <div
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      className="morebtn-cust"
                    >
                      {" "}
                      More
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="iw-14"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                    <div className="dropdown-menu dropdown-menu-right custom-dropdown more-post-type-dropdown">
                      <ul>
                        <li>
                          <a onClick={clickMedia}>
                            <img src="/assets/images/Media.png" /> Media
                          </a>
                        </li>
                        <li>
                          <a onClick={(e) => clickGradient(e, "#9acd32")}>
                            <img src="/assets/images/Thought.png" /> Thought
                          </a>
                        </li>
                        <li>
                          <a>
                            <img src="/assets/images/Go_live.png" /> Go Live
                          </a>
                        </li>
                        <li>
                          <a
                            data-bs-toggle="modal"
                            data-bs-target="#createPostEvent"
                            onClick={eventPopup}
                          >
                            <img src="assets/images/Event.png" /> Event
                          </a>
                        </li>
                        <li>
                          <a
                            data-bs-toggle="modal"
                            data-bs-target="#createPostPodcast"
                          >
                            <img src="assets/images/Audio.png" /> Podcsat
                          </a>
                        </li>
                        <li>
                          <a
                            data-bs-toggle="modal"
                            data-bs-target="#createPostArticle"
                            onClick={articlePopup}
                          >
                            <img src="assets/images/Blog.png" /> Articles
                          </a>
                        </li>
                        <li>
                          <a onClick={clickRecommendation}>
                            <img src="/assets/images/Recommendation.png" />{" "}
                            Recommendation
                          </a>
                        </li>
                        <li>
                          <a
                            data-bs-toggle="modal"
                            data-bs-target="#createPostPoll"
                            onClick={pollPopup}
                          >
                            <img src="/assets/images/Poll.png" /> Poll
                          </a>
                        </li>
                        <li>
                          <a onClick={clickAlert}>
                            <img src="/assets/images/Threat.png" /> Alert
                          </a>
                        </li>
                        <li>
                          <a
                            data-bs-toggle="modal"
                            data-bs-target="#createPostSell"
                          >
                            <img src="assets/images/Sell.png" /> Sell
                          </a>
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
              <img
                src={userProfileByUserId.profileImage}
                className="img-fluid"
                alt="profile"
              />
            </div>
            <textarea
              name="message"
              className="form-control enable"
              cols="30"
              rows="10"
              placeholder="What’s  going on? #Hashtag... @Mention."
              spellCheck="false"
              value={postData.caption}
              onChange={(e) => {
                setPostData({ ...postData, caption: e.target.value });
              }}
            ></textarea>
            {/* <input type="text" className="form-control enable" placeholder="write something here.."/> */}
            <a className="pen-icon-creatpost">
              <img
                src={userProfileByUserId.profileImage}
                className="img-fluid icon"
                alt="pen"
              />
            </a>
          </div>

          {/* Media Section */}
          <div className="media-create-post-block" ref={mediaRef}>
            <div className="search-input input-style icon-right">
              <div className="creatpost-profile-blk">
                <img
                  src={userProfileByUserId.profileImage}
                  className="img-fluid"
                  alt="profile"
                />
              </div>
              <textarea
                name="message"
                className="form-control enable"
                cols="30"
                rows="10"
                placeholder="What’s  going on? #Hashtag... @Mention."
                spellCheck="false"
                value={postData.caption}
                onChange={(e) => {
                  setPostData({ ...postData, caption: e.target.value });
                }}
              ></textarea>
              <a className="pen-icon-creatpost">
                <img
                  src="/assets/images/pen-solid-2.png"
                  className="img-fluid icon"
                  alt="pen"
                />
              </a>
            </div>
            <div className="images-videos-block">
              <a
                className="media-img-close-icon mt-3 "
                onClick={closeMediaClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="iw-20 ih-20"
                >
                  <line x1="18" y1="6" x2="6" y2="18" stroke="#000"></line>
                  <line x1="6" y1="6" x2="18" y2="18" stroke="#000"></line>
                </svg>
              </a>
              <input
                id="media-input"
                className="choose-file"
                type="file"
                onChange={(e) => handleChange(e, "media")}
                multiple
                accept=".jpg,.jpeg,.png"
              />
              {mediaPost.length >= 1 && (
                <div className="d-flex">
                  <button className="media-img-vid-edit">
                    <svg
                      viewBox="0 0 24 24"
                      width="13"
                      height="13"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon-font-light  mr-1"
                    >
                      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                    </svg>
                    Edit all
                  </button>
                  <button
                    className="media-img-vid-addmore"
                    onClick={() =>
                      document.getElementById("media-input").click()
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="addpost-option-btn mr-1"
                      width="17"
                      height="17"
                      viewBox="0 0 21 21"
                      fill="#A6A6A6"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.625 1.75H4.375C2.8875 1.75 1.75 2.8875 1.75 4.375V16.625C1.75 18.1125 2.8875 19.25 4.375 19.25H16.625C18.1125 19.25 19.25 18.1125 19.25 16.625V4.375C19.25 2.8875 18.1125 1.75 16.625 1.75ZM3.5 4.375C3.5 3.85 3.85 3.5 4.375 3.5H16.625C17.15 3.5 17.5 3.85 17.5 4.375V11.025L14.6125 8.1375C14.2625 7.7875 13.7375 7.7875 13.3875 8.1375L4.1125 17.4125C3.7625 17.325 3.5 16.975 3.5 16.625V4.375ZM6.475 17.5H16.625C17.15 17.5 17.5 17.15 17.5 16.625V13.475L14 9.975L6.475 17.5ZM7.4375 9.625C8.6625 9.625 9.625 8.6625 9.625 7.4375C9.625 6.2125 8.6625 5.25 7.4375 5.25C6.2125 5.25 5.25 6.2125 5.25 7.4375C5.25 8.6625 6.2125 9.625 7.4375 9.625ZM7.875 7.4375C7.875 7.175 7.7 7 7.4375 7C7.175 7 7 7.175 7 7.4375C7 7.7 7.175 7.875 7.4375 7.875C7.7 7.875 7.875 7.7 7.875 7.4375Z"
                      ></path>
                    </svg>
                    Add Photo/Videos
                  </button>
                </div>
              )}
              {mediaPost[0]?.type === "video/mp4" ? (
                <video width="100%" height="300" controls>
                  <source
                    src={
                      mediaPost[0]
                        ? `${URL.createObjectURL(mediaPost[0])}`
                        : "assets/images/image-preview.jpg"
                    }
                    type="video/mp4"
                  />
                </video>
              ) : (
                <img
                  src={
                    mediaPost[0]
                      ? `${URL.createObjectURL(mediaPost[0])}`
                      : "assets/images/image-preview.jpg"
                  }
                />
              )}
              {mediaPost.length > 1 && (
                <div className="row">
                  {mediaPost.slice(1).map((med) => {
                    return (
                      <div className="col-4" key={med.lastModified}>
                        <a
                          className="media-img-close-icon"
                          onClick={() => {
                            setMediaPost(
                              mediaPost.filter(
                                (media) =>
                                  media.lastModified !== med.lastModified
                              )
                            );
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="iw-20 ih-20"
                          >
                            <line
                              x1="18"
                              y1="6"
                              x2="6"
                              y2="18"
                              stroke="#000"
                            ></line>
                            <line
                              x1="6"
                              y1="6"
                              x2="18"
                              y2="18"
                              stroke="#000"
                            ></line>
                          </svg>
                        </a>
                        {med.type === "video/mp4" ? (
                          <video width="100%" height="300" controls>
                            <source
                              src={`${URL.createObjectURL(med)}`}
                              type="video/mp4"
                            />
                          </video>
                        ) : (
                          <img src={`${URL.createObjectURL(med)}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Recomendation Section */}
          <div
            className="search-input input-style icon-right recommendation-block"
            ref={RecommendationRef}
          >
            <div className="creatpost-profile-blk">
              <img
                src={userProfileByUserId.profileImage}
                className="img-fluid"
                alt="profile"
              />
            </div>
            <textarea
              name="message"
              className="form-control enable"
              maxLength={"150"}
              cols="30"
              rows="10"
              placeholder="I am seeking recommendation for "
              spellCheck="false"
              value={postData?.caption}
              onChange={(e) =>
                setPostData({ ...postData, caption: e.target.value })
              }
            ></textarea>
            {/* <input type="text" className="form-control enable" placeholder="write something here.."/> */}
            <a className="pen-icon-creatpost">
              <img
                src="/assets/images/pen-solid-2.png"
                className="img-fluid icon"
                alt="pen"
              />
            </a>
          </div>

          {/* Alert Section */}
          <div className="alert-create-post-block" ref={alertRef}>
            <div className="user-profile-cp">
              <img
                src={userProfileByUserId.profileImage}
                className="img-fluid"
                alt="profile"
              />
              <h4>{userProfileByUserId.fullName}</h4>
            </div>
            <div className="custom-fixed-height-blk">
              <form className="theme-form form-sm">
                <div className="row  g-3">
                  <div className="form-group col-md-12">
                    <h4 className="create-alert-head">#creatalert</h4>
                    {/* <label>Description</label> */}
                    <div className="create-alert-textarea">
                      <textarea
                        rows="5"
                        className="form-control"
                        maxLength={"320"}
                        value={postData?.caption}
                        placeholder="Define the threat..."
                        onChange={(e) =>
                          setPostData({ ...postData, caption: e.target.value })
                        }
                      ></textarea>
                      <p className="input-hints">Max 320 Characters</p>
                    </div>
                  </div>
                  <div className="form-group col-md-6">
                    <label>
                      <svg
                        viewBox="0 0 24 24"
                        width="12"
                        height="12"
                        stroke="#FF822E"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="css-i6dzq1"
                      >
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>{" "}
                      Alert Level
                    </label>
                    <select
                      id="inputState"
                      className="form-control"
                      value={postData?.alertLevelId}
                      onChange={(e) =>
                        setPostData({
                          ...postData,
                          alertLevelId: e.target.value,
                        })
                      }
                    >
                      <option value="">Select...</option>
                      {alertLevel &&
                        alertLevel.map((lev) => {
                          return (
                            <option value={lev.id} key={lev.id}>
                              {lev.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label>
                      <svg
                        viewBox="0 0 24 24"
                        width="12"
                        height="12"
                        stroke="#16C31E"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="css-i6dzq1"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>{" "}
                      Post Alert within
                    </label>
                    <select
                      id="inputState"
                      className="form-control"
                      value={postData?.alertRangeMeter}
                      onChange={(e) =>
                        setPostData({
                          ...postData,
                          alertRangeMeter: e.target.value,
                        })
                      }
                    >
                      <option value="">Select...</option>
                      {alertRange &&
                        alertRange.map((ran, i) => {
                          return (
                            <option
                              value={ran.distance}
                              key={i}
                            >{`${ran.distance} ${ran.unit}`}</option>
                          );
                        })}
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          {/* Thought Section */}
          <div className="create-bg">
            <div className="bg-post gr-1" ref={bgRef} id="bg-post">
              <div className="input-sec" style={{ background: selectedColor }}>
                <input
                  type="text"
                  className="form-control enable text-white thought-input"
                  placeholder="What's going on"
                  value={postData?.caption}
                  onChange={(e) =>
                    setPostData({ ...postData, caption: e.target.value })
                  }
                />
                <div className="close-icon" onClick={closeBgClick}>
                  <a>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="iw-20 ih-20"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="gradient-bg-block" ref={gradientMainBlockRef}>
              <img
                className="opengradient-box"
                ref={openGradientRef}
                onClick={clickColorShow}
                src="assets/images/colorgroupbtn.png"
              />
              <ul className="gradient-bg d-none" ref={colorListRef}>
                <li className="closearrow-btn" onClick={clickColorHide}></li>
                {colors &&
                  colors
                    .map(({ id, colorHexCode }) => {
                      return (
                        <li
                          onClick={(e) => clickGradient(e, colorHexCode)}
                          className="gr-1"
                          style={{ background: colorHexCode }}
                          key={id}
                        ></li>
                      );
                    })
                    .slice(0, 16)}
              </ul>
              <a
                className="bg-color-btn d-none"
                ref={colorToggleRef}
                data-bs-toggle="modal"
                data-bs-target="#bgColorModel"
              >
                <img src="assets/images/bg-color.png" />
              </a>
            </div>
            {/* More Colors Modal */}
            <ColorModal colors={colors} clickGradient={clickGradient} />
          </div>
        </div>

        <AddInYourPost
          createPostHandler={createPostHandler}
          postData={postData}
          setPostData={setPostData}
          clickMedia={clickMedia}
          pollOptions={tempPollOption}
        />
      </div>

      {/* Event Model Block */}
      <CreateEventModal
        postData={postData}
        setPostData={setPostData}
        userProfileByUserId={userProfileByUserId}
        createPostHandler={createPostHandler}
        handleChange={handleChange}
        clickMedia={clickMedia}
        tempPollOption={tempPollOption}
      />

      {/*Article Model Block  */}
      <CreateArticleModal
        postData={postData}
        setPostData={setPostData}
        userProfileByUserId={userProfileByUserId}
        createPostHandler={createPostHandler}
        handleChange={handleChange}
        clickMedia={clickMedia}
        tempPollOption={tempPollOption}
      />

      {/* Poll Model Block */}
      <CreatePollModal
        postData={postData}
        setPostData={setPostData}
        userProfileByUserId={userProfileByUserId}
        createPostHandler={createPostHandler}
        clickMedia={clickMedia}
        tempPollOption={tempPollOption}
        setTempPollOption={setTempPollOption}
        pollOptionCount={pollOptionCount}
        setPollOptionCount={setPollOptionCount}
      />

      {/* Podcast Model Block */}
      <CreatePodcastModal
        postData={postData}
        setPostData={setPostData}
        userProfileByUserId={userProfileByUserId}
        createPostHandler={createPostHandler}
        handleChange={handleChange}
        clickMedia={clickMedia}
        tempPollOption={tempPollOption}
      />
      {/* Sell Model Post */}
      <CreateSellModal
        postData={postData}
        setPostData={setPostData}
        userProfileByUserId={userProfileByUserId}
        createPostHandler={createPostHandler}
        handleChange={handleChange}
        clickMedia={clickMedia}
        tempPollOption={tempPollOption}
      />

      <Stack spacing={2} sx={{ width: "100%" }} id="stack">
        {/* Snackbar */}
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={1500}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={alert.sev}
            sx={{ width: "100%" }}
          >
            {alert.content}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}
