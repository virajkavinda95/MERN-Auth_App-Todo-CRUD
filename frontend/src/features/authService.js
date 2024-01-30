import axios from "axios";

const API_URI = "http://127.0.0.1:5000";

//register user
const registerUser = async (userData) => {
  try {
    const response = await axios({
      method: "POST",
      url: API_URI + "/api/users",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(userData),
    })
      .then((res) => {
        if (res.data) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

//login user
const loginUser = async (userData) => {
  try {
    const response = await axios({
      method: "POST",
      url: API_URI + "/api/users/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(userData),
    })
      .then((res) => {
        if (res.data) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

//logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  registerUser,
  loginUser,
  logout,
};

export default authService;
