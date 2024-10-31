// Request
export interface CommentRequestBody {
  post: {
    content: string;
  };
  patch: {
    content: string;
  };
}

// Response
export interface CommentDto {
  id: number;
  writer: { image: string | null; nickname: string; id: number };
  content: string;
  createdAt: string;
  updatedAt: string;
}
