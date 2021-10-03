import { Component } from "react";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import Data from "../Data";
import "./index.css";

class DisplayData extends Component {
  state = { data: "", isLoading: true };

  componentDidMount() {
    this.getDataFromLocalStorage();
  }

  getDataFromLocalStorage = () => {
    const data = localStorage.getItem("JsonData");

    this.setState({ data: JSON.parse(data), isLoading: false });
  };

   renderLoader = () => (
    <div className="auth-inner">
      <div testid="loader" className="loader-container">
        <Loader type="Oval" color="#1c8ef9" height={80} width={80} />
      </div>
    </div>
  ); 

  renderJsonData = () => {
    const { data } = this.state;
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

            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto ">
                
              </ul>
            </div>
          </div>
        </nav>
        <div className="Data-Display">
          {data.map((eachUser) => (
            <Data key={eachUser.id} userDetails={eachUser} />
          ))}
        </div>
      </>
    );
  };

  render() {
    const { isLoading } = this.state;
    return (
      <div className="auth-wrapper">
        {isLoading ? this.renderLoader() : this.renderJsonData()}
      </div>
    );
  }
}

export default DisplayData;