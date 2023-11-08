import React, { useEffect, useState } from "react";
import Authenticator from "./Models/LogInAuthenticator";
import useRequest from "./Models/useRequest";

const LogIn = () => {
  const [, , logInRequest] = useRequest();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticate, setAuthenticate] = useState(null);

  useEffect(() => {
    const getAuthenticate = async () => {
      const response = await fetch("/assets/user-msgs.json");
      const data = await response.json();
      const authenticate = new Authenticator(data);
      setAuthenticate(authenticate);
    };
    getAuthenticate();
  }, []);

  const validateCredentials = async () => {
    const validCredentials = authenticate.validateLogIn(email, password);
    if (!validCredentials) {
      return;
    }
    const data = { email: email, password: password };
    const success = await logInRequest(data);
    if (!success) {
      authenticate.invalidLogIn();
    }
  };

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
              Welcome to ChatBook
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <section className="space-y-5">
              <div
                id="is-credentials-invalid"
                className="text-center text-sm text-red-600 font-semibold border-b-2 pb-2 border-red-500 hidden"
              ></div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={validateCredentials}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Log In
                </button>
              </div>
            </section>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a chatter?
              <a
                href="./signUp"
                className="font-semibold leading-6 text-cyan-600 hover:text-cyan-500 pl-1"
              >
                Sign Up!
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LogIn;
