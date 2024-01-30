import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/authSlice";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess || user) {
      console.log(message);
      navigate("/login");
    }

    dispatch(reset());
  }, [user, isLoading, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
    };

    dispatch(register(userData));
  };

  return (
    <div className="container">
      <div className="row">
        <form className="row" onSubmit={onSubmit}>
          <div className="form-group col-md-6">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={onChange}
              value={name}
              id="name"
              placeholder="Name"
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={onChange}
              value={email}
              id="email"
              placeholder="Email"
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={onChange}
              value={password}
              id="password"
              placeholder="Password"
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="password2" className="form-label">
              Password 2
            </label>
            <input
              type="password"
              className="form-control"
              name="password2"
              onChange={onChange}
              value={password2}
              id="password2"
              placeholder="Password 2"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-sm col-md-3 m-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
