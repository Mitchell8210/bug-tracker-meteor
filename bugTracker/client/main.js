import "./main.html";
import "../imports/home/home.js";
import "../imports/startup/accounts-config.js";
import { Meteor } from "meteor/meteor";
if (Meteor.isClient) {
  Router.route("/", function() {
    this.render("home");
  });
  if (Meteor.userId()) {
    Router.route("/taskBoard", function() {
      this.render("taskBoard");
    });
  }
}
