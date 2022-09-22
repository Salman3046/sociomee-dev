import React from 'react'
import AdmanagerHeaderR from '../../AdmanagerHeaderR/AdmanagerHeaderR'

const SingleImageAdScreen = () => {
    const imageUpload = () => {
        document.getElementById('input_file').click();
    }
    return (
        <>
            <AdmanagerHeaderR />

            <div className="col-lg-12">
                <div className="row">
                    <div className="col-lg-3 ad-left">
                        <div className="desh-icon-main">
                            <div className="desh-icon">
                                <img src="/assets/images/adIcon/grid.png" alt="" />
                                <p className='ml-2'>User Dashboard</p>
                            </div>
                            <div className="desh-second">
                                <i className="fa fa-ellipsis-h"></i>
                            </div>
                        </div>
                        <div className="create-add-main">
                            <div className="create-add">
                                <div className="create-add-one">
                                    <img src="/assets/images/adIcon/folder.png" alt="" />
                                    <p className='ml-2'>Create Ad</p>
                                </div>
                                <div className="create-add-second">
                                    <i className="fa fa-ellipsis-h"></i>
                                </div>
                            </div>
                        </div>
                        <div className="create-add-main">
                            <div className="create-add">
                                <div className="create-add-one">
                                    <img src="/assets/images/adIcon/folder.png" alt="" />
                                    <p className='ml-2'>Create Ad</p>
                                </div>
                                <div className="create-add-second">
                                    <i className="fa fa-ellipsis-h"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-9">
                        <div className="col-lg-12 step-ad-heading">
                            <div className="row step-section">
                                <div className="col-lg-2 ad-count">
                                    <button className="ad-count-btn">3</button>
                                    <p className="ad-count-step">Step 3</p>
                                </div>
                                <div className="col-lg-10">
                                    <p className='ad-count-heading'>Configure Your Ad</p>
                                    <p>Set-up your ad campaign with an image and description</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="row ad-types-of-type-map">
                                <div className="navigate"></div>
                                <div className="single-ad">
                                    <div className="inputs d-flex">
                                        <div></div>
                                        <div>
                                            <p className='p-heading'>Add Your Image</p>
                                            <button onClick={imageUpload} className="upload-img">Upload Image</button>
                                            <input type="file" name="" id='input_file' hidden />
                                        </div>
                                    </div>
                                    <div className="textarea">
                                        <div className="">
                                            <p className='p-heading'>Ad Description <span><img src="/assets/images/adIcon/alert-circle.png" alt="" /></span></p>
                                        </div>
                                        <div className="">
                                            <textarea name='message' className='form-control' rows='5' placeholder=''> </textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleImageAdScreen