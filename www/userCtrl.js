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
