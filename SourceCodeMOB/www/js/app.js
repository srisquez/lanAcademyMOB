// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('webApp', ['ionic', 'ngCordova', 'webApp.controllers','webApp.services'])

.run(function($ionicPlatform, $rootScope, $ionicLoading, $cordovaSplashscreen, $timeout) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
      $timeout(function(){
                $cordovaSplashscreen.hide();
      },2000);
  });
    
    $rootScope.$on('loading:show', function () {
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner> Loading ...'
        })
    });

    $rootScope.$on('loading:hide', function () {
        $ionicLoading.hide();
    });

    $rootScope.$on('$stateChangeStart', function () {
        console.log('Loading ...');
        $rootScope.$broadcast('loading:show');
    });

    $rootScope.$on('$stateChangeSuccess', function () {
        console.log('done');
        $rootScope.$broadcast('loading:hide');
    });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/sidebar.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'mainContent': {
        templateUrl: 'templates/home.html',
        controller: 'IndexController'
      }
    }
  })

  .state('app.aboutus', {
      url: '/aboutus',
       cache:false,
      views: {
        'mainContent': {
          templateUrl: 'templates/aboutus.html',
            controller: 'AboutController'
        }
      }
    })

    .state('app.lessonManageStu', {
      url: '/lessonManageStu',
      cache:false,
      views: {
        'mainContent': {
          templateUrl: 'templates/lessonManageStu.html',
          controller: 'AppCtrl'
        }
      }
    })

        .state('app.lessonReviewTe', {
      url: '/lessonReviewTe',
      cache:false,
      views: {
        'mainContent': {
          templateUrl: 'templates/lessonReviewTe.html',
          controller: 'ReviewLessonTeController'
        }
      }
    })




       .state('app.requestLessonStudent', {
      url: '/lessonManageStu/requestLessonStudent',
      cache:false,
      views: {
        'mainContent': {
          templateUrl: 'templates/requestLessonStudent.html',
          controller  : 'RequestController' 
        }
      }
    })

          .state('app.reviewLessonsStu', {
      url: '/lessonManageStu/reviewLessonsStu',
      cache:false,
      views: {
        'mainContent': {
          templateUrl: 'templates/reviewLessonsStu.html',
          controller  : 'ReviewLessonStuController' 
        }
      }
    })

    


   .state('app.programs', {
      url: '/programs',
      views: {
        'mainContent': {
          templateUrl: 'templates/programs.html',
            controller: 'AboutController'
        }
      }
    })

   .state('app.contactus', {
      url: '/contactus',
      views: {
        'mainContent': {
          templateUrl: 'templates/contactus.html',
            controller:'ContactController'
        }
      }
    })

    .state('app.resource', {
      url: '/resource',
      views: {
        'mainContent': {
          templateUrl: 'templates/resource.html',
            controller:'ContactController'
        }
      }
    })

     .state('app.speaking', {
      url: '/speaking/:id',
      cache:false,
      views: {
        'mainContent': {
          templateUrl: 'templates/resourceDetail.html',
            controller:'ResourceController'
        }
      }
    })



   .state('app.favorites', {
      url: '/favorites',
      cache:false,
      views: {
        'mainContent': {
          templateUrl: 'templates/favorites.html',
            controller:'FavoritesController'
        }
      }
    })
    .state('app.menu', {
      url: '/menu',
      views: {
        'mainContent': {
          templateUrl: 'templates/menu.html',
          controller: 'MenuController'
        }
      }
    })

  .state('app.dishdetails', {
    url: '/menu/:id',
    cache:false,
    views: {
      'mainContent': {
        templateUrl: 'templates/dishdetail.html',
        controller: 'DishDetailController'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
