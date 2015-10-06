Meteor.publish('allBooks', function(){
  return Books.find({},{
    sort: {title: 1},
    fields: {title: 1, synopsis: 1, author: 1}
  });
});

Meteor.publish('myBooks', function(){
  return Books.find({
    owner: this.userId
  }, {sort: {title: 1}});
});