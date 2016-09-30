angular.module('webApp.controllers', [])

.controller('AppCtrl', function ($scope, $rootScope, $ionicModal, $timeout, $localStorage, $ionicPlatform, $cordovaImagePicker, AuthFactory,$state) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = $localStorage.getObject('userinfo','{}');
    $scope.reservation = {};
    $scope.registration = {};
    $scope.loggedIn = false;
    
    if(AuthFactory.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = AuthFactory.getUsername();
        $scope.profile = AuthFactory.getProfile();
    }
    
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);
        $localStorage.storeObject('userinfo',$scope.loginData);

        AuthFactory.login($scope.loginData);

        $scope.closeLogin();
    };
    
    $scope.logOut = function() {
       AuthFactory.logout();
        $scope.loggedIn = false;
        $scope.username = '';
        //$state.go('app');
    };
      
    $rootScope.$on('login:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
        $scope.profile = AuthFactory.getProfile();
    });
    
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/reserve.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.reserveform = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeReserve = function () {
        $scope.reserveform.hide();
    };

    // Open the login modal
    $scope.reserve = function () {
        $scope.reserveform.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doReserve = function () {
        console.log('Doing reservation', $scope.reservation);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeReserve();
        }, 1000);
    };

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/register.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.registerform = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeRegister = function () {
        $scope.registerform.hide();
    };

    // Open the login modal
    $scope.register = function () {
        $scope.registerform.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doRegister = function () {
        console.log('Doing registration', $scope.registration);
        $scope.loginData.username = $scope.registration.username;
        $scope.loginData.password = $scope.registration.password;

        AuthFactory.register($scope.registration);
        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeRegister();
        }, 1000);
    };
       
    $rootScope.$on('registration:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
        $localStorage.storeObject('userinfo',$scope.loginData);
    });
    
    $ionicPlatform.ready(function() {
        var options = {
            quality: 50,
            destinationType: 0, //Camera.DestinationType.DATA_URL,
            sourceType: 0,//Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: 0,//Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: 0,//CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
 
        $scope.takePicture = function() {
            //$cordovaCamera.getPicture(options).then(function(imageData) {
              //  $scope.registration.imgSrc = "data:image/jpeg;base64," + imageData;
            ///}, function(err) {
               // console.log(err);
            //});
            //$scope.registerform.show();
        };
        
          var pickoptions = {
              maximumImagesCount: 1,
              width: 100,
              height: 100,
              quality: 50
          };
        
        $scope.pickImage = function() {
          $cordovaImagePicker.getPictures(pickoptions)
              .then(function (results) {
                  for (var i = 0; i < results.length; i++) {
                      console.log('Image URI: ' + results[i]);
                      $scope.registration.imgSrc = results[0];
                  }
              }, function (error) {
                  // error getting photos
              });
        };
 
    });
})


