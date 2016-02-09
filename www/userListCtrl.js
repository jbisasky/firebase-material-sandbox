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
