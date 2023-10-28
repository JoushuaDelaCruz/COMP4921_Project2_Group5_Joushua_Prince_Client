import axios from "axios";

class Request {
  #createConfig = (data) => {
    if (!data) {
      return {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      };
    }
    return {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
  };

  getReq = async (url, data = null) => {
    const response = await axios.get(url, this.#createConfig(data));
    return response.data;
  };

  postReq = async (url, data = null) => {
    const response = await axios.post(url, this.#createConfig(data));
    return response.data;
  };
}

export default Request;
