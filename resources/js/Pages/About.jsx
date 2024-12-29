import React from 'react'
import { Link } from '@inertiajs/react'

function About() {
  return (
    <div>
        <h1>About Page</h1>
        <p>Welcome to the React App!</p>
        <p>This is the Home component.</p>
        <Link href='/'>Home</Link>
    </div>
  )
}

export default About
