import React from 'react'

const MultiMediaPost = ({ userPosts }) => {
    return (
        <>

            <div className="row">
                <div className="col-8 p-0">
                    {
                        userPosts.mediaList?.[0].fileType === 'video' ? (
                            <video width="100%" height="300" controls>
                                <source src={userPosts.mediaList?.[0].fileURL} type="video/mp4" />
                            </video>
                        ) : (
                            <img src={userPosts.mediaList?.[0].fileURL} className="img-fluid"
                                alt="" />
                        )

                    }
                </div>
                <div className="col-4 p-1">
                    {
                        userPosts.mediaList && userPosts.mediaList?.slice(2,5)?.map((media) => {
                            return (
                                <>
                                    {
                                        media.fileType === 'video' ? (
                                            <video width="100%" height="300" controls>
                                                <source src={media.fileURL} type="video/mp4" />
                                            </video>
                                        ) : (
                                            <img src={media.fileURL} className="img-fluid"
                                                alt="" />
                                        )
                                    }
                                </>
                            )
                        })
                    }
                </div>
            </div>

        </>
    )
}

export default MultiMediaPost
