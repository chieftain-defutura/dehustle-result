import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Formik, Form, ErrorMessage, Field } from "formik";
import "./App.css";
import * as Yup from "yup";
import { baseURL } from "./api";
import user from "./assets/icons/user.svg";
import Confetti from "react-confetti";
import { ToWords } from "to-words";
interface IData {
  _id: string;
  registerNumber: string;
  studentName: string;
  group: string;
  standard: string;
  testName: string;
  subject: {
    subjectName: string;
    theory: number;
    practical: number;
    havePractical: boolean;
    _id: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  close: boolean;
}

const App = () => {
  const validate = Yup.object().shape({
    registerNumber: Yup.string().required("Required"),
  });

  const [userData, setUserData] = useState<IData | null>(null);
  const [word, setWord] = useState("");

  const handleSubmit = async (values: any) => {
    try {
      const { data } = await axios.get(
        `${baseURL}/result/${values.registerNumber}`
      );
      console.log(data);
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {

  //     const toWords = new ToWords();
  //     const word= toWords.convert(words);
  //     setWord(word)
  //   }
  // }, [])

  useEffect(() => {
    if (!userData) return;
    const total = userData.subject.reduce((acc, b) => {
      return acc + b.theory + b.practical;
    }, 0);
    console.log(total);
    const toWords = new ToWords();
    const word = toWords.convert(total);
    setWord(word);

    const resu = userData.subject.every((b, acc) =>
      b.theory + b.practical > 35 ? console.log("Pass") : console.log("Fail")
    );
    console.log(resu);
  }, [userData]);

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
            {({ values, handleChange, handleBlur, touched, errors }) => (
              <Form>
                <div className="student_number">
                  <label htmlFor="">Enter Your Register Number</label>
                  <Field
                    name="registerNumber"
                    placeholder="Enter Your Register Number"
                  />
                  <ErrorMessage
                    name="registerNumber"
                    render={(msg) => (
                      <div className="msg">
                        *No student found with this register number
                      </div>
                    )}
                  />

                  <button type="submit">Submit</button>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <div className="result">
            <div className="logout">
              <div></div>
              <div>
                <button onClick={() => setUserData(null)}>Logout</button>
              </div>
            </div>
            <div className="user_detials">
              <div className="user_name">
                <img src={user} alt="user_icon" />
                <div>
                  <h2>{userData.studentName}</h2>
                  <h2>{userData.registerNumber}</h2>
                </div>
              </div>
              <div className="year_term">
                <div>
                  <h3>Year</h3>
                  <h3>Exam</h3>
                </div>
                <div>
                  <p>2023</p>
                  <p>Mid-Term</p>
                </div>
              </div>
            </div>

            <div className="subject">
              <table>
                <tr>
                  <th>SUBJECT</th>
                  <th>MARKS</th>
                  <th>TOTAL</th>
                  <th>STATUS</th>
                </tr>
                {userData.subject.map((f, index) => {
                  return (
                    <>
                      <div className="confetti">
                        {userData.subject.every(
                          (b) => b.theory + b.practical > 35
                        ) ? (
                          <Confetti />
                        ) : (
                          ""
                        )}
                      </div>
                      <tr key={index}>
                        <td>{f.subjectName}</td>
                        <td>
                          {f.theory}
                          {f.havePractical ? "+" : ""}
                          {f.practical ? f.practical : ""}
                        </td>
                        <td>{Number(f.theory) + Number(f.practical)}</td>
                        <td>
                          {Number(f.theory) + Number(f.practical) > 35 ? (
                            <p id="pass">Pass</p>
                          ) : (
                            <p id="fail">Fail</p>
                          )}
                        </td>
                      </tr>
                    </>
                  );
                })}
              </table>
              <div className="totalmark">
                <h3>TOTAL </h3>
                <p>
                  {userData.subject.reduce((acc, b) => {
                    return acc + b.theory + b.practical;
                  }, 0)}
                  <span>({word})</span>
                </p>
                {userData.subject.every((b) => b.theory + b.practical > 35) ? (
                  <p id="pass">Pass</p>
                ) : (
                  <p id="fail">Fail</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
function setWord(word: string) {
  throw new Error("Function not implemented.");
}
