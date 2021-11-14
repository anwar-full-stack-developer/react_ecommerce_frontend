// import { event } from "jquery";
import React from "react";
import { withRouter } from "react-router";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { defaultMeta } from "../../config/config";
import { authAction } from "../../actions/auth.action";
import LoadingBox from "../utils/LoadingBox";
import { AlertDanger, AlertSuccess } from "../utils/Alert";
import { FeedbackInvalid } from "../utils/Feedback";
// import { bindActionCreators } from "redux";
// import { listProducts } from "../../actions/productActions";

/**
 * @module userAccount
 * @component Register
 */
class Register extends React.Component {
  /**
   * TItle and meta configuration, SEO config
   */
  meta = {
    ...defaultMeta,
    title: "Registration",
    meta: [
      {
        name: "description",
        content: "User registration for new account",
      },
    ],
  };

  initialState = {
    user: {
      user_type: "BothBuyerAndSeller",
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      gender: "Male",
      city: "",
      country: "",
      street: "",
      password: "",
      confirm_password: "",
      tnc: false,
    },
    submitted: false,
  };

  constructor(props) {
    super(props);
    this.state = { ...this.initialState };

    this.handleChange = this.handleChange.bind(this);
    this.setCheckedUserType = this.setCheckedUserType.bind(this);
    this.setCheckedGender = this.setCheckedGender.bind(this);
    this.setCheckedTnc = this.setCheckedTnc.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /**
   * keep record input value change during form change
   * @method handleChange
   * @param {*} event - Javascript dom event
   */
  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }
  setCheckedUserType(user_type) {
    return this.state.user.user_type === user_type ? true : false;
  }
  setCheckedGender(value) {
    return this.state.user.gender === value ? true : false;
  }

  setCheckedTnc() {
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        tnc: !user.tnc,
      },
    });
  }
  /**
   * Handel registration form submit to create a new account
   * @method handleSubmit
   * @param {*} event - Javascript dom event
   */
  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ submitted: true });
    console.log(this.state.user);
    await this.props.handleSubmit({ ...this.state.user });
    this.setState({ submitted: false });
  };
  /**
   * User registration from
   * @returns - Return jsx templete
   */
  render() {
    const { user } = this.state;
    const { error, loading, result } = this.props.registerReducer;

    return (
      <>
        <Helmet {...this.headMeta}>
          <link rel="canonical" href="/" />
        </Helmet>
        <section className="section-content padding-y">
          <div className="container">
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <div className="card">
                  <article className="card-body">
                    <header className="mb-4">
                      <h4 className="card-title">
                        Sign up
                        {loading ? <LoadingBox height="50px"></LoadingBox> : ""}
                      </h4>
                    </header>
                    <AlertDanger
                      show={error?.unknown}
                      message={error?.unknown?.message}
                    />
                    <AlertSuccess
                      show={result?.message}
                      message="User registration successful "
                    />
                    <form
                      className="block-register"
                      onSubmit={this.handleSubmit}
                    >
                      <div className="form-group form-row">
                        <label className="col-md-3 col-form-label">
                          I am a
                        </label>
                        <div className="col-sm-9 pt-1">
                          <label className="custom-control custom-radio custom-control-inline">
                            <input
                              className="custom-control-input"
                              type="radio"
                              name="user_type"
                              value="Buyer"
                              onChange={this.handleChange}
                              defaultChecked={this.setCheckedUserType("Buyer")}
                            />
                            <span className="custom-control-label">
                              {" "}
                              Buyer{" "}
                            </span>
                          </label>
                          <label className="custom-control custom-radio custom-control-inline">
                            <input
                              className="custom-control-input"
                              type="radio"
                              name="user_type"
                              value="Seller"
                              onChange={this.handleChange}
                              defaultChecked={this.setCheckedUserType("Seller")}
                            />
                            <span className="custom-control-label">
                              {" "}
                              Seller{" "}
                            </span>
                          </label>
                          <label className="custom-control custom-radio custom-control-inline">
                            <input
                              className="custom-control-input"
                              type="radio"
                              name="user_type"
                              value="BothBuyerAndSeller"
                              onChange={this.handleChange}
                              defaultChecked={this.setCheckedUserType(
                                "BothBuyerAndSeller"
                              )}
                            />
                            <span className="custom-control-label">
                              {" "}
                              Both Buyer and Seller{" "}
                            </span>
                          </label>
                          <label className="custom-control custom-radio custom-control-inline">
                            <input
                              className="custom-control-input"
                              type="radio"
                              name="user_type"
                              value="Company"
                              onChange={this.handleChange}
                              defaultChecked={this.setCheckedUserType(
                                "Company"
                              )}
                            />
                            <span className="custom-control-label">
                              {" "}
                              Company{" "}
                            </span>
                          </label>
                          <FeedbackInvalid
                            show={error?.user_type}
                            message={error?.user_type?.message}
                          />
                        </div>
                      </div>
                      <div className="form-group form-row">
                        <label className="col-md-3 col-form-label">
                          Full name
                        </label>
                        <div className="col">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="First name"
                            name="first_name"
                            onChange={this.handleChange}
                            defaultValue={user.first_name}
                          />
                          <FeedbackInvalid
                            show={error?.first_name}
                            message={error?.first_name?.message}
                          />
                        </div>
                        <div className="col">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Last name"
                            name="last_name"
                            onChange={this.handleChange}
                            defaultValue={user.last_name}
                          />
                        </div>
                      </div>

                      <div className="form-group form-row">
                        <label className="col-md-3 col-form-label">Phone</label>
                        <div className="col-9">
                          <div className="input-group">
                            <select className="custom-select">
                              <option selected="">UZ +971</option>
                              <option value="1">AE +971</option>
                              <option value="2">US +1</option>
                              <option value="3">RU +7</option>
                            </select>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Phone number"
                              name="phone_number"
                              onChange={this.handleChange}
                              value={user.phone_number}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-group form-row">
                        <label className="col-md-3 col-form-label">Email</label>
                        <div className="col-sm-9">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Ex. john@gmail.com"
                            name="email"
                            onChange={this.handleChange}
                            value={user.email}
                          />
                          <FeedbackInvalid
                            show={error?.email}
                            message={error?.email?.message}
                          />
                        </div>
                      </div>

                      <div className="form-group form-row">
                        <label className="col-md-3 col-form-label">
                          Gender
                        </label>
                        <div className="col-sm-9 pt-2">
                          <label className="custom-control custom-radio custom-control-inline">
                            <input
                              className="custom-control-input"
                              type="radio"
                              name="gender"
                              value="Male"
                              onChange={this.handleChange}
                              defaultChecked={this.setCheckedGender("Male")}
                            />
                            <span className="custom-control-label"> Male </span>
                          </label>
                          <label className="custom-control custom-radio custom-control-inline">
                            <input
                              className="custom-control-input"
                              type="radio"
                              name="gender"
                              value="Female"
                              onChange={this.handleChange}
                              defaultChecked={this.setCheckedGender("Female")}
                            />
                            <span className="custom-control-label">
                              {" "}
                              Female{" "}
                            </span>
                          </label>
                          <label className="custom-control custom-radio custom-control-inline">
                            <input
                              className="custom-control-input"
                              type="radio"
                              name="gender"
                              value="Other"
                              onChange={this.handleChange}
                              defaultChecked={this.setCheckedGender("Other")}
                            />
                            <span className="custom-control-label">
                              {" "}
                              Other{" "}
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="form-group form-row">
                        <label className="col-md-3 col-form-label">
                          Address
                        </label>
                        <div className="col">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="City"
                            name="city"
                            value={user.city}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="col">
                          <select
                            className="custom-select form-control"
                            name="country"
                            value={user.country}
                            onChange={this.handleChange}
                          >
                            <option>Country</option>
                            <option>United states</option>
                            <option>Germany</option>
                            <option>Canada</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group form-row">
                        <label className="col-md-3"> </label>
                        <div className="col">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Street, Building"
                            name="street"
                            value={user.street}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>

                      <div className="form-group form-row">
                        <label className="col-md-3 col-form-label">
                          Password
                        </label>
                        <div className="col-6">
                          <input
                            type="password"
                            className="form-control mb-3"
                            placeholder="Password"
                            name="password"
                            value={user.password}
                            onChange={this.handleChange}
                          />
                          <FeedbackInvalid
                            show={error?.password}
                            message={error?.password?.message}
                          />
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm password"
                            name="confirm_password"
                            value={user.confirm_password}
                            onChange={this.handleChange}
                          />
                          <FeedbackInvalid
                            show={error?.confirm_password}
                            message={error?.confirm_password?.message}
                          />
                        </div>
                      </div>

                      <div className="form-group form-row">
                        <div className="col-sm-9 offset-sm-3">
                          <label className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck1"
                              name="tnc"
                              onChange={this.setCheckedTnc}
                              defaultChecked={user.tnc === true ? true : false}
                            />
                            <div className="custom-control-label">
                              I agree with{" "}
                              <Link href="/tnc" target="_blank">
                                terms and conditions
                              </Link>
                            </div>

                            <FeedbackInvalid
                              show={error?.tnc}
                              message={error?.tnc?.message}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="form-row mb-2">
                        <div className="col-sm-9 offset-sm-3">
                          <button type="submit" className="btn btn-primary">
                            Register
                          </button>
                        </div>
                      </div>
                    </form>
                  </article>
                  <div className="card-footer text-center">
                    Have an account? <Link to="/login">Log In</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

//state maps from redux store, based on initial state
const mapStateToProps = (state) => {
  const { registerReducer } = state;
  return { registerReducer };
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
  handleSubmit: (requestData) =>
    dispatch(authAction.registerHandleSubmit(requestData)),
});

const connectedRegister = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
export { connectedRegister as Register };
