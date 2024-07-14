import { useModalState } from "@/lib/utils";
import { User, UserStatus } from "@/types";
import { ColumnDef } from "@tanstack/react-table"
import EditUserModal from "../EditUserModal";
import DeleteUserModal from "../DeleteUserModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "../ui/button";
import { IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react";

type UserStatusBadgeProps = {
  status: UserStatus;
}

function UserStatusBadge({ status }: UserStatusBadgeProps) {
  if (status === 'A') {
    return (
      <span className='size-2 rounded-full bg-green-500'></span>
    )
  } else if (status === 'I') {
    return (
      <span className='size-2 rounded-full bg-gray-500'></span>
    )
  } else {
    return (
      <span className='size-2 rounded-full bg-red-500'></span>
    )
  }

  switch (status) {
    case "A":
      return (
        <span className='size-2 rounded-full bg-green-500'></span>
      )

    case "I":
      return (
        <span className='size-2 rounded-full bg-gray-500'></span>
      )

    case "T":
      return (
        <span className='size-2 rounded-full bg-red-500'></span>
      )
  
    default:
      return (
        <></>
      )
  }
}

export const columns: ColumnDef<User>[] = [
  {
    id: 'name',
    header: "Name",
    cell({ row }) {
      return (
        <div className="flex flex-row gap-2 items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <UserStatusBadge status={row.original.user_status} />
            </TooltipTrigger>
            <TooltipContent>
              {row.original.user_status === 'A' && <p>Active</p>}
              {row.original.user_status === 'I' && <p>Inactive</p>}
              {row.original.user_status === 'T' && <p>Terminated</p>}
            </TooltipContent>
          </Tooltip>

          <span>
            {row.original.first_name} {row.original.last_name}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'user_name',
    header: "Username",
    cell({ row }) {
      return (
        <div className="font-mono">
          {row.original.user_name}
        </div>
      )
    },
  },
  {
    accessorKey: 'email',
    header: "Email",
    cell({ row }) {
      return (
        <div>
          {row.original.email}
        </div>
      )
    },
  },
  {
    accessorKey: 'department',
    header: "Department",
    cell({ row }) {
      return (
        <div>
          {row.original.department ?? ""}
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell({ row }) {
      const user = row.original;
      const editUserModalState = useModalState();
      const deleteUserModalState = useModalState();

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								<IconDotsVertical />
							</Button>
						</DropdownMenuTrigger>
            <DropdownMenuContent align="center" side="right">
							<DropdownMenuItem className="cursor-pointer" onClick={() => editUserModalState.set("open")}>
								<IconPencil stroke={1.75} size={20} />
								<span className={`text-sm font-medium pl-2`}>Edit</span>
							</DropdownMenuItem>

							<DropdownMenuSeparator />

							<DropdownMenuItem className="cursor-pointer text-red-700" onClick={() => deleteUserModalState.set("open")}>
								<IconTrash stroke={1.75} size={20} />
								<span className={`text-sm font-medium pl-2`}>Delete</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
          </DropdownMenu>

          <EditUserModal state={editUserModalState} user={user} />
          <DeleteUserModal state={deleteUserModalState} user_id={user.id} name={`${user.first_name} ${user.last_name}`} />
        </>
      )
    },
  }
]
