import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";

import { AuthMiddleware } from "@middlewares/auth.middleware";
import { ValidationMiddleware } from "@middlewares/validation.middleware";
import { CreateArticleDto, UpdateArticleDto } from "@dtos/articles.dto";
import { CommentController } from "@/controllers/comment.controller";

export class CommentRoute implements Routes {
  public path = "comments";
  public router = Router();
  public comment = new CommentController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`/v1/${this.path}/article/:article_id`, AuthMiddleware, this.comment.getCommentsByArticle); // GET All Comments by Article ID
    this.router.get(`/v1/${this.path}/:comment_id`, AuthMiddleware, this.comment.getCommentById); // GET Comment by ID
    this.router.post(`/v1/${this.path}/`, AuthMiddleware, this.comment.createComment);
    this.router.put(`/v1/${this.path}/`, AuthMiddleware, this.comment.updateComment);
    this.router.delete(`/v1/${this.path}/:comment_id`, AuthMiddleware, this.comment.deleteComment);
  }
}