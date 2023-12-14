import React, { useEffect } from 'react'
import { AxiosLib } from '../../lib/axios'
import Swal from 'sweetalert2'
import { ChangePassword } from '../ChangePassword'

export const MyAccount = (props) => {
  const { accountID } = props || ''
  const [account, setAccount] = React.useState({})
  const [isOwner, setIsOwner] = React.useState(false)
  const [isEdit, setIsEdit] = React.useState(false)
  const [isLoad, setIsLoad] = React.useState(false)

  const fetchAccount = async () => {
    try {
      const result = await AxiosLib.get(`/api/account/${accountID}`)
      setAccount(result.data.data[0])
      setIsOwner(result.data.is_owner)
      setIsLoad(true)
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
  const handleEdit = () => {
    setIsEdit(!isEdit)
  }
  const handleChangeAccount = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value })
  }
  const handleSubmitAccount = async (e) => {
    e.preventDefault()
    try {
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
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: error.response.data.message || 'Error',
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }
  useEffect(() => {
    fetchAccount()
  }, [])
  return (
    <>
      {!isLoad ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div>
          {isOwner ? (
            <div className=" bg-[#FFFDF4]">
              <div className="grid grid-cols-3 py-8">
                <div className="grid grid-cols-2 mx-10 ">
                  <img
                    className="flex justify-center items-center rounded-lg mx-3 my-3"
                    src={`https://avatar.vercel.sh/${account.fName + account.lName}.svg?text=${
                      account.fName[0] + account.lName[0]
                    }`}
                  ></img>
                  <div>
                    {isEdit ? (
                      <div className="border rounded-md border-slate-950 h-[400px] w-[580px] my-[160px] mx-[-210px]">
                        <form className="flex flex-col  " onSubmit={handleSubmitAccount}>
                          <div className="flex flex-row py-3 mx-4">
                            <div className="mx-4">
                              <div> FirstName : </div>
                              <input
                                name="fName"
                                onChange={handleChangeAccount}
                                type="text"
                                value={account.fName}
                                placeholder="First Name"
                                className="border rounded-md border-gray-400 h-8 w-60"
                              />
                              <div> LastName : </div>
                              <input
                                name="lName"
                                onChange={handleChangeAccount}
                                type="text"
                                value={account.lName}
                                placeholder="Last Name"
                                className="border rounded-md border-gray-400 h-8 w-60"
                              />
                              <div> Email : </div>
                              <input
                                name="email"
                                onChange={handleChangeAccount}
                                type="email"
                                value={account.email}
                                placeholder="Email"
                                className="border rounded-md border-gray-400 h-8 w-60"
                              />

                              <div> Address : </div>
                              <input
                                name="address"
                                onChange={handleChangeAccount}
                                type="text"
                                value={account.address === '' ? '-' : account.address}
                                placeholder="Address"
                                className="border rounded-md border-gray-400 h-8 w-60"
                              />
                              <div> Telephone : </div>
                              <input
                                name="tel"
                                onChange={handleChangeAccount}
                                type="text"
                                value={account.tel === '' ? '-' : account.tel}
                                placeholder="Telephone"
                                className="border rounded-md border-gray-400 h-8 w-60"
                              />
                            </div>
                            <div className="mx-4">
                              <div> Facebook : </div>
                              <input
                                name="facebook"
                                onChange={handleChangeAccount}
                                type="text"
                                value={account.facebook === '' ? '-' : account.facebook}
                                placeholder="Facebook"
                                className="border rounded-md border-gray-400 h-8 w-60"
                              />
                              <div> Line : </div>
                              <input
                                name="line"
                                onChange={handleChangeAccount}
                                type="text"
                                value={account.line === '' ? '-' : account.line}
                                placeholder="Line"
                                className="border rounded-md border-gray-400 h-8 w-60"
                              />
                              <div> Twitter : </div>
                              <input
                                name="twitter"
                                onChange={handleChangeAccount}
                                type="text"
                                value={account.twitter === '' ? '-' : account.twitter}
                                placeholder="Twitter"
                                className="border rounded-md border-gray-400 h-8 w-60"
                              />
                              <div> Instagram : </div>
                              <input
                                name="instagram"
                                onChange={handleChangeAccount}
                                type="text"
                                value={account.instagram === '' ? '-' : account.instagram}
                                placeholder="Instagram"
                                className="border rounded-md border-gray-400  h-8 w-60"
                              />
                            </div>
                          </div>
                          <div className="flex justify-center mx-4">
                            <input
                              className="btn bg-[#FFFDF3] text-green-400  hover:bg-green-400 hover:text-[#FFFDF3] py-1 my-2 mx-4"
                              type="submit"
                              value="Confirm Edit"
                            />
                            <button
                              className="btn bg-[#FFFDF3] text-red-600  hover:bg-red-600 hover:text-[#FFFDF3] py-1 my-2"
                              onClick={handleEdit}
                            >
                              Cancle
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <button className="btn bg-[#8ECDDD] hover:bg-[#FFFDF3] py-1 my-3" onClick={handleEdit}>
                        Edit Profile
                      </button>
                    )}
                    <div className="">
                      <ChangePassword />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-center">
                <img
                  className="flex justify-center items-center rounded-lg mx-3 my-3"
                  src={`https://avatar.vercel.sh/${account.fName + account.lName}.svg?text=${
                    account.fName[0] + account.lName[0]
                  }`}
                ></img>
              </div>
              <div className="border rounded-md border-gray-400 py-5 w-72 bg-[#8ECDDD] drop-shadow-md ">
                <div className="border rounded-md border-gray-400 mx-5 p-3 bg-[#FFFDF3]">
                  FirstName : {account.fName}
                </div>
                <div className="border rounded-md border-gray-400 my-3 mx-5 p-3 bg-[#FFFDF3]">
                  LastName : {account.lName}
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
                  <div className="text-center text-red-600">- No contact - </div>
                ) : (
                  <div className="flex justify-center py-3 ">
                    {account.facebook === null ? null : (
                      <a className="w-8 mx-1" href={account.facebook}>
                        <img src="\src\assets\facebook.png"></img>
                      </a>
                    )}
                    {account.line === null ? null : (
                      <a className="w-8 mx-1" href={account.line}>
                        <img src="\src\assets\line.png"></img>
                      </a>
                    )}
                    {account.twitter === null ? null : (
                      <a className="w-8 mx-1" href={account.twitter}>
                        <img src="\src\assets\twitter.png"></img>
                      </a>
                    )}
                    {account.instagram === null ? null : (
                      <a className="w-8 mx-1" href={account.instagram}>
                        <img src="\src\assets\instagram.png"></img>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
