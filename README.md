# shipit-bower

___This project is no longer maintained or updated and is archived. Should you choose to fork it, please maintain the proper license and credits.___

___Since Bower itself recommends switching to NPM, please consider doing so and using the appropriate Shipit library___

A set of tasks for [Shipit](https://github.com/shipitjs/shipit) used for [bower](https://bower.io/) specific tasks on deploy.

This is a modified version of the [shipit-npm](https://github.com/callerc1/shipit-npm) extension by [@callerc1](https://github.com/callerc1). This extension was forked from the 0.2.0 tag and is feature matched to that version. The majority of the work was undertaken by @callerc1 who set up a well written plug-in that was easy to repurpose.

**Features:**

- Triggered on the `updated` or `fetched` event from [shipit-deploy](https://github.com/shipitjs/shipit-deploy)
- Has a direct pass though task to [bower api](http://bower.io/docs/api/)
- Works via [shipit-cli](https://github.com/shipitjs/shipit) and [grunt-shipit](https://github.com/shipitjs/grunt-shipit)

## Install

```sh
$ npm install shipit-bower
```

## Usage

Just simply run: (This triggers the `bower` task on the deploy `updated` or `fetched` event. No additional config necessary.)

```sh
$ shipit staging deploy

```

Or you can run the tasks separatly :

```sh
$ shipit staging bower:init bower:install
$ shipit staging bower:run --cmd "update"

```

## Options `shipit.config.bower`

### `bower.remote`

Type: `Boolean`
Default: `true`

A Boolean to determine whether to run the task in local workspace or on the remote.

### `bower.installArgs`

Type: `Array` or `String`
Default: []

An array or string specifying bower args passed to the [bower install](http://bower.io/docs/api/#install) cmd.

### `bower.installFlags`

Type: `Array` or `String`
Default: []

An array or string specifying bower flags passed to the [bower install](http://bower.io/docs/api/#install) cmd.

### `bower.triggerEvent`

Type: `String`,`Boolean`
Default: `updated` or `fetched` (depending on `bower.remote` value)

An event name that triggers `bower:install`. Can be set to false to prevent the `bower:install` task from listening to any events.

### Example `shipitfile.js` options usage

```js
module.exports = function (shipit) {
  require('shipit-deploy')(shipit);
  require('shipit-bower')(shipit);

  shipit.initConfig({
    default: {
      bower: {
        remote: false,
        installArgs: ['materialize'],
        installFlags: ['--save']
      }
    }
  });
};
```

## Workflow tasks

- bower
  - bower:init
      - Emit event "bower_inited".
  - bower:install
    - Runs bower install (with any Args `bower.installArgs` or Flags `bower.installFlags` defined in options)
    - Emit event "bower_installed"
  - bower:run
      - Runs bower command.

##### Event flow:

- on Event "deploy" (shipit-deploy initialized)
  - Runs *bower:init*
  - on Event "bower_inited"
    - Runs *bower:install* (Triggered on the `updated` or `fetched` event from [shipit-deploy](https://github.com/shipitjs/shipit-deploy) or by a custom `bower.triggerEvent` as mentioned above.)

## License

MIT
