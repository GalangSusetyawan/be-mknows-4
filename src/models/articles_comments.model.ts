import { Sequelize, DataTypes, Model, Optional } from "sequelize";

import { User } from "@interfaces/user.interface";
import { Article } from "@interfaces/article.interface";

import { ArticleModel } from "@models/articles.model";
import { Comment } from "@/interfaces/comment.interface";

export type CommentCreationAttributes = Optional<Comment, "pk" | "uuid">;

export class ArticlesCommentsModel extends Model<Comment, CommentCreationAttributes> implements Comment {
  public pk: number;
  public uuid: string;

  public article_id: number;
  public author_id: number;

  public comment: string;

  public replies: number;
  public likes: number;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at: Date;
}

export default function (sequelize: Sequelize): typeof ArticlesCommentsModel {
  ArticlesCommentsModel.init(
    {
      pk: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      article_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      author_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "articles_comments",
      timestamps: true,
      paranoid: true,
      sequelize,
    },
  );

  ArticlesCommentsModel.belongsTo(ArticleModel, {
    as: "article",
    foreignKey: "article_id",
    targetKey: "pk",
  });

  return ArticlesCommentsModel;
}