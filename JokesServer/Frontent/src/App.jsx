import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [jokes, setJokes] = useState([])

  useEffect(()=>{
    axios.get('/api/jokes')
    .then((response)=>{
      setJokes(response.data)
    })
    .catch((Error)=>{
      console.log(Error);
    })
  })

  return (
    <>
    <h1>Jokes App</h1>
    <h3>Jokes={jokes.length}</h3>
    {
      jokes.map((joke,index)=>(
        <div key={index}>
          <h2>{joke.punchline}</h2>
          <p>{joke.setup}</p>
        </div>
      ))
    }
    </>
  )
}

export default App
