(function (root) {
  var _sidebarClicked;
  var CHANGE_EVENT = 'changed';

  var setClicked = function (id) {
    sidebarClicked = SidebarStore.find(id);
    _sidebarClicked = sidebarClicked;
  };

  var SidebarClickedStore = root.SidebarClickedStore = $.extend({}, EventEmitter.prototype, {

    fetch: function () {
      return _sidebarClicked;
    },

    addChangeListener: function (callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function () {
      this.emit(CHANGE_EVENT);
    },

    dispatchToken: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
      case (SidebarClickedConstants.CLICK_RECEIVED):
        setClicked(payload.id);
        SidebarClickedStore.emitChange();
        break;
        default:
      }
    })
  });
})(this);