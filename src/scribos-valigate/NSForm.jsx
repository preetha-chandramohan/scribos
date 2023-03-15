import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export function NSForm() {
  return (
    <div>
      <div>
        <img src="Assets/S4-scan-icon.png" alt="Product Scan" />
        <h3>Unable to authenticate product label</h3>
        <p>Please provide us more information to help us investigate the issue</p>
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
          <Form>
            <label htmlFor="name">Your Name</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" className="error" />
            <br />
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
            <br />
            <label htmlFor="phone">Phone number</label>
            <Field type="text" name="phone" />
            <ErrorMessage name="phone" component="div" className="error" />
            <br />
            <label htmlFor="shopName">Shop name</label>
            <Field type="text" name="shopName" />
            <ErrorMessage name="shopName" component="div" className="error" />
            <br />
            <label htmlFor="shopCity">Shop city</label>
            <Field type="text" name="shopCity" />
            <ErrorMessage name="shopCity" component="div" className="error" />
            <br />
            <label htmlFor="shopAddress">Shop address</label>
            <Field type="text" name="shopAddress" />
            <ErrorMessage name="shopAddress" component="div" className="error" />
            <br />
            <label>
              <Field type="checkbox" name="agree" />
              {`I agree to provide my personal data to RB and allow to contact me in order to check details about the product I scanned. Both to help the investigation process`}
            </label>
            <ErrorMessage name="agree" component="div" className="error" />
            <br />
            <button type="submit" disabled={isSubmitting}>
              Take a photo and send
            </button>
          </Form>
        )}
      </Formik>
      <button>Skip</button>
    </div>
  );
}