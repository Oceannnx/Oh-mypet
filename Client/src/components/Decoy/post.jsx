import React from 'react'

export const post = (props) => {
  class Post {
    constructor(title, postDesc, userId, fName, lName, postDate, advPostID) {
      this.advPostID = advPostID
      this.postDate = postDate
      this.postDesc = postDesc
      this.title = title
      this.fName = fName
      this.lName = lName
      this.userId = userId
    }
    getPostdate() {
      return this.postDate
    }
    getPostDesc() {
      return this.postDesc
    }
    getTitle() {
      return this.title
    }
    getName() {
      return this.fName + ' ' + this.lName
    }
    getFName() {
      return this.fName
    }
    getLName() {
      return this.lName
    }
    getUserId() {
      return this.userId
    }
    getAdvPostID() {
      return this.advPostID
    }
    handleOnClickUser() {
      window.location.href(`/account/${this.getUserId()}`)
    }
  }
  const newPost = new Post(
    props.title,
    props.postDesc,
    props.userId,
    props.fName,
    props.lName,
    props.postDate,
    props.advPostID,
  )
  return (
    <>
      <div className="border-4 w-1/2 min-w-[33%] p-5 m-5">
        <div className="flex pb-3">
          <img
            className="rounded-lg w-11 h-11 cursor-pointer"
            src={`https://avatar.vercel.sh/${newPost.getName}.svg?text=${newPost.getFName[0] + newPost.getLName[0]}`}
          ></img>
          <div className="">
            <div
              onClick={newPost.handleOnClickUser}
              className="grid items-center cursor-pointer w-fit font-bold text-lg ml-3"
            >
              {newPost.getName}
            </div>
            <div className="text-sm font-thin ml-3">{newPost.getPostdate}</div>
          </div>
        </div>
        <div className="text-2xl">{newPost.getTitle}</div>
        <div className="text-lg">{newPost.getPostDesc}</div>
      </div>
    </>
  )
}
