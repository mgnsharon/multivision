angular.module('mv.notification', [])
  .value('mvNotifierLib', toastr)

  .factory('mvNotifier', function (mvNotifierLib) {
    mvNotifierLib.options.closeButton = true;
    return {
      success: function (msg, title) {
        mvNotifierLib.success(msg, title);
      },
      error: function (msg, title) {
        mvNotifierLib.error(msg, title);
      },
      warn: function (msg, title) {
        mvNotifierLib.warning(msg, title);
      }
    };
  });