const validExtensions = ["png", "jpg", "jpeg"];

const isValidFileExtension = (filename: string): boolean => {
  const extension = filename.split(".").pop()?.toLowerCase();
  return !!extension && validExtensions.includes(extension);
};

const isValidProfileImage = (value: any) => {
  return value && typeof value === "object" && "fieldname" in value;
};

export { isValidFileExtension, isValidProfileImage };
