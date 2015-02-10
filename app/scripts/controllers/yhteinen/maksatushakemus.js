'use strict';

angular.module('jukufrontApp')
  .controller('MaksatusHakemusCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'HakemusService', 'AvustuskohdeService', 'StatusService', '$upload', 'LiiteService', function ($rootScope, $scope, $location, $routeParams, HakemusService, AvustuskohdeService, StatusService, $upload, LiiteService) {

    function euroSyoteNumeroksi(arvo) {
      return parseFloat(arvo.replace(/[^0-9,]/g, '').replace(',', '.'));
    }

    function generoiTooltipArvot() {
      var maksatushakemus1Arvot = {};
      $scope.tooltipArvot = {};
      if ($scope.tyyppi == "MH1" || $scope.tyyppi == "MH2") {
        AvustuskohdeService.hae($scope.hakemusid)
          .success(function (data) {
            var avustushakemusArvot = {};
            avustushakemusArvot['psa1haettavaavustus'] = haeHaettavaavustus('PSA-1', data);
            avustushakemusArvot['psa1omarahoitus'] = haeOmarahoitus('PSA-1', data);
            avustushakemusArvot['psa2haettavaavustus'] = haeHaettavaavustus('PSA-2', data);
            avustushakemusArvot['psa2omarahoitus'] = haeOmarahoitus('PSA-2', data);
            avustushakemusArvot['psamhaettavaavustus'] = haeHaettavaavustus('PSA-M', data);
            avustushakemusArvot['psamomarahoitus'] = haeOmarahoitus('PSA-M', data);
            avustushakemusArvot['hkslhaettavaavustus'] = haeHaettavaavustus('HK-SL', data);
            avustushakemusArvot['hkslomarahoitus'] = haeOmarahoitus('HK-SL', data);
            avustushakemusArvot['hkklhaettavaavustus'] = haeHaettavaavustus('HK-KL', data);
            avustushakemusArvot['hkklomarahoitus'] = haeOmarahoitus('HK-KL', data);
            avustushakemusArvot['hkslhaettavaavustus'] = haeHaettavaavustus('HK-SL', data);
            avustushakemusArvot['hkslomarahoitus'] = haeOmarahoitus('HK-SL', data);
            avustushakemusArvot['hkllhaettavaavustus'] = haeHaettavaavustus('HK-LL', data);
            avustushakemusArvot['hkllomarahoitus'] = haeOmarahoitus('HK-LL', data);
            avustushakemusArvot['hktlhaettavaavustus'] = haeHaettavaavustus('HK-TL', data);
            avustushakemusArvot['hktlomarahoitus'] = haeOmarahoitus('HK-TL', data);
            avustushakemusArvot['kimhaettavaavustus'] = haeHaettavaavustus('K-IM', data);
            avustushakemusArvot['kimomarahoitus'] = haeOmarahoitus('K-IM', data);
            avustushakemusArvot['kmpkhaettavaavustus'] = haeHaettavaavustus('K-MPK', data);
            avustushakemusArvot['kmpkomarahoitus'] = haeOmarahoitus('K-MPK', data);
            avustushakemusArvot['kmkhaettavaavustus'] = haeHaettavaavustus('K-MK', data);
            avustushakemusArvot['kmkomarahoitus'] = haeOmarahoitus('K-MK', data);
            avustushakemusArvot['krthaettavaavustus'] = haeHaettavaavustus('K-RT', data);
            avustushakemusArvot['krtomarahoitus'] = haeOmarahoitus('K-RT', data);
            avustushakemusArvot['kmhaettavaavustus'] = haeHaettavaavustus('K-M', data);
            avustushakemusArvot['kmomarahoitus'] = haeOmarahoitus('K-M', data);
            _.forIn(avustushakemusArvot, function (value, key) {
              $scope.tooltipArvot[key] = 'Avustushakemus:' + value + ' €';
            });
            if ($scope.tyyppi == "MH2") {
              AvustuskohdeService.hae($scope.maksatusHakemus1id)
                .success(function (data) {
                  maksatushakemus1Arvot['psa1haettavaavustus'] = haeHaettavaavustus('PSA-1', data);
                  maksatushakemus1Arvot['psa1omarahoitus'] = haeOmarahoitus('PSA-1', data);
                  maksatushakemus1Arvot['psa2haettavaavustus'] = haeHaettavaavustus('PSA-2', data);
                  maksatushakemus1Arvot['psa2omarahoitus'] = haeOmarahoitus('PSA-2', data);
                  maksatushakemus1Arvot['psamhaettavaavustus'] = haeHaettavaavustus('PSA-M', data);
                  maksatushakemus1Arvot['psamomarahoitus'] = haeOmarahoitus('PSA-M', data);
                  maksatushakemus1Arvot['hkslhaettavaavustus'] = haeHaettavaavustus('HK-SL', data);
                  maksatushakemus1Arvot['hkslomarahoitus'] = haeOmarahoitus('HK-SL', data);
                  maksatushakemus1Arvot['hkklhaettavaavustus'] = haeHaettavaavustus('HK-KL', data);
                  maksatushakemus1Arvot['hkklomarahoitus'] = haeOmarahoitus('HK-KL', data);
                  maksatushakemus1Arvot['hkslhaettavaavustus'] = haeHaettavaavustus('HK-SL', data);
                  maksatushakemus1Arvot['hkslomarahoitus'] = haeOmarahoitus('HK-SL', data);
                  maksatushakemus1Arvot['hkllhaettavaavustus'] = haeHaettavaavustus('HK-LL', data);
                  maksatushakemus1Arvot['hkllomarahoitus'] = haeOmarahoitus('HK-LL', data);
                  maksatushakemus1Arvot['hktlhaettavaavustus'] = haeHaettavaavustus('HK-TL', data);
                  maksatushakemus1Arvot['hktlomarahoitus'] = haeOmarahoitus('HK-TL', data);
                  maksatushakemus1Arvot['kimhaettavaavustus'] = haeHaettavaavustus('K-IM', data);
                  maksatushakemus1Arvot['kimomarahoitus'] = haeOmarahoitus('K-IM', data);
                  maksatushakemus1Arvot['kmpkhaettavaavustus'] = haeHaettavaavustus('K-MPK', data);
                  maksatushakemus1Arvot['kmpkomarahoitus'] = haeOmarahoitus('K-MPK', data);
                  maksatushakemus1Arvot['kmkhaettavaavustus'] = haeHaettavaavustus('K-MK', data);
                  maksatushakemus1Arvot['kmkomarahoitus'] = haeOmarahoitus('K-MK', data);
                  maksatushakemus1Arvot['krthaettavaavustus'] = haeHaettavaavustus('K-RT', data);
                  maksatushakemus1Arvot['krtomarahoitus'] = haeOmarahoitus('K-RT', data);
                  maksatushakemus1Arvot['kmhaettavaavustus'] = haeHaettavaavustus('K-M', data);
                  maksatushakemus1Arvot['kmomarahoitus'] = haeOmarahoitus('K-M', data);
                  _.forIn(maksatushakemus1Arvot, function (value, key) {
                    $scope.tooltipArvot[key] = $scope.tooltipArvot[key] + '<br/>' + '1.Maksatushakemus:' + value + ' €';
                  });
                })
                .error(function (data) {
                  StatusService.virhe('AvustuskohdeService.hae(' + $scope.tyyppi + ',' + $scope.maksatusHakemus1id + ')', data);
                });
            }
          })
          .error(function (data) {
            StatusService.virhe('AvustuskohdeService.hae(' + $scope.tyyppi + ',' + $scope.hakemusid + ')', data);
          });
      }


    }

    function haeHaettavaavustus(avustuskohdelaji, data) {
      if (_.some(data, {'avustuskohdelajitunnus': avustuskohdelaji})) {
        return parseFloat((_.find(data, {'avustuskohdelajitunnus': avustuskohdelaji})).haettavaavustus);
      }
      else {
        return 0;
      }
    }

    function haeHakemukset() {
      HakemusService.hae($scope.maksatushakemusid)
        .success(function (data) {
          $scope.maksatushakemus = data;
          $scope.hakija = _.find($rootScope.organisaatiot, {'id': data.organisaatioid}).nimi;
          $scope.pankkitilinumero = _.find($rootScope.organisaatiot, {'id': data.organisaatioid}).pankkitilinumero;
          $scope.aikaleima = new Date();
        })
        .error(function (data) {
          StatusService.virhe('HakemusService.hae(' + $scope.maksatushakemusid + ')', data);
        });
      AvustuskohdeService.hae($scope.maksatushakemusid)
        .success(function (data) {
          $scope.psa1haettavaavustus = haeHaettavaavustus('PSA-1', data);
          $scope.psa1omarahoitus = haeOmarahoitus('PSA-1', data);
          $scope.psa2haettavaavustus = haeHaettavaavustus('PSA-2', data);
          $scope.psa2omarahoitus = haeOmarahoitus('PSA-2', data);
          $scope.psamhaettavaavustus = haeHaettavaavustus('PSA-M', data);
          $scope.psamomarahoitus = haeOmarahoitus('PSA-M', data);
          $scope.hkslhaettavaavustus = haeHaettavaavustus('HK-SL', data);
          $scope.hkslomarahoitus = haeOmarahoitus('HK-SL', data);
          $scope.hkklhaettavaavustus = haeHaettavaavustus('HK-KL', data);
          $scope.hkklomarahoitus = haeOmarahoitus('HK-KL', data);
          $scope.hkslhaettavaavustus = haeHaettavaavustus('HK-SL', data);
          $scope.hkslomarahoitus = haeOmarahoitus('HK-SL', data);
          $scope.hkllhaettavaavustus = haeHaettavaavustus('HK-LL', data);
          $scope.hkllomarahoitus = haeOmarahoitus('HK-LL', data);
          $scope.hktlhaettavaavustus = haeHaettavaavustus('HK-TL', data);
          $scope.hktlomarahoitus = haeOmarahoitus('HK-TL', data);
          $scope.kimhaettavaavustus = haeHaettavaavustus('K-IM', data);
          $scope.kimomarahoitus = haeOmarahoitus('K-IM', data);
          $scope.kmpkhaettavaavustus = haeHaettavaavustus('K-MPK', data);
          $scope.kmpkomarahoitus = haeOmarahoitus('K-MPK', data);
          $scope.kmkhaettavaavustus = haeHaettavaavustus('K-MK', data);
          $scope.kmkomarahoitus = haeOmarahoitus('K-MK', data);
          $scope.krthaettavaavustus = haeHaettavaavustus('K-RT', data);
          $scope.krtomarahoitus = haeOmarahoitus('K-RT', data);
          $scope.kmhaettavaavustus = haeHaettavaavustus('K-M', data);
          $scope.kmomarahoitus = haeOmarahoitus('K-M', data);
        })
        .error(function (data) {
          StatusService.virhe('AvustuskohdeService.hae(' + $scope.tyyppi + ',' + $scope.maksatushakemusid + ')', data);
        });
      haeLiitteet();

    };

    function haeLiitteet() {
      LiiteService.haeKaikki($scope.maksatushakemusid)
        .success(function (data) {
          $scope.liitteet = data;
        })
        .error(function (data) {
          StatusService.virhe('LiiteService.hae(' + $scope.maksatushakemusid + ')', data);
        });
    }

    function haeOmarahoitus(avustuskohdelaji, data) {
      if (_.some(data, {'avustuskohdelajitunnus': avustuskohdelaji})) {
        return parseFloat((_.find(data, {'avustuskohdelajitunnus': avustuskohdelaji})).omarahoitus);
      }
      else {
        return 0;
      }
    }

    $scope.hakemusid = $routeParams.id;
    $scope.maksatusHakemus1id = $routeParams.m1id;
    $scope.maksatusHakemus2id = $routeParams.m2id;
    $scope.myFiles = [];
    $scope.tyyppi = $routeParams.tyyppi;
    if ($scope.tyyppi == "MH1") {
      $scope.maksatushakemusid = $scope.maksatusHakemus1id;
      $scope.ajankohta = '1.1.-30.6.';
    } else if ($scope.tyyppi == "MH2") {
      $scope.maksatushakemusid = $scope.maksatusHakemus2id;
      $scope.ajankohta = '1.7.-31.12.';
    }
    $scope.vuosi = $routeParams.vuosi;

    $scope.$watch('myFiles', function () {
      for (var i = 0; i < $scope.myFiles.length; i++) {
        var file = $scope.myFiles[i];
        console.log('Watched:' + file.name);
        $scope.upload = $upload.upload({
          url: 'api/hakemus/' + $routeParams.id + '/liite',
          method: 'POST',
          data: {myObj: $scope.myModelObj},
          file: file,
          fileFormDataName: 'liite'
        }).progress(function (evt) {
          console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :' + evt.config.file.name);
        }).success(function (data, status, headers, config) {
          console.log('Liiteen lataus: ' + config.file.name + ' onnistui. Paluuarvo: ' + data);
          StatusService.ok('Liitteen lataus(' + config.file.name + ')', 'Liitteen lataus:' + config.file.name + ' onnistui.');
          haeLiitteet();
        }).error(function (data, status, headers, config) {
          console.log('Liitteen lataus: ' + config.file.name + ' epaonnistui. Paluuarvo: ' + data);
          //StatusService.virhe('Liitteen lataus('+config.file.name+')','Liitteen lataus:' + config.file.name + ' epaonnistui:'+data);
        });
      }
    });

    $scope.lahetaAvustushakemus = function () {
      $scope.$broadcast('show-errors-check-validity');
      if ($scope.avustusHakemusForm.$valid) {
        HakemusService.laheta($scope.maksatushakemus.id)
          .success(function () {
            StatusService.ok('HakemusService.laheta(' + $scope.maksatushakemus.id + ')', 'Lähettäminen onnistui.');
            $location.path('/h/hakemukset');
          })
          .error(function (data) {
            StatusService.virhe('HakemusService.laheta(' + $scope.maksatushakemus.id + ')', data);
          });
      }
    };

    $scope.naytaAvustushakemus = function () {
      $location.path('/h/hakemus/esikatselu/' + $scope.maksatushakemus.id);
    };

    $scope.omarahoitusRiittava = function (omarahoitus, haettavarahoitus) {
      var omarahoitus2, haettavarahoitus2;
      if ((typeof omarahoitus === 'undefined') || (typeof haettavarahoitus === 'undefined')) return true;
      if (typeof omarahoitus === 'string') {
        omarahoitus2 = euroSyoteNumeroksi(omarahoitus);
      }
      if (typeof haettavarahoitus === 'string') {
        haettavarahoitus2 = euroSyoteNumeroksi(haettavarahoitus);
      }
      if (typeof omarahoitus === 'number') {
        omarahoitus2 = parseFloat(omarahoitus);
      }
      if (typeof haettavarahoitus === 'number') {
        haettavarahoitus2 = parseFloat(haettavarahoitus);
      }
      return haettavarahoitus2 <= omarahoitus2;
    };

    $scope.poistaLiite = function (liiteid) {
      LiiteService.poista($routeParams.id, liiteid)
        .success(function (data) {
          StatusService.ok('LiiteService.poista(' + $routeParams.id + ',' + liiteid + ')', 'Liite poistettiin onnistuneesti');
          haeLiitteet();
        })
        .error(function (data) {
          StatusService.virhe('LiiteService.poista(' + $routeParams.id + ',' + liiteid + ')', data);
        });
    };

    $scope.positiivinenArvo = function (value) {
      return parseFloat(value) >= 0;
    };

    $scope.tallennaAvustushakemus = function () {
      $scope.$broadcast('show-errors-check-validity');
      if ($scope.maksatusHakemusForm.$valid) {
        var avustuskohteet = [
          {
            'hakemusid': $scope.maksatushakemus.id,
            'avustuskohdelajitunnus': 'PSA-1',
            'haettavaavustus': $scope.psa1haettavaavustus,
            'omarahoitus': $scope.psa1omarahoitus
          },
          {
            'hakemusid': $scope.maksatushakemus.id,
            'avustuskohdelajitunnus': 'PSA-2',
            'haettavaavustus': $scope.psa2haettavaavustus,
            'omarahoitus': $scope.psa2omarahoitus
          },
          {
            'hakemusid': $scope.maksatushakemus.id,
            'avustuskohdelajitunnus': 'PSA-M',
            'haettavaavustus': $scope.psamhaettavaavustus,
            'omarahoitus': $scope.psamomarahoitus
          },
          {
            'hakemusid': $scope.maksatushakemus.id,
            'avustuskohdelajitunnus': 'HK-SL',
            'haettavaavustus': $scope.hkslhaettavaavustus,
            'omarahoitus': $scope.hkslomarahoitus
          },
          {
            'hakemusid': $scope.maksatushakemus.id,
            'avustuskohdelajitunnus': 'HK-KL',
            'haettavaavustus': $scope.hkklhaettavaavustus,
            'omarahoitus': $scope.hkklomarahoitus
          },
          {
            'hakemusid': $scope.maksatushakemus.id,
            'avustuskohdelajitunnus': 'HK-LL',
            'haettavaavustus': $scope.hkllhaettavaavustus,
            'omarahoitus': $scope.hkllomarahoitus
          },
          {
            'hakemusid': $scope.maksatushakemus.id,
            'avustuskohdelajitunnus': 'HK-TL',
            'haettavaavustus': $scope.hktlhaettavaavustus,
            'omarahoitus': $scope.hktlomarahoitus
          },
          {
            'hakemusid': $scope.maksatushakemus.id,
            'avustuskohdelajitunnus': 'K-IM',
            'haettavaavustus': $scope.kimhaettavaavustus,
            'omarahoitus': $scope.kimomarahoitus
          },
          {
            'hakemusid': $scope.maksatushakemus.id,
            'avustuskohdelajitunnus': 'K-MPK',
            'haettavaavustus': $scope.kmpkhaettavaavustus,
            'omarahoitus': $scope.kmpkomarahoitus
          },
          {
            'hakemusid': $scope.maksatushakemus.id,
            'avustuskohdelajitunnus': 'K-MK',
            'haettavaavustus': $scope.kmkhaettavaavustus,
            'omarahoitus': $scope.kmkomarahoitus
          },
          {
            'hakemusid': $scope.maksatushakemus.id,
            'avustuskohdelajitunnus': 'K-RT',
            'haettavaavustus': $scope.krthaettavaavustus,
            'omarahoitus': $scope.krtomarahoitus
          },
          {
            'hakemusid': $scope.maksatushakemus.id,
            'avustuskohdelajitunnus': 'K-M',
            'haettavaavustus': $scope.kmhaettavaavustus,
            'omarahoitus': $scope.kmomarahoitus
          }
        ];
        AvustuskohdeService.tallenna(avustuskohteet)
          .success(function () {
            var tallennusOk = true;
            if ($scope.maksatushakemus.selite !== null) {
              var selitedata = {
                'selite': $scope.maksatushakemus.selite,
                'hakemusid': $scope.maksatushakemus.id
              };
              HakemusService.tallennaSelite(selitedata)
                .success(function () {
                })
                .error(function (data) {
                  StatusService.virhe('HakemusService.tallennaSelite(' + selitedata + ')', data);
                  tallennusOk = false;
                });
            }
            if (tallennusOk) {
              StatusService.ok('AvustuskohdeService.tallenna()', 'Tallennus onnistui.');
              haeHakemukset();
            }
          })
          .error(function (data) {
            StatusService.virhe('AvustuskohdeService.tallenna()', data);
          });
      } else {
        StatusService.virhe('AvustuskohdeService.tallenna()', 'Korjaa lomakkeen virheet ennen tallentamista.');
      }
    };

    $scope.tarkastaAvustushakemus = function () {
      HakemusService.tarkasta($scope.maksatushakemus.id)
        .success(function () {
          StatusService.ok('HakemusService.tarkasta(' + $scope.maksatushakemus.id + ')', 'Hakemus päivitettiin tarkastetuksi.');
          $location.path('/k/hakemukset');
        })
        .error(function (data) {
          StatusService.virhe('HakemusService.tarkasta(' + $scope.maksatushakemus.id + ')', data);
        });
    };

    haeHakemukset();
    generoiTooltipArvot();
  }
  ])
;