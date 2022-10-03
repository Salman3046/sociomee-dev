import React from 'react'
import { Link } from 'react-router-dom'
import AdmanagerHeaderR from '../../AdmanagerHeaderR/AdmanagerHeaderR'
import Multichoose from './Multichoose'
import MultipleChooseScreen from './MultipleChooseScreen'
import ShortAnswer from './ShortAnswer'

const LeadGenerationScreen = () => {
    return (
        <>
            <AdmanagerHeaderR />

            <div className="col-lg-12">
                <div className="row">
                    <div className="col-lg-3 ad-left">
                        <div className="desh-icon-main">
                            <div className="desh-icon lead-desh">
                                <h4 className='ml-2'>Select Input type</h4>
                            </div>
                        </div>
                        <div className="create-add">
                            <div className="create-add-one">
                                <p className='ml-2'>Choose kind of information to be filled by user.</p>
                            </div>
                        </div>

                        <div className="desh-icon-main">
                            <div className="desh-icon lead-desh">
                                <h5 className='ml-2'>Short answer (+$1)</h5>
                                <h4 className='ml-2 lead-add'>+ Add</h4>
                            </div>
                        </div>
                        <div className="desh-icon-main">
                            <div className="desh-icon lead-desh">
                                <h5 className='ml-2'>Single Choice Options (+$1)</h5>
                                <h4 className='ml-2 lead-add'>+ Add</h4>
                            </div>
                        </div>
                        <div className="desh-icon-main">
                            <div className="desh-icon lead-desh">
                                <h5 className='ml-2'>Multi Choice Options (+$1)</h5>
                                <h4 className='ml-2 lead-add'>+ Add</h4>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-9">
                        <div className="navigate col-lg-12">
                            <div className="row">
                                <div className="navigate-left col-lg-12">
                                    <p className='navigate-color'>Brand Awareness- CPV  / Full Screen Video Ad</p>
                                </div>
                                <div className="navigate-right col-lg-12">
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
                        <div className="row">
                            <div className="col-lg-6">
                                <h3 className='p-heading'>Customize Form</h3>

                                <div className="row ad-types-of-type-map ">
                                    <div className="single-ad">
                                        <div className="col-lg-12 inputs d-flex p-0">
                                            <div className='col-lg-12 col-12'>
                                                <div className="">
                                                    <p className='p-heading'>Create Form
                                                    </p>
                                                </div>
                                                <div className="">
                                                    <input type="text" className='form-control p-2' placeholder='Create Form' />
                                                </div>
                                                <p className="p-max-car">Upto 32 Characters</p>
                                            </div>
                                        </div>
                                        <div className="textarea col-lg-12">
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

                                <ShortAnswer />

                                <Multichoose />

                                <MultipleChooseScreen />

                            </div>
                            <div className="col-lg-6">
                                <h3 className='p-heading'>Preview </h3>
                                <div className="row ad-types-of-type-map ">
                                    <div className="single-ad">
                                        <div className="col-lg-12 inputs d-flex p-0">
                                            <div className='col-lg-12 col-12'>
                                                <div className="">
                                                    <p className='p-heading'>Create Form
                                                    </p>
                                                </div>
                                                <div className="">
                                                    <input type="text" className='form-control p-2' placeholder='Create Form' />
                                                </div>
                                                <p className="p-max-car">Upto 32 Characters</p>
                                            </div>
                                        </div>
                                        <div className="textarea col-lg-12">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LeadGenerationScreen