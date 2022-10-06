import React, { useEffect, useState } from "react";

const MediaSection = ({
  setOpen,
  setAlert,
  id,
  finalMediaData,
  setFinalMediaData,
  removeSection,
}) => {
  const [media, setMedia] = useState("");

  const [mediaData, setMediaData] = useState({
    file: "postMedia/oBVuwyFSCUbUs.jpg",
    fileType: "image",
    heading: "",
    subHeading: "", 
    callToActionId: "",
  });
  const mediaInputsHandler = (ev) => {
    const { name, value } = ev.target;
    setMediaData({ ...mediaData, [name]: value });
  };
  const imageUpload = () => {
    document.getElementById("input_file").click();
  };

  return (
    <>
      <div className="col-lg-12 inputs d-flex mb-3 p-0 input-img">
        <div className="col-lg-6 col-12">
          <div className="d-flex justify-content-between">
            <p className="p-heading">
              Ad Heading
              <span className="pl-1">
                <img src="/assets/images/adIcon/alert-circle.png" alt="" />
              </span>
            </p>
            <p className="p-heading">({id}/5) Media</p>
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
                <img src="/assets/images/adIcon/alert-circle.png" alt="" />
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
        <div className="d-flex justify-content-between">
          <p className="p-heading">Add Your Image</p>
          {
          id!==1 && <p className="p-heading text-primary" role='button' onClick={removeSection}>Remove</p>
          }
        </div>
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
            <button onClick={imageUpload} className="upload-img w-100">
              Upload Image
            </button>
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
              e.target.files[0].type.slice(0, 5) !== "image" && setOpen(true);
              setAlert({
                sev: "error",
                content: "Please Select Image Only !",
              });
            }}
          />
        </div>
      </div>
    </>
  );
};

export default MediaSection;
