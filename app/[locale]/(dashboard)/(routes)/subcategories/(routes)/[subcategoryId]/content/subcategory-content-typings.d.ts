type SubcategoryContentDocument = {
  id: string;
  name: string;
  coverImage: string;
  studyContent: string;
  pdf: string;
  parentId: string;
  timeToRead: string;
  contentType: "pdf" | "text";

  createdAt: any;
  updatedAt: any;
};
