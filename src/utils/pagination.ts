export interface PaginationOptions {
  page?: number;
  pageSize?: number;
  sort?: string;
}

export interface PaginationResult<T> {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  items: T[];
}

export class Pagination {
  private readonly defaultPage: number = 1;
  private readonly defaultLimit: number = 1000;

  prePaginate({
    page = this.defaultPage,
    pageSize = this.defaultLimit,
    sort = 'createdAt|desc',
  }: PaginationOptions) {
    let limit = Math.min(
      parseInt(String(pageSize), 10),
      this.defaultLimit
    );
    
    const currentPage = parseInt(String(page), 10);
    const offset = (currentPage - 1) * limit;

    const sortFields = sort.split(',').reduce((acc, field) => {
      const [sortField, sortOrder] = field.split('|');
      return { ...acc, [sortField]: sortOrder === 'desc' ? -1 : 1 };
    }, {});

    return {
      offset,
      limit: Number(limit),
      currentPage,
      sortFields,
    };
  }

  postPaginate<T>(count: number, items: T[], currentPage: number, pageSize: number): PaginationResult<T> {
    return {
      totalItems: count,
      totalPages: Math.ceil(count / pageSize),
      currentPage,
      items,
    };
  }
}

export const paginationUtil = new Pagination();