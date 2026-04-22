import { Pagination } from '.';

export interface MediaUplaodRes {
  meta: MediaMeta;
  data: MediaUploadData;
}

export interface MediaUploadData {
  _id: string;
  user: string;
  author: Author;
  file: File;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Author {
  id: string;
  name: string;
}

export interface File {
  url: string;
  bucket: string;
  key: string;
  mime_type: string;
  size: number;
}

export interface MediaMeta {
  status_code: number;
  success: boolean;
  pagination: Pagination;
}
