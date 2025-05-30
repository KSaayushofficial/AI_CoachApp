import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (

      <div className='flex flex-col items-center justify-center min-h-[100vh] px-4 text-center'>
            <h1 className='text-6xl font-bold gradient-title mb-4'>400</h1>
            <h2 className='text-2xl font-semibold mb-4'>Page Not Found</h2>
            <p>Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      
      <Link href="/">
        Go Back Home
      </Link>
      </div>
  );
}
