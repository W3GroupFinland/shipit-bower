var utils = require('shipit-utils');
var chalk = require('chalk');
var sprintf = require('sprintf-js').sprintf;
var Bluebird = require('bluebird');

/**
 * Runs bower install
 */

module.exports = function (gruntOrShipit) {
  utils.registerTask(gruntOrShipit, 'bower:install', task);

  function task() {
    var shipit = utils.getShipit(gruntOrShipit);

    function install(remote) {

      shipit.log('Installing bower modules.');
      var method = remote ? 'remote' : 'local';
      var cdPath = remote ? shipit.releasePath || shipit.currentPath : shipit.config.workspace || shipit.workspace;

      if(!cdPath) {
        var msg = remote ? 'Please specify a deploy to path (shipit.config.deployTo)' : 'Please specify a workspace (shipit.config.workspace)'
        throw new Error(
          shipit.log(chalk.red(msg))
        );
      }

      var args = Array.isArray(shipit.config.bower.installArgs) ? shipit.config.bower.installArgs.join(' ') : shipit.config.bower.installArgs;
      var flags = Array.isArray(shipit.config.bower.installFlags) ? shipit.config.bower.installFlags.join(' ') : shipit.config.bower.installFlags;
      var AF = args ? flags ? args.concat(' ',flags) : args : flags ? flags : '';

      return shipit[method](
        sprintf('node -v && cd %s && bower i %s', cdPath, AF)
      );

    }

    if(shipit.bower_inited) {

      return install(shipit.config.bower.remote)
      .then(function () {
        shipit.log(chalk.green('bower install complete'));
      })
      .then(function () {
        shipit.emit('bower_installed')
      })
      .catch(function (e) {
        shipit.log(chalk.red(e));
      });

    }else {
      throw new Error(
        shipit.log(
          chalk.gray('try running bower:init before bower:install')
        )
      );
    }
  }
};
