const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Post.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id'});
User.hasMany(Post);
Comment.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id'});
User.hasMany(Comment);

Comment.belongsTo(Post, {foreignKey: 'post_id', targetKey: 'id'});
Post.hasMany(Comment);




module.exports = { User, Post, Comment };

