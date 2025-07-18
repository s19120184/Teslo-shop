import React from 'react'

interface Props{
    message:string
}

export default function ErrorInput({message}:Props) {
  return (
    <span className='text-sm text-red-500 relative -top-5'>{message}</span>
  )
}
