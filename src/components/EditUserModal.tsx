import { z } from "zod";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditUserSchema, User, UserStatus, UserStatusMap } from "@/types";
import { ModalState } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "@/lib/api"
import { Label } from "./ui/label";

type Props = {
  state: ModalState;
  user: User;
}

export default function EditUserModal({ state, user }: Props) {

  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof EditUserSchema>>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      user_status: user.user_status,
      department: user.department
    }
  });

  const { mutateAsync: editUser, isPending: isEditUserLoading } = useMutation({
    mutationKey: ['editUser', user.id],
    mutationFn: api.editUser,
    onSuccess() {
      state.set('closed')
      toast({
        variant: 'default',
        title: `Successfully update user: ${form.getValues().first_name} ${form.getValues().last_name}`
      })
      form.reset({})
      queryClient.invalidateQueries({ queryKey: ['getAllUsers'] })
    },
    onError(err) {
      toast({
        variant: 'destructive',
        title: `Error: ${err.message}`
      })
    }
  });

  async function onSubmit(values: z.infer<typeof EditUserSchema>) {
    await editUser(values)
  }

  return (
    <Dialog open={state.state === "open" ? true : false} onOpenChange={(open) => !open && state.set("closed")}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <div>
              <Label>
                Username
              </Label>

              <Input disabled value={user.user_name} className="mt-1" />
            </div>

            <div className="grid grid-cols-2 grid-rows-2 gap-3">
              <FormField
                name="first_name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="last_name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="department"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="user_status"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.keys(UserStatusMap).map((v) => (
                          <SelectItem value={v} key={v}>{UserStatusMap[v as UserStatus]}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="submit" isLoading={isEditUserLoading}>
                Save
              </Button>
            </DialogFooter>

          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