.controller('RequestController', ['$scope', 'requestLessonFactory','$rootScope','getTeachersProfile', 'AuthFactory', function ($scope, requestLessonFactory,$rootScope,getTeachersProfile,AuthFactory) {

 $scope.request = {
        lessonType: "",
        startHour: "",
        date: "",
        teacher: "", //Takeshi (Teacher)
        RequestedBy: ""

    };

$scope.teachers = getTeachersProfile.query();

  

    $scope.TeacherName = "Takeshi";

    var userId = AuthFactory.getuserId();

    $scope.request.RequestedBy = (userId != null? userId : "");

    var lessonTypes = [{
        value: "CPP",
        label: "Conversation Practice"
    }, {
        value: "TPP",
        label: "Test Preparation"
    }, {
        value: "SP",
        label: "Specialized Program"
    }];

    var lessonStartTime = [{
        value: "8:40am",
        label: "8:40am"
    }, 
     {
        value: "9:50am",
        label: "9:50am"
    },
    {
        value: "11:00am",
        label: "11:00am"
    }, 
    {
        value: "12:10pm",
        label: "12:10pm"
    },
    {
        value: "1:40pm",
        label: "1:40pm"
    },
    {
        value: "2:50pm",
        label: "2:50pm"
    },
    {
        value: "4:00pm",
        label: "4:00pm"
    },
    {
        value: "5:10pm",
        label: "5:10pm"
    },
    {
        value: "6:20pm",
        label: "6:20pm"
    },
    {
        value: "7:30pm",
        label: "7:30pm"
    }];

    $scope.lessonStartTime = lessonStartTime;
    $scope.invalidlessonStartSelection = false;

    $scope.lessonTypes = lessonTypes;
    $scope.invalidLessonSelection = false;

    $scope.invalidTeacherSelection = false;

     $scope.duplicate = false;

$scope.sendRequest = function () {

     $scope.duplicate = false;


            console.log ($scope.request.date);

        if ($scope.request.lessonType== "") {
            $scope.invalidLessonSelection  = true;
        }
        else
            {$scope.invalidLessonSelection  = false;}

        if ($scope.request.startHour == "") {
              $scope.invalidlessonStartSelection  = true;
        }
         if ($scope.request.teacher == "") {
              $scope.invalidTeacherSelection  = true;
        }
        else
            {$scope.invalidlessonStartSelection  = false;}


         if ($scope.request.date!= "" && $scope.request.lessonType!= "" && $scope.request.startHour!= "" && $scope.request.teacher!= "" )
         {

             $scope.invalidlessonStartSelection = false;
              $scope.invalidLessonSelection = false;
               $scope.invalidTeacherSelection = false;


        requestLessonFactory.save($scope.request,
           function(response) 
           {

              if (response.message==="duplicate key")
              {
                 //$scope.duplicate = true;

                  var messageDialog = 'You already have requested this lesson.'

              var message = '\
                <div class="ngdialog-message">\
                <div><h3>Lesson Requested Unsuccessful</h3></div>' +
                  '<div><p>' +  messageDialog + 
                  '</p><p>' + '' + '</p></div>';

                //ngDialog.openConfirm({ template: message, plain: 'true'});

              }
              else
              {

                  var messageDialog = 'The lesson has been requested successfully.'

              var message = '\
                <div class="ngdialog-message">\
                <div><h3>Lesson Requested Successful</h3></div>' +
                  '<div><p>' +  messageDialog + 
                  '</p><p>' + '' + '</p></div>';

               // ngDialog.openConfirm({ template: message, plain: 'true'});

              }
           
           });

     $scope.request = {
        lessonType: "",
        startHour: "",
        date: "",
        teacher: "", //Takechi (Teacher)
        RequestedBy: ""
        };

        $scope.request.RequestedBy = ($rootScope.userId != null? $rootScope.userId : "");

              
        }

};



}])


.controller('ReviewLessonTeController', ['$scope', 'reviewLessonTeFactory','$rootScope', 'AuthFactory', function ($scope, reviewLessonTeFactory,$rootScope,AuthFactory) {

var userId = AuthFactory.getuserId();


$scope.lessons = reviewLessonTeFactory.query({id: userId });



$scope.setSelected = function(item) {
      
        console.log(item);
    };



    $scope.getLessonDes = function(lessonCode) {

        var des = "";
        
        if (lessonCode === "CPP") {
            des = "Conversation Practice";
        } else  if (lessonCode === "TPP") {
            des = "Test Preparation";
        } else  if (lessonCode === "SP") {
            des = "Specialized Program";
        } else 
        {
             des ="";

        }

       return des;
    };

}])



.controller('ReviewLessonStuController', ['$scope', 'reviewLessonFactory','reviewLessonFactory_Stu','$rootScope', 'AuthFactory', function ($scope, reviewLessonFactory,reviewLessonFactory_Stu,$rootScope,AuthFactory) {

 var userId = AuthFactory.getuserId();

$scope.lessons = reviewLessonFactory.query({id: userId });

  $scope.shouldShowDelete = false;

 

    $scope.toggleDelete = function () {
        $scope.shouldShowDelete = !$scope.shouldShowDelete;
        console.log($scope.shouldShowDelete);
    }




 $scope.TeacherName = "Takeshi";

 $scope.selectedRow = null;
 $scope.enablebuttons = false;

 $scope.showDeleteEdit = false;

 $scope.itemLesson = {};

$rootScope.lesson =  {};

//| date: 'yyyy-MM-dd'}

$scope.removeLesson = function(idLesson) {



        reviewLessonFactory_Stu.delete({id: idLesson});

        $scope.lessons = reviewLessonFactory.query({id: userId });

    };

    $scope.selectRow = function(rowIndex){
  $scope.selectedRow = rowIndex;
   $scope.enablebuttons = true;
    
    $scope.showDeleteEdit = true;

     $scope.itemLesson = $scope.lessons[$scope.selectedRow];

    
   
     $rootScope.lesson  = $scope.itemLesson;

     $rootScope.dateLesson = $scope.lessons[$scope.selectedRow].date;

};



    $scope.getLessonDes = function(lessonCode) {

        var des = "";
        
        if (lessonCode === "CPP") {
            des = "Conversation Practice";
        } else  if (lessonCode === "TPP") {
            des = "Test Preparation";
        } else  if (lessonCode === "SP") {
            des = "Specialized Program";
        } else 
        {
             des ="";

        }

       return des;
    };

}])



.controller('MenuController', ['$scope', 'menuFactory', 'favoriteFactory', 'baseURL', '$ionicListDelegate', '$ionicPlatform', '$cordovaLocalNotification', '$cordovaToast', function ($scope, menuFactory, favoriteFactory, baseURL, $ionicListDelegate, $ionicPlatform, $cordovaLocalNotification, $cordovaToast) {

    $scope.baseURL = baseURL;
    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;


    menuFactory.query(
        function (response) {
            $scope.dishes = response;
        },
        function (response) {
        });
    
    $scope.select = function (setTab) {
        $scope.tab = setTab;

        if (setTab === 2) {
            $scope.filtText = "appetizer";
        } else if (setTab === 3) {
            $scope.filtText = "mains";
        } else if (setTab === 4) {
            $scope.filtText = "dessert";
        } else {
            $scope.filtText = "";
        }
    };

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };

    $scope.addFavorite = function (dishid) {
        console.log("dishid is " + dishid);

        favoriteFactory.save({_id: dishid});
        $ionicListDelegate.closeOptionButtons();
        
        $ionicPlatform.ready(function () {

                $cordovaLocalNotification.schedule({
                    id: 1,
                    title: "Added Favorite",
                    text: $scope.dishes[dishid].name
                }).then(function () {
                    console.log('Added Favorite '+$scope.dishes[dishid].name);
                },
                function () {
                    console.log('Failed to add Favorite ');
                });
            
              $cordovaToast
                  .show('Added Favorite '+$scope.dishes[dishid].name, 'long', 'center')
                  .then(function (success) {
                      // success
                  }, function (error) {
                      // error
                  });


        });
    }
}])

.controller('ResourceController', ['$scope', 'resourceFactory','$stateParams', function ($scope, resourceFactory,$stateParams) {

 if($stateParams.id == 1)
   $scope.filtText = "Speaking";
  else  if($stateParams.id == 2)
   $scope.filtText = "Grammar";
 else  if($stateParams.id == 3)
   $scope.filtText = "Reading";
 else  if($stateParams.id == 4)
   $scope.filtText = "Vocabulary";
 else  if($stateParams.id == 5)
   $scope.filtText = "Listening";
 else  if($stateParams.id == 6)
   $scope.filtText = "Writing";
 else
    $scope.filtText = "";

  $scope.tab = 1;
    $scope.resources = resourceFactory.query();


      $scope.select = function (setTab) {
        $scope.tab = setTab;

        if (setTab === 1) {
            $scope.filtText = "Speaking";
        }else if (setTab === 2) {
            $scope.filtText = "Grammar";
        } else if (setTab === 3) {
            $scope.filtText = "Reading";
        } else if (setTab === 4) {
            $scope.filtText = "Vocabulary";
        } else if (setTab === 5) {
            $scope.filtText = "Listening";
        } else if (setTab === 6) {
            $scope.filtText = "Writing";
        }else {
            $scope.filtText = "";
        }
    };

      $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

}])

.controller('ContactController', ['$scope', '$ionicModal', '$timeout', 'contactFactory', function ($scope, $ionicModal, $timeout, contactFactory) {

    $scope.feedbackItem = {
        firstname: "",
        lastname: "",
        contactTel: "",
        email: "",
        subject: "",
        question: ""
    };
   
    $scope.tel = {
            areaCode: "",
             number: ""
            };
 

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/feedback.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.feedbackform = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeFeedback = function () {
        $scope.feedbackform.hide();
    };

    // Open the login modal
    $scope.feedback = function () {
        $scope.feedbackform.show();
    };

    $scope.sendFeedback = function () {

           $scope.feedbackItem.contactTel = $scope.tel.areaCode + $scope.tel.number;

      contactFactory.save($scope.feedback,
        function(response) 
           {
          $scope.feedbackItem = {
        firstname: "",
        lastname: "",
        contactTel: "",
        email: "",
        subject: "",
        question: ""
    };
           });

      
    };
}])

