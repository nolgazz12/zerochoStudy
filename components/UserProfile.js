import React ,{ useState , useCallback } from 'react'
import { Button, Card , Input } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'

import { useDispatch } from 'react-redux'
import { logoutRequestAction } from '../reducers/user'

const UserProfile = () => {
    const dispatch = useDispatch()
    const { me , isLoggingOut} = useSelector((state) => state.user)
    const onLogOut = useCallback(() => {
        dispatch(logoutRequestAction())
    }, [])

    return (
        
        <Card
        actions={[
            <div key="twit">쨱짹<br/>0</div>,
            <div key="followings">팔로잉<br/>0</div>,
            <div key="follower">팔로워<br/>0</div>,
        ]}
        >
            <Card.Meta
            avatar={<Avatar>{me.nickname[0]}</Avatar>}
            title={me.nickname}
            />
            <Button onClick={onLogOut} loading={isLoggingOut}
            >로그아웃</Button>
        </Card>
    )
}

export default UserProfile      
