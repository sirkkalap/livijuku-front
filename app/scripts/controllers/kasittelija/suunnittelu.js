'use strict';

var _ = require('lodash');
var angular = require('angular');

angular.module('jukufrontApp')
  .controller('KasittelijaSuunnitteluCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'HakemuskausiService', 'HakemusService', 'SuunnitteluService', 'StatusService', function ($rootScope, $scope, $location, $routeParams, HakemuskausiService, HakemusService, SuunnitteluService, StatusService) {

    $scope.lajitunnus = $routeParams.lajitunnus;
    $scope.tyyppi = $routeParams.tyyppi;
    $scope.vanhaArvo = 0;
    $scope.vuosi = $routeParams.vuosi;

    function haeMaararahat() {
      HakemuskausiService.haeMaararaha($scope.vuosi, $scope.lajitunnus)
        .success(function (data) {
          if (data != null) {
            $scope.maararaha = data.maararaha;
            $scope.ylijaama = data.ylijaama;
          } else {
            $scope.maararaha = 0;
            $scope.ylijaama = 0;
          }
          $scope.jaettavaraha = $scope.maararaha + $scope.ylijaama;
        })
        .error(function (data) {
          StatusService.virhe('HakemuskausiService.haeMaararaha(' + $scope.vuosi + ',' + $scope.lajitunnus + ')', data.message);
        });
    }

    function haeSuunnitteluData() {
      SuunnitteluService.hae($scope.vuosi, $scope.tyyppi)
        .success(function (data) {
          var hakemuksetSuunnitteluTmp = [];
          var organisaatiolajitunnus = "";
          $scope.haettuAvustusSum = 0;
          $scope.myonnettavaAvustusSum = 0;
          $scope.muutosSum = 0;
          _(angular.fromJson(data)).forEach(function (hakemus) {
              organisaatiolajitunnus = _.find($rootScope.organisaatiot, {'id': hakemus.organisaatioid}).lajitunnus;
              if (organisaatiolajitunnus == $scope.lajitunnus) {
                var muutos = 0;
                if (hakemus.hakemustilatunnus === 'T' || hakemus.hakemustilatunnus === 'P') {
                  $scope.haettuAvustusSum = $scope.haettuAvustusSum + hakemus['haettu-avustus'];
                  $scope.myonnettavaAvustusSum = $scope.myonnettavaAvustusSum + hakemus['myonnettava-avustus'];
                  muutos = hakemus['myonnettava-avustus'] - hakemus['haettu-avustus'];
                  $scope.muutosSum = $scope.muutosSum + muutos;
                }
                hakemuksetSuunnitteluTmp.push({
                  'hakemusId': hakemus.id,
                  'hakija': _.find($rootScope.organisaatiot, {'id': hakemus.organisaatioid}).nimi,
                  'hakemuksenTila': hakemus.hakemustilatunnus,
                  'haettuAvustus': hakemus['haettu-avustus'],
                  'muutos': muutos,
                  'myonnettavaAvustus': hakemus['myonnettava-avustus']
                });
              }
            }
          ).value();
          $scope.hakemuksetSuunnittelu = _.sortBy(hakemuksetSuunnitteluTmp, 'hakija');
        })
        .error(function (data) {
          StatusService.virhe('SuunnitteluService.hae(' + $routeParams.vuosi + ',' + $routeParams.tyyppi + ')', data.message);
        });
    }

    $scope.asetaVanhaArvo = function (arvo) {
      $scope.vanhaArvo = arvo;
    };

    $scope.hakijaSuuriKaupunkiseutu = function () {
      return $scope.lajitunnus == 'KS1';
    };

    $scope.hakijaKeskisuuriKaupunkiseutu = function () {
      return $scope.lajitunnus == 'KS2';
    };

    $scope.hakemusKeskenerainen = function (hakemus) {
      if (typeof hakemus === 'undefined') return false;
      return (hakemus.hakemuksenTila == 'K' || hakemus.hakemuksenTila == 'T0');
    };

    $scope.hakemusPaatetty = function (hakemus) {
      if (typeof hakemus === 'undefined') return false;
      return hakemus.hakemuksenTila == 'P';
    };

    $scope.hakemusTarkastettu = function (hakemus) {
      if (typeof hakemus === 'undefined') return false;
      return hakemus.hakemuksenTila == 'T';
    };

    $scope.hakemusTarkastamatta = function (hakemus) {
      if (typeof hakemus === 'undefined') return false;
      return hakemus.hakemuksenTila != 'T';
    };

    $scope.hakijaElyKeskus = function () {
      return $scope.lajitunnus == 'ELY';
    };

    $scope.onAvustushakemus = function () {
      return $scope.tyyppi == 'AH0';
    };

    $scope.onMaksatushakemus1 = function () {
      return $scope.tyyppi == 'MH1';
    };

    $scope.onMaksatushakemus2 = function () {
      return $scope.tyyppi == 'MH2';
    };

    $scope.sallittuAvustus = function (myonnettavaAvustus, haettuAvustus, tila) {
      if (tila == 'K' || tila == 'T0') return true;
      if (typeof myonnettavaAvustus === 'undefined') {
        return false;
      } else if (typeof myonnettavaAvustus === 'number') {
        return (myonnettavaAvustus >= 0 && myonnettavaAvustus <= haettuAvustus);
      }
      return true;
    };

    $scope.siirryPaatokseen = function (hakemusId, haettuavustus, avustus) {
      $location.path('/k/paatos/' + $routeParams.vuosi + '/' + $routeParams.tyyppi + '/' + $scope.lajitunnus + '/' + hakemusId + '/' + haettuavustus + '/' + avustus);
    };

    $scope.paivitaAvustus = function (avustus, hakemusid) {
      $scope.$broadcast('show-errors-check-validity');
      if ($scope.suunnitteluForm.$valid) {
        if (isNaN(avustus)) {
          haeSuunnitteluData();
        } else if (avustus != $scope.vanhaArvo) {
          SuunnitteluService.suunniteltuAvustus(avustus, hakemusid)
            .success(function () {
              StatusService.ok('SuunnitteluService.suunniteltuAvustus(' + avustus + ',' + hakemusid + ')', 'Myönnettävä avustus:' + avustus + ' € päivitetty.');
              haeSuunnitteluData();
            })
            .error(function (data) {
              StatusService.virhe('SuunnitteluService.suunniteltuAvustus(' + avustus + ',' + hakemusid + ')', data.message);
            });
        }
      }
    };

    $scope.paivitaKokonaismaararaha = function (arvo) {
      var muuttunut = false;
      if (arvo == 'maararaha') {
        if (isNaN($scope.maararaha)) {
          haeMaararahat();
        } else {
          muuttunut = $scope.maararaha != $scope.vanhaArvo;
        }
      }
      if (arvo == 'ylijaama') {
        if (isNaN($scope.ylijaama)) {
          haeMaararahat();
        } else {
          muuttunut = $scope.ylijaama != $scope.vanhaArvo;
        }
      }
      if (muuttunut) {
        var maararahadata = {
          'maararaha': $scope.maararaha,
          'ylijaama': $scope.ylijaama
        };
        HakemuskausiService.paivitaMaararaha($scope.vuosi, $scope.lajitunnus, maararahadata)
          .success(function () {
            haeMaararahat();
          })
          .error(function (data) {
            StatusService.virhe('HakemuskausiService.paivitaMaararaha(' + $scope.vuosi + ',' + $scope.lajitunnus + ',' + maararahadata + ')', data.message.message);
          });
      }
    };

    haeMaararahat();
    haeSuunnitteluData();
  }]);
