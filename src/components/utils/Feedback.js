import React from "react";

export class FeedbackInvalid extends React.Component {
  render() {
    const feedback =
      (this.props?.show) ? (
        <div className="invalid-feedback text-right text-uppercase show">
          {this.props?.message}
          {this.props.children}
        </div>
      ) : (
        ""
      );
    return feedback;
  }
}
