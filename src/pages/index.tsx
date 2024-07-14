import AddUserModal from "@/components/AddUserModal";
import DeleteUserModal from "@/components/DeleteUserModal";
import EditUserModal from "@/components/EditUserModal";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { columns } from "@/components/users-table/columns";
import DataTable from "@/components/users-table/table";
// import { users } from "@/lib/users";
import { useModalState } from "@/lib/utils";
import { IconPlus } from "@tabler/icons-react";
import Head from "next/head";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import * as api from "@/lib/api"
import { LoadingSpinner } from "@/components/LoadingSpinner";


export default function Home() {

  const newUserModalState = useModalState();

  const { data: users, isPending } = useQuery({
    queryKey: ['getAllUsers'],
    queryFn: api.getAllUsers
  })

  return (
    <>
      <Head>
        <title>Integra Admin Panel</title>
        <meta name="description" content="..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="border-b">
        <section className="ml-auto mr-auto max-w-[1200px]">
          <div className="flex h-16 items-center px-4 py-10">
            <h1 className="text-4xl font-bold">
              Integra Admin Panel
            </h1>
            <div className="ml-auto">
              <Button className="gap-2" onClick={() => {
                newUserModalState.set("open");
              }}>
                <IconPlus size={20} />
                Add User
              </Button>
            </div>
          </div>
        </section>
      </div>
      <main className="ml-auto mr-auto max-w-[1200px] pb-8 px-6">
        <div className="pt-4">
          {isPending && <LoadingSpinner />}
          {users && <DataTable columns={columns} data={users} />}
        </div>
        <Toaster />
        <AddUserModal state={newUserModalState} />
      </main>
    </>
  );
}
