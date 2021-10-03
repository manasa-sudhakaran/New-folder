import { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

class Login extends Component {
  state = { email: "", password: "", showSubmitError: false, errorMsg: "" };

  onSubmitSuccess = () => {
    const { history } = this.props;

    history.replace("/");
  };

  validateData = async () => {
    const { email, password } = this.state;
    let data = await localStorage.getItem("myData");
    data = JSON.parse(data);

    if (data === null) {
      this.setState({
        showSubmitError: true,
        errorMsg: "No user exists, please register",
      });
    } else if (email !== data.email) {
      this.setState({
        showSubmitError: true,
        errorMsg: "Please enter your registered email address",
      });
    } else if (password !== data.password) {
      this.setState({
        showSubmitError: true,
        errorMsg: "An incorrect password has been entered",
      });
    } else {
      this.setState({ showSubmitError: false, errorMsg: "" });
    }
  };

  onClickLogin = async (event) => {
    const { email, password } = this.state;
    event.preventDefault();

    if (email === "" || password === "") {
      let errMsg = "Enter valid details";
      this.setState({ showSubmitError: true, errorMsg: errMsg });
    } else {
      await this.validateData();

      const { showSubmitError } = this.state;

      if (!showSubmitError) {
        const loginStage = { isLoggedIn: true };
        localStorage.setItem("loginState", JSON.stringify(loginStage));
        this.onSubmitSuccess();
      }
    }
  };

  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    const { email, password, showSubmitError, errorMsg } = this.state;

    return (
      <>
        <Navbar />
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form onSubmit={this.onClickLogin} autoComplete="off">
              <h3>Login</h3>

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

              <button type="submit" className="btn btn-primary  w-100">
                Login
              </button>
              <Link to={"/forgetpassword"}>Forget password</Link>
              <br />
              {showSubmitError && <p className="error-message">*{errorMsg}</p>}
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Login;