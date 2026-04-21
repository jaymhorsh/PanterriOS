'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldLabel } from '@/components/ui/field';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  ACCOUNT_STATUS,
  APP_ACCESS,
  DEPARTMENTS,
  USER_ROLES,
} from '@/components/shared/dashboard/data';
import { Save } from 'lucide-react';
import { MultiSelect } from '@/components/ui/multiSelect';
import { useCreateUser } from '@/hook/user-management/useCreateUser';
import { useRetrieveUserProfile } from '@/hook/user-management/useRetrieveUserProfile';
import { useUpdateUser } from '@/hook/user-management/useUpdateUser';
import { generatePassword } from '@/utils/helpers';
import { CreateUserFormSkeleton } from '@/components/shared';

const createUserSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(7, 'Phone number is required'),
  password: z.string().optional(),
  gender: z.string().min(1, 'Select gender'),
  roles: z.array(z.string()).min(1, 'Select at least one role'),
  department: z.string().min(1, 'Select department'),
  userStatus: z.string().min(1, 'Select status'),
  appAccess: z.string().optional(),
});

type CreateUserFormData = z.infer<typeof createUserSchema>;

const genderOptions = [
  { label: 'Female', value: 'Female' },
  { label: 'Male', value: 'Male' },
];

const roleOptions = USER_ROLES;
const departmentOptions = DEPARTMENTS;
const statusOptions = ACCOUNT_STATUS;
const appAccess = APP_ACCESS;

interface Prop {
  closeModal: () => void;
  id?: string | number;
}

export function CreateUserForm({ closeModal, id }: Prop) {
  const userId = id ? Number(id) : undefined;
  const isEditMode = Boolean(userId);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const { data: editProfile, isLoading } = useRetrieveUserProfile(userId || 0);
  const { mutateAsync: createUserFn, isPending: isCreating } = useCreateUser();
  const { mutateAsync: updateUserFn, isPending: isUpdating } = useUpdateUser();

  const form = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      gender: '',
      roles: [],
      department: '',
      userStatus: '',
      appAccess: 'Panterrios',
    },
  });

  useEffect(() => {
    if (!isEditMode || !editProfile) return;

    form.reset({
      firstName: editProfile.data.firstName,
      lastName: editProfile.data.lastName,
      email: editProfile.data.email,
      phoneNumber: editProfile.data.phoneNumber,
      password: '',
      gender: editProfile.data.gender,
      roles: editProfile.data.roles,
      department: editProfile.data.department,
      userStatus: editProfile.data.userStatus,
      appAccess: editProfile.data.appAccess,
    });
  }, [editProfile, form, isEditMode]);

  const onSubmit = async (values: CreateUserFormData) => {
    if (isEditMode && userId) {
      await updateUserFn({
        userId,
        payload: {
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          email: values.email.trim(),
          phoneNumber: values.phoneNumber.trim(),
          gender: values.gender.trim(),
          roles: values.roles,
          department: values.department.trim(),
          appAccess: values.appAccess,
        },
      });
    } else {
      await createUserFn({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email,
        phoneNumber: values.phoneNumber.trim(),
        password: generatePassword(16),
        gender: values.gender.trim(),
        roles: values.roles,
        department: values.department.trim(),
        userStatus: values.userStatus as
          | 'activated'
          | 'deactivated'
          | 'pending'
          | 'banned'
          | 'suspended'
          | 'archived',
        appAccess: values.appAccess,
        dateOfBirth: date,
      });
    }

    closeModal();
    form.reset();
  };

  if (isEditMode && isLoading) {
    return <CreateUserFormSkeleton isEditMode={isEditMode} />;
  }

  return (
    <div className="space-y-6 pb-6 w-full">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold">
          {id ? 'Edit User details' : 'Create New User'}
        </h1>
      </div>

      <Card className="col-span-2 p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        placeholder="Enter user's first name"
                        className="border-input bg-surface h-10 w-full rounded-md border px-3 text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        placeholder="Enter user's last name"
                        className="border-input bg-surface h-10 w-full rounded-md border px-3 text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <input
                        type="email"
                        {...field}
                        placeholder="Enter user's email"
                        className="border-input bg-surface h-10 w-full rounded-md border px-3 text-sm"
                        disabled={isEditMode}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        placeholder="Enter phone number"
                        className="border-input bg-surface h-10 w-full rounded-md border px-3 text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Field className="mx-auto w-44">
                <FieldLabel htmlFor="date">Date of birth</FieldLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="justify-start font-normal"
                    >
                      {date ? date.toLocaleDateString() : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      defaultMonth={date}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setDate(date);
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </Field>

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="select gender" />
                        </SelectTrigger>
                        <SelectContent position={'popper'}>
                          <SelectGroup>
                            {genderOptions.map((option, i) => (
                              <SelectItem value={option.value} key={i}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roles"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={roleOptions}
                        value={field.value}
                        onChange={(roles) => field.onChange(roles)}
                        placeholder="Select roles"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="select department" />
                        </SelectTrigger>
                        <SelectContent position={'popper'}>
                          <SelectGroup>
                            {departmentOptions.map((option, i) => (
                              <SelectItem value={option.value} key={i}>
                                {option.title}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!isEditMode && (
                <FormField
                  control={form.control}
                  name="userStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="select Status" />
                          </SelectTrigger>
                          <SelectContent position={'popper'}>
                            <SelectGroup>
                              {statusOptions.map((option, i) => (
                                <SelectItem value={option.value} key={i}>
                                  {option.title}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="appAccess"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>App Access</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="select App access" />
                        </SelectTrigger>
                        <SelectContent position={'popper'}>
                          <SelectGroup>
                            {appAccess.map((option, i) => (
                              <SelectItem value={option.value} key={i}>
                                {option.title}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-3 flex gap-4 justify-center">
              <Button
                type="button"
                variant="outline"
                className=" font-medium"
                onClick={closeModal}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className=" font-medium flex items-center gap-2"
                disabled={isCreating || isUpdating}
              >
                <Save />
                <span>{id ? 'Update User' : 'Create User'}</span>
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
