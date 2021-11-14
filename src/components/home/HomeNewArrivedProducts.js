import React from "react";
import pp1 from "./../../assets/images/1.jpg";
import pp2_1 from "./../../assets/images/2_1.jpg";
import pp3 from "./../../assets/images/3.jpg";
import pp4 from "./../../assets/images/4.jpg";



class HomeNewArrivedProducts extends React.Component {
  render() {
    return (
      <section className="section-name padding-y-sm">
        <div className="container">
          <header className="section-heading">
            <a
              href="#/page-index-2.html#"
              className="btn btn-outline-primary float-right"
            >
              See all
            </a>
            <h3 className="section-title">New Arrived</h3>
          </header>

          <div className="row">
            <div className="col-md-3">
              <div href="#" className="card card-product-grid">
                <a href="#/page-index-2.html#" className="img-wrap">
                  <img src={pp1} />
                </a>
                <figcaption className="info-wrap">
                  <a href="#/page-index-2.html#" className="title">
                    Just another product name
                  </a>
                  <div className="price mt-1">$179.00</div>
                </figcaption>
              </div>
            </div>
            <div className="col-md-3">
              <div href="#" className="card card-product-grid">
                <a href="#/page-index-2.html#" className="img-wrap">
                  <img src={pp2_1} />
                </a>
                <figcaption className="info-wrap">
                  <a href="#/page-index-2.html#" className="title">
                    Some item name here
                  </a>
                  <div className="price mt-1">$280.00</div>
                </figcaption>
              </div>
            </div>
            <div className="col-md-3">
              <div href="#" className="card card-product-grid">
                <a href="#/page-index-2.html#" className="img-wrap">
                  <img src={pp3} />
                </a>
                <figcaption className="info-wrap">
                  <a href="#/page-index-2.html#" className="title">
                    Great product name here
                  </a>
                  <div className="price mt-1">$56.00</div>
                </figcaption>
              </div>
            </div>
            <div className="col-md-3">
              <div href="#" className="card card-product-grid">
                <a href="#/page-index-2.html#" className="img-wrap">
                  <img src={pp4} />
                </a>
                <figcaption className="info-wrap">
                  <a href="#/page-index-2.html#" className="title">
                    Just another product name
                  </a>
                  <div className="price mt-1">$179.00</div>
                </figcaption>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default HomeNewArrivedProducts;
