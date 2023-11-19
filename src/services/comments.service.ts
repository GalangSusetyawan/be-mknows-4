import { Op } from "sequelize";
import { Service } from "typedi";
import { DB } from "@database";

import { ArticleModel } from "@models/articles.model";

import { ArticlesCommentsModel } from "@/models/articles_comments.model";

import { ArticleParsed, ArticleQueryParams } from "@interfaces/article.interface";
import { Pagination } from "@interfaces/common/pagination.interface";
import { CreateArticleDto, UpdateArticleDto } from "@dtos/articles.dto";
import { HttpException } from "@exceptions/HttpException";
import { CommentParsed } from "@/interfaces/comment.interface";

@Service()
export class CommentService {
  private commentParsed(comment: ArticlesCommentsModel): CommentParsed {
    return {
      uuid: comment.uuid,
      article_id: comment.article_id,
      author_id: comment.author_id,
      comment: comment.comment,
      replies: comment.replies,
      likes: comment.likes,
    };
  }

  public async getCommentsByArticleId(articleId: number): Promise<{ comments: CommentParsed[] }> {
    // Get Article by ID
    const article = await DB.Articles.findOne({ where: { pk: articleId } });

    // Get All comments by Article ID
    const comments = await DB.ArticlesComments.findAll({ where: { article_id: article.pk } });

    const transformedComments = comments.map(comment => this.commentParsed(comment));

    return { comments: transformedComments };
  }


  public async createComments(articleId: number, authorId: number, comment: string): Promise<CommentParsed> {
    const createdComment = await DB.ArticlesComments.create({
      article_id: articleId,
      author_id: authorId,
      comment: comment,
    });

    return this.commentParsed(createdComment);
  }
}