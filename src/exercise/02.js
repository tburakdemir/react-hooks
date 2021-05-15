// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {useEffect} from 'react'

function useLocalStorageState(initialName = '') {
  const [name, setName] = React.useState(
    () => window.localStorage.getItem('name') || initialName,
  )

  useEffect(() => {
    window.localStorage.setItem('name', name)
  }, [name])

  return [name, setName]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState(initialName)

  const handleChange = e => {
    setName(e.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Burak" />
}

export default App
