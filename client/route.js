function NoUserRedirect($meteor) {
  return $meteor.requireUser();
}

NoUserRedirect.$inject = ['$meteor'];

function Routing($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'client/books/views/booklist.ng.html',
      controller: 'BookListCtrl'
    })
    .state('mybooks', {
      url: '/my-books',
      templateUrl: 'client/books/views/my-books.ng.html',
      controller: 'MyBooksCtrl',
      resolve: {
        currentUser: NoUserRedirect
      }
    })
    .state('create',{
      url: '/create',
      templateUrl: 'client/books/views/edit.ng.html',
      controller: 'EditBookCtrl',
      resolve: {
        currentUser: NoUserRedirect
      }
    })
    .state('editbook',{
      url: '/edit/:bookId',
      templateUrl: 'client/books/views/edit.ng.html',
      controller: 'EditBookCtrl',
      resolve: {
        currentUser: NoUserRedirect
      }
    })
}

Routing.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

angular.module('bookish')
  .config(Routing);