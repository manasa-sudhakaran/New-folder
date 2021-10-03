import { Component } from "react";

import Navbar from "../Navbar";
import "./index.css";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    showSubmitError: false,
    errorMsg: "",
  };

  validateForm = () => {
    const { email, password, confirmPassword } = this.state;

    if (email === "") {
      this.setState({
        showSubmitError: true,
        errorMsg: "Enter valid Email",
      });
    } else if (password !== confirmPassword) {
      this.setState({
        showSubmitError: true,
        errorMsg: "Passwords do not match",
      });
    } else {
      this.setState({ showSubmitError: false, errorMsg: "" });
    }
  };

  onClickSignUp = async (event) => {
    const { email, password } = this.state;
    event.preventDefault();
    const data = { email: email, password: password };
    await this.validateForm();

    const { showSubmitError } = this.state;
    if (!showSubmitError) {
      await localStorage.setItem("myData", JSON.stringify(data));
      this.setState({
        email: "",
        password: "",
        confirmPassword: "",
        showSubmitError: true,
        errorMsg: "Registered successfully ",
      });
    }
  };

  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onChangeConfirmPassword = (event) => {
    this.setState({ confirmPassword: event.target.value });
  };

  render() {
    const {
      email,
      password,
      confirmPassword,
      showSubmitError,
      errorMsg,
    } = this.state;
    return (
      <>
        <Navbar />
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form onSubmit={this.onClickSignUp} autoComplete="off">
              <h3>Sign Up</h3>

              <div className="form-group mb-3">
                <label>Email</label>
                <div className="input-group mb-2 mr-sm-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text"></div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="inlineFormInputGroupUsername2"
                    placeholder="Email"
                    value={email}
                    onChange={this.onChangeEmail}
                  />
                </div>
              </div>
              <div className="form-group mb-3">
                <label>Password</label>
                <div className="input-group mb-2 mr-sm-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text"></div>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    id="inlineFormInputPassword"
                    placeholder="Password"
                    value={password}
                    onChange={this.onChangePassword}
                  />
                </div>
              </div>
              <div className="form-group mb-3">
                <label>Confirm Password</label>
                <div className="input-group mb-2 mr-sm-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text"></div>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    id="inlineFormInputConfirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={this.onChangeConfirmPassword}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary  w-100">
                Sign Up
              </button>
              {showSubmitError && <p className="error-message">*{errorMsg}</p>}
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default SignUp;