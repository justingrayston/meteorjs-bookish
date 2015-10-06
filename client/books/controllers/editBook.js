// RangeError: Maximum call stack size exceeded
//     at isFunction (angular.js:685)
//     at Object.forEach (angular.js:324)
//     at angularMeteorUtils.service.$timeout.stripDollarPrefixedKeys (angular-meteor-utils.js:36)
//     at angular-meteor-utils.js:38
//     at Object.forEach (angular.js:350)
//     at angularMeteorUtils.service.$timeout.stripDollarPrefixedKeys (angular-meteor-utils.js:36)
//     at angular-meteor-utils.js:38
//     at Object.forEach (angular.js:350)
//     at angularMeteorUtils.service.$timeout.stripDollarPrefixedKeys (angular-meteor-utils.js:36)
//     at angular-meteor-utils.js:38(anonymous function) @ angular.js:12477ident.$get @ angular.js:9246parent.$get.Scope.$apply @ angular.js:16094(anonymous function) @ angular.js:23554jQuery.event.dispatch @ jquery.js:4665jQuery.event.add.elemData.handle @ jquery.js:4333

function EditBookCtrl($rootScope, $scope, $state, $stateParams) {
  var books = $scope.$meteorCollection(Books, false).subscribe('myBooks')
  $scope.book = $stateParams.bookId ? $scope.$meteorObject(
                                      Books, $stateParams.bookId, false) : {};

  function saveSuccess() {
    $state.go('mybooks');
  }

  function saveError(error) {
    console.log(error);
  }

  $scope.saveBook = function() {
    var toSave = {};

    if ($scope.book._id) {
      toSave._id = $scope.book._id;
    }
    toSave.owner = $rootScope.currentUser._id;
    toSave.title = $scope.book.title;
    toSave.synopsis = $scope.book.synopsis || null;
    toSave.author = $scope.book.author;

    books.save(toSave).then(saveSuccess, saveError);
  };
}

EditBookCtrl.$inject = ['$rootScope', '$scope', '$state', '$stateParams'];

angular.module('bookish').controller('EditBookCtrl', EditBookCtrl);