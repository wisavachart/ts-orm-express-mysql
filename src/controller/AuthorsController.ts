import { Request, Response } from "express";
import { ResponseUtl } from "../../utils/Response";
import { AppDataSource } from "../database/data-source";
import { Paginator } from "../database/Paginator";
import { Author } from "../entities/Author";

export class AuthorsController {
  async getAuthors(req: Request, res: Response) {
    const builder = await AppDataSource.getRepository(Author)
      .createQueryBuilder()
      .orderBy("id", "DESC");
    const { records: authors, paginateInfo } = await Paginator.paginate(
      builder,
      req,
      res
    );
    return ResponseUtl.sendResposne(res, "Sucess", authors, paginateInfo);
  }

  async getAuthor(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    // throw new Error("some thing else");
    const auhtor = await AppDataSource.getRepository(Author).findOneByOrFail({
      id: Number(id),
    });

    return ResponseUtl.sendResposne<Author>(res, "Sucess", auhtor);
  }

  async create(req: Request, res: Response) {}
}
