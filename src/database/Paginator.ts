import { Request, Response } from "express";
import { ObjectLiteral, SelectQueryBuilder } from "typeorm";

interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  pages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export class Paginator {
  static async paginate<T extends ObjectLiteral>(
    queryBuilder: SelectQueryBuilder<T>,
    req: Request,
    res: Response
  ) {
    let page = Number(req.query.page) || 1;
    let pageSize = Number(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    const records = await queryBuilder.skip(offset).take(pageSize).getMany();
    const totalItems = await queryBuilder.getCount();

    const pages = Math.ceil(totalItems / pageSize);
    const currentPage = offset / pageSize + 1;
    const hasNext = currentPage < page;
    const hasPrev = currentPage > 1;

    const paginateInfo: PaginationInfo = {
      currentPage: page,
      pageSize: pageSize,
      totalItems: totalItems,
      pages: pages,
      hasNext: hasNext,
      hasPrevious: hasPrev,
    };

    return { records, paginateInfo };
  }
}
