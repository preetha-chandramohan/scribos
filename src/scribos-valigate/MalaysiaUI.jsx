import * as React from "react";
import "./Scribos.css";


export const MalaysiaUI = ({ result }) => {
  return (
    <div className="authentication-product-bg">
      <img src="Assets/authentication-product-background.png" width="100%" height="1400px" alt="background"/>
      <div className="authentication-product-container">
        <div className="authentication-product__backsection">
          <p className="authentication-product__backsection-icon"><a href="/"><img src="Assets/consumer-arrow-s1.png" width="20px" alt="backsection"/></a></p>
          <h3 className="authentication-product__backsection-content">CONSUMER PROTECTION</h3>
        </div>
        <img src={`data:image/jpeg;base64,${result.rfxcel_product_image.values[0].value}`} alt="Production Date Icon" width="100%" />
        <h2 className="authentication-product__name">{result.rfxcel_product_name.values[0].value}</h2>
        <p className="authentication-product__static-desc">Authentic product label</p>
        <div className="authentication-product__info">
          <p className="authentication-product__icon"><img src="Assets/production-icon.png" alt="production icon"/></p>
          <div className="authentication-product__details">
            <p className="authentication-product__title">Production Date</p>
            <h3 className="authentication-product__value">{result.rfxcel_mfg_date.values[0].value}</h3>
          </div>
        </div>
        <div className="authentication-product__info">
          <p className="authentication-product__icon"><img src="Assets/batch-icon.png" alt="Batch No Icon" /></p>
          <div className="authentication-product__details">
            <p className="authentication-product__title">Batch No</p>
            <h3 className="authentication-product__value">{result.rfxcel_lot_id.values[0].value}</h3>
          </div>
        </div>
        <div className="authentication-product__info">
          <p className="authentication-product__icon"><img src="Assets/expiration-icon.png" alt="Expiration Date Icon" /></p>
          <div className="authentication-product__details">
            <p className="authentication-product__title">Expiration Date</p>
            <h3 className="authentication-product__value">{result.rfxcel_expiry_date.values[0].value}</h3>
          </div>
        </div>
        <div className="authentication-product__info">
          <p className="authentication-product__icon"><img src="Assets/factory-icon.png" alt="Factory Icon" /></p>
          <div className="authentication-product__details">
            <p className="authentication-product__title">Factory</p>
            <h3 className="authentication-product__value">{result.rfxcel_mfg_loc_name.values[0].value}</h3>
          </div>
        </div>
        <img className="authentication-product__factory-image" src="Assets/Chonburi, TH.jpg" alt="Manufacture Factory" width="500" />
        <div className="authentication-product__scan-process">
          <img className="authentication-product__scan-logo" src="Assets/authentication-scan.png" alt="Product Scan" />
          <h3 className="authentication-product__scan-title">Authentication system</h3>
          <p className="authentication-product__scan-desc">Our authentication system is patented and the QR Code is unique
            and cannot be duplicated. Any attempt to
            duplicate the Qa code can be traced.
          </p>
          <div className="authentication-product__scan-button">
            <a className="authentication-product__scan-button-style" href="/">Scan another Product
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
