'use strict';

angular.module('jukufrontApp')
  .controller('KasittelijaHakemuksetCtrl', ['$rootScope', '$scope', '$filter', '$location', 'HakemuskausiService', '$routeParams', 'StatusService', function ($rootScope, $scope, $filter, $location, HakemuskausiService, $routeParams, StatusService) {

    function haeHakemukset() {
      HakemuskausiService.hae()
        .success(function (data) {
          var hakemuskaudetTmp = [];
          _(angular.fromJson(data)).forEach(function (hakemuskausi) {
            var ks1HakemuksetPerVuosi = [];
            var ks2HakemuksetPerVuosi = [];
            var elyHakemuksetPerVuosi = [];
            var organisaatiolajitunnus = "";
            _.filter(hakemuskausi.hakemukset, {'hakemustyyppitunnus': $scope.tyyppi}).forEach(function (hakemus) {
              organisaatiolajitunnus = _.find($rootScope.organisaatiot, {'id': hakemus.organisaatioid}).lajitunnus;
              if (organisaatiolajitunnus == "KS1") {
                ks1HakemuksetPerVuosi.push({
                  'hakija': _.find($rootScope.organisaatiot, {'id': hakemus.organisaatioid}).nimi,
                  'hakemuksenTila': hakemus.hakemustilatunnus,
                  'viimeisinMuutos': Number(new Date(hakemus.muokkausaika)),
                  'diaarinumero': hakemus.diaarinumero,
                  'kasittelija': 'Ei määritelty',
                  'id': hakemus.id,
                  'avustushakemusId': _.result(_.find(hakemuskausi.hakemukset, function (h) {
                    return (h.organisaatioid == hakemus.organisaatioid && h.hakemustyyppitunnus == 'AH0')
                  }), 'id'),
                  'maksatushakemus1Id': _.result(_.find(hakemuskausi.hakemukset, function (h) {
                    return (h.organisaatioid == hakemus.organisaatioid && h.hakemustyyppitunnus == 'MH1')
                  }), 'id'),
                  'maksatushakemus2Id': _.result(_.find(hakemuskausi.hakemukset, function (h) {
                    return (h.organisaatioid == hakemus.organisaatioid && h.hakemustyyppitunnus == 'MH2')
                  }), 'id')
                });
              } else if (organisaatiolajitunnus == "KS2") {
                ks2HakemuksetPerVuosi.push({
                  'hakija': _.find($rootScope.organisaatiot, {'id': hakemus.organisaatioid}).nimi,
                  'hakemuksenTila': hakemus.hakemustilatunnus,
                  'viimeisinMuutos': Number(new Date(hakemus.muokkausaika)),
                  'diaarinumero': hakemus.diaarinumero,
                  'kasittelija': 'Ei määritelty',
                  'id': hakemus.id,
                  'avustushakemusId': _.result(_.find(hakemuskausi.hakemukset, function (h) {
                    return (h.organisaatioid == hakemus.organisaatioid && h.hakemustyyppitunnus == 'AH0')
                  }), 'id'),
                  'maksatushakemus1Id': _.result(_.find(hakemuskausi.hakemukset, function (h) {
                    return (h.organisaatioid == hakemus.organisaatioid && h.hakemustyyppitunnus == 'MH1')
                  }), 'id'),
                  'maksatushakemus2Id': _.result(_.find(hakemuskausi.hakemukset, function (h) {
                    return (h.organisaatioid == hakemus.organisaatioid && h.hakemustyyppitunnus == 'MH2')
                  }), 'id')
                });
              } else if (organisaatiolajitunnus == "ELY") {
                elyHakemuksetPerVuosi.push({
                  'hakija': _.find($rootScope.organisaatiot, {'id': hakemus.organisaatioid}).nimi,
                  'hakemuksenTila': hakemus.hakemustilatunnus,
                  'viimeisinMuutos': Number(new Date(hakemus.muokkausaika)),
                  'diaarinumero': hakemus.diaarinumero,
                  'kasittelija': 'Ei määritelty',
                  'id': hakemus.id,
                  'avustushakemusId': _.result(_.find(hakemuskausi.hakemukset, function (h) {
                    return (h.organisaatioid == hakemus.organisaatioid && h.hakemustyyppitunnus == 'AH0')
                  }), 'id'),
                  'maksatushakemus1Id': _.result(_.find(hakemuskausi.hakemukset, function (h) {
                    return (h.organisaatioid == hakemus.organisaatioid && h.hakemustyyppitunnus == 'MH1')
                  }), 'id'),
                  'maksatushakemus2Id': _.result(_.find(hakemuskausi.hakemukset, function (h) {
                    return (h.organisaatioid == hakemus.organisaatioid && h.hakemustyyppitunnus == 'MH2')
                  }), 'id')
                });
              }
            });
            hakemuskaudetTmp.push({
              'vuosi': hakemuskausi.vuosi,
              'ks1HakemuksetPerVuosi': _.sortBy(ks1HakemuksetPerVuosi, 'hakija'),
              'ks2HakemuksetPerVuosi': _.sortBy(ks2HakemuksetPerVuosi, 'hakija'),
              'elyHakemuksetPerVuosi': _.sortBy(elyHakemuksetPerVuosi, 'hakija'),
              'accordionOpen': false
            });
          });
          $scope.hakemukset = _.sortBy(hakemuskaudetTmp, 'vuosi').reverse();
          if ($scope.hakemukset.length > 0) {
            $scope.hakemukset[0].accordionOpen = true;
          }
          $scope.kasiteltavatAvustushakemukset = laskeLukumaara('AH0', data);
          $scope.kasiteltavatMaksatus1hakemukset = laskeLukumaara('MH1', data);
          $scope.kasiteltavatMaksatus2hakemukset = laskeLukumaara('MH2', data);
        })
        .error(function (data) {
          StatusService.virhe('OrganisaatioService.hae(): ' + data);
        });
    }

    function laskeLukumaara(tyyppi, hakemukset) {
      var lukumaara = 0;
      _(angular.fromJson(hakemukset)).forEach(function (hakemuskausi) {
        var hakemuksetPerTyyppiperHakemuskausi = _.filter(hakemuskausi.hakemukset, {
          'hakemustilatunnus': "V",
          'hakemustyyppitunnus': tyyppi
        });
        if (hakemuksetPerTyyppiperHakemuskausi != 'undefined'){
          lukumaara = lukumaara + _.size(hakemuksetPerTyyppiperHakemuskausi);
        }
      })
      return lukumaara;
    }

    $scope.displayed = [];
    $scope.tyyppi = $routeParams.tyyppi;

    $scope.asetaTyyppi = function (tyyppi) {
      $location.path('/k/hakemukset/' + tyyppi);
    };

    $scope.siirryHakemukseen = function (vuosi, tyyppi, hakemusId, maksatusHakemus1Id, maksatusHakemus2Id) {
      $location.path('/k/hakemus/' + vuosi + '/' + tyyppi + '/' + hakemusId + '/' + maksatusHakemus1Id + '/' + maksatusHakemus2Id);
    };
    $scope.siirrySuunnitteluun = function (vuosi, tyyppi, lajitunnus) {
      $location.path('/k/suunnittelu/' + vuosi + '/' + tyyppi + '/' + lajitunnus);
    };

    haeHakemukset();

  }
  ]);

