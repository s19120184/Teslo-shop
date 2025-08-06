"use client";
import { login } from "@/actions/auth/login";
import { registerUser } from "@/actions/auth/register";
import ErrorInput from "@/components/ui/errors/ErrorInput";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";


type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
 
  const [errorMessage, setErrorMessage]= useState('')
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    const { name, email, password } = data;
    const response = await registerUser(name, email, password)
    
    if(!response.ok){
       setErrorMessage(response.message!)
       return
    }
    const res =await login(email.toLowerCase(), password)
    if(res.ok){
       window.location.replace('/')
    }
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
       {errorMessage && (<h2 className="fade-in bg-red-500 p-2 mb-4 text-white font-bold " >{errorMessage}</h2>)}
      <label htmlFor="nombre">Nombre completo</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 border-gray-200 rounded mb-5", { 'border-red-500': errors.name})}
        type="text"
        {...register("name", { required: true })}
      />
      { errors.name && (<ErrorInput message="El nombre es obligatorio" />)}

      <label htmlFor="email">Correo electrónico</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 border-gray-200 rounded mb-5", { 'border-red-500': errors.email})}
        type="email"
        {...register("email", { required: true, pattern: emailRegex })}
      />
      { errors.email && (<ErrorInput message="Email no valido" />)}

      <label htmlFor="password">Contraseña</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 border-gray-200 rounded mb-5", { 'border-red-500': errors.password})}
        type="password"
        {...register("password", { required: true ,minLength:7 })}
      />
      { errors.password && (<ErrorInput message="Password debe contener más de 6 caracteres" />)}

      <button className="btn-primary">Crear Cuenta</button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Ingresar
      </Link>
    </form>
  );
}
