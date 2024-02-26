import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Formik, Form, ErrorMessage, Field } from "formik";
import "./App.css";
import * as Yup from "yup";
import { baseURL } from "./api";
import Result from "./components/Result";
import { IData } from "./constants/types";

const App = () => {
  const validate = Yup.object().shape({
    registerNumber: Yup.string().required("*Please enter your register number"),
  });

  const [userData, setUserData] = useState<IData | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseURL}/result/${values.registerNumber}`);
      console.log(data);

      if (data.error) {
        return setError(true);
      }

      setError(false);
      setUserData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!error) return;

    setTimeout(() => {
      setError(false);
    }, 3000);
  }, [error]);

  return (
    <>
      <div className="exam_result">
        {!userData ? (
          <Formik
            initialValues={{
              registerNumber: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validate}
          >
            {() => (
              <Form>
                <div className="student_number">
                  <label htmlFor="">Enter Your Register Number</label>
                  <Field
                    name="registerNumber"
                    type="number"
                    placeholder="Enter Your Register Number"
                  />
                  <ErrorMessage name="registerNumber" component={"div"} className="msg" />
                  {error && <div className="msg">*No student found with this register number</div>}
                  <button disabled={loading} type="submit">
                    {loading ? "Loading..." : "Submit"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <Result data={userData} setUserData={setUserData} />
        )}
      </div>
    </>
  );
};

export default App;

function setWord(word: string) {
  throw new Error("Function not implemented.");
}
