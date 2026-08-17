import { Routes, Route, NavLink, Navigate } from 'react-router-dom'
import './App.css'

import ContactList from './pages/ContactList'
import ContactDetails from './pages/ContactDetails'
import AddContact from './pages/AddContact'
import EditContact from './pages/EditContact'

function App () {
  return (
    <div className="app">
      <header>
        <h1>Contact Book</h1>

        <nav>
          <NavLink to="/contacts">Contacts</NavLink>
          <NavLink to="/contacts/new">Add Contact</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route path="/contacts" element={<ContactList />} />
          <Route path="/contacts/new" element={<AddContact />} />
          <Route path="/contacts/:id" element={<ContactDetails />} />
          <Route path="/contacts/:id/edit" element={<EditContact />} />
        </Routes>
      </main>
    </div>
  )
}

export default App