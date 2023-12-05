import React from 'react'
import { useState, useEffect } from 'react'
import { AxiosLib } from '../../lib/axios'
import { Comment } from '../Comment'

export const AllComment = (props) => {
  const [comments, setComments] = useState([])
  const { advPostID } = props || ''
  const fetchComment = async () => {
    try {
      const result = await AxiosLib.get(`/api/fetchcomment/${advPostID}`)
      setComments(result.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchComment()
  }, [])
  return (
    <>
      {comments.map((comment, index) => {
        return (
          <Comment
            key={index}
            comment={comment.comment}
            commentDate={comment.commentDate}
            fName={comment.user.fName}
            lName={comment.user.lName}
            userId={comment.user._id}
          />
        )
      })}
    </>
  )
}
