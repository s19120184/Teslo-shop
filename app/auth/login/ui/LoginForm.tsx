"use client"

import { aunthenticate } from '@/actions/auth/login'
import clsx from 'clsx'

import Link from 'next/link'
// import { redirect } from 'next/navigation'
import React, { useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { IoInformationOutline } from 'react-icons/io5'


export default function LoginForm() {

   
    const [state, dispath] = useActionState( aunthenticate, {
        errors:[''],
        success:''
    })

    useEffect(()=>{
         if(state.success === 'Success'){
          //  redirect('/')
           window.location.replace('/')
         }
    },[state])

    
  return (
    <form action={dispath} className="flex flex-col ">

        <label htmlFor="email">Correo electrónico</label>
        <input
          className="px-5 py-2 border bg-gray-200 border-gray-200 rounded mb-5"
          type="email"
          name='email'
          
          />


        <label htmlFor="email">Contraseña</label>
        <input
          className="px-5 py-2 border bg-gray-200 border-gray-200 rounded mb-5"
          type="password" 
          name='password'/>
        
        <div className='flex h-8 items-end space-x-1' aria-live='polite' aria-atomic='true'>
             {state.errors[0] === 'CredentialsSigin' &&  (
                <div className='mb-5 flex flex-row items-center'>
                  <IoInformationOutline className='h-5 w-5 text-red-500' />
                  <p className='test-sm text-red-500'>Credenciales no son correctas</p>
                </div>
             )}
             

        </div>

        <LoginButton/>


        {/* divisor l ine */ }
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
          href="/auth/new-account" 
          className="btn-secondary text-center">
          Crear una nueva cuenta
        </Link>

      </form>
  )
}


function LoginButton(){
  const {pending} = useFormStatus()
 
  return(
       
        <button
          type='submit'
          className={clsx('btn-primary',{
            ' bg-gray-200 text-black py-2 px-4 rounded transition-all':pending 
          })}

          disabled={pending}
          >
          Ingresar
        </button>
  )
}