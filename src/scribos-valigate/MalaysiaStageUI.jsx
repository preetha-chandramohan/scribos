import * as React from "react";
import "./Scribos.css";

export const MalaysiaStageUI = ({ result }) => {
    return (
        <div className="authentication-productstages-bg">
            <img src="Assets/Product-upgrade-stages-bg.jpg" width="100%" height="1100px" alt="background" />
            <div className="authentication-productstages-container">
                <div className="authentication-product__backsection-stage">
                    <p className="authentication-product__backsection-icon-stage">
                        <a href="/"><img src="Assets/consumer-arrow-s3.png" width="30px" alt="backsection" /></a>
                    </p>
                </div>
                <div className="authentication-productstages__scan-process">
                    <img className="authentication-productstages__scan-logo" src="Assets/S4-scan-icon.png" alt="Product Scan" />
                    <h3 className="authentication-productstages__scan-title">Authentication system</h3>
                    <p className="authentication-productstages__scan-desc">
                        Our authentication system is patented and the QR Code is unique and cannot be duplicated. Any attempt to duplicate the QR code can be traced.
                    </p>
                </div>
                <div className="authentication-productstages__header">
                    <div className="authentication-productstages__header-content">
                        <h3 className="authentication-productstages__name">{result.rfxcel_product_name.values[0].value}</h3>
                        <p className="authentication-productstages__static-desc">Authentic product label</p>
                    </div>
                    <div className="authentication-productstages__header-packshot">
                        <img className="authentication-productstages__packshoticon" src={`data:image/jpeg;base64,${result.rfxcel_product_image.values[0].value}`} alt="Product packshot" />
                    </div>
                </div>
                <div className="authentication-product__timeline">
                    <div className="authentication-product__container left one">
                        <div className="authentication-productstage__content">
                            <p className="authentication-productstage__title">Production Date</p>
                            <h3 className="authentication-productstage__value">
                                {result.rfxcel_mfg_date.values[0].value}
                            </h3>
                        </div>
                    </div>
                    <div className="authentication-product__container right one">
                        <div className="authentication-productstage__content">
                            <p className="authentication-productstage__title">Batch No</p>
                            <h3 className="authentication-productstage__value">
                                {result.rfxcel_lot_id.values[0].value}
                            </h3>
                        </div>
                    </div>
                    <div className="authentication-product__container left two">
                        <div className="authentication-productstage__content">
                            <p className="authentication-productstage__title">Expiration Date</p>
                            <h3 className="authentication-productstage__value">
                                {result.rfxcel_expiry_date.values[0].value}
                            </h3>
                        </div>
                    </div>
                    <div className="authentication-product__container right two">
                        <div className="authentication-productstage__content">
                            <p className="authentication-productstage__title">Factory</p>
                            <h3 className="authentication-productstage__value">
                                {result.rfxcel_mfg_loc_name.values[0].value}
                            </h3>
                        </div>
                    </div>
                </div>
                <img className="authentication-productstages__factory-image" src="./Assets/Chonburi, TH.jpg" alt="Manufacture Factory" width="500" />
                <div className="authentication-productstages__action">
                    <div className="authentication-productstages__scan-button">
                        <a className="authentication-productstages__scan-button-style" href="/">Scan another Product</a>
                    </div>
                    <div className="authentication-productstages__enfamama-button">
                        <a className="authentication-productstages__enfamama-button-style" href="https://www.enfagrow.com.my/user/enrollment">
                            <img src="Assets/enfamama-action-btn.png" width="91%" alt="action button" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};