import React from "react";
import { Document, Image, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { IData } from "../constants/types";

const styles = StyleSheet.create({
  table: {
    width: "100%",
    marginTop: 20,
    borderWidth: 0.5,
    borderColor: "#000",
  },
  tableHead: {
    flexDirection: "row",
  },
  tableHeadText: {
    flex: 1,
    fontSize: 12,
    borderWidth: 0.5,
    borderColor: "#000",
    paddingVertical: 5,
    paddingHorizontal: 5,
    textAlign: "center",
  },
  tableBody: { flexDirection: "row" },
  subtext: {
    fontSize: 12,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

const PdfFormat = ({ data, word }: { data: IData; word: string }) => {
  return (
    <Document>
      <Page size="A4">
        <View style={{ flex: 1, padding: 20 }}>
          <View style={{ flexDirection: "row", marginBottom: 10, alignItems: "center" }}>
            <Text style={styles.subtext}>Student Name: </Text>
            <Text style={styles.text}>{data.studentName}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <Text style={styles.subtext}>Register No: </Text>
            <Text style={styles.text}>{data.registerNumber}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <Text style={styles.subtext}>Year: </Text>
            <Text style={styles.text}>2023-2024</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <Text style={styles.subtext}>Exam: </Text>
            <Text style={styles.text}>Pre Board Exam</Text>
          </View>
          <View style={styles.table}>
            <View style={[styles.tableHead, { backgroundColor: "#B4B4B3" }]}>
              <Text style={[styles.tableHeadText]}>SUBJECT</Text>
              <Text style={[styles.tableHeadText]}>THEORY</Text>
              <Text style={[styles.tableHeadText]}>PRACTICAL</Text>
              <Text style={[styles.tableHeadText]}>TOTAL</Text>
              <Text style={[styles.tableHeadText]}>STATUS</Text>
            </View>
            {data.subject.map((s, i) => (
              <View style={styles.tableBody}>
                <Text style={[styles.tableHeadText]}>{s.subjectName}</Text>
                <Text style={[styles.tableHeadText]}>{s.theory}</Text>
                <Text style={[styles.tableHeadText]}>{s.havePractical ? s.practical : ""}</Text>
                <Text style={[styles.tableHeadText]}>{Number(s.theory) + Number(s.practical)}</Text>

                {Number(s.theory) >= 15 && s.theory + s.practical >= 35 ? (
                  <Text style={[styles.tableHeadText, { color: "green" }]}> Pass</Text>
                ) : (
                  <Text style={[styles.tableHeadText, { color: "tomato" }]}>Fail</Text>
                )}
              </View>
            ))}
          </View>
          <View style={[styles.tableHead, { backgroundColor: "#B4B4B3" }]}>
            <Text style={[styles.tableHeadText]}>Total</Text>
            <Text style={[styles.tableHeadText]}></Text>
            <Text style={[styles.tableHeadText]}></Text>
            <Text style={[styles.tableHeadText]}>
              {data.subject.reduce((acc, b) => {
                return acc + b.theory + b.practical;
              }, 0)}
            </Text>
            {data.subject.every((b) => b.theory >= 15 && b.theory + b.practical >= 35) ? (
              <Text style={[styles.tableHeadText, { color: "green" }]}>Pass</Text>
            ) : (
              <Text style={[styles.tableHeadText, { color: "tomato" }]}>Fail</Text>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfFormat;
