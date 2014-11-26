'use strict';

/**
 * @ngdoc function
 * @name jukufrontApp.controller:KasHakemusCtrl
 * @description
 * # KasHakemusCtrl
 * Controller of the jukufrontApp
 * */

angular.module('jukufrontApp')
  .controller('KasHakemusCtrl', function ($scope, $location, Osasto, HakemuksetOsasto){
    Osasto.getOsasto('Pori')
      .then(function (data) {
        $scope.osastoTiedot = data;
      });
    HakemuksetOsasto.getAvustushakemus('Pori', '2015')
      .then(function (data) {
        $scope.avustushakemus = data;
      });

    $scope.tarkastaAvustushakemus = function () {
      $scope.avustushakemus.avustushakemusstatus = 'Tarkastettu';
      $scope.avustushakemus.aikaleima =  new Date();
      HakemuksetOsasto.saveAvustushakemus('Pori', '2015',$scope.avustushakemus )
        .then(function (data) {
          $scope.sendAvustushakemusStatus = data;
        });
      $location.path('/k/hakemukset');
    };

    $scope.saveAvustushakemus = function () {
      $scope.avustushakemus.avustushakemusstatus = 'Keskeneräinen';
      $scope.avustushakemus.aikaleima =  new Date();
      HakemuksetOsasto.saveAvustushakemus('Pori', '2015',$scope.avustushakemus )
        .then(function (data) {
          $scope.saveAvustushakemusStatus = data;
        });
    };
  });
