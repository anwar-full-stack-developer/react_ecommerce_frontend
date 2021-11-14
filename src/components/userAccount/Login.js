import React from "react";
import { Redirect, withRouter } from "react-router";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { defaultMeta } from "../../config/config";
import LoadingBox from "./../utils/LoadingBox";
import { authAction } from "../../actions/auth.action";
import { Helmet } from "react-helmet";

/**
 * @module userAccount
 * @component Login
 */
class Login extends React.Component {
  /**
   * TItle and meta configuration, SEO config
   */
  meta = {
    ...defaultMeta,
    title: "Login",
    meta: [
      {
        name: "description",
        content: "User logn to existing account",
      },
    ],
  };

  initialState = {
    user: {
      email: "",
      password: "",
      rememberme: false,
    },
    isSubmite: false,
  };

  constructor(props) {
    super(props);
    this.state = { ...this.initialState };
    this.handelChange = this.handelChange.bind(this);
    this.handelChangeRememberme = this.handelChangeRememberme.bind(this);
    this.handelSubmit = this.handelSubmit.bind(this);
  }
  /**
   * keep record input value change during form change
   * @method handelChange
   * @param {*} event - Javascript dom event
   */
  handelChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  };
  /**
   * keep record input value change during form change of Bollean value
   * @method handelChangeRememberme
   * @param {*} event - Javascript dom event
   */
  handelChangeRememberme = (e) => {
    e.preventDefault();
    const { name } = e.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: !user.rememberme,
      },
    });
  };
  /**
   * Handel login form submit, form validation, dispatch login action
   * @method handelSubmit
   * @param {*} event - Javascript dom event
   */
  handelSubmit = async (e) => {
    e.preventDefault();
    // const { dispatch } = this.props;
    const { isSubmite, user } = this.state;
    const props = this.props;
    this.setState({
      isSubmite: !isSubmite,
    });
    await props.loginHandleSubmitAction(user);
  };
  /**
   * Login from
   * @method render
   * @returns - Return jsx templete
   */
  render() {
    const { user } = this.state;
    const { error, loading } = this.props.loginReducer;
    const { isLoggedin } = this.props.loggedinUserReducer;
    return (
      <>
        {isLoggedin ? <Redirect to="/myaccount" /> : ""}
        <Helmet {...this.headMeta}></Helmet>
        <section className="section-conten padding-y">
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <div className="card mx-auto">
                <div className="card-body">
                  <h4 className="card-title mb-4">
                    Sign in
                    {loading ? <LoadingBox height="50px"></LoadingBox> : ""}
                  </h4>
                  {isLoggedin ? (
                    <div className="alert alert-success">
                      You succesfully loggedin. You will be redirected in 3
                      secound
                    </div>
                  ) : (
                    ""
                  )}
                  <form onSubmit={this.handelSubmit}>
                    {error?.unknown ? (
                      <div className="alert alert-danger">
                        {error.unknown.message}
                      </div>
                    ) : (
                      ""
                    )}
                    <div>*** Social login did not implemented</div>
                    <Link
                      to="/forgot-password"
                      className="btn btn-facebook btn-block mb-2"
                    >
                      {" "}
                      <i className="fab fa-facebook-f"></i> &nbsp; Sign in with
                      Facebook
                    </Link>
                    <Link
                      to="/forgot-password"
                      className="btn btn-google btn-block mb-4"
                    >
                      {" "}
                      <i className="fab fa-google"></i> &nbsp; Sign in with
                      Google
                    </Link>
                    <div>
                      {loading ? <LoadingBox height="50px"></LoadingBox> : ""}
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        placeholder="Email"
                        type="text"
                        name="email"
                        defaultValue={user.email}
                        onChange={this.handelChange}
                      />
                      {error?.email ? (
                        <div className="invalid-feedback text-right text-uppercase show">
                          {error?.email?.message}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        placeholder="Password"
                        type="password"
                        name="password"
                        defaultValue={user.password}
                        onChange={this.handelChange}
                      />
                      {error?.password ? (
                        <div className="invalid-feedback text-right text-uppercase show">
                          {error?.password?.message}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="form-group">
                      <Link to="/forgot-password" className="float-right">
                        Forgot password?
                      </Link>
                      <label className="float-left custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          defaultChecked={user.rememberme}
                          onChange={this.handelChageRememberme}
                        />
                        <div className="custom-control-label"> Remember </div>
                      </label>
                    </div>
                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={loading ? true : false}
                      >
                        {" "}
                        Login{" "}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <p className="text-center mt-4">
                Don't have account? <Link to="/register">Sign up</Link>
              </p>
              <br />
              <br />
            </div>
          </div>
        </section>
      </>
    );
  }
}

//state mas from redux store, based on initial state
const mapStateToProps = (state) => {
  const { loginReducer, loggedinUserReducer } = state;
  return { loginReducer, loggedinUserReducer };
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
  loginHandleSubmitAction: (requestData) =>
    dispatch(authAction.loginHandleSubmit(requestData)),
  getLoggedInUserAction: () => dispatch(authAction.getLoggedInUser()),
});

const connectedLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
export { connectedLogin as Login };
