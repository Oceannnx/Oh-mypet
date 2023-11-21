import React, { useEffect } from 'react'
import { AxiosLib } from '../../lib/axios'
import Swal from 'sweetalert2'

export const MyAccount = (props) => {
  const { accountID } = props || ''
  const [account, setAccount] = React.useState({})
  const [isOwner, setIsOwner] = React.useState(false)

  const fetchAccount = async () => {
    try {
      const result = await AxiosLib.get(`/api/account/${accountID}`)
      setAccount(result.data.data[0])
      setIsOwner(result.data.is_owner)
    } catch (error) {
      console.log(error)
    }
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
      console.log(error)
    }
  }
  useEffect(() => {
    fetchAccount()
  }, [])
  return (
    <>
      {isOwner ? (
        <div>
          <form onSubmit={handleSubmitAccount}>
            <div> FirstName : </div>
            <input
              name="fName"
              onChange={handleChangeAccount}
              type="text"
              value={account.fName}
              placeholder="First Name"
            />
            <div> LastName : </div>
            <input
              name="lName"
              onChange={handleChangeAccount}
              type="text"
              value={account.lName}
              placeholder="Last Name"
            />
            <div> Email : </div>
            <input name="email" onChange={handleChangeAccount} type="email" value={account.email} />

            <div> Address : </div>
            <input
              name="address"
              onChange={handleChangeAccount}
              type="text"
              value={account.address === '' ? '-' : account.address}
            />
            <div> Telephone : </div>
            <input
              name="tel"
              onChange={handleChangeAccount}
              type="text"
              value={account.tel === '' ? '-' : account.tel}
            />
            <div> Facebook : </div>
            <input
              name="facebook"
              onChange={handleChangeAccount}
              type="text"
              value={account.facebook === '' ? '-' : account.facebook}
            />
            <div> Line : </div>
            <input
              name="line"
              onChange={handleChangeAccount}
              type="text"
              value={account.line === '' ? '-' : account.line}
            />
            <div> Twitter : </div>
            <input
              name="twitter"
              onChange={handleChangeAccount}
              type="text"
              value={account.twitter === '' ? '-' : account.twitter}
            />
            <div> Instagram : </div>
            <input
              name="instagram"
              onChange={handleChangeAccount}
              type="text"
              value={account.instagram === '' ? '-' : account.instagram}
            />

            <input type="submit" value="Edit" />
          </form>
        </div>
      ) : (
        <div>
          <div>FirstName : {account.fName}</div>
          <div>LastName : {account.lName}</div>
          <div>Email : {account.email}</div>
          <div>Telephone : {account.tel === '' ? '-' : account.tel}</div>
          <div>Address : {account.address === '' ? '-' : account.address}</div>
          <div className="flex">
            <img className="w-8 mx-1" src="\src\assets\facebook.png" href={account.facebook || ''}></img>
            <img className="w-8 mx-1" src="\src\assets\line.png" href={account.line || ''}></img>
            <img className="w-8 mx-1" src="\src\assets\twitter.png" href={account.twitter || ''}></img>
            <img className="w-8 mx-1" src="\src\assets\instagram.png" href={account.instagram || ''}></img>
          </div>
        </div>
      )}
    </>
  )
}
