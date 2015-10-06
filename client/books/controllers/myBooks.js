function MyBooksCtrl($scope, $state) {
  $scope.books = $scope.$meteorCollection(Books, false).subscribe('myBooks');

  $scope.removeBook = function(book) {
    $scope.books.remove(book);
  };

  $scope.edit = function(book) {
    $state.go('editbook', {bookId: book._id});
  };
}

MyBooksCtrl.$inject = ['$scope', '$state'];

angular.module('bookish').controller('MyBooksCtrl', MyBooksCtrl);