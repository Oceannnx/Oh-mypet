import React from 'react'
import Swal from 'sweetalert2'
import { AxiosLib } from '../../lib/axios'

export const ChangePassword = () => {
  const [password, setPassword] = React.useState([])
  const handleChangePassword = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value })
  }
  const handleSubmitPassword = async (e) => {
    e.preventDefault()
    try {
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
      console.log(error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmitPassword} className=" bg-[#FFFDF3]">
        <div>Change Password</div>
        <label htmlFor="CurrentPassword">Current Password</label>
        <input
          type="password"
          onChange={handleChangePassword}
          placeholder="Current password"
          name="CurrentPassword"
          id="CurrentPassword"
        />
        <div>
          <label htmlFor="NewPassword">New Password</label>
          <input type="password" onChange={handleChangePassword} placeholder="New password" name="confirmPassword" />
        </div>
        <div>
          <label htmlFor="ConfirmPassword">Confirm Password</label>
          <input type="password" onChange={handleChangePassword} placeholder="Confirm password" name="newPassword" />
        </div>
        <input type="button" onClick={handleSubmitPassword} value="Change Password" />
      </form>
    </>
  )
}
