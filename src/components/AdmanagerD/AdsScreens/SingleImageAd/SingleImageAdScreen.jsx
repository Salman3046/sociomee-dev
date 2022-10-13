import React, { useLayoutEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { loadAdType } from "../../../../Services/Actions/AdManager/getAdTypeAction";
import AdmanagerHeaderR from "../../AdmanagerHeaderR/AdmanagerHeaderR";
import BrandAwareness from "./Sections/BrandAwareness";
import WebsiteLink from "./Sections/WebisteLink";

const SingleImageAdScreen = () => {
  const types = useLocation();
  const { adType } = useSelector((state) => state.getTypeData);
  const adTypeData = useMemo(() => {
    return adType.find((ad) => ad.id === types.state.typeId);
  }, [adType]);

  const dispatch = useDispatch();

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
                  <p className="ml-2">Single Image Ad</p>
                </div>
                <div className="create-add-second">
                  <i className="fa fa-ellipsis-h"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-9 pad-zero">
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
            {types.state.typeId === "e5cdf67c-1b3a-4f97-9817-e34be6fcf515" ? (
              <WebsiteLink
                typeId={types.state.typeId}
                subTypeId={types.state.subTypeId}
                adTypeData={adTypeData}
              />
            ) : (
              <BrandAwareness
                typeId={types.state.typeId}
                subTypeId={types.state.subTypeId}
                adTypeData={adTypeData}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleImageAdScreen;
