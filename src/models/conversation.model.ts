var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var conversationSchema = new Schema({
  _id: {
      type: String
  },
  startedOn: {
      type: Date
  },
  deleted: {
      type: Boolean
  },
  updatedOn: {
      type: Date
  },
  userIds: [String]
});

var ConversationModel = mongoose.model('ConversationModel', conversationSchema);
export = ConversationModel;

//http://stackoverflow.com/questions/34482136/mongoose-the-typescript-way
//https://gist.github.com/masahirompp/3c012c8721b70821fa45
//https://github.com/Appsilon/styleguide/wiki/mongoose-typescript-models
//https://gist.github.com/brennanMKE/ee8ea002d305d4539ef6
