import React from 'react'
import { useState, useEffect } from 'react'
import { AxiosLib } from '../../lib/axios'
import { Comment } from '../Comment'
import Swal from 'sweetalert2'

export const AllComment = (props) => {
  const [comments, setComments] = useState([])
  const { advPostID } = props || ''
  const fetchComment = async () => {
    try {
      const result = await AxiosLib.get(`/api/fetchcomment/${advPostID}`)
      setComments(result.data)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      })
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
            commentId={comment._id}
            commentDate={comment.commentDate}
            fName={comment.user.fName}
            lName={comment.user.lName}
            userID={comment.user._id}
            email={comment.user.email}
          />
        )
      })}
    </>
  )
}
