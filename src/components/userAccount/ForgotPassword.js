import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { defaultMeta } from "../../config/config";
import { authAction } from "../../actions/auth.action";
import LoadingBox from "../utils/LoadingBox";
import { Helmet } from "react-helmet";

/**
 * @module userAccount
 * @component ForgotPassword
 */
class ForgotPassword extends React.Component {
  /**
   * TItle and meta configuration, SEO config
   */
  meta = {
    ...defaultMeta,
    title: "Forgot password",
    meta: [
      {
        name: "description",
        content: "Make a request for forgot password",
      },
    ],
  };

  initialState = {
    user: {
      email: "",
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
   * Handel submit forgot password form, form validation, dispatch forgot password action
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
    await props.forgotPasswordHandleSubmit(user);
  };
  /**
   * Forgot password from
   * @method render
   * @returns - Return jsx templete
   */
  render() {
    const { user } = this.state;
    const { error, loading, result } = this.props.forgotPasswordReducer;
    return (
      <>
      <Helmet {...this.headMeta}></Helmet>
        <section class="section-conten padding-y">
          <div class="row">
            <div class="col-md-4"></div>
            <div class="col-md-4">
              <div class="card mx-auto">
                <div class="card-body">
                  <h4 class="card-title mb-4">
                    Forgot Password
                    {loading ? <LoadingBox height="50px"></LoadingBox> : ""}
                  </h4>
                  <form onSubmit={this.handelSubmit}>
                    {error?.unknown ? (
                      <div className="alert alert-danger">
                        {error.unknown.message}
                      </div>
                    ) : (
                      ""
                    )}

                    {result?.message ? (
                      <div className="alert alert-success">
                        {result.message}
                      </div>
                    ) : (
                      ""
                    )}
                    <div class="form-group">
                      <input
                        class="form-control"
                        placeholder="Email"
                        type="text"
                        name="email"
                        defaultValue={user.email}
                        onChange={this.handelChange}
                      />
                      {error?.email ? (
                        <div class="invalid-feedback text-right text-uppercase show">
                          {error?.email?.message}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div class="form-group">
                      <div class="float-right">
                        <Link to="/register">Register</Link>
                        <span> | </span>
                        <Link to="/login">Sign in</Link>
                      </div>
                    </div>
                    <div class="form-group">
                      <button type="submit" class="btn btn-primary btn-block">
                        {" "}
                        Login{" "}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <p class="text-center mt-4">
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
  const { forgotPasswordReducer } = state;
  return { forgotPasswordReducer };
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
  forgotPasswordHandleSubmit: (requestData) =>
    dispatch(authAction.forgotPasswordHandleSubmit(requestData)),
});

const connectedForgotPassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);
export { connectedForgotPassword as ForgotPassword };
