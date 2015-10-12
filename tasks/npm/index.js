var utils = require('shipit-utils');

/**
 * Register bower tasks.
 * - bower
 * - bower:install
 * - bower:run
 */

module.exports = function (gruntOrShipit) {
  var shipit = utils.getShipit(gruntOrShipit);

  require('./init')(gruntOrShipit);
  require('./install')(gruntOrShipit);
  require('./cmd')(gruntOrShipit);

  utils.registerTask(gruntOrShipit, 'bower:run', [
    'bower:init',
    'bower:cmd'
  ]);

  shipit.on('deploy', function () {
    shipit.start('bower:init');

    shipit.on('bower_inited', function () {
      if (shipit.config.bower.triggerEvent) {
        shipit.on(shipit.config.bower.triggerEvent, function () {
          shipit.start('bower:install');
        });
      }
    });

  });
};
