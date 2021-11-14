import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import logo from "./../../assets/images/logo.png";

class Header extends React.Component {
  render() {
    //update this component from another component using connect to redux store
    const {isLoggedin} = this.props.loggedinUserReducer;
    const user = this.props?.loggedinUserReducer?.result;
    console.log(
      "Auth reducer from Header component ",
      this.props.loggedinUserReducer
    );
    return (
      <header className="section-header">
        <section className="header-main border-bottom">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-2 col-4">
                <Link to="/" className="brand-wrap">
                  <img alt="logo" className="logo" src={logo} />
                </Link>
              </div>
              <div className="col-lg-6 col-sm-12">
                <form action="#/page-index-2.html#" className="search">
                  <div className="input-group w-100">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="submit">
                        <i className="fa fa-search"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-lg-4 col-sm-6 col-12">
                <div className="widgets-wrap float-md-right">
                  <div className="widget-header mr-3">
                    <Link
                      to="/shopping-cart"
                      className="icon icon-sm rounded-circle border"
                    >
                      <i className="fa fa-shopping-cart"></i>
                    </Link>
                    <span className="badge badge-pill badge-danger notify">0</span>
                  </div>
                  <div className="widget-header icontext">
                    <Link
                      to="/myaccount"
                      className="icon icon-sm rounded-circle border bg-primary"
                    >
                      <i className="fa fa-user white"></i>
                    </Link>
                    <div className="text">
                      <span className="text-muted">{user?.first_name ? " ".concat(user?.first_name) : "Welcome!"}</span>
                      <div>
                        {!isLoggedin? (
                          <>
                            <Link to="/login">Sign in</Link>
                            <span> | </span>
                            <Link to="/register">Register</Link>
                          </>
                        ) : (
                          <>
                            <Link to="/logout">Logout</Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </header>
    );
  }
}

//state mas from redux store, based on initial state
const mapStateToProps = (state) => {
  const { authReducer, loggedinUserReducer } = state;
  return { authReducer, loggedinUserReducer };
};

//[dispatch first way] works from all expects
// const mapDispatchToProps = {
//   // dispatch,
//   authAction: userActions.login,
//   // logout: userActions.logout
// };

//[dispatch secound way] works from all expexts
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const connectedLogin = connect(mapStateToProps, mapDispatchToProps)(Header);
export { connectedLogin as Header };
// export default Header;
