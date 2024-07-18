import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ButtonProps {
  className?: string;
  onClick: () => void;
  children: ReactNode;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`py-2 px-4 rounded-md w-full bg-gray-800 text-gray-50 font-semibold tracking-widest ${props.className}`}
    >
      {props.children}
    </button>
  );
};

const loginFormSchema = z.object({
  username: z
    .string()
    .min(5, "Username harus minimal 5 karakter!")
    .max(16, "Username maximal 16 karakter!"),
  password: z.string().min(8, "Password minimal haru 8 karakter"),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

export default function Home() {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const { handleSubmit, control } = form;

  const onSubmit = handleSubmit((values) => {
    alert(`Username: ${values.username} || Password: ${values.password}`);
  });

  return (
    <main className="flex h-screen items-center justify-between p-4">
      <div className="w-full bg-white shadow-md p-2 rounded-md">
        <h1 className="font-bold text-gray-800 text-xl mb-3">Welcome Back!</h1>

        <Form {...form}>
          <form onSubmit={onSubmit} className="w-full flex flex-col gap-3">
            <FormField
              control={control}
              name="username"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* <div className="flex flex-col gap-2 mb-3">
              <label htmlFor="username" className="text-gray-800">
                Username
              </label>
              <input
                type="text"
                placeholder="Username"
                className="p-2"
                {...register("username")}
              />
              {formState.errors.username && (
                <p className="text-sm text-red-500">
                  {formState.errors.username.message}
                </p>
              )}
            </div> */}

            {/* <div className="flex flex-col gap-2 mb-3">
              <label htmlFor="password" className="text-gray-800">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="p-2"
                {...register("password")}
              />
              {formState.errors.password && (
                <p className="text-sm text-red-500">
                  {formState.errors.password.message}
                </p>
              )}
            </div> */}

            <Button onClick={() => {}}>Sign In</Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
