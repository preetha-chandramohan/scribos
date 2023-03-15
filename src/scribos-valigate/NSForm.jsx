import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export function NSForm() {
  return (
    <div className="authentication-form-bg">
      <img src="Assets/authentication-product-background.png" width="100%" height="1150px" alt="background" />
      <div className="authentication-form-container">
        <div className="authentication-form__scan-process">
          <img src="Assets/authentication-scan.png" alt="Product Scan" width="25%"/>
          <h3 className="authentication-form__scan-title">Unable to authenticate product label</h3>
          <p className="authentication-form__scan-desc">Please provide us more information to help us investigate the issue</p>
        </div>
        <Formik
          initialValues={{ name: '', email: '', phone: '', shopName: '', shopCity: '', shopAddress: '', agree: false }}
          validate={values => {
            const errors = {};
            if (!values.email || !values.name || !values.phone || !values.shopName || !values.shopCity || !values.shopAddress || values.agree === false) {
              errors.email = errors.name = errors.phone = errors.shopName = errors.shopCity = errors.shopAddress = errors.agree = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="negative-scan-form">
              <div className="form-field field-name">
                <label htmlFor="name">Your Name</label>
                <Field type="text" name="name" />
                <ErrorMessage name="name" component="div" className="error" />
              </div>
              <div className="form-field field-email">
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="form-field field-mobile">
                <label htmlFor="phone">Phone number</label>
                <Field type="text" name="phone" />
                <ErrorMessage name="phone" component="div" className="error" />
              </div>
              <div className="form-field field-shopname">
                <label htmlFor="shopName">Shop name</label>
                <Field type="text" name="shopName" />
                <ErrorMessage name="shopName" component="div" className="error" />
              </div>
              <div className="form-field field-city">
                <label htmlFor="shopCity">Shop city</label>
                <Field type="text" name="shopCity" />
                <ErrorMessage name="shopCity" component="div" className="error" />
              </div>
              <div className="form-field field-address">
                <label htmlFor="shopAddress">Shop address</label>
                <Field type="text" name="shopAddress" />
                <ErrorMessage name="shopAddress" component="div" className="error" />
              </div>
              <div className="agree-checkbox">
                <label>
                  <Field type="checkbox" name="agree" />
                  {`I agree to provide my personal data to RB and allow to contact me in order to check details about the product I scanned. Both to help the investigation process`}
                </label>
                <ErrorMessage name="agree" component="div" className="error" />
              </div>
              <button type="submit" className="form-submit" disabled={isSubmitting}>
                Take a photo and send
              </button>
            </Form>
          )}
        </Formik>
        <button className="form-skip">Skip</button>
      </div>
    </div>
  );
}