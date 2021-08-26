import React, { useCallback , useState } from "react"
import PropTypes from 'prop-types'
import PlusOutlined from '@ant-design/icons'
import ImagesZoom from './ImagesZoom'

const PostImages = ({ images }) => {

    const [showImagesZoom, setShowImagesZoom] = useState(false)
    
    const onZoom = useCallback(() => {
        setShowImagesZoom(true)
    }, [])

    const onClose = useCallback(() => {
      setShowImagesZoom(false)  
    }, [])
    if (images.length === 1){
        return(
            <>
                <img src={images[0].src} alt={images[0].src} onClick={onZoom} role="presentation"/>
                {showImagesZoom && <ImagesZoom images={images} onClose={onClose}/> }
            </>
        )
    }
    if (images.length === 2) {
        return (
            <>
            <img style={{width : "50%" ,  display : "inline-block"}} src={images[0].src} alt={images[0].src} onClick={onZoom} role="presentation"/>
            <img style={{width : "50%" ,  display : "inline-block"}} src={images[1].src} alt={images[1].src} onClick={onZoom} role="presentation"/>
            {showImagesZoom && <ImagesZoom images={images} onClose={onClose}/> }
            </>
            )
    }
    if (images.length > 2) {
        return (
            <>
            <div>
            <img style={{maxWidth : "50%" ,maxHeight : "200px"}} src={images[0].src} alt={images[0].src} onClick={onZoom} role="presentation"/>
            {showImagesZoom && <ImagesZoom images={images} onClose={onClose}/> }
            <div
            role="presentation"
            style={{ display : 'inline-block' , width : "50%", textAlign : "center", verticalAlign : "middle" }}
            onClick={onZoom}
            >
                    <PlusOutlined />
                    <br />
                    { images.length - 1}
                    개의 사진 더보기
                                </div>
            </div>
            </>
            )
    }
}

PostImages.PropTypes = {
    images : PropTypes.arrayOf(PropTypes.object)
}


export default PostImages