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
