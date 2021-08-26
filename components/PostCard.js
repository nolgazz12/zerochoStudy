import React, { useCallback , useState } from "react"
import PropTypes from 'prop-types'
import { Button , Card, Image, Popover , Avatar , List , Comment} from "antd"
import {  RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone } from '@ant-design/icons'
import { useSelector } from "react-redux"
import PostImages from "./postImages"
import CommentForm from "./CommentForm"
import PostCardContent from "./PostCardContent"

const PostCard = ({ post }) => {
    const { me }  = useSelector((state) => state.user)
    // const id = me?.id; 
    //optional chaining 연산자 위를 해석하자면 me && me.id ==> me?.id 
    //me.id 가 있으면 me.id를 넣어주고 없으면undefined를 보여주는 애
    // const { me }  = useSelector((state) => state.user)
    //위에 있는 두 줄의 코딩을 바꿀 수도 있다.

    const id = useSelector((state) => state.user.me?.id)
    // 이렇게 씀으로써
    // const id = useSelector((state) => state.user.me && state.user.me.id) 로 안써도 된다.

    const [liked, setLiked] = useState(false)
    const [CommentFormOpened , setCommentFormOpened] = useState(false)

    const onToggleLike = useCallback(() => {
        setLiked((prev) => !prev)
    }, [])

    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev)
    }, [])
    return (
        <div style={{ marginBottom : "20px"}}>
            <Card
            cover={post.Images[0] && <PostImages images={post.Images} />}
            actions={[
                <RetweetOutlined key="retweet" />,
                liked ? 
                <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} />
                : <HeartOutlined key="heart" onClick={onToggleLike}/>,
                <MessageOutlined key="comment" onClick={onToggleComment}/>,
                <Popover key="more" content={(
                    <Button.Group>
                        {id && post.User.id === id ?
                        (<>
                            <Button>수정</Button>
                            <Button type='danger'>삭제</Button>
                            </>
                        ) :
                            <Button>신고</Button>}
                    </Button.Group>
                )}>
                    <EllipsisOutlined />
                </Popover>
            ]}
            >
            <Card.Meta
            avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
            title={post.User.nickname}
            description={<PostCardContent postData={post.content} />}
            />
            </Card>
            {CommentFormOpened && (
                <div>
                    <CommentForm post={post}/>
                    <List 
                    header={`${post.Comments.length}개의 댓글`}
                    itemLayout="horizontal"
                    dataSource={post.Comments}
                        renderItem={(item) => (
                                <li>
                                    <Comment
                                        author={item.User.nickname}
                                        avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                            content={item.content}
                                    />
                                </li>
                        )}
                    />
                    </div>
            )}
            {/* <CommentForm />
          <Comments /> */}
        </div>
    )
}

PostCard.propTypes = {
    //shape 은 onject 를 구체적으로 해주기 위해
    post : PropTypes.shape({
        id : PropTypes.number,
        User: PropTypes.object,
        content: PropTypes.string,
        createAt: PropTypes.object,
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
}

export default PostCard