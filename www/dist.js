(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  'use strict';

  angular.module('app', [
      'ui.router',
      'ngMaterial',
      'firebase'
  ])
  .config(['$stateProvider', '$urlRouterProvider', require('./appRouter')])
  .controller('appCtrl', require('./appCtrl'))
  .controller('userListCtrl', require('./userListCtrl'))
  .controller('userCtrl', require('./userCtrl'))
  .controller('chatCtrl', require('./chatCtrl'))
  .factory('firebaseFactory', require('./firebaseFactory'))
  .constant('FIRE_URL', 'https://material-sandbox.firebaseio.com/');
})();

},{"./appCtrl":2,"./appRouter":3,"./chatCtrl":4,"./firebaseFactory":5,"./userCtrl":6,"./userListCtrl":7}],2:[function(require,module,exports){
(function() {
  'use strict';

  module.exports = appCtrl;

  appCtrl.$inject = ['$state'];

  function appCtrl($state) {
    var vm = this;
    vm.goToUsers = goToUsers;

    function goToUsers() {
      $state.go('userList');
    }

    function goToNewUser() {
      console.log('user');
      $state.go('user');
    }
  }
})();

},{}],3:[function(require,module,exports){
(function() {
  'use strict';

  module.exports = function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/chat');

    $stateProvider
    .state('userList', {
      url: '/userList',
      views: {
        'view': {
          templateUrl: 'userList.html',
          controller: 'userListCtrl as vmc',
        }
      }
    })
    .state('user', {
      url: '/user',
      views: {
        'view': {
          templateUrl: 'user.html',
          controller: 'userCtrl as vmc',
        }
      }
    })
    .state('chat', {
      url: '/chat',
      views: {
        'view': {
          templateUrl: 'chat.html',
          controller: 'chatCtrl as vmc',
        }
      }
    });
  };
})();

},{}],4:[function(require,module,exports){
(function() {
  'use strict';

  module.exports = chatCtrl;
  chatCtrl.$inject = ['firebaseFactory'];

  function chatCtrl(firebaseFactory) {
    var vmc = this;

    vmc.postChat = postChat;
    vmc.chat = firebaseFactory.getAll('chat');
    vmc.savedUsers = firebaseFactory.getAll('user');

    function postChat() {
      if(vmc.name && vmc.message) {
        var newMessage = {
          name: vmc.name,
          message: vmc.message,
        };

        console.log(newMessage);

        firebaseFactory.insertDb('chat', newMessage);
        vmc.message = '';
      }
    }

  }
})();

},{}],5:[function(require,module,exports){
(function() {
  'use strict';

  module.exports = firebaseFactory;

  firebaseFactory.$inject = ['$firebaseArray', '$firebaseObject', 'FIRE_URL'];

  //
  function firebaseFactory($firebaseArray, $firebaseObject, FIRE_URL) {
    // var _ref = new Firebase(FIRE_URL);

    var svc = {
        getAll: getAll,
        insertDb: insertDb,
        updateDb: updateDb,
        deleteDb: deleteDb
      };
    return svc;

    /*
      getAll
      get all records at the given path
      @param path: 'table' name (path to data structure)
      @return: reference to data structure
    */
    function getAll(path) {
      var ref = new Firebase(FIRE_URL + path);
      return $firebaseArray(ref);
    }

    /*
      insertDb
      insert a new record at the given path
      @param path: 'table' name (path to data structure)
      @param data: new data to insert, any format suitable tho JSON preferred
      @return: location in the array
    */
    function insertDb(path, data) {
      var ref = new Firebase(FIRE_URL + path);
      var arrayList = $firebaseArray(ref);
      console.log(path + ' ' + data);
      arrayList.$add({data: data}).then(function(ref) {
        var id = ref.key();
        arrayList.$indexFor(id); // returns location in the array
      });
    }

    /*
      updateDb
      update a record at the given path
      @param path: 'table' name (path to data structure)
      @param item: item id used to look up record up update, item.data used to
          update the record
    */
    function updateDb(path, item) {
      var ref = new Firebase(FIRE_URL + path + '/' + item.$id);
      var obj = $firebaseObject(ref);
      obj.data = item.data;
      obj.$save().then(function(ref) {
        ref.key() == obj.$id;
      }, function(error) {
        console.log('Error: ', error);
      });

    }


    /*
      deleteDb
      delete a record at the given path
      @param path: 'table' name (path to data structure)
      @param item: item id used to look up record to delete
    */
    function deleteDb(path, item) {
      if(item.$id) {
        var ref = new Firebase(FIRE_URL + path + '/' + item.$id);
        var obj = $firebaseObject(ref);
        obj.$remove().then(function(ref) {
          // data has been deleted locally and in the DB
        }, function(error) {
          console.log('Error: ', error);
        });
      }
    }
 }
})();

},{}],6:[function(require,module,exports){
(function() {
  'use strict';

  module.exports = userCtrl;

  userCtrl.$inject = ['firebaseFactory'];

  function userCtrl(firebaseFactory) {
    var vmc = this;
    vmc.addUser = addUser;

    function addUser() {
      if(vmc.name && vmc.email) {
        var newUser = {
          name: vmc.name,
          email: vmc.email,
        };

        firebaseFactory.insertDb('user', newUser);
        vmc.name = '';
        vmc.email = '';
      }
    }
  }
})();

},{}],7:[function(require,module,exports){
(function() {
  'use strict';

  module.exports = userListCtrl;
  userListCtrl.$inject = ['$firebaseArray', 'firebaseFactory']
  // now $firebaseObject, $firebaseArray, $firebaseAuth services are available
  //    to be injected into any controller, service, or factory

  function userListCtrl($firebaseArray, firebaseFactory) {
    var vmc = this;
    
    vmc.users = firebaseFactory.getAll('user');
    vmc.updateUser = updateUser;
    vmc.deleteUser = deleteUser;

    function updateUser(user){
      firebaseFactory.updateDb('user', user);
    }

    function deleteUser(user) {
      firebaseFactory.deleteDb('user', user);
    }

  }
})();

},{}]},{},[1]);
