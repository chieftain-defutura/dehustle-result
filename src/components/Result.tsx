import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { ToWords } from "to-words";

import { IData } from "../constants/types";
import user from "../assets/icons/user.svg";
import PdfFormat from "./PdfFormat";
import { PDFDownloadLink } from "@react-pdf/renderer";

interface IResultProps {
  data: IData;
  setUserData: React.Dispatch<React.SetStateAction<IData | null>>;
}

const Result: React.FC<IResultProps> = ({ setUserData, data }) => {
  const [word, setWord] = useState("");

  useEffect(() => {
    if (!data) return;
    const total = data.subject.reduce((acc, b) => {
      return acc + b.theory + b.practical;
    }, 0);
    console.log(total);
    const toWords = new ToWords();
    const word = toWords.convert(total);
    setWord(word);
  }, [data]);

  return (
    <div className="result">
      <div className="logout">
        <div></div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <button onClick={() => setUserData(null)}>Logout</button>
          <PDFDownloadLink
            document={<PdfFormat data={data} word={word} />}
            fileName={`Result-${data.registerNumber}`}
            style={{ textDecoration: "none" }}
          >
            <button>Download</button>
          </PDFDownloadLink>
        </div>
      </div>
      <div className="user_detials">
        <div className="user_name">
          <img src={user} alt="user_icon" />
          <div>
            <h2 style={{ textTransform: "capitalize" }}>{data.studentName}</h2>
            <h2>{data.registerNumber}</h2>
          </div>
        </div>
        <div className="year_term">
          <div>
            <h3>Year</h3>
            <h3>Exam</h3>
          </div>
          <div>
            <p>2023-2024</p>
            <p>Pre Board Exam</p>
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
          {data.subject.map((f, index) => {
            return (
              <>
                <div className="confetti">
                  {data.subject.every((b) => b.theory >= 15 && b.theory + b.practical >= 35) ? (
                    <Confetti numberOfPieces={100} />
                  ) : (
                    ""
                  )}
                </div>
                <tr key={index}>
                  <td>{f.subjectName}</td>
                  <td>
                    {f.theory}
                    {f.havePractical ? "+" : null}
                    {f.practical ? f.practical : ""}
                  </td>
                  <td>{Number(f.theory) + Number(f.practical)}</td>
                  <td>
                    {Number(f.theory) >= 15 && f.theory + f.practical >= 35 ? (
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
            {data.subject.reduce((acc, b) => {
              return acc + b.theory + b.practical;
            }, 0)}
            <span>({word})</span>
          </p>
          {data.subject.every((b) => b.theory >= 15 && b.theory + b.practical >= 35) ? (
            <p id="pass">Pass</p>
          ) : (
            <p id="fail">Fail</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;
