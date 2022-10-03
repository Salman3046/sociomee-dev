import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AdmanagerHeaderR from '../../AdmanagerHeaderR/AdmanagerHeaderR'

const CaroselImageAdImage = () => {
  const imageUpload = () => {
    document.getElementById('input_file').click();
  }

  const [inputType, setInputType] = useState([]);

  const inputRemover = ({ type, id }) => {
    setInputType(inputType.filter(inp=>inp.type!==type && inp.id!==id))
  }
  let index = 2;

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

          <div className="col-lg-9 pad-zero">
            {/* NAVIGATION AND STEP */}
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

            {/* INPUTS SCREEN */}
            <div className="col-lg-12 pad-zero">
              <div className="row ad-types-of-type-map ">
                <div className="single-ad pad-zero">
                  <div className="navigate col-lg-12">
                    <div className="row">
                      <div className="navigate-left col-lg-6">
                        <p className='navigate-color'>Brand Awareness- CPV  /  Carosel Images ad</p>
                      </div>
                      <div className="navigate-right col-lg-6">
                        <h4>Preview on
                          <span>
                            <button type="button" class="btn btn-lg btn-size btn-toggle" data-toggle="button" aria-pressed="false" autocomplete="off">
                              <div class="handle"></div>
                            </button>
                          </span>
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 inputs d-flex mb-3 p-0 input-img">
                    {/* <div className="row"> */}
                    <div className='col-lg-6 col-12'>
                      <div className="carosel-heading">
                        <p className='p-heading'>Ad Heading
                          <span className='pl-1'>
                            <img src="/assets/images/adIcon/alert-circle.png" alt="" />
                          </span>
                        </p>

                        <p className='p-heading'>( 1/5 Media )</p>
                      </div>
                      <div className="">
                        <input type="text" className='form-control p-2' placeholder='50% sale at girls fashion' />
                      </div>
                      <p className="p-max-car">Max 42 Characters</p>

                      <div className="">
                        <p className='p-heading'>Ad Sub-Heading
                          <span className='pl-1'>
                            <img src="/assets/images/adIcon/alert-circle.png" alt="" />
                          </span>
                        </p>
                      </div>
                      <div className="">
                        <input type="text" className='form-control p-2' placeholder='Enter advertisement sub-heading...' />
                      </div>
                      <p className="p-max-car">Max 60 Characters</p>
                    </div>
                    <div className='col-lg-6 col-12'>
                      <p className='p-heading'>Add Your Image</p>
                      <button onClick={imageUpload} className="upload-img">Upload Image</button>
                      <input type="file" name="" id='input_file' hidden />
                    </div>
                    {/* </div> */}
                  </div>

                  {inputType &&
                    inputType.map(({ type, id }) => {
                      return type === "addCraosel" ? (
                        <div className="col-lg-12 inputs d-flex mb-3 p-0 input-img" key={id}>
                          {/* <div className="row"> */}
                          <div className='col-lg-6 col-12'>
                            <div className="carosel-heading">
                              <p className='p-heading'>Ad Heading
                                <span className='pl-1'>
                                  <img src="/assets/images/adIcon/alert-circle.png" alt="" />
                                </span>
                              </p>

                              <p className='p-heading'>( {index++}/5 Media )</p>
                            </div>
                            <div className="">
                              <input type="text" className='form-control p-2' placeholder='50% sale at girls fashion' />
                            </div>
                            <p className="p-max-car">Max 42 Characters</p>

                            <div className="">
                              <p className='p-heading'>Ad Sub-Heading
                                <span className='pl-1'>
                                  <img src="/assets/images/adIcon/alert-circle.png" alt="" />
                                </span>
                              </p>
                            </div>
                            <div className="">
                              <input type="text" className='form-control p-2' placeholder='Enter advertisement sub-heading...' />
                            </div>
                            <p className="p-max-car">Max 60 Characters</p>
                          </div>
                          <div className='col-lg-6 col-12'>
                            <div>
                              <p className='p-heading'>Add Your Image</p>
                              {/* <p  onClick={inputRemover({type:type,id:id})}>Remove</p> */}
                            </div>
                            <button onClick={imageUpload} className="upload-img">Upload Image</button>
                            <input type="file" name="" id='input_file' hidden />
                          </div>
                          {/* </div> */}
                        </div>
                      ):(
                        <></>
                      )
                    })
                  }

                  <div class="ad-buttons-blk">
                    {inputType?.length < 4 && (
                      <a class="ad-btn-new ad-green-clr-btn"
                        onClick={() =>
                          setInputType([
                            ...inputType,
                            { type: "addCraosel", id: Math.floor(Math.random() * 10) },
                          ])
                        }
                      >
                        + Add More Images
                      </a>
                    )}
                  </div>

                  <div className="textarea col-lg-12 pt-5">
                    <div className="">
                      <p className='p-heading'>Ad Description <span className='pl-1'><img src="/assets/images/adIcon/alert-circle.png" alt="" /></span></p>
                    </div>
                    <div className="">
                      <textarea name='message' className='form-control' rows='5' placeholder=''> </textarea>
                    </div>
                    <p className="p-max-car">Max 300 Characters</p>
                  </div>

                </div>
              </div>

              <div className='col-lg-12'>
                <div className="ad-btn">
                  <Link to="" className="btn-cancel">
                    Cancel
                  </Link>
                  <Link to="/Ad/ChooseAudience" className='btn-next'>
                    Next
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default CaroselImageAdImage