import React from "react";
export const AlertSuccess = function (props) {
  const alert =
    props?.show ? (
      <div className="alert alert-success">
        {props?.message}
        {props?.children}
      </div>
    ) : (
      ""
    );
  return alert;
};

export class AlertDanger extends React.Component {
  render() {
    const alert =
      (this.props?.show) ? (
        <div className="alert alert-danger">
        {this.props?.message}
        {this.props?.children}
        </div>
      ) : (
        ""
      );
    return alert;
  }
}
