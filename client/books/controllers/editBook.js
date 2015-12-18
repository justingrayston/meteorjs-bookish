
/**
 * Getting this error when calling save on the collection with an angular scope object.
 *
 * Steps:
 * * Create Item
 * * Edit Item Save - It works fine
 * * Open item again to edit and save
 * * Error thrown (See below)
 * RangeError: Maximum call stack size exceeded
 *     at isFunction (angular.js:685)
 *     at Object.forEach (angular.js:324)
 *     at angularMeteorUtils.service.$timeout.stripDollarPrefixedKeys (angular-meteor-utils.js:36)
 *     at angular-meteor-utils.js:38
 *     at Object.forEach (angular.js:350)
 *     at angularMeteorUtils.service.$timeout.stripDollarPrefixedKeys (angular-meteor-utils.js:36)
 *     at angular-meteor-utils.js:38
 *     at Object.forEach (angular.js:350)
 *     at angularMeteorUtils.service.$timeout.stripDollarPrefixedKeys (angular-meteor-utils.js:36)
 *     at angular-meteor-utils.js:38(anonymous function) @ angular.js:12477ident.$get @ angular.js:9246parent.$get.Scope.$apply @ angular.js:16094(anonymous function) @ angular.js:23554jQuery.event.dispatch @ jquery.js:4665jQuery.event.add.elemData.handle @ jquery.js:4333
 */

function EditBookCtrl($rootScope, $scope, $state, $stateParams, $reactive) {
  $reactive(this).attach($scope);
  
  // var books = this.helpers({

  // });
  // $scope.book = $stateParams.bookId ? $scope.$meteorObject(
  //                                     Books, $stateParams.bookId, false) : {};
  $scope.helpers({
    book: function() {
      return Books.findOne($stateParams.bookId);
    }
  });

  $scope.subscribe('myBooks');

  function saveSuccess() {
    $state.go('mybooks');
  }

  function saveError(error) {
    console.log(error);
  }

  $scope.saveBook = function() {

    function callback(err){
      if (!err) {
        $state.go('mybooks');
      }
    };

    $scope.book.owner = $rootScope.currentUser._id;
    if (!$scope.book._id) {
      Books.insert($scope.book, callback);
    } else {
      var toSave = angular.copy($scope.book);
      delete toSave._id;
      Books.update($scope.book._id, {$set: toSave},  callback);    
    }


    //$scope.book.update($scope.book).then(saveSuccess, saveError);
  };
}

EditBookCtrl.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$reactive'];

angular.module('bookish').controller('EditBookCtrl', EditBookCtrl);