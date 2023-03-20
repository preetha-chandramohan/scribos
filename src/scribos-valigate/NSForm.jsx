import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function Thumbnail({ file }) {
  const [loading, setLoding] = React.useState(false);
  const [thumbnail, setThumbnail] = React.useState(undefined);
  React.useMemo(() => {
    if (!file) { return; }
    console.log("img updated");
    setLoding(true);
    let reader = new FileReader();
    reader.onloadend = () => {
      setLoding(false);
      setThumbnail(reader.result)
    };
    reader.readAsDataURL(file);
  }, [file]);
  if (!file) { return null; }
  if (loading) { return <p>loading...</p>; }
  return (<img src={thumbnail}
    alt={file.name}
    className="img-thumbnail mt-2"
    height={150}
    width={150} />);
}

export function NSForm({ sendReport }) {
  const [fileList, setFileList] = React.useState(null)
  return (
    <div className="authentication-form-bg">
      <img src="Assets/authentication-product-background.png" width="100%" height="1440px" alt="background" />
      <div className="authentication-form-container">
        <div className="authentication-product__backsection">
          <p className="authentication-product__backsection-icon"><a href="/"><img src="Assets/consumer-arrow-s1.png" width="20px" alt="backsection" /></a></p>
          <h3 className="authentication-product__backsection-content">CONSUMER PROTECTION</h3>
        </div>
        <div className="authentication-form__scan-process">
          <img src="Assets/authentication-scan.png" alt="Product Scan" width="20%" />
          <h3 className="authentication-form__scan-title">Unable to authenticate product label</h3>
          <p className="authentication-form__scan-desc">Please provide us more information to help us investigate the issue</p>
        </div>
        <Formik
          initialValues={{ name: '', email: '', phone_number: '601', shop_name: '', shop_city: '', shop_address: '', avatar: undefined, contact_agreement: false }}
          validate={values => {
            const errors = {};
            if (!values.name || !/^[A-Za-z\s]*$/i.test(values.name)) {
              errors.name = 'Please enter your name';
            }
            if (!values.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Please enter a valid email address';
            }
            if (!values.phone_number || !/^601[0-9]{8,9}$/i.test(values.phone_number)) {
              errors.phone_number = 'Please enter a valid phone number';
            }
            if (!values.shop_name) {
              errors.shop_name = 'Please enter Shop name';
            }
            if (!values.shop_city) {
              errors.shop_city = 'Please enter shop city';
            }
            if (!values.shop_address) {
              errors.shop_address = 'Please enter shop address';
            }
            if (!values.file) {
              errors.avatar = 'Please upload Product Image';
            }
            if (values.file?.size >= 2000000) {
              errors.avatar = 'Please upload Product Image less than 2MB';
            }
            if (values.contact_agreement === false) {
              errors.contact_agreement = 'Acceptance required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            console.log(fileList);
            const newValues = { contact_agreement: 'I agree' }
            sendReport(Object.assign(values, newValues), fileList)
            console.log(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="negative-scan-form">
              <div className="form-field field-name">
                <label htmlFor="name">Your Name</label>
                <Field type="text" name="name" placeholder="Type here" min="1" max="60" />
                <ErrorMessage name="name" component="div" className="error" />
              </div>
              <div className="form-field field-email">
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" placeholder="Type here" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="form-field field-mobile">
                <label htmlFor="phone_number">Phone number</label>
                <Field type="text" name="phone_number" placeholder="Type here" maxLength="12" />
                <ErrorMessage name="phone_number" component="div" className="error" />
              </div>
              <div className="form-field field-shopname">
                <label htmlFor="shop_name">Shop name</label>
                <Field type="text" name="shop_name" placeholder="Type here" />
                <ErrorMessage name="shop_name" component="div" className="error" />
              </div>
              <div className="form-field field-city">
                <label htmlFor="shop_city">Shop city</label>
                <Field type="text" name="shop_city" placeholder="Type here" />
                <ErrorMessage name="shop_city" component="div" className="error" />
              </div>
              <div className="form-field field-address">
                <label htmlFor="shop_address">Shop address</label>
                <Field type="text" name="shop_address" placeholder="Type here" />
                <ErrorMessage name="shop_address" component="div" className="error" />
              </div>
              <div className="form-field imagepicker">
                <label htmlFor="avatar">Upload the product picture</label>
                <Field type="file" id="avatar" name="avatar" accept="image/*" onChange={(event) => {
                  setFieldValue("file", event.currentTarget.files[0]);
                  console.log(event.currentTarget.files[0]);
                  let files = event.target.files;
                  if (files.length > 0) {
                    setFileList(files)
                    console.log(files);
                  }
                }} />
                <ErrorMessage name="avatar" component="div" className="error" />
              </div>
              <Thumbnail file={values.file} />
              <div className="agree-checkbox">
                <label>
                  <Field type="checkbox" name="contact_agreement" />
                  {`I agree to provide my personal data to RB and allow to contact me in order to check details about the product I scanned. Both to help the investigation process`}
                </label>
                <ErrorMessage name="contact_agreement" component="div" className="error" />
              </div>
              <button type="submit" className="form-submit" disabled={isSubmitting}>
                Take a photo and send
              </button>
            </Form>
          )}
        </Formik>
        <a className="form-skip" href="/">Skip
        </a>
      </div>
    </div>
  );
}