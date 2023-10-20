class Authenticator {
  constructor(msgs) {
    this.errMsgs = msgs;
  }

  #getElement = (id) => document.getElementById(id);

  #getErrorMsg = (id) => {
    return this.errMsgs[id];
  };

  #credentialInvalid = (id) => {
    const errMsg = this.#getErrorMsg(id);
    const invalidElement = this.#getElement(`is-${errMsg.tagId}-invalid`);
    const inputContainer = this.#getElement(errMsg.tagId);
    inputContainer.classList.remove("ring-gray-300");
    inputContainer.classList.add("ring-red-500");
    invalidElement.classList.remove("hidden");
    invalidElement.innerText = errMsg.msg;
    return false;
  };

  #credentialValid = (id) => {
    const errMsg = this.#getErrorMsg(id);
    const invalidElement = this.#getElement(`is-${errMsg.tagId}-invalid`);
    const inputContainer = this.#getElement(errMsg.tagId);
    inputContainer.classList.remove("ring-gray-300");
    inputContainer.classList.remove("ring-red-500");
    inputContainer.classList.add("ring-green-500");
    invalidElement.classList.add("hidden");
    return true;
  };

  #validateEmail = async (email, isExistReq) => {
    if (!email || !email.includes("@") || !email.includes(".")) {
      return this.#credentialInvalid(1);
    }
    const isExist = await isExistReq(email);
    if (isExist) {
      return this.#credentialInvalid(8);
    } else {
      return this.#credentialValid(1);
    }
  };

  #validateName = async (username, isExistReq) => {
    if (!username) {
      return this.#credentialInvalid(0);
    }
    const isExist = await isExistReq(username);
    if (isExist) {
      return this.#credentialInvalid(9);
    } else {
      return this.#credentialValid(0);
    }
  };

  #validatePassword = (password) => {
    if (password.length < 10) {
      return this.#credentialInvalid(2);
    }
    if (!password.match(/[a-z]/)) {
      return this.#credentialInvalid(3);
    }
    if (!password.match(/[A-Z]/)) {
      return this.#credentialInvalid(4);
    }
    if (!password.match(/[0-9]/)) {
      return this.#credentialInvalid(5);
    }
    if (!password.match(/[^a-zA-Z0-9]/)) {
      return this.#credentialInvalid(6);
    }
    return this.#credentialValid(2);
  };

  validateSignUp = async (name, email, password) => {
    const isUsernameValid = await this.#validateName(
      name.input,
      name.isExistReq
    );
    const isEmailValid = await this.#validateEmail(
      email.input,
      email.isExistReq
    );
    const isPasswordValid = this.#validatePassword(password);
    return isUsernameValid && isEmailValid && isPasswordValid;
  };
}

export default Authenticator;
