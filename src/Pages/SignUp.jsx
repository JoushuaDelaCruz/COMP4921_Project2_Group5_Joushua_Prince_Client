import React, { useEffect, useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [errorMsgs, setErrorMsgs] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const getErrorMsgs = async () => {
      const response = await fetch("/assets/user-msgs.json");
      const data = await response.json();
      setErrorMsgs(data);
    };
    getErrorMsgs();
  }, []);

  const getElement = (id) => document.getElementById(id);

  const getErrorMsg = (id) => {
    return errorMsgs[id]["msg"];
  };

  const _credentialInvalid = (id, errId) => {
    const invalidElement = getElement(`is-${id}-invalid`);
    const inputContainer = getElement(id);
    inputContainer.classList.remove("ring-gray-300");
    inputContainer.classList.add("ring-red-500");
    invalidElement.classList.remove("hidden");
    invalidElement.innerText = getErrorMsg(errId);
    return false;
  };

  const _credentialValid = (id) => {
    const invalidElement = getElement(`is-${id}-invalid`);
    const inputContainer = getElement(id);
    inputContainer.classList.remove("ring-gray-300");
    inputContainer.classList.remove("ring-red-500");
    inputContainer.classList.add("ring-green-500");
    invalidElement.classList.add("hidden");
    return true;
  };

  const validateEmail = async () => {
    if (!email) {
      return _credentialInvalid("email", 1);
    }
    const response = await axios.post(
      import.meta.env.VITE_API + "user/isEmailExist",
      {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email: email,
        },
      }
    );
    if (response.data) {
      return _credentialInvalid("email", 8);
    } else {
      return _credentialValid("email");
    }
  };

  const validateUsername = async () => {
    if (!username) {
      _credentialInvalid("username", 0);
      return _credentialInvalid("username", 0);
    }
    const response = await axios.post(
      import.meta.env.VITE_API + "user/isUsernameExist",
      {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          username: username,
        },
      }
    );
    if (response.data) {
      return _credentialInvalid("username", 9);
    } else {
      return _credentialValid("username");
    }
  };

  const validatePassword = () => {
    if (password.length < 10) {
      return _credentialInvalid("password", 2);
    }
    if (!password.match(/[a-z]/)) {
      return _credentialInvalid("password", 3);
    }
    if (!password.match(/[A-Z]/)) {
      return _credentialInvalid("password", 4);
    }
    if (!password.match(/[0-9]/)) {
      return _credentialInvalid("password", 5);
    }
    if (!password.match(/[^a-zA-Z0-9]/)) {
      return _credentialInvalid("password", 6);
    }
    return _credentialValid("password");
  };

  const validateCredentials = async () => {
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    if (isUsernameValid && isEmailValid && isPasswordValid) {
      const data = {
        username: username,
        email: email,
        password: password,
      };
      const response = await axios.post(
        import.meta.env.VITE_API + "user/create",
        data,
        {
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        window.location.href = "/login";
      } else {
        alert("Something went wrong");
        window.location.reload();
      }
    }
    return;
  };

  return (
    <main className="flex justify-center items-center background">
      <div className="flex w-3/4 lg:flex-row flex-col justify-center items-center px-6 py-12 lg:px-8 bg-white">
        <div className="w-1/2 lg:border-r-2 border-cyan-600">
          <img
            className="mx-auto w-auto h-24 lg:h-auto"
            src="/images/logo.png"
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
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="email"
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div
                  id="is-username-invalid"
                  className="pt-1 text-sm text-red-600 hidden"
                ></div>
              </div>
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
                <div
                  id="is-email-invalid"
                  className="pt-1 text-sm text-red-600 hidden"
                >
                  Please enter a valid email address
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
                <div
                  id="is-password-invalid"
                  className="pt-1 text-sm text-red-600 hidden"
                >
                  Invalid
                </div>
              </div>

              <div>
                <button
                  onClick={validateCredentials}
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
