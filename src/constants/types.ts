export interface IData {
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
