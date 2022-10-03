import React from 'react'

const Multichoose = () => {
    return (
        <>
            <div className="row ad-types-of-type-map ">
                <div className="single-ad">
                    <div className="col-lg-12 inputs d-flex p-0">
                        <div className='col-lg-12 col-12'>
                            <div className="d-flex lead-switch">
                                <p className='p-heading'>Enter Question</p>
                                <p className='lead-greem'>Remove</p>
                            </div>
                            <div className="">
                                <input type="text" className='form-control p-2' placeholder='Type the ‘Hint’ here...' />
                            </div>
                            <p className="p-max-car">Upto 32 Characters</p>
                            <div className="d-flex lead-switch mb-3 mt-3">
                                <p className='p-heading'>Add Options</p>
                                <p className='lead-greem'>+ Add More</p>
                            </div>
                            <div className='form-control d-flex'>
                                <input type="radio" name="" id="" />
                                <input type="text" className='form-control p-2' style={{ border: 'none' }} placeholder='Type the ‘Option’ here..' />
                            </div>
                            <div className='form-control d-flex'>
                                <input type="radio" name="" id="" />
                                <input type="text" className='form-control p-2' style={{ border: 'none' }} placeholder='Type the ‘Option’ here..' />
                            </div>
                            <div className="mt-4">
                                <div className="d-flex lead-switch">
                                    <p className='p-heading'>Mandatory Question
                                        <span className='pl-1'><img src="/assets/images/adIcon/alert-circle.png" alt="" /></span>
                                    </p>
                                    <label className="switch">
                                        <input type="checkbox" />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                                <p>Add a star mark to indicate mandatory question field</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Multichoose