import { validate } from "class-validator";
import { Request, Response } from "express";
import { AppDataSource } from "../../database/data-source";
import { Paginator } from "../../database/Paginator";
import { CreateAuthorDTO, UpdateAuthorDTO } from "../dtos/CreateAuthorDTO";
import { Author } from "../../database/entities/Author";
import { ResponseUtl } from "../../utils/Response";

export class AuthorsController {
  // GETALL
  async getAuthors(req: Request, res: Response): Promise<Response> {
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
  // GETALL
  async getAuthor(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    // throw new Error("some thing else");
    const auhtor = await AppDataSource.getRepository(Author).findOneByOrFail({
      id: Number(id),
    });

    return ResponseUtl.sendResposne<Author>(res, "Sucess", auhtor);
  }
  // CREATE
  async create(req: Request, res: Response): Promise<Response> {
    const authorData = req.body;
    authorData.image = req.file?.filename;
    const dto = new CreateAuthorDTO();
    Object.assign(dto, authorData);

    const errors = await validate(dto);
    if (errors.length > 0) {
      return ResponseUtl.sendError(res, "Invalid data ", 422, errors);
    }

    const repo = AppDataSource.getRepository(Author);
    const author = repo.create(authorData);
    await repo.save(author);

    return ResponseUtl.sendResposne(res, "Success", author, 200);
  }
  // UPDATE
  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const authorData = req.body;

    const dto = new UpdateAuthorDTO();
    // dto.bio = authorData.bio; Same
    Object.assign(dto, authorData);

    const errors = await validate(dto);
    if (errors.length > 0) {
      return ResponseUtl.sendError(res, "Invalid data ", 422, errors);
    }
    const repo = AppDataSource.getRepository(Author);
    const auhtor = await repo.findOneByOrFail({
      id: Number(id),
    });

    repo.merge(auhtor, authorData);
    await repo.save(auhtor);
    return ResponseUtl.sendResposne(res, "Success", auhtor, 200);
  }

  // DELETE
  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const repo = AppDataSource.getRepository(Author);
    const author = await repo.findOneByOrFail({
      id: Number(id),
    });
    await repo.remove(author);
    return ResponseUtl.sendResposne(res, "Success Delete", null);
  }
}
