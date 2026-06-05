'use client'

import { useEffect } from 'react'

export default function StudioPage() {
  useEffect(() => {
    // Redirect to Sanity management interface
    window.location.href = `https://sanity.io/manage/projects/tz810ks6`
  }, [])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#1a1a1a',
      color: 'white',
      fontFamily: 'sans-serif'
    }}>
      <h1>Redirecting to Sanity Studio...</h1>
      <p>If not redirected, <a href="https://sanity.io/manage/projects/tz810ks6" style={{color: '#00d4ff'}}>click here</a></p>
    </div>
  )
}


