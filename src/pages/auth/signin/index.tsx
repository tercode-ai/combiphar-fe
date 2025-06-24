import { useState } from 'react';
import * as Form from '@radix-ui/react-form';
import { EyeOpenIcon, EyeClosedIcon, UpdateIcon } from '@radix-ui/react-icons';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useSession } from '@/components/providers/session';
import { TLoginRequest } from '@/api/auth/type';
import { LoginSchema, TLoginFormData } from './components/schema';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { signin, status } = useSession();
  const loading = status === 'authenticating';

  const form = useForm<TLoginFormData>({
    mode: 'onChange',
    resolver: zodResolver(LoginSchema)
  });

  const handleSubmit = (data: TLoginFormData) => {
    const payload: TLoginRequest = {
      ...data
    };
    signin(payload);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f8f9] font-sans">
      <div className="mx-auto w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <div className="mb-2 flex items-center justify-center">
            <img src="/icons/logo.png" />
          </div>
          <p className="text-gray-500">Welcome back to CombipharGPT</p>
        </div>

        <Form.Root
          className="space-y-5"
          onSubmit={form.handleSubmit((data) => handleSubmit(data))}
        >
          <Form.Field name="username">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-sm font-bold text-gray-700">
                Username
              </Form.Label>
            </div>
            <Controller
              control={form.control}
              name="username"
              render={({ field, fieldState }) => (
                <>
                  <Form.Control asChild>
                    <input
                      {...field}
                      type="text"
                      placeholder="Type username here"
                      className="mt-1 block w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-gray-700 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </Form.Control>
                  {fieldState.invalid ? (
                    <p className="mt-1 text-xs text-red-600">
                      {fieldState.error?.message}
                    </p>
                  ) : null}
                </>
              )}
            />
          </Form.Field>

          {/* Field Password */}
          <Form.Field name="password">
            <Form.Label className="text-sm font-bold text-gray-700">
              Password
            </Form.Label>
            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <>
                  <div className="relative mt-1">
                    <Form.Control asChild>
                      <input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Type password here"
                        className="block w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-gray-700 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </Form.Control>

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? (
                        <EyeClosedIcon className="h-5 w-5" />
                      ) : (
                        <EyeOpenIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {fieldState.invalid ? (
                    <p className="mt-1 text-xs text-red-600">
                      {fieldState.error?.message}
                    </p>
                  ) : null}
                </>
              )}
            />
          </Form.Field>

          <Form.Submit asChild>
            <button
              type="submit"
              disabled={loading}
              className="mt-4 flex w-full items-center justify-center rounded-lg border border-transparent bg-gradient-to-r from-[#1e132b] to-[#a03bbb] px-4 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-75"
            >
              {loading ? (
                <>
                  <UpdateIcon className="mr-2 h-5 w-5 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <span>Login</span>
              )}
            </button>
          </Form.Submit>
        </Form.Root>
      </div>
    </div>
  );
}
