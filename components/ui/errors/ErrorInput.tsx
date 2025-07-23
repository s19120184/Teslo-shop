import React from 'react'

interface Props{
    message:string
    style?:string
}

export default function ErrorInput({message,style}:Props) {
  return (
    <span className={`text-sm text-red-500 relative -top-5  ${style}`}>{message}</span>
  )
}
