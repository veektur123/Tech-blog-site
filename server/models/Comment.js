const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');
const Post = require('./Post')

class Comment extends Model {}

Comment.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: 'id'
        }
    },
    post_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Post,
          key: 'id'
        }
    },
    created_at: {
        type: DataTypes.DATE,
    },
    body: {
      type: DataTypes.STRING,
    },

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;
