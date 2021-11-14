import React from "react";

class HomeFeature extends React.Component {
  render() {
    return (
      <section className="section-content padding-y-sm">
        <div className="container">
          <article className="card card-body">
            <div className="row">
              <div className="col-md-4">
                <figure className="item-feature">
                  <span className="text-primary">
                    <i className="fa fa-2x fa-truck"></i>
                  </span>
                  <figcaption className="pt-3">
                    <h5 className="title">Fast delivery</h5>
                    <p>
                      Dolor sit amet, consectetur adipisicing elit, sed do
                      eiusmod tempor incididunt ut labore
                    </p>
                  </figcaption>
                </figure>
              </div>
              <div className="col-md-4">
                <figure className="item-feature">
                  <span className="text-primary">
                    <i className="fa fa-2x fa-landmark"></i>
                  </span>
                  <figcaption className="pt-3">
                    <h5 className="title">Creative Strategy</h5>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod
                    </p>
                  </figcaption>
                </figure>
              </div>
              <div className="col-md-4">
                <figure className="item-feature">
                  <span className="text-primary">
                    <i className="fa fa-2x fa-lock"></i>
                  </span>
                  <figcaption className="pt-3">
                    <h5 className="title">High secured </h5>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod
                    </p>
                  </figcaption>
                </figure>
              </div>
            </div>
          </article>
        </div>
      </section>
    );
  }
}

export default HomeFeature;
