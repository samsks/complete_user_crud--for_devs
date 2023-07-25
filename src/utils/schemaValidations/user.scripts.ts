import { isValid, parseISO } from "date-fns";

const isValidDate = (value: string) => {
  const date = parseISO(value);
  return isValid(date) && value.match(/^\d{4}-\d{2}-\d{2}$/) !== null;
};

export { isValidDate };
