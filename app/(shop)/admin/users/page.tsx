

import Tittle from '@/components/ui/title/Tittle';

import { redirect } from 'next/navigation';
import React from 'react'

import UsersTable from './ui/UsersTable';
import { gePaginatedUser } from '@/actions/users/getPaginated-users';

export default async function AdminUsersPage() {
  
  const {ok, users =[]} = await gePaginatedUser()

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Tittle title="Mantenimento de usuarios" />

      <div className=" mb-10 ">
         <UsersTable users={users} />
      </div>
    </>
  );
}
