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
