function BookListCtrl($scope) {
  $scope.books = $scope.$meteorCollection(function(){
    return Books.find({}, {sort: {title: 1}});
  }).subscribe('allBooks');
}

BookListCtrl.$inject = ['$scope'];

angular.module('bookish').controller('BookListCtrl', BookListCtrl);
