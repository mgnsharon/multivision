angular.module('mv.notification', [])
  .value('mvNotifierLib', toastr)

  .factory('mvNotifier', function(mvNotifierLib, $log) {
    return {
      success: function(msg, title) {
        mvNotifierLib.success(msg, title);
        $log.info(msg);
      },
      error: function(msg, title) {
        mvNotifierLib.error(msg, title);
        $log.error(msg);
      },
      warn: function(msg, title) {
        mvNotifierLib.warning(msg, title);
        $log.error(msg);
      }
    }
  });