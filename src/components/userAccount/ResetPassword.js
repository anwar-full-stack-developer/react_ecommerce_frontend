import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { defaultMeta } from "../../config/config";
import { authAction } from "../../actions/auth.action";
import LoadingBox from "../utils/LoadingBox";
import { AlertDanger, AlertSuccess } from "../utils/Alert";
import { FeedbackInvalid } from "../utils/Feedback";
import { Helmet } from "react-helmet";

/**
 * @module userAccount
 * @component ResetPassword
 */
class ResetPassword extends React.Component {
  /**
   * TItle and meta configuration, SEO config
   */
  meta = {
    ...defaultMeta,
    title: "Reset password",
    meta: [
      {
        name: "description",
        content: "Reset password using token",
      },
    ],
  };
  initialState = {
    user: {
      password_reset_token: "",
      password: "",
      confirm_password: "",
    },
    error: {},
    isSubmite: false,
  };

  constructor(props) {
    super(props);
    this.state = { ...this.initialState };
    this.handelChange = this.handelChange.bind(this);
    this.handelSubmit = this.handelSubmit.bind(this);
  }
  /**
   * keep a record of input value change during form change
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
   * Handel submit reset password form, form validation, dispatch reset password action
   * @method handelSubmit
   * @param {*} event - Javascript dom event
   */
  handelSubmit = async (e) => {
    e.preventDefault();
    const { isSubmite, user } = this.state;
    const props = this.props;
    this.setState({
      isSubmite: !isSubmite,
    });
    await props.resetPasswordHandleSubmit(user);

    this.setState({
      isSubmite: !isSubmite,
    });
  };
  /**
   * Call every time when user comes into this page.
   * Update requested password reset token into state {user}
   * @async
   * @method componentDidMount
   */
  componentDidMount = async () => {
    //check password reset token is valid or invalid, on landing reset password page
    // console.log("componentDidMount");
    const { token } = this.props.match.params;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        password_reset_token: token,
      },
    });
  };
  componentDidUpdate = async () => {
    //call always when anything change in component
    // console.log("componentDidUpdate");
  };
  /**
   * Forgot password from
   * @template
   * @method render
   * @returns - Return jsx templete
   */
  render() {
    const { user } = this.state;
    const { error, loading, result } = this.props.resetPasswordReducer;
    if (result) {
      setTimeout(() => this.props.history.push("/login"), 3000);
    }
    return (
      <>
        <Helmet {...this.headMeta}></Helmet>
        <section className="section-conten padding-y">
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <div className="card mx-auto">
                <div className="card-body">
                  <h4 className="card-title mb-4">
                    Reset Password
                    {loading ? <LoadingBox height="50px"></LoadingBox> : ""}
                  </h4>

                  <AlertDanger
                    show={error?.unknown}
                    message={error?.unknown?.message}
                  />
                  <AlertDanger
                    show={error?.password_reset_token}
                    message={error?.password_reset_token?.message}
                  />
                  <AlertSuccess
                    show={result?.message}
                    message="Password reset successful. will be redirected to Login page in 3 secounds "
                  />

                  {!error?.password_reset_token && (
                    <form onSubmit={this.handelSubmit}>
                      <div className="form-group">
                        <input
                          className="form-control"
                          placeholder="Password"
                          type="password"
                          name="password"
                          defaultValue={user.password}
                          onChange={this.handelChange}
                        />

                        <FeedbackInvalid
                          show={error?.password}
                          message={error?.password?.message}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          className="form-control"
                          placeholder="Confirm password"
                          type="password"
                          name="confirm_password"
                          defaultValue={user.confirm_password}
                          onChange={this.handelChange}
                        />
                        <FeedbackInvalid
                          show={error?.confirm_password}
                          message={error?.confirm_password?.message}
                        />
                      </div>

                      <div className="form-group">
                        <div className="float-right">
                          <Link to="/register">Register</Link>
                          <span> | </span>
                          <Link to="/login">Sign in</Link>
                        </div>
                      </div>
                      <div className="form-group">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          {" "}
                          Login{" "}
                        </button>
                      </div>
                    </form>
                  )}
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

//state maps from redux store with initial state
const mapStateToProps = (state) => {
  const { resetPasswordReducer } = state;
  return { resetPasswordReducer };
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
  resetPasswordHandleSubmit: (requestData) =>
    dispatch(authAction.resetPasswordHandleSubmit(requestData)),
});

const connectedResetPassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ResetPassword));
export { connectedResetPassword as ResetPassword };
