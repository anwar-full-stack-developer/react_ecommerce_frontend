import React from "react";
// import pp1 from "./../../assets/images/1.jpg";
// import pp2_1 from "./../../assets/images/2_1.jpg";
// import pp3 from "./../../assets/images/3.jpg";
// import pp4 from "./../../assets/images/4.jpg";
import pp5 from "./../../assets/images/5.jpg";
import pp6 from "./../../assets/images/6.jpg";
import pp7 from "./../../assets/images/7.jpg";
import pp9 from "./../../assets/images/9.jpg";



class HomeRecomendedProducts extends React.Component {
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
            <h3 className="section-title">Recommended products</h3>
          </header>

          <div className="row">
            <div className="col-md-3">
              <div href="#" className="card card-product-grid">
                <a href="#/page-index-2.html#" className="img-wrap">
                  <img src={pp5} />
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
                  <img src={pp6} />
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
                  <img src={pp7} />
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
                  <img src={pp9} />
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

export default HomeRecomendedProducts;
