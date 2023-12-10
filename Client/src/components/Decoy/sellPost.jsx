import React from 'react'
import { post } from '../Decoy/post'

export const sellPost = (props) => {
  class sellPost extends post {
    constructor(
      fName,
      lName,
      title,
      petAge,
      petBD,
      petDescription,
      petGender,
      petGene,
      petImages,
      petLocation,
      petName,
      petPostDate,
      petPrice,
      petType,
      user,
    ) {
      super(title, petPostDate, petDescription, user)
      this.fName = fName
      this.lName = lName
      this.title = title
      this.petAge = petAge
      this.petBD = petBD
      this.petDescription = petDescription
      this.petGender = petGender
      this.petGene = petGene
      this.petImages = petImages
      this.petLocation = petLocation
      this.petName = petName
      this.petPostDate = petPostDate
      this.petPrice = petPrice
      this.petType = petType
      this.user = user
    }
    //override
    getName() {
      return this.fName + ' ' + this.lName
    }
    //override
    getFName() {
      return this.fName
    }
    //override
    getLName() {
      return this.lName
    }
    //override
    getTitle() {
      return this.title
    }
    getPetAge() {
      return this.petAge
    }
    getPetBD() {
      return this.petBD
    }
    getPetDescription() {
      return this.petDescription
    }
    getPetGender() {
      return this.petGender
    }
    getPetGene() {
      return this.petGene
    }
    getPetImages() {
      return this.petImages
    }
    getPetLocation() {
      return this.petLocation
    }
    getPetName() {
      return this.petName
    }
    getPetPostDate() {
      return this.petPostDate
    }
    getPetPrice() {
      return this.petPrice
    }
    getPetType() {
      return this.petType
    }
    //override
    getUser() {
      return this.user
    }
    handleOnClickPost = () => {
      window.location.href(`/sellpost/${this.getAdvPostID()}`)
    }
    handleOnClickUser = () => {
      window.location.href(`/account/${this.getUserId()}`)
    }
  }
  const newSellPost = new sellPost(
    props.fName,
    props.lName,
    props.title,
    props.petAge,
    props.petBD,
    props.petDescription,
    props.petGender,
    props.petGene,
    props.petImages,
    props.petLocation,
    props.petName,
    props.petPostDate,
    props.petPrice,
    props.petType,
    props.user,
  )
  return (
    <>
      <div className="flex " onClick={newSellPost.handleOnClickUser}>
        <img
          className="rounded-lg w-11 h-11 cursor-pointer"
          src={`https://avatar.vercel.sh/${newSellPost.getFName + newSellPost.getLName}.svg?text=${
            newSellPost.getFName[0] + newSellPost.getLName[0]
          }`}
        ></img>
        <div className="">
          <div className="grid items-center cursor-pointer w-fit font-bold text-lg ml-3">{newSellPost.getName}</div>
          <div className="text-sm font-thin ml-3">{newSellPost.getPetPostDate}</div>
        </div>
      </div>

      <div className="grid justify-items-center items-center h-[238px] ">
        <img className="max-h-[206px]" src={newSellPost.getPetImages} />
      </div>
      <div>
        <h1 className="mt-4 font-bold text-lg">{newSellPost.getPetImages}</h1>
        <div>Type :{newSellPost.getPetType}</div>
        <div>Price : {newSellPost.getPetPrice} $</div>
        <div className="text-sm font-light">{newSellPost.getPetLocation}</div>

        <div className="grid justify-items-end">
          <div
            onClick={newSellPost.handleOnClickPost}
            className="text-blue-900 hover:text-blue-700 py- underline cursor-pointer"
          >
            ดูเพิ่มเติม
          </div>
        </div>
      </div>
    </>
  )
}
