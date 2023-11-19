export interface Comment {
  pk: number;
  uuid: string;

  article_id: number;
  author_id: number;

  comment: string;

  likes?: number;
  replies?: number;
}

export interface CommentLike {
  comment_id: number;
  user_id: number;
}

export interface CommentReply {
  pk: number;
  uuid: string;

  comment_id: number;
  author_id: number;

  reply: string;
}

export interface CommentReplyLike {
  reply_id: number;
  user_id: number;
}

export interface CommentParsed {
  uuid: string;
  article_id: number;
  author_id: number;
  comment: string;
  replies: number;
  likes: number;
}