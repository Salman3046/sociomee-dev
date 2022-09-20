import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { loadAdType } from '../../../Services/Actions/AdManager/getAdTypeAction'
import AdmanagerHeaderR from '../AdmanagerHeaderR/AdmanagerHeaderR'

const CreateAdScreen = () => {
    const { adType } = useSelector(state => state.getTypeData)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAdType())
    }, [])

    return (
        <>
            <AdmanagerHeaderR />

            <div className="col-lg-12">
                <div className="row">
                    <div className="col-lg-3">
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
                    </div>
                    <div className="col-lg-9">
                        <div className="step-select-one col-lg-12">
                            <div className="row">
                                <div className="step-select-child col-lg-4">
                                    <button>1</button>
                                    <p>Step 1</p>
                                </div>
                                <div className="step-select-second col-lg-8">
                                    <p>Select your advertisement goal</p>
                                    <p>To generate high-quality leads & acquire new customers.</p>
                                </div>
                            </div>
                        </div>
                        <div className="brand-main-new">
                            <div className="row">
                                {
                                    adType.map((type) => {
                                        return <div className="brand-main">
                                            <div className="brand-second">
                                                <div>
                                                    <input type="radio" />
                                                </div>
                                                <div>
                                                    <p className='type'>{type.adTypes}</p>
                                                    <p className='dec'>{type.descriptions}</p>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default CreateAdScreen