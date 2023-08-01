import { Handler } from "express";
import "dotenv/config";

const pagination: Handler = (req, res, next): void => {
  const queryPage: number = Number(req.query.page);
  const queryPerPage: number = Number(req.query.perPage);

  const page: number = queryPage && queryPage > 1 ? queryPage : 1;
  const perPage: number =
    queryPerPage &&
    queryPerPage <= Number(process.env.USER_PER_PAGE) &&
    queryPerPage > 0
      ? queryPerPage
      : Number(process.env.USER_PER_PAGE);

  const url: string = `${req.protocol}://${req.get("host")}${req.baseUrl}`;

  const prevPage: string = `${url}?page=${page - 1}&perPage=${perPage}`;
  const nextPage: string = `${url}?page=${page + 1}&perPage=${perPage}`;

  res.locals = {
    ...res.locals,
    pagination: {
      page: perPage * (page - 1),
      perPage,
      prevPage,
      nextPage,
    },
  };

  return next();
};

export default pagination;
