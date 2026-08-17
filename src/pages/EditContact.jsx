import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import db from '../db'

function EditContact () {
  const params = useParams()
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const contactRef = doc(db, 'contacts', params.id)

    getDoc(contactRef).then((snapshot) => {
      if (snapshot.exists()) {
        const contact = snapshot.data()

        setFirstName(contact['First Name'])
        setLastName(contact['Last Name'])
        setPhone(contact['Phone'])
        setEmail(contact['Email'])
      }
    })
  }, [params.id])

  function submitHandler (e) {
    e.preventDefault()

    const contactRef = doc(db, 'contacts', params.id)

    updateDoc(contactRef, {
      'First Name': firstName,
      'Last Name': lastName,
      'Phone': phone,
      'Email': email
    }).then(() => {
      navigate(`/contacts/${params.id}`)
    })
  }

  return (
    <div className="form-page">
      <h2>Edit Contact</h2>

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

        <button type="submit">Update Contact</button>
      </form>
    </div>
  )
}

export default EditContact