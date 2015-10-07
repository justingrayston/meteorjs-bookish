angular.module('bookish', [
  'angular-meteor',
  'ngMaterial',
  'ui.router'
]);


function AppRun($rootScope, $state, $mdMedia) {
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

  // meteor start up
  $rootScope.meteorConnected = false;
  function meteorStart(a) {
    console.log('meteor connected', a);
    var connectionWatcher = $rootScope.$watch(Meteor.status, function(nv, ov){
      if (nv.connected) {
        $rootScope.meteorConnected = true;
        // Release the watch, we don't need to detect reconnects at this
        // stage.
        connectionWatcher();
      }
    });
  }
  Meteor.startup(meteorStart);

  // set size class on small screens
  $rootScope.smallScreen = false;
  $rootScope.$watch(
    function() {
      return $mdMedia('sm');
    },
    function(nv) {
      $rootScope.smallScreen = nv;
    }
  )
}

AppRun.$inject = ['$rootScope', '$state', '$mdMedia'];

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