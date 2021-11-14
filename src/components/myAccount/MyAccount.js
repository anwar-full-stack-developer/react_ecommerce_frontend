import React from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router';


class MyAccount extends React.Component {
  render() {
    return (
      <>
      <Redirect to='/myaccount-order-history' />
      </>
    );
  }
}

//state mas from redux store, based on initial state
const mapStateToProps = (state) => {
  const { authReducer } = state;
  return { authReducer };
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

const connectedMyAccount = connect(mapStateToProps, mapDispatchToProps)(MyAccount);
export { connectedMyAccount as MyAccount };
