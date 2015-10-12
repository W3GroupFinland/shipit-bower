var utils = require('shipit-utils');
var path = require('path');
/**
 * Init task.
 * - Emit bower_inited event.
 */

module.exports = function (gruntOrShipit) {
  utils.registerTask(gruntOrShipit, 'bower:init', task);

  function task() {
    var shipit = utils.getShipit(gruntOrShipit);

    shipit.config = shipit.config || {};
    shipit.currentPath = shipit.config.deployTo ? path.join(shipit.config.deployTo, 'current') : undefined;
    shipit.config.bower = shipit.config.bower || {};
    shipit.config.bower.remote = shipit.config.bower.remote !== false;
    shipit.config.bower.installArgs = shipit.config.bower.installArgs || [];
    shipit.config.bower.installFlags = shipit.config.bower.installFlags || [];

    var triggerEvent = shipit.config.bower.remote ? 'updated' : 'fetched';
    shipit.config.bower.triggerEvent = shipit.config.bower.triggerEvent !== undefined ? shipit.config.bower.triggerEvent : triggerEvent;

    shipit.bower_inited = true;
    shipit.emit('bower_inited');
  }
};
