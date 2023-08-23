type DailyStudyDocument = {
  id: string;
  name: string;
  coverImage: string;
  pdfLink: string;
  studyContent: string;
  contentType: "text" | "pdf";
  createdAt: FieldValue;
  updatedAt: FieldValue;
};
