import React from 'react'
import Swal from 'sweetalert2'
import { AxiosLib } from '../../lib/axios'

export const ChangePassword = () => {
  const [password, setPassword] = React.useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
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
      <form onSubmit={handleSubmitPassword} className=" bg-[#FFFDF3]">
        <div className="grid grid-cols-2">
          <div className="flex justify-center items-center flex-col">
            <div className="flex justify-start items-start flex-col ">
              <div>
                <div>Change Password</div>
                <label htmlFor="CurrentPassword">Current Password</label>
                <input
                  type="password"
                  onChange={handleChangePassword}
                  placeholder="Current password"
                  name="currentPassword"
                  className="border-2 border-gray-400 border-solid h-8 w-80 px-2 mx-4 my-1"
                />
              </div>
              <div>
                <label htmlFor="NewPassword">New Password</label>
                <input
                  type="password"
                  onChange={handleChangePassword}
                  placeholder="New password"
                  name="newPassword"
                  className="border-2 border-gray-400 border-solid h-8 w-80 px-2 mx-10 my-1"
                />
              </div>
              <div>
                <label htmlFor="ConfirmPassword">Confirm Password</label>
                <input
                  type="password"
                  onChange={handleChangePassword}
                  placeholder="Confirm password"
                  name="confirmPassword"
                  className="border-2 border-gray-400 border-solid h-8 w-80 px-2 mx-3 my-1"
                />
              </div>
              <input
                type="button"
                onClick={handleSubmitPassword}
                value="Change Password"
                className="btn bg-[#8ECDDD] hover:bg-[#FFFDF3] py-1 my-2"
              />
            </div>
          </div>
          <div className="grid flex-warps flex-row justtify-items-center items-center">
            <div className="grid h-96 items-center">
              {password.newPassword.length < 8 ? (
                <div className="text-red-600">Password must more than 8 Charactors</div>
              ) : (
                <div className="text-green-600">Password must more than 8 Charactors</div>
              )}
              {password.newPassword.match(/[0-9]/g) ? (
                <div className="text-green-600">Password must contain at least one number</div>
              ) : (
                <div className="text-red-600">Password must contain at least one number</div>
              )}
              {password.newPassword.match(/[A-Z]/g) ? (
                <div className="text-green-600">Password must contain at least one uppercase</div>
              ) : (
                <div className="text-red-600">Password must contain at least one uppercase</div>
              )}
              {password.newPassword.match(/[a-z]/g) ? (
                <div className="text-green-600">Password must contain at least one lowercase</div>
              ) : (
                <div className="text-red-600">Password must contain at least one lowercase</div>
              )}
              {password.newPassword.match(/[^\s]/g) ? (
                <div className="text-green-600">Password must contain at least one special character</div>
              ) : (
                <div className="text-red-600">Password must contain at least one special character</div>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
