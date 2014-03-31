

angular.module('optinomic.services', [])

.factory('app_settings', function($http) {


return {
        // ------------------------------------------
        // Settings
        // ------------------------------------------
        fake_data: true
        }


})



.factory('JSON_up', function($http) {
  // Might use a resource here that returns a JSON array




  // Some fake testing data
  var therapy_server_json = [
      {
          "result":{
              "hospital":{
                  "address":"Südhang 1",
                  "city":"3038 Kirchlindach",
                  "fax":"",
                  "name":"Klinik Südhang Kirchlindach",
                  "email":"info@suedhang.ch",
                  "phone":"+41 79 635 85 84",
                  "description":"Kompetenzzentrum für Mensch und Sucht",
                  "website":"http://www.suedhang.ch/",
                  "ou":""
              },
              "careteam":[
                  {
                      "email":"beat@optinomic.org",
                      "phone":"+41 81 508 57 73",
                      "firstName":"Beat",
                      "lastName":"Ottiger"
                  },
                  {
                      "email":"beat@optinomic.org",
                      "phone":"079 635 85 84",
                      "firstName":"Peter",
                      "lastName":"Allemann"
                  }
              ]
          },
          "filled":"2014-03-03T21:09:35.999Z"
      },
      {
          "result":{
              "url":"http://survey.optinomix.org/takesurvey/4743e0591fb99ad8",
              "moduleName":"Daily Mood"
          },
          "filled":"2014-03-03T21:09:36.105Z"
      },
      {
          "result":{
              "url":"http://dev.openpsychotherapy.org/index.php/survey/index/sid/353683/newtest/Y/lang/de?&353683X17X292=763e6eed10399cee&353683X14X237=145",
              "moduleName":"BSCL"
          },
          "filled":"2014-03-03T21:09:36.105Z"
      },
      {
          "result":{
              "url":"http://dev.openpsychotherapy.org/index.php/survey/index/sid/183511/newtest/Y/lang/de?&183511X30X438=170ec6cb779ee558&183511X30X439=2998877",
              "moduleName":"Satisfaction"
          },
          "filled":"2014-03-03T21:09:36.105Z"
      }
  ];

  





  return {
    all: function() {
      return therapy_server_json;
   },
    get: function(myId) {
      // Simple index lookup
      return therapy_server_json[myId];
    }
  }


});
