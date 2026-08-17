import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import db from '../db'

function ContactList () {
  const [contacts, setContacts] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const contactsRef = collection(db, 'contacts')
    const contactsQuery = query(contactsRef, orderBy('Last Name'))

    getDocs(contactsQuery).then((snapshot) => {
      const contactsData = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })

      setContacts(contactsData)
    })
  }, [])

  function searchHandler (e) {
    setSearch(e.target.value)
  }

  const filteredContacts = contacts.filter((contact) => {
    const fullName = contact['First Name'] + ' ' + contact['Last Name']

    return fullName.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div>
      <div className="page-title">
        <h2>Contacts</h2>
        <Link className="button" to="/contacts/new">Add Contact</Link>
      </div>

      <input
        className="search"
        type="text"
        value={search}
        onChange={searchHandler}
        placeholder="Search by first or last name"
      />

      <div className="contact-list">
        {filteredContacts.map((contact) => {
          return (
            <Link
              className="contact-card"
              key={contact.id}
              to={`/contacts/${contact.id}`}
            >
              <h3>{contact['First Name']} {contact['Last Name']}</h3>
              <p>{contact['Email']}</p>
              <p>{contact['Phone']}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default ContactList