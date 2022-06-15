var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema(
  {
    title: String,
    description: { type: String },
    tags: [String],
  },
  { timestamps: true }
);

articleSchema.index({ tags: 1 });
articleSchema.index({ title: 'text' }, { description: 'text' });

module.exports = mongoose.model('Article', articleSchema);
