import { titleFont } from '@/config/fonts'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <div className='flex w-full justify-center text-sx mb-10'>
        <Link href={'/'}>
           <span className={`${titleFont.className} antialiased font-bold` }>Teslo </span>
           <span> | shop&reg; </span>
            <span>{new Date().getFullYear()}</span>
        
        </Link>

        {/* <Link href={'/'} className='mx-3'>
            Home
        </Link> */}
    </div>
  )
}
