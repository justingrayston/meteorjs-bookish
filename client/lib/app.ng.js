angular.module('bookish', [
  'angular-meteor',
  'ngMaterial',
  'ui.router',
]);


function AppRun($rootScope, $state) {
  $rootScope.$on('$stateChangeError',
    function(event, toState, toParams, fromState, fromParams, error){
      if (error === 'AUTH_REQUIRED') {
        $state.go('home');
      }
  });

  // Watch for the user logging out, and redirect away from any logged in
  // pages.
  $rootScope.$watch($rootScope.currentUser, function(nv, ov){
    if(!nv && ov) {
      $state.go('home');
    }
  });
}

AppRun.$inject = ['$rootScope', '$state'];

angular.module('bookish').run(AppRun);

function materialSetUp ($mdThemingProvider, $mdIconProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('light-blue')
    .accentPalette('brown');

  $mdIconProvider.defaultIconSet('images/icons/core-icons.svg');
}

var material = ['$mdThemingProvider', '$mdIconProvider', materialSetUp];

angular.module('bookish').config(material);



function onReady() {
  angular.bootstrap(document, ['bookish']);
}

if (Meteor.isCordova)
  angular.element(document).on("deviceready", onReady);
else
  angular.element(document).ready(onReady);