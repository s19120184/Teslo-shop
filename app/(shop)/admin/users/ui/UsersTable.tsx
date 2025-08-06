"use client"

import { changeUserRole } from '@/actions/users/changed-user-role'
import { User } from '@/src/interfaces/user.interface'

import React from 'react'


interface Props {
    users: User[]
}

export default function UsersTable({users}:Props) {
  return (
     <table className="min-w-full">
          <thead className="bg-gray-200 border-b border-gray-200 ">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Email
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Nombre completo
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Role
              </th>
              
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
                <tr key={user.id} className="bg-white border-b border-gray-200 transition duration-300 ease-in-out hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.email}{" "}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {user.name}
                    
                  </td>
                  <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                     <select
                        value={user.role}
                        onChange={e=> changeUserRole(user.id, e.target.value)}
                        className='text-sm text-gray-900 w-full p-2'
                     >
                        <option value={"admin"}>Admin</option>
                        <option value={"user"}>user</option>

                     </select>
                  </td>
        
                </tr>
              
            ))}
          </tbody>
        </table>
  )
}
