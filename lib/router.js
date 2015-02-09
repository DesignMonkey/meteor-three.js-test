RoutesController = RouteController.extend({
  layoutTemplate: 'layout',
});

Router.route("/", {
  name: "start",
  controller: RoutesController,
  data: function () {
  }
});

Router.route("/animation", {
  name: "animation",
  controller: RoutesController,
  data: function () {
  }
});

Router.route("/object-render", {
  name: "object-render",
  controller: RoutesController,
  data: function () {
  }
});
