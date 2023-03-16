import React from 'react';

export function NSThanks() {
  return (
    <div className="authentication-thankyou-bg">
      <img src="Assets/authentication-product-background.png" width="100%" alt="background" />
      <div className="authentication-thankyou-container">
        <div className="authentication-product__backsection">
          <p className="authentication-product__backsection-icon"><a href="/"><img src="Assets/consumer-arrow-s1.png" width="20px" alt="backsection" /></a></p>
          <h3 className="authentication-product__backsection-content">CONSUMER PROTECTION</h3>
        </div>
        <img src="Assets/S4-scan-icon.png" alt="Product Scan" />
        <h3 className="authentication-thankyou-title">Thank you</h3>
        <p className="authentication-thankyou-desc">We've started the investigation on this product.</p>
        <a className="form-skip" href="/">Home
        </a>
      </div>
    </div>
  );
}