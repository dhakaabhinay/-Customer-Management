import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://dummyjson.com/users')
      const data = await response.json()
      console.log('API Response:', data)
      setUsers(data.users)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewUser({ ...newUser, [name]: value })
  }

  const handleAddUser = async () => {
    try {
      const response = await fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      })

      const data = await response.json()
      console.log('POST API Response:', data)

      setUsers([...users, data])

      setShowModal(false)
      setNewUser({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      })
    } catch (error) {
      console.error('Error adding user:', error)
    }
  }

  return (
    <div className="App">
      <h1>Customer Management System</h1>

      <button onClick={() => setShowModal(true)}>Add Customer</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Add Customer</h2>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={newUser.firstName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={newUser.lastName}
              onChange={handleInputChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              value={newUser.phone}
              onChange={handleInputChange}
            />
            <button onClick={handleAddUser}>Add</button>
          </div>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
