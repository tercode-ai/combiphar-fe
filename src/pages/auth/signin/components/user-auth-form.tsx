import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from '@/routes/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { LoginAlert } from './invalid-alert';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/providers/auth-provider';

const formSchema = z.object({
  email: z
    .string()
    .min(1, 'Email harus diisi')
    .email({ message: 'Email tidak valid' }),
  password: z.string().min(1, 'Password harus diisi')
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const { login } = useAuth();
  const { push } = useRouter();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(true);

  const defaultValues = {
    email: '',
    password: ''
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async ({ email, password }: UserFormValue) => {
    setError('');
    setLoading(true);

    const credential = {
      email: 'combiphar@mail.dev',
      password: '#combiphar@2024#'
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email === credential.email && password === credential.password) {
      const fakeToken = 'X7gM9vLp2RzQW8uJ5bKaY0nZT';
      login(fakeToken);
      push('/chat');
      return;
    }

    setError('Email atau password salah!');
    setLoading(false);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-10"
        >
          <div className="space-y-3">
            <LoginAlert message={error} />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Masukkan email disini"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={isPassword ? 'password' : 'text'}
                        placeholder="Masukkan password disini"
                        disabled={loading}
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full w-10 rounded-l-none"
                        onClick={() => setIsPassword((prev) => !prev)}
                      >
                        {isPassword ? (
                          <Eye className="size-6 text-zinc-600" />
                        ) : (
                          <EyeOff className="size-6 text-zinc-600" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={loading} className="w-full" type="submit">
            {loading ? <Loader2 className="animate-spin" /> : 'Sign In'}
          </Button>
        </form>
      </Form>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div> */}
    </>
  );
}
