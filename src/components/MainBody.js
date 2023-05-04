import React from "react";
import { Link } from "react-router-dom";
export default function MainBody() {
  return (
    <div >
      
      <div className="mapouter">
      <nav className="navbar navbar-expand-lg  " style={{ height: "7vh" ,}}>
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-center "
            id="navbarSupportedContent"
            style={{  }}
          >
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{ width: "10cm" }}
              />
              <Link className="nav-link" to="/SearchParking">
                <button className="btn btn-outline-info" type="submit">
                  Search
                </button>
              </Link>
            </form>
          </div>
        </div>
      </nav>
        <div className="gmap_canvas">
          <iframe
            className="gmap_iframe"
            width="100%"
            frameBorder={0}
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            title="current location"
            src="https://maps.google.com/maps?width=600&height=637&hl=en&q=college of engineering and management ,&t=&z=20&ie=UTF8&iwloc=B&output=embed"
          />
          <a href="https://pdflist.com/" alt="pdf download">
            Pdf download
          </a>
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html:
              ".mapouter{position:relative;text-align:right;width:100%;height:637px;}.gmap_canvas {overflow:hidden;background:none!important;width:100%;height:637px;}.gmap_iframe {height:637px!important;}",
          }}
        />
      </div>
    </div>
  );
}
