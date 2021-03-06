import React, { useState , useCallback, useRef } from "react"
import { Form, Input , Button } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { addPost } from "../reducers/post"

const PostForm = () => {
    const { imagePaths } = useSelector((state) => state.post)
    const dispatch = useDispatch()
    const imageInput = useRef();
    const [ text , setText] = useState('')
    
    const onSubmit = useCallback(() => {
        dispatch(addPost) 
        setText('')       
    },[])

    const onChangeText = useCallback((e) => {
            setText(e.target.value)
    },[])
    
    const onClickImageUpload = useCallback((e) => {
           imageInput.current.click()
    },[imageInput.current])

    return (
        <Form style={{ margin : '10px 0 20px'}} encType="multipart/from-data" onFinish={onSubmit}>
            <Input.TextArea
            value={text}
            onChange={onChangeText}
            maxLength={140}
            placeholder="어떤 일이 있었니"
            />
            <div>
                <input type='file' multiple hidden ref={imageInput}/>
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button htmlType="submit" type="primary" style={{ float : 'right'}}>쨱짹</Button>
            </div>
            <div>
                {imagePaths.map((v) => {
                    <div key={v} style= {{display : "inline-block"}}>
                        <img src={v} style={{ width : '200px'}} alt={v} />
                        <div>
                            <Button>제거</Button>
                        </div>
                    </div>
                })}
            </div>
        </Form>
        )
}

export default PostForm