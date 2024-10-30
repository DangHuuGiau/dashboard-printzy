'use client';

import AuthHeader from '../auth-header';
import AuthImage from '../auth-image';
import Cookies from 'js-cookie';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { login } from '@/api/auth';
import { useUserStore } from '@/store/user/user.store';

export default function SignIn() {
  const { setUser } = useUserStore();
  const isLoggedIn = Cookies.get('printzy_ac_token');
  if (isLoggedIn) {
    redirect('/');
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError('');

    try {
      const response = await login({ email, password });
      const token = response?.data?.payload;
      const role = response?.data?.user?.role;

      if (token && role === 'admin') {
        Cookies.set('printzy_refresh_token', token.refreshToken);
        Cookies.set('printzy_ac_token', token.refreshToken);
        setUser(response?.data?.user);
        redirect('/');
      } else {
        setError('Login failed. Please check your email and password.');
      }
    } catch (err: any) {
      setError('Login failed. Please check your email and password.');
    }
  };

  return (
    <main className="bg-white dark:bg-gray-900">
      <div className="relative md:flex">
        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
            <AuthHeader />

            <div className="w-full max-w-sm px-4 py-8 mx-auto">
              <h1 className="mb-6 text-3xl font-bold text-gray-800 dark:text-gray-100">
                Welcome back Printzy Dashboard!
              </h1>

              {/* Error message */}
              {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

              {/* Form */}
              <form onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div>
                    <label
                      className="block mb-1 text-sm font-medium"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      className="w-full form-input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block mb-1 text-sm font-medium"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      className="w-full form-input"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="on"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <button
                    type="submit"
                    className="text-gray-100 bg-gray-900 btn hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
                  >
                    Sign In
                  </button>
                </div>
              </form>
              {/* Footer */}
            </div>
          </div>
        </div>

        <AuthImage />
      </div>
    </main>
  );
}
