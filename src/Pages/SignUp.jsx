import React, { useState } from "react";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

  return (
    <main className="flex justify-center items-center background">
      <div className="flex w-3/4 lg:flex-row flex-col justify-center items-center px-6 py-12 lg:px-8 bg-white">
        <div className="w-1/2 lg:border-r-2 border-cyan-600">
          <img
            className="mx-auto w-auto h-24 lg:h-auto"
            src="./images/logo.png"
            alt="Your Company"
          />
        </div>
        <div className="w-1/2">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <section className="space-y-5">
              <div>
                <label
                  for="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="email"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div
                  id="is-username-invalid"
                  className="pt-1 text-sm text-red-600 hidden"
                >
                  Please enter a valid username
                </div>
              </div>
              <div>
                <label
                  for="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div
                  id="is-email-invalid"
                  className="pt-1 text-sm text-red-600 hidden"
                >
                  Please enter a valid email address
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    for="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div
                  id="is-password-invalid"
                  className="pt-1 text-sm text-red-600 hidden"
                >
                  Invalid
                </div>
              </div>

              <div>
                <button
                  onclick="validateCredentials()"
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign Up
                </button>
              </div>
            </section>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already a chatter?
              <a
                href="./login"
                className="font-semibold leading-6 text-cyan-600 hover:text-cyan-500"
              >
                Log In!
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
