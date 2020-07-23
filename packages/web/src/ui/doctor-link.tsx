import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import api from '../services/api'

const Component: React.FC<{ username: string }> = (props) => {
  const [name, setName] = useState('')

  useEffect(() => {
    api
      .get(`/doctors/${props.username}`)
      .then(({ data }: any) => {
        setName(`${data.first_name} ${data.last_name}`)
      })
      .catch(console.log)
  }, [props.username])

  return (
    <>
      <Link to={`/doctors/${props.username}`}>Dr. {name}</Link>
    </>
  )
}

export default Component
