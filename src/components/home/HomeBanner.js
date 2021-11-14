import React from "react";import banner1 from './../../assets/images/2.jpg';



class HomeBanner extends React.Component {
  render() {
    return (
      <section className="section-main bg padding-y">
      <div className="container">
        <div className="row">
          <aside className="col-md-3">
            <nav className="card">
              <ul className="menu-category">
                <li>
                  <a href="#/page-index-2.html#">Best clothes</a>
                </li>
                <li>
                  <a href="#/page-index-2.html#">Automobiles</a>
                </li>
                <li>
                  <a href="#/page-index-2.html#">Home interior</a>
                </li>
                <li>
                  <a href="#/page-index-2.html#">Electronics</a>
                </li>
                <li>
                  <a href="#/page-index-2.html#">Technologies</a>
                </li>
                <li>
                  <a href="#/page-index-2.html#">Digital goods</a>
                </li>
                <li className="has-submenu">
                  <a href="#/page-index-2.html#">More items</a>
                  <ul className="submenu">
                    <li>
                      <a href="#/page-index-2.html#">Submenu name</a>
                    </li>
                    <li>
                      <a href="#/page-index-2.html#">Great submenu</a>
                    </li>
                    <li>
                      <a href="#/page-index-2.html#">Another menu</a>
                    </li>
                    <li>
                      <a href="#/page-index-2.html#">Some others</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </aside>
          <div className="col-md-9">
            <article className="banner-wrap">
              <img src={banner1} className="w-100 rounded" />
            </article>
          </div>
        </div>
      </div>
    </section>
    );
  }
}

export default HomeBanner;