.controller('DishDetailController', ['$scope', '$state', '$stateParams', 'menuFactory', 'favoriteFactory', 'commentFactory', 'baseURL', '$ionicPopover', '$ionicModal', '$ionicPlatform', '$cordovaLocalNotification', '$cordovaToast', '$cordovaSocialSharing', function ($scope, $state, $stateParams, menuFactory, favoriteFactory, commentFactory, baseURL, $ionicPopover, $ionicModal, $ionicPlatform, $cordovaLocalNotification, $cordovaToast, $cordovaSocialSharing) {

    $scope.baseURL = baseURL;

     $scope.dish = menuFactory.get({
            id: $stateParams.id
        },
            function (response) {
                $scope.dish = response;
            },
            function (response) {
            }
        );  
        
        console.log($scope.dish);


    
    // .fromTemplateUrl() method
    $ionicPopover.fromTemplateUrl('templates/dish-detail-popover.html', {
        scope: $scope
    }).then(function (popover) {
        $scope.popover = popover;
    });


    $scope.openPopover = function ($event) {
        $scope.popover.show($event);
    };
    $scope.closePopover = function () {
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });
    // Execute action on hide popover
    $scope.$on('popover.hidden', function () {
        // Execute action
    });
    // Execute action on remove popover
    $scope.$on('popover.removed', function () {
        // Execute action
    });

    $scope.addFavorite = function () {
        console.log("index is " + $stateParams.id);

        favoriteFactory.save({_id: $stateParams.id});;
        $scope.popover.hide();
        
                
        $ionicPlatform.ready(function () {

                $cordovaLocalNotification.schedule({
                    id: 1,
                    title: "Added Favorite",
                    text: $scope.dish.name
                }).then(function () {
                    console.log('Added Favorite '+$scope.dish.name);
                },
                function () {
                    console.log('Failed to add Favorite ');
                });
            
              $cordovaToast
                  .show('Added Favorite '+$scope.dish.name, 'long', 'bottom')
                  .then(function (success) {
                      // success
                  }, function (error) {
                      // error
                  });


        });
        
    };

    $scope.mycomment = {
        rating: 5,
        comment: ""
    };

    $scope.submitComment = function () {

        commentFactory.save({id: $stateParams.id}, $scope.mycomment);

        $scope.closeCommentForm();

        
        $scope.mycomment = {
            rating: 5,
            comment: ""
        };
        
        $state.go($state.current, null, {reload: true});
    }

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/dish-comment.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.commentForm = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeCommentForm = function () {
        $scope.commentForm.hide();
    };

    // Open the login modal
    $scope.showCommentForm = function () {
        $scope.commentForm.show();
        $scope.popover.hide();
    };
    
    $ionicPlatform.ready(function() {
 
        var message = $scope.dish.description;
        var subject = $scope.dish.name;
        var link = $scope.baseURL+$scope.dish.image;
        var image = $scope.baseURL+$scope.dish.image;
 
        $scope.nativeShare = function() {
            $cordovaSocialSharing
                .share(message, subject, link); // Share via native share sheet
        };
 
        //checkout http://ngcordova.com/docs/plugins/socialSharing/
        // for other sharing options
    });
    
}])


// implement the IndexController and About Controller here

.controller('IndexController', ['$scope', 'menuFactory', 'promotionFactory', 'corporateFactory', 'baseURL', function ($scope, menuFactory, promotionFactory, corporateFactory, baseURL) {
    
    $scope.baseURL = baseURL;


}])

.controller('AboutController', ['$scope', 'corporateFactory', 'baseURL', function ($scope, corporateFactory, baseURL) {

    $scope.baseURL = baseURL;
   

}])

.controller('FavoritesController', ['$scope', '$state', 'favoriteFactory', 'baseURL', '$ionicListDelegate', '$ionicPopup', '$ionicLoading', '$timeout', '$ionicPlatform', '$cordovaVibration', function ($scope, $state, favoriteFactory, baseURL, $ionicListDelegate, $ionicPopup, $ionicLoading, $timeout, $ionicPlatform, $cordovaVibration) {

    $scope.baseURL = baseURL;
    $scope.shouldShowDelete = false;

 

    $scope.toggleDelete = function () {
        $scope.shouldShowDelete = !$scope.shouldShowDelete;
        console.log($scope.shouldShowDelete);
    }

    $scope.deleteFavorite = function (dishid) {

        var confirmPopup = $ionicPopup.confirm({
            title: '<h3>Confirm Delete</h3>',
            template: '<p>Are you sure you want to delete this item?</p>'
        });

        confirmPopup.then(function (res) {
            if (res) {
                console.log('Ok to delete');
                favoriteFactory.delete({id: dishid});
         
               $state.go($state.current, {}, {reload: true});
               // $window.location.reload();
            } else {
                console.log('Canceled delete');
            }
        });
        $scope.shouldShowDelete = false;


    }

}])

;