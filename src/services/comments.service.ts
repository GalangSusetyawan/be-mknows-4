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

  public async getCommentById(commentId: number): Promise<CommentParsed> {
    const comment = await DB.ArticlesComments.findOne({ where: { pk: commentId } });

    if (!comment) {
      throw new HttpException(false, 404, "Comment not found");
    }

    return this.commentParsed(comment);
  }

  public async getCommentsByArticleId(articleId: string): Promise<{ comments: CommentParsed[] }> {
    // Get Article by ID
    const article = await DB.Articles.findOne({ where: { pk: articleId } });

    // Get All comments by Article ID
    const comments = await DB.ArticlesComments.findAll({ where: { article_id: article.pk } });

    const transformedComments = comments.map(comment => this.commentParsed(comment));

    return { comments: transformedComments };
  }


  public async createComment(articleId: string, authorId: number, comment: string): Promise<CommentParsed> {
    // Get Article by ID
    const article = await DB.Articles.findOne({ where: { pk: articleId } });

    // Create Comment
    const createdComment = await DB.ArticlesComments.create({
      article_id: article.pk,
      author_id: authorId,
      comment: comment,
    });

    return this.commentParsed(createdComment);
  }

  public async updateComment(commentId: string, comment: string): Promise<CommentParsed> {
    // Get Comment by ID
    const commentToUpdate = await DB.ArticlesComments.findOne({ where: { pk: commentId } });

    try {
      // Update Comment
      const updatedComment = await commentToUpdate.update({ comment: comment });

      return this.commentParsed(updatedComment);
    }
    catch (error) {
      throw new HttpException(false, 500, "Internal Server Error");
    }


  }

  public async deleteComment(commentId: string): Promise<boolean> {
    // Get Comment by ID
    const commentToDelete = await DB.ArticlesComments.findOne({ where: { pk: commentId } });

    try {
      // Delete Comment
      await commentToDelete.destroy();

      return true;
    }
    catch (error) {
      throw new HttpException(false, 500, "Internal Server Error");
    }
  }

  public async likeComment(commentId: string, userId: number): Promise<boolean> {
    // Get Comment by ID
    const commentToLike = await DB.ArticlesComments.findOne({ where: { pk: commentId } });

    try {
      // Update Comment
      await commentToLike.increment("likes");

      return true;
    }
    catch (error) {
      throw new HttpException(false, 500, "Internal Server Error");
    }
  }

}