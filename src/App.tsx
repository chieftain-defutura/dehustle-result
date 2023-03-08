import { useState } from "react";
import axios from "axios";
import { Formik, Form, ErrorMessage, Field } from "formik";
import "./App.css";
import * as Yup from "yup";
import { baseURL } from "./api";

const App = () => {
  const validate = Yup.object().shape({
    registerNumber: Yup.string().required("Required"),
  });

  const handleSubmit = async (values: any) => {
    try {
      const { data } = await axios.get(
        `${baseURL}/result/${values.registerNumber}`
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Formik
        initialValues={{
          registerNumber: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validate}
        enableReinitialize
      >
        {({ values, handleChange, handleBlur, touched, errors }) => (
          <Form>
            <label htmlFor="">Register Number</label>
            <Field name="registerNumber" />

            <ErrorMessage
              name="registerNumber"
              render={(msg) => (
                <div>No student found with this register number</div>
              )}
            />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default App;
