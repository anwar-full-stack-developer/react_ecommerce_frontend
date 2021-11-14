import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { authAction } from "../../actions/auth.action";

/**
 * @module userAccount
 * @component Logout
 */
class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.handelLogout = this.handelLogout.bind(this);
  }
  /**
   * Logout current logged user
   */
  handelLogout = async () => {
    try {
      await this.props.logoutAction(this.props.dispatch);
    } catch (eror) {}
  };

  /**
   * Call every time on mount component
   */
  componentDidMount = async () => {
    await this.handelLogout();
    setTimeout(() => this.props.history.push("/"), 3000);
  };
  render() {
    return <></>;
  }
}

//state map from redux store, based on initial state
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
  logoutAction: () => dispatch(authAction.logout(dispatch)),
});
// const mapDispatchToProps = {
//   logoutAction: authAction.logout,
// };

const connectedLogout = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Logout));
export { connectedLogout as Logout };
