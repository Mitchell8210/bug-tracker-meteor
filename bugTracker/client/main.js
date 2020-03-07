import "./main.html";
import "../imports/home/home.js";
// import "../imports/projects/main.js"
import "../imports/startup/accounts-config.js";
import { Meteor } from "meteor/meteor";
if (Meteor.isClient) {
  Router.route("/", function () {
    this.render("home");
  });
}
if (Meteor.userId()) {
  Router.route("/projects", function () {
    this.render("project")
  })
}
if (Meteor.userId) {
  Router.route("/project/:id", function () {
    this.render("inProject")
  })
}

