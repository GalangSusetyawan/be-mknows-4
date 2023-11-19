import { Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { Container } from "typedi";

import { Article, ArticleParsed, ArticleQueryParams } from "@interfaces/article.interface";
import { RequestWithUser } from "@interfaces/authentication/token.interface";
import { ArticleService } from "@services/articles.service";

// Import 
import { Comment, CommentParsed } from "@interfaces/comment.interface";
import { CommentService } from "@services/comments.service";


import { CreateArticleDto, UpdateArticleDto } from "@dtos/articles.dto";
import { apiResponse } from "@utils/apiResponse";

export class CommentController {
  private article = Container.get(ArticleService);


}