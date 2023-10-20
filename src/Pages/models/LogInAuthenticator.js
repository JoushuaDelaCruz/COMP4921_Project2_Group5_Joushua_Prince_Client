class Authenticator {
  constructor(msgs) {
    this.errMsgs = msgs;
  }
  #getElement = (id) => document.getElementById(id);

  getErrMsg = (id) => this.errMsgs[id];

  #credentialsInvalid = (id, isValid) => {
    const userMsgs = this.getErrMsg(id);
    const invalidElement = this.#getElement(`is-${userMsgs.tagId}-invalid`);
    if (isValid) {
      invalidElement.classList.add("hidden");
      return true;
    }
    invalidElement.classList.remove("hidden");
    invalidElement.innerText = userMsgs.msg;
    return false;
  };

  #inputInvalid = (id) => {
    const userMsgs = this.getErrMsg(id);
    const inputContainer = this.#getElement(userMsgs.tagId);
    inputContainer.classList.remove("ring-gray-300");
    inputContainer.classList.add("ring-red-500");
    return false;
  };

  #inputValid = (id) => {
    const userMsgs = this.getErrMsg(id);
    const inputContainer = this.#getElement(userMsgs.tagId);
    inputContainer.classList.remove("ring-gray-300");
    inputContainer.classList.remove("ring-red-500");
    inputContainer.classList.add("ring-green-500");
    return true;
  };

  #validateLogInEmail = (email) => {
    return !email && !email.includes("@") && !email.includes(".");
  };

  #validateLogInPassword = (password) => {
    return !password;
  };

  validateLogIn = (email, password) => {
    const isEmailInvalid = this.#validateLogInEmail(email);
    const isPasswordInvalid = this.#validateLogInPassword(password);
    if (isEmailInvalid || isPasswordInvalid) {
      this.#credentialsInvalid(7, false);
      this.#inputInvalid(2);
      this.#inputInvalid(1);
      return;
    }
    this.#credentialsInvalid(7);
    this.#inputValid(2);
    this.#inputValid(1);
    return;
  };
}

export default Authenticator;
