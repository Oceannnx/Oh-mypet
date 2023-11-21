import React, { useEffect } from 'react'
import { AxiosLib } from '../../lib/axios'

export const MyAccount = (props) => {
  const { accountID } = props || ''
  const [account, setAccount] = React.useState({})
  const fetchAccount = async () => {
    try {
      const result = await AxiosLib.get(`/api/account/${accountID}`)
      setAccount(result.data[0])
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
      await AxiosLib.post(`/api/editAccount`, account)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchAccount()
  }, [])
  console.log(account)
  return (
    <>
      <form onSubmit={handleSubmitAccount}>
        <div> FirstName : </div>
        <input name="fName" onChange={handleChangeAccount} type="text" value={account.fName} placeholder="First Name" />
        <div> LastName : </div>
        <input name="lName" onChange={handleChangeAccount} type="text" value={account.lName} placeholder="Last Name" />
        <div> Email : </div>
        <input name="email" onChange={handleChangeAccount} type="email" value={account.email} />
        <input type="submit" value="Edit" />
      </form>
    </>
  )
}
