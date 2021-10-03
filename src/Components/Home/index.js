import { Component } from "react";

import { withRouter, Link, Redirect } from "react-router-dom";

// import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

class Home extends Component {
  state = { isLoggedIn: true, jsonData: null };

  componentDidMount() {
    this.checkIsLoggedIn();
    this.getDataFromLocalStorage();
  }

  getDataFromLocalStorage = () => {
    const data = localStorage.getItem("JsonData");

    this.setState({ jsonData: data });
  };

  onClickLogout = () => {
    const { history } = this.props;

    const loginStage = { isLoggedIn: false };
    localStorage.setItem("loginState", JSON.stringify(loginStage));

    history.replace("/login");
  };

  checkIsLoggedIn = async () => {
    let loginStage = await localStorage.getItem("loginState");
    loginStage = JSON.parse(loginStage);

    if (loginStage === null) {
      this.setState({ isLoggedIn: false });
    } else if (loginStage.isLoggedIn === false) {
      this.setState({ isLoggedIn: false });
    }
  };

  readChosenFile = (event) => {
    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0], "UTF-8");
    fileReader.onload = (event) => {
      localStorage.setItem("JsonData", event.target.result);
      // console.log("event.target.result",  event.target.result);
      this.setState({ jsonData: event.target.result });
    };
  };

  renderLoggedIn = () => {
    const { jsonData } = this.state;

   

    return (
      <>
        <nav className="navbar navbar-expand navbar-light">
          <div className="container">
            <Link className="navbar-brand " to={"/"}>
              <img
                src="https://th.bing.com/th/id/OIP.4dU8AiNxf7vFmO_ZkRxWPwHaCO?w=314&h=104&c=7&r=0&o=5&dpr=1.25&pid=1.7"
                className="currency-logo"
                alt="currency logo"
              />
            </Link>
            <Link to={"/"} className="navbar-brand">
              Home
            </Link>

            {jsonData && (
              <Link to={"/data"} className="nav-item nav-link data">
                Data
              </Link>
            )}

            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto ">
                <li
                  className="nav-item nav-link logout"
                  onClick={this.onClickLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form onSubmit={this.readChosenFile} encType="multipart/form-data">
              <div className="file-upload">
                <div className="file-select">
                  <div className="file-select-button" id="fileName">
                    Choose File
                  </div>
                  <div className="file-select-name" id="noFile">
                    No file chosen...
                  </div>
                  <input
                    type="file"
                    ref="file"
                    name="chooseFile"
                    id="chooseFile"
                    accept=".json"
                    onChange={this.readChosenFile}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary mt-4 mb-1 w-100">
                Submit
              </button>
              {jsonData && (
                <p className="data-msg">
                  The data has been loaded successfully
                </p>
              )}
            </form>
          </div>
        </div>
      </>
    );
  };

  renderLoginPage = () => <Redirect to="/login" />;

  render() {
    const { isLoggedIn } = this.state;
    return <>{isLoggedIn ? this.renderLoggedIn() : this.renderLoginPage()}</>;
  }
}

export default withRouter(Home);