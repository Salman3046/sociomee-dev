import React, { useLayoutEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AdmanagerHeaderR from "../../AdmanagerHeaderR/AdmanagerHeaderR";

// Use for snakeBar
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import Loader from "../../../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { loadAdType } from "../../../../Services/Actions/AdManager/getAdTypeAction";
import MediaSection from "./MediaSection";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CaroselImageAdImage = () => {
  const types = useLocation();
  const { adType } = useSelector((state) => state.getTypeData);
  const adTypeData = useMemo(() => {
    return adType.find((ad) => ad.id === types.state.typeId);
  }, [adType]);

  // Snackbar Code
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ sev: "success", content: "" });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const [sections, setSections] = useState([1]);

  const [finalMediaData, setFinalMediaData] = useState([]);
  console.log('finalMediaData is here',finalMediaData)

  const [adData, setAdData] = useState({
    discriptions: "",
    websiteLink: "",
    adStatus: "READY_TO_START",
    adTypesId: types.state.typeId,
    adSubTypesId: types.state.subTypeId,
    media: [],
  });

  // Cancel Snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useLayoutEffect(() => {
    dispatch(loadAdType());
  }, []);
  return (
    <>
      <AdmanagerHeaderR />

      <div className="col-lg-12">
        <div className="row">
          <div className="col-lg-3 ad-left">
            <div className="desh-icon-main">
              <div className="desh-icon">
                <img src="/assets/images/adIcon/grid.png" alt="" />
                <p className="ml-2">User Dashboard</p>
              </div>
              <div className="desh-second">
                <i className="fa fa-ellipsis-h"></i>
              </div>
            </div>
            <div className="desh-icon-main pl-1">
              <div className="desh-icon">
                <img src="/assets/images/adIcon/folder.png" alt="" />
                <p className="ml-2">Create Ad</p>
              </div>
              <div className="desh-second">
                <i className="fa fa-ellipsis-h"></i>
              </div>
            </div>

            <div className="desh-icon-main pl-2">
              <div className="desh-icon">
                <img src="/assets/images/adIcon/folder.png" alt="" />
                <p className="ml-2">
                  {adTypeData?.adTypes} - ({adTypeData?.adMastrerType.name})
                </p>
              </div>
              <div className="desh-second">
                <i className="fa fa-ellipsis-h"></i>
              </div>
            </div>

            <div className="create-add-main">
              <div className="create-add">
                <div className="create-add-one">
                  <img src="/assets/images/adIcon/folder.png" alt="" />
                  <p className="ml-2">
                    {adTypeData?.adTypes} - ({adTypeData?.adMastrerType.name})
                    Carousel Image Ad
                  </p>
                </div>
                <div className="create-add-second">
                  <i className="fa fa-ellipsis-h"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-9 pad-zero">
            {/* NAVIGATION AND STEP */}
            <div className="col-lg-12 step-ad-heading">
              <div className="row step-section">
                <div className="col-lg-2 ad-count">
                  <button className="ad-count-btn">3</button>
                  <p className="ad-count-step">Step 3</p>
                </div>
                <div className="col-lg-10">
                  <p className="ad-count-heading">Configure Your Ad</p>
                  <p>Set-up your ad campaign with an image and description</p>
                </div>
              </div>
            </div>

            {/* Section SCREEN */}
            <div className="col-lg-12 pad-zero">
              <div className="row ad-types-of-type-map ">
                <div className="single-ad pad-zero">
                  <div className="navigate col-lg-12">
                    <div className="row">
                      <div className="navigate-left col-lg-6">
                        <p className="navigate-color">
                          {adTypeData?.adTypes} - (
                          {adTypeData?.adMastrerType.name}) / Carousel Images ad
                        </p>
                      </div>
                      <div className="navigate-right col-lg-6">
                        <h4>
                          Preview on
                          <span>
                            <button
                              type="button"
                              class="btn btn-lg btn-size btn-toggle"
                              data-toggle="button"
                              aria-pressed="false"
                              autocomplete="off"
                            >
                              <div class="handle"></div>
                            </button>
                          </span>
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* <div className="row"> */}
                  {sections &&
                    sections.map((sec,i) => {
                      return (
                        <MediaSection
                          key={i}
                          setOpen={setOpen}
                          setAlert={setAlert}
                          id={sec}
                          finalMediaData={finalMediaData}
                          setFinalMediaData={setFinalMediaData}
                          removeSection={()=>setSections(sections.filter(fil=>fil!==sections.length))}
                        />
                      );
                    })}
                  {/* </div> */}

                  {sections.length < 5 && (
                    <div
                      class="ad-buttons-blk"
                      role="button"
                      onClick={() =>
                        setSections([
                          ...sections,
                          sections[sections.length - 1] + 1,
                        ])
                      }
                    >
                      <div class="ad-btn-new ad-green-clr-btn">
                        + Add More Images
                      </div>
                    </div>
                  )}

                  <div className="textarea col-lg-12 pt-5">
                    <div className="">
                      <p className="p-heading">
                        Ad Description{" "}
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
                        placeholder=""
                        maxLength={"300"}
                        value={adData.discriptions}
                        onChange={(e) =>
                          setAdData({ ...adData, discriptions: e.target.value })
                        }
                      >
                        {" "}
                      </textarea>
                    </div>
                    <p className="p-max-car">Max 300 Characters</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-12">
                <div className="ad-btn">
                  <Link to="" className="btn-cancel">
                    Cancel
                  </Link>
                  <Link to="/Ad/ChooseAudience" className="btn-next ml-2">
                    Next
                  </Link>
                </div>
              </div>
            </div>
            {loading && <Loader loading={loading} />}
          </div>
        </div>
      </div>
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

export default CaroselImageAdImage;
