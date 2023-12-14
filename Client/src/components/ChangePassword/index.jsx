import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { AxiosLib } from '../../lib/axios'

export const ChangePassword = () => {
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const handleResetPassword = () => {
    setPassword({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
  }
  const handleChangePassword = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value })
  }
  const handleSubmitPassword = async (e) => {
    e.preventDefault()
    try {
      if (password.newPassword.length < 8) return Swal.fire('Error', 'Password must be at least 8 characters', 'error')
      else if (!password.newPassword.match(/[0-9]/g))
        return Swal.fire('Error', 'Password must contain at least one number', 'error')
      else if (!password.newPassword.match(/[A-Z]/g))
        return Swal.fire('Error', 'Password must contain at least one uppercase', 'error')
      else if (!password.newPassword.match(/[a-z]/g))
        return Swal.fire('Error', 'Password must contain at least one lowercase', 'error')
      else if (!password.newPassword.match(/[^\s]/g))
        return Swal.fire('Error', 'Password must contain at least one special character', 'error')
      else if (password.newPassword.includes(' ')) return Swal.fire('Error', 'Password cannot contain space', 'error')
      const result = await AxiosLib.post(`/api/changePassword`, password)
      if (result.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Edit Account Success',
          showConfirmButton: false,
          timer: 1500,
        })
        setTimeout(() => {
          window.location.href = '/'
        }, 1500)
      } else {
        Swal.fire({
          icon: 'error',
          title: result.data.message || 'Error',
          showConfirmButton: false,
          timer: 1500,
        })
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

  return (
    <>
      <form
        className="grid grid-col-1 lg:flex xl:justify-start justify-center items-center"
        onSubmit={handleSubmitPassword}
      >
        <div className="flex justify-center flex-col h-[300px] w-[350px]">
          <div className="mx-3">
            <label className="text-lg">Current Password</label>
            <input
              type="password"
              onChange={handleChangePassword}
              placeholder="Current password"
              name="currentPassword"
              className="flex justify-center border rounded-md border-gray-400  h-8 w-80 p-4 my-1"
            />
          </div>
          <div className="mx-3">
            <label className="text-lg">New Password</label>
            <input
              type="password"
              onChange={handleChangePassword}
              placeholder="New password"
              name="newPassword"
              className="border rounded-md border-gray-400 h-8 w-80 p-4  my-1"
            />
          </div>
          <div className="mx-3">
            <label className="text-lg">Confirm Password</label>
            <input
              type="password"
              onChange={handleChangePassword}
              placeholder="Confirm password"
              name="confirmPassword"
              className="border rounded-md border-gray-400 h-8 w-80 p-4 my-1"
            />
          </div>
          <div></div>
          <div className="w-max mx-5">
            <div>
              <button
                className="btn bg-[#FFFDF3] text-red-600  hover:bg-red-600 hover:text-[#FFFDF3] py-1 my-2"
                onClick={handleResetPassword}
              >
                Cancle
              </button>
              <input
                type="button"
                onClick={handleSubmitPassword}
                value="Change Password"
                className="btn bg-[#FFFDF3] text-green-400  hover:bg-green-400 hover:text-[#FFFDF3] py-1 my-2 mx-4"
              />
            </div>
          </div>
        </div>
        <div className="h-[230px] w-[350px] my-5">
          <div className="flex flex-warps flex-row justtify-items-center items-center py-3 mx-3 ">
            <div>
              {password.newPassword.length < 8 ? (
                <div className="text-red-600">*Password must more than 8 Charactors</div>
              ) : (
                <div className="text-green-600">*Password must more than 8 Charactors</div>
              )}
              {password.newPassword.match(/[0-9]/g) ? (
                <div className="text-green-600">*Password must contain at least one number</div>
              ) : (
                <div className="text-red-600">*Password must contain at least one number</div>
              )}
              {password.newPassword.match(/[A-Z]/g) ? (
                <div className="text-green-600">*Password must contain at least one uppercase</div>
              ) : (
                <div className="text-red-600">*Password must contain at least one uppercase</div>
              )}
              {password.newPassword.match(/[a-z]/g) ? (
                <div className="text-green-600">*Password must contain at least one lowercase</div>
              ) : (
                <div className="text-red-600">*Password must contain at least one lowercase</div>
              )}
              {password.newPassword.match(/[^\w\s]/g) ? (
                <div className="text-green-600">*Password must contain at least one special character</div>
              ) : (
                <div className="text-red-600">*Password must contain at least one special character</div>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
