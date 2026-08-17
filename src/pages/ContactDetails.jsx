import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteDoc, doc, getDoc } from 'firebase/firestore'
import db from '../db'

function ContactDetails () {
  const params = useParams()
  const navigate = useNavigate()
  const [contact, setContact] = useState(null)

  useEffect(() => {
    const contactRef = doc(db, 'contacts', params.id)

    getDoc(contactRef).then((snapshot) => {
      if (snapshot.exists()) {
        setContact({
          id: snapshot.id,
          ...snapshot.data()
        })
      }
    })
  }, [params.id])

  function deleteHandler () {
    const contactRef = doc(db, 'contacts', params.id)

    deleteDoc(contactRef).then(() => {
      navigate('/contacts')
    })
  }

  if (contact === null) {
    return <p>Loading...</p>
  }

  return (
    <div className="details">
      <Link to="/contacts">Back to Contacts</Link>

      <h2>{contact['First Name']} {contact['Last Name']}</h2>

      <p><strong>Email:</strong> {contact['Email']}</p>
      <p><strong>Phone:</strong> {contact['Phone']}</p>

      <div className="actions">
        <Link className="button" to={`/contacts/${contact.id}/edit`}>
          Edit
        </Link>

        <button className="danger" onClick={deleteHandler}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default ContactDetails