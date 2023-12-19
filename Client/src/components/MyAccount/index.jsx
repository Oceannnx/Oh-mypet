import React, { useEffect } from 'react'
import { AxiosLib } from '../../lib/axios'
import Swal from 'sweetalert2'
import { ChangePassword } from '../ChangePassword'
import { uploadImage } from '../../lib/supabase'

export const MyAccount = (props) => {
  const { accountID } = props || ''
  const [account, setAccount] = React.useState({})
  const [tempAccount, setTempAccount] = React.useState({})
  const [isOwner, setIsOwner] = React.useState(false)
  const [editAccount, setEditAccount] = React.useState(true)
  const [isLoad, setIsLoad] = React.useState(false)
  const [image, setImage] = React.useState(null)
  const [previewImage, setPreviewImage] = React.useState(null)

  const togglePassword = () => {
    setEditAccount(true)
  }
  const toggleEdit = () => {
    setEditAccount(false)
  }
  const handleReset = () => {
    setAccount(tempAccount)
  }
  const fetchAccount = async () => {
    try {
      const result = await AxiosLib.get(`/api/account/${accountID}`)
      setAccount(result.data.data[0])
      setTempAccount(result.data.data[0])
      setIsOwner(result.data.is_owner)
      setImage(result.data.data[0].profileImg)
      setIsLoad(true)
      if (result.data.data[0].profileImg !== null) {
        setPreviewImage(result.data.data[0].profileImg)
      }
    } catch (error) {
      if (error.response.status === 403) {
        Swal.fire({
          icon: 'error',
          title: 'Forbidden',
          text: 'Please Login',
          showConfirmButton: false,
          timer: 1500,
        })
        setTimeout(() => {
          window.location.href = '/'
        }, 1500)
      }
    }
  }
  const handleChangeAccount = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value })
    if (e.target.files) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]))
    }
  }
  const handleSubmitAccount = async (e) => {
    e.preventDefault()
    try {
      if (tempAccount.profileImg !== image) {
        const imagesURL = await uploadImage('profileImage', image)
        const result = await AxiosLib.post(`/api/editAccount`, { ...account, profileImg: imagesURL })
        if (result.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Edit Account Success',
            showConfirmButton: false,
            timer: 1500,
          })
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        }
      } else {
        const result = await AxiosLib.post(`/api/editAccount`, account)
        if (result.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Edit Account Success',
            showConfirmButton: false,
            timer: 1500,
          })
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: error.response || 'Error',
        showConfirmButton: false,
        timer: 1500,
      })
    }
    setAccount(tempAccount)
  }
  useEffect(() => {
    fetchAccount()
  }, [])

  console.log(tempAccount.profileImg === image)
  return (
    <>
      {!isLoad ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="w-full">
          {isOwner ? (
            <div className="grid xl:grid-cols-2 grid-cols-1 py-8">
              <div className="grid grid-cols-1 justify-items-center">
                <img
                  className="flex justify-center items-center object-cover rounded-lg mx-3 my-3 h-24 w-24 xl:h-60 xl:w-60"
                  src={
                    account.profileImg || previewImage
                      ? previewImage
                      : `https://avatar.vercel.sh/${account.fName + account.lName}.svg?text=${
                          account.fName[0] + account.lName[0]
                        }`
                  }
                  alt="profile"
                ></img>
                <input
                  type="file"
                  onChange={(e) => {
                    setImage(e.target.files[0])
                    setPreviewImage(URL.createObjectURL(e.target.files[0]))
                  }}
                  name="profielImg"
                  id="profielImg"
                  accept="image/*"
                />
              </div>
              <div>
                <div className="grid xl:flex justify-items-center px-4 text-2xl xl:divide-x-2  ">
                  <button
                    onClick={togglePassword}
                    className="group transition duration-300 xl:pr-4 focus:text-primaryColor w-fit"
                  >
                    Edit Profile
                    <span className="block max-w-0 group-focus:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
                  </button>
                  <button
                    onClick={toggleEdit}
                    className="group px-8 transition duration-300 xl:pl-4 focus:text-primaryColor w-fit"
                  >
                    Change Password
                    <span className="block max-w-0 group-focus:max-w-full group-focus:bg-sky-600 transition-all duration-500 h-0.5"></span>
                  </button>
                </div>
                {editAccount ? (
                  <div>
                    <div className="flex justify-center xl:justify-start items-center">
                      <div>
                        <div className="xl:flex flex-row py-3 ">
                          <div className="mx-4">
                            <div className="text-xl"> Firstname : </div>
                            <input
                              name="fName"
                              onChange={handleChangeAccount}
                              type="text"
                              value={account.fName}
                              placeholder="First Name"
                              className="border rounded-md border-gray-400 h-8 w-60 p-4"
                            />
                            <div className="text-xl"> Lastname : </div>
                            <input
                              name="lName"
                              onChange={handleChangeAccount}
                              type="text"
                              value={account.lName}
                              placeholder="Last Name"
                              className="border rounded-md border-gray-400 h-8 w-60 p-4"
                            />
                            <div className="text-xl"> Email : </div>
                            <input
                              name="email"
                              onChange={handleChangeAccount}
                              type="email"
                              value={account.email}
                              placeholder="Email"
                              className="border rounded-md border-gray-400 h-8 w-60 p-4"
                            />

                            <div className="text-xl"> Address : </div>
                            <input
                              name="address"
                              onChange={handleChangeAccount}
                              type="text"
                              value={account.address === '' ? '' : account.address}
                              placeholder="Address"
                              className="border rounded-md border-gray-400 h-8 w-60 p-4"
                            />
                            <div className="text-xl"> Telephone : </div>
                            <input
                              name="tel"
                              onChange={handleChangeAccount}
                              type="tel"
                              value={account.tel === '' ? '' : account.tel}
                              placeholder="Telephone"
                              className="border rounded-md border-gray-400 h-8 w-60 p-4"
                            />
                          </div>
                          <div className="mx-4">
                            <div className="text-xl"> Facebook : </div>
                            <input
                              name="facebook"
                              onChange={handleChangeAccount}
                              type="text"
                              value={account.facebook === '' ? '' : account.facebook}
                              placeholder="Facebook"
                              className="border rounded-md border-gray-400 h-8 w-60 p-4"
                            />
                            <div className="text-xl"> Line : </div>
                            <input
                              name="line"
                              onChange={handleChangeAccount}
                              type="text"
                              value={account.line === '' ? '' : account.line}
                              placeholder="Line"
                              className="border rounded-md border-gray-400 h-8 w-60 p-4"
                            />
                            <div className="text-xl"> Twitter : </div>
                            <input
                              name="twitter"
                              onChange={handleChangeAccount}
                              type="text"
                              value={account.twitter === '' ? '' : account.twitter}
                              placeholder="Twitter"
                              className="border rounded-md border-gray-400 h-8 w-60 p-4"
                            />
                            <div className="text-xl"> Instagram : </div>
                            <input
                              name="instagram"
                              onChange={handleChangeAccount}
                              type="text"
                              value={account.instagram === '' ? '' : account.instagram}
                              placeholder="Instagram"
                              className="border rounded-md border-gray-400  h-8 w-60 p-4"
                            />
                          </div>
                        </div>
                        <div className="mx-4">
                          <button
                            onClick={handleReset}
                            className="btn bg-[#FFFDF3] text-red-600  hover:bg-red-600 hover:text-[#FFFDF3] py-1 my-2"
                          >
                            Cancle
                          </button>
                          <input
                            className="btn bg-[#FFFDF3] text-green-400  hover:bg-green-400 hover:text-[#FFFDF3] py-1 my-2 mx-4"
                            value="Confirm Edit"
                            onClick={handleSubmitAccount}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <ChangePassword />
                )}
              </div>
            </div>
          ) : (
            <div className="grid justify-center">
              <div className="flex justify-center">
                <img
                  className="flex justify-center items-center rounded-lg mx-3 my-3"
                  src={`https://avatar.vercel.sh/${account.fName + account.lName}.svg?text=${
                    account.fName[0] + account.lName[0]
                  }`}
                ></img>
              </div>
              <div className="border rounded-md border-gray-400 py-5 w-fit bg-[#8ECDDD] drop-shadow-md ">
                <div className="border rounded-md border-gray-400 mx-5 p-3 bg-[#FFFDF3]">
                  Firstname : {account.fName}
                </div>
                <div className="border rounded-md border-gray-400 my-3 mx-5 p-3 bg-[#FFFDF3]">
                  Lastname : {account.lName}
                </div>
                <div className="border rounded-md border-gray-400 my-3 mx-5 p-3 bg-[#FFFDF3]">
                  Email : {account.email}
                </div>
                <div className="border rounded-md border-gray-400 my-3 mx-5 p-3 bg-[#FFFDF3]">
                  Telephone : {account.tel === '' ? '-' : account.tel}
                </div>
                <div className="border rounded-md border-gray-400 my-3 mx-5 p-3 bg-[#FFFDF3]">
                  Address : {account.address === '' ? '-' : account.address}
                </div>
                {account.facebook === null &&
                account.line === null &&
                account.twitter === null &&
                account.instagram === null ? (
                  <div className="text-center text-red-600"> - No contact - </div>
                ) : (
                  <div className="flex justify-center py-3 ">
                    {account.facebook === null ? null : (
                      <a className=" mx-4 w-12" href={account.facebook}>
                        <img src="\src\assets\facebook.png"></img>
                      </a>
                    )}
                    {account.line === null ? null : (
                      <a className="w-12 mx-4" href={account.line}>
                        <img src="\src\assets\line.png"></img>
                      </a>
                    )}
                    {account.twitter === null ? null : (
                      <a className="w-12 mx-4" href={account.twitter}>
                        <img src="\src\assets\twitter.png"></img>
                      </a>
                    )}
                    {account.instagram === null ? null : (
                      <a className="w-12 mx-4" href={account.instagram}>
                        <img src="\src\assets\instagram.png"></img>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
