import React from "react";
import { useSelector } from "react-redux";

const PreviewsSection = ({ mediaData, adData, media }) => {
  // get user profile by user id
  const { userProfileByUserId } = useSelector(
    (state) => state.getUserProfileByUserIdData
  );

  return (
    <>
      <div className="post-panel-new">
        <div className="post-wrapper col-grid-box">
          <div className="post-title">
            <div className="profile">
              <div className="media d-flex mb-1">
                <a
                  className="popover-cls user-img"
                  data-bs-toggle="popover"
                  data-placement="right"
                  data-name="sufiya eliza"
                  data-img="/assets/images/image (1).png"
                >
                  <div className="user-img iw-50">
                    <img
                      src={`${userProfileByUserId?.profileImage}`}
                      className="img-fluid bg-img"
                      alt="user"
                    />
                  </div>
                </a>
                <div className="media-body ml-2">
                  <h5 className="p-heading">
                    {userProfileByUserId?.fullName || ""}
                  </h5>
                  <h6>
                    <span className="color-orange">Sponsored</span>
                  </h6>
                </div>
              </div>
            </div>
            <div className="setting-btn ms-auto setting-dropdown no-bg">
              <div className="btn-group custom-dropdown arrow-none dropdown-sm">
                <div
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
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
                    className="icon icon-font-color iw-14"
                  >
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </div>
                <div className="dropdown-menu dropdown-menu-right custom-dropdown">
                  <ul>
                    <li>
                      <a href="">
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
                          className="icon-font-light iw-16 ih-16"
                        >
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                        save post
                      </a>
                    </li>
                    <li>
                      <a href="">
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
                          className="icon-font-light iw-16 ih-16"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          ></rect>
                          <line x1="9" y1="9" x2="15" y2="15"></line>
                          <line x1="15" y1="9" x2="9" y2="15"></line>
                        </svg>
                        hide post
                      </a>
                    </li>
                    <li>
                      <a href="">
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
                          className="icon-font-light iw-16 ih-16"
                        >
                          <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
                          <line x1="15" y1="9" x2="9" y2="15"></line>
                          <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                        unfollow sufiya
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="post-details">
            <div className="recomandation-display-block">
              <img
                src={
                  (media?.name && URL.createObjectURL(media)) ||
                  "/assets/images/image (2).png"
                }
                alt=""
              />
              <div className="recom-btn-cont-blk new-recom-btn-cont-blk">
                <h4 className="text-break">{mediaData.heading || "Heading"}</h4>

                <a href="#" className="btn btn-outline">
                  KNOW MORE
                </a>
              </div>
            </div>
            <div className="detail-box text-break">
              <h5 className="tag">{adData.discriptions || "Description"}</h5>
            </div>
            <div className="Why-this-ad">
              <p>Why this Ad?</p>
              <img src="/assets/images/adIcon/Share-icon.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewsSection;
