import React, { useState, useRef, useEffect } from 'react'


const App = () => {
  const [data, setData] = useState({} as {[key: string]: string[]})

  useEffect(() => {
    fetch("/members").then(res => res.json()
    ).then(data => {
      setData(data)
      console.log(data)
    })
  }, [])

  return (
    <div>
      {(typeof data.members === 'undefined') ? (
        <p>Loading...</p>
       ) : (
        data.members.map((member, idx) => (
          <p key={idx}>{member}</p>
        ))
       )
      }
    </div>
  )
}

export default App