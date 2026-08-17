import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore'
import db from '../db'

function AddContact () {
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  function submitHandler (e) {
    e.preventDefault()

    const newContact = {
      'First Name': firstName,
      'Last Name': lastName,
      'Phone': phone,
      'Email': email
    }

    addDoc(collection(db, 'contacts'), newContact).then((docRef) => {
      navigate(`/contacts/${docRef.id}`)
    })
  }

  return (
    <div className="form-page">
      <h2>Add Contact</h2>

      <form onSubmit={submitHandler}>
        <label>
          First Name
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </label>

        <label>
          Last Name
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </label>

        <label>
          Phone
          <input value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </label>

        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>

        <button type="submit">Save Contact</button>
      </form>
    </div>
  )
}

export default AddContact