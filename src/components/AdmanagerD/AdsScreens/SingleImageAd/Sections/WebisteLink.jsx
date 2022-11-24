import React, { useLayoutEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Use for snakeBar
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import Loader from "../../../../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { loadCallToActions } from "../../../../../Services/Actions/AdManager/getCallToActionsAction";
import PreviewMoreSection from "../../AdPreview/Sections/PreviewMoreSection";
import PreviewsSection from "../../AdPreview/Sections/PreviewsSection";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const WebsiteLink = ({ typeId, subTypeId, adTypeData }) => {
  const [media, setMedia] = useState("");
  const { callToActions } = useSelector((state) => state.getCallToActionsData);

  // Snackbar Code
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ sev: "success", content: "" });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [expandPreview, setExpandPreview] = useState(false);

  const dispatch = useDispatch();

  const [mediaData, setMediaData] = useState({
    file: "postMedia/oBVuwyFSCUbUs.jpg",
    fileType: "image",
    heading: "",
    subHeading: "",
    callToActionId: "",
  });
  const [adData, setAdData] = useState({
    discriptions: "",
    websiteLink: "",
    adStatus: "READY_TO_START",
    adTypesId: typeId,
    adSubTypesId: subTypeId,
    media: [],
  });

  const mediaInputsHandler = (ev) => {
    const { name, value } = ev.target;
    setMediaData({ ...mediaData, [name]: value });
  };

  //   this function is used for submit details
  const submitDetails = (e) => {
    e.preventDefault();
    if (!mediaData.heading) {
      setOpen(true);
      setAlert({ sev: "error", content: "Please Enter Heading !" });
    } else if (!mediaData.subHeading) {
      setOpen(true);
      setAlert({ sev: "error", content: "Please Enter Sub-Heading !" });
    } else if (!mediaData.callToActionId) {
      setOpen(true);
      setAlert({ sev: "error", content: "Please Select Call To Action !" });
    } else if (!adData.discriptions) {
      setOpen(true);
      setAlert({ sev: "error", content: "Please Enter Description !" });
    } else if (!adData.websiteLink) {
      setOpen(true);
      setAlert({ sev: "error", content: "Please Enter Website Link !" });
    } else if (!media?.name) {
      setOpen(true);
      setAlert({ sev: "error", content: "Please Select Image !" });
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append("files", media);
      formData.append("uploadFor", "ads");
      axios
        .post(`${process.env.REACT_APP_IPURL}/admin/UploadFile`, formData, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("sociomeeUser"))?.token
            }`,
          },
        })
        .then((res) => {
          if (res.data.success) {
            console.log(res.data.data.successResult);
            mediaData.file = res.data.data.successResult[0];
            adData.media = [mediaData];
            console.log(adData);
            axios
              .post(
                `${process.env.REACT_APP_IPURL}/ads/create/adMaster/adType/subTypes/adManager`,
                adData,
                {
                  headers: {
                    Authorization: `Bearer ${
                      JSON.parse(localStorage.getItem("sociomeeUser"))?.token
                    }`,
                  },
                }
              )
              .then((response) => {
                console.log(response);
                setLoading(false);
                setOpen(true);
                setAlert({
                  sev: "success",
                  content: "Ad Created  Successfully",
                });
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            setOpen(true);
            setAlert({
              sev: "error",
              content: `${res.data.data.errorResult}`,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const imageUpload = () => {
    document.getElementById("input_file").click();
  };

  // Cancel Snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useLayoutEffect(() => {
    dispatch(loadCallToActions());
  }, []);

  return (
    <>
      <div className="col-lg-12 pad-zero">
        <div className="row ad-types-of-type-map ">
          <div className="single-ad pad-zero">
            <div className="navigate col-lg-12">
              <div className="row">
                <div className="navigate-left col-lg-6">
                  <p className="navigate-color">
                    {adTypeData?.adTypes} - ({adTypeData?.adMastrerType.name}) /
                    Single Image Ad
                  </p>
                </div>
                <div className="navigate-right col-lg-6">
                  <div className="row preview-heading-head shadow-none">
                    <div
                      className={preview ? `col-lg-6` : `col-lg-12 full-flex`}
                    >
                      <div className="d-flex">
                        <label className="switch">
                          <input
                            type="checkbox"
                            onChange={() => setPreview(!preview)}
                          />
                          <span className="slider round"></span>
                        </label>
                        <h5 className="p-heading ml-2">Preview on</h5>
                      </div>
                    </div>
                    {preview && (
                      <div className="col-lg-6 full-flex">
                        <div
                          className="d-flex head-less-preview"
                          onClick={() => setExpandPreview(!expandPreview)}
                        >
                          <img src="/assets/images/adIcon/Mask1.png" alt="" />
                          <p className="ml-1">
                            {expandPreview ? "Less" : "More"} Preview
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 inputs d-flex p-0 input-img">
              {preview ? (
                <>
                  <div className="col-lg-6 col-12">
                    <div className="">
                      <p className="p-heading">
                        Call to Action (CTA)
                        <span className="pl-1">
                          <img
                            src="/assets/images/adIcon/alert-circle.png"
                            alt=""
                          />
                        </span>
                      </p>
                    </div>
                    <div className="">
                      <select
                        className="form-control"
                        name="callToActionId"
                        onChange={mediaInputsHandler}
                        value={mediaData.callToActionId}
                      >
                        <option value="">Choose your CTA button</option>
                        {callToActions &&
                          callToActions.map(({ id, name }) => {
                            return (
                              <option value={id} key={id}>
                                {name}
                              </option>
                            );
                          })}
                      </select>
                    </div>

                    <div className="mt-3">
                      <p className="p-heading">
                        Ad Heading
                        <span className="pl-1">
                          <img
                            src="/assets/images/adIcon/alert-circle.png"
                            alt=""
                          />
                        </span>
                      </p>
                    </div>
                    <div className="">
                      <input
                        type="text"
                        className="form-control p-2"
                        placeholder="50% sale at girls fashion"
                        maxLength={"42"}
                        name="heading"
                        value={mediaData.heading}
                        onChange={mediaInputsHandler}
                      />
                    </div>
                    <p className="p-max-car">Max 42 Characters</p>

                    <div className="">
                      <p className="p-heading">
                        Ad Sub-Heading
                        <span className="pl-1">
                          <img
                            src="/assets/images/adIcon/alert-circle.png"
                            alt=""
                          />
                        </span>
                      </p>
                    </div>
                    <div className="">
                      <input
                        type="text"
                        className="form-control p-2"
                        placeholder="Enter advertisement sub-heading..."
                        maxLength={"60"}
                        name="subHeading"
                        value={mediaData.subHeading}
                        onChange={mediaInputsHandler}
                      />
                    </div>
                    <p className="p-max-car">Max 60 Characters</p>
                    <div className="">
                      <p className="p-heading">Ad Image</p>
                      <p className="">Max image size 600kb</p>
                      <input
                        type="file"
                        name=""
                        id="input_file"
                        className="mt-2"
                        onChange={(e) => {
                          e.target.files[0].type.slice(0, 5) === "image"
                            ? setMedia(e.target.files[0])
                            : setMedia("");
                          e.target.files[0].type.slice(0, 5) !== "image" &&
                            setOpen(true);
                          setAlert({
                            sev: "error",
                            content: "Please Select Image Only !",
                          });
                        }}
                      />
                    </div>
                    <div className="textarea mt-4">
                      <div className="">
                        <p className="p-heading">
                          Provide Web link
                          <span className="pl-1">
                            <img
                              src="/assets/images/adIcon/alert-circle.png"
                              alt=""
                            />
                          </span>
                        </p>
                      </div>
                      <div className="">
                        <input
                          type="text"
                          name="message"
                          className="form-control"
                          placeholder="Enter link to your website here..."
                          value={adData.websiteLink}
                          onChange={(e) =>
                            setAdData({
                              ...adData,
                              websiteLink: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="textarea mt-3">
                      <div className="">
                        <p className="p-heading">
                          Ad Description
                          <span className="pl-1">
                            <img
                              src="/assets/images/adIcon/alert-circle.png"
                              alt=""
                            />
                          </span>
                        </p>
                      </div>
                      <div className="">
                        <textarea
                          name="message"
                          className="form-control"
                          rows="5"
                          placeholder="Enter your ad description here..."
                          maxLength={"300"}
                          value={adData.discriptions}
                          onChange={(e) =>
                            setAdData({
                              ...adData,
                              discriptions: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>
                      <p className="p-max-car">Max 300 Characters</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-12">
                    {expandPreview ? (
                      <PreviewMoreSection />
                    ) : (
                      <PreviewsSection
                        mediaData={mediaData}
                        adData={adData}
                        media={media}
                        type={"image"}
                      />
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="col-lg-6 col-12">
                    <div className="">
                      <p className="p-heading">
                        Call to Action (CTA)
                        <span className="pl-1">
                          <img
                            src="/assets/images/adIcon/alert-circle.png"
                            alt=""
                          />
                        </span>
                      </p>
                    </div>
                    <div className="">
                      <select
                        className="form-control"
                        name="callToActionId"
                        onChange={mediaInputsHandler}
                        value={mediaData.callToActionId}
                      >
                        <option value="">Choose your CTA button</option>
                        {callToActions &&
                          callToActions.map(({ id, name }) => {
                            return (
                              <option value={id} key={id}>
                                {name}
                              </option>
                            );
                          })}
                      </select>
                    </div>

                    <div className="mt-3">
                      <p className="p-heading">
                        Ad Heading
                        <span className="pl-1">
                          <img
                            src="/assets/images/adIcon/alert-circle.png"
                            alt=""
                          />
                        </span>
                      </p>
                    </div>
                    <div className="">
                      <input
                        type="text"
                        className="form-control p-2"
                        placeholder="50% sale at girls fashion"
                        maxLength={"42"}
                        name="heading"
                        value={mediaData.heading}
                        onChange={mediaInputsHandler}
                      />
                    </div>
                    <p className="p-max-car">Max 42 Characters</p>

                    <div className="">
                      <p className="p-heading">
                        Ad Sub-Heading
                        <span className="pl-1">
                          <img
                            src="/assets/images/adIcon/alert-circle.png"
                            alt=""
                          />
                        </span>
                      </p>
                    </div>
                    <div className="">
                      <input
                        type="text"
                        className="form-control p-2"
                        placeholder="Enter advertisement sub-heading..."
                        maxLength={"60"}
                        name="subHeading"
                        value={mediaData.subHeading}
                        onChange={mediaInputsHandler}
                      />
                    </div>
                    <p className="p-max-car">Max 60 Characters</p>
                  </div>
                  <div className="col-lg-6 col-12">
                    <p className="p-heading">Add Your Image</p>
                    {media?.name ? (
                      <div className="recomandation-display-block position-relative">
                        <img src={URL.createObjectURL(media)} alt="" />
                        <div className="recom-btn-cont-blk new-recom-btn-cont-blk bottom-0">
                          <div className="container">
                            <div className="row d-flex justify-content-center">
                              <div className="col-4 px-auto border-right">
                                <h4
                                  className="text-center"
                                  role="button"
                                  onClick={imageUpload}
                                >
                                  Edit
                                </h4>
                              </div>
                              <div className="col-4 px-auto border-left">
                                <h4
                                  className="text-center"
                                  role="button"
                                  onClick={() => setMedia("")}
                                >
                                  Delete
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        role="button"
                        onClick={imageUpload}
                        className="upload-img w-100 d-flex flex-column justify-content-center align-items-center"
                      >
                        <img src="/assets/images/adIcon/upload.png" alt="" />
                        <h4 className="mt-2 font-weight-bold">Upload Image</h4>
                      </div>
                    )}

                    <input
                      type="file"
                      name=""
                      id="input_file"
                      hidden
                      onChange={(e) => {
                        e.target.files[0].type.slice(0, 5) === "image"
                          ? setMedia(e.target.files[0])
                          : setMedia("");
                        e.target.files[0].type.slice(0, 5) !== "image" &&
                          setOpen(true);
                        setAlert({
                          sev: "error",
                          content: "Please Select Image Only !",
                        });
                      }}
                    />
                  </div>
                </>
              )}
            </div>

            {!preview && (
              <>
                <div className="textarea col-lg-12">
                  <div className="">
                    <p className="p-heading">
                      Provide Web link
                      <span className="pl-1">
                        <img
                          src="/assets/images/adIcon/alert-circle.png"
                          alt=""
                        />
                      </span>
                    </p>
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="message"
                      className="form-control"
                      placeholder="Enter link to your website here..."
                      value={adData.websiteLink}
                      onChange={(e) =>
                        setAdData({
                          ...adData,
                          websiteLink: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="textarea col-lg-12 mt-3">
                  <div className="">
                    <p className="p-heading">
                      Ad Description
                      <span className="pl-1">
                        <img
                          src="/assets/images/adIcon/alert-circle.png"
                          alt=""
                        />
                      </span>
                    </p>
                  </div>
                  <div className="">
                    <textarea
                      name="message"
                      className="form-control"
                      rows="5"
                      placeholder="Enter your ad description here..."
                      maxLength={"300"}
                      value={adData.discriptions}
                      onChange={(e) =>
                        setAdData({ ...adData, discriptions: e.target.value })
                      }
                    ></textarea>
                  </div>
                  <p className="p-max-car">Max 300 Characters</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="col-lg-12">
          <div className="ad-btn">
            <Link to="" className="btn-cancel">
              Cancel
            </Link>

            <button
              className="btn-next ml-2 without-input-fill"
              onClick={submitDetails}
              disabled={
                !adData.discriptions ||
                !adData.websiteLink ||
                !mediaData.heading ||
                !mediaData.subHeading ||
                !mediaData.callToActionId ||
                !media?.name
                  ? true
                  : false
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {loading && <Loader loading={loading} />}
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
};

export default WebsiteLink;
