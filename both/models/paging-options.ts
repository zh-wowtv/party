interface Pagination {
	limit: number,
  skip: number  
}

export interface PagingOptions extends Pagination {
  [key: string]: any
}
