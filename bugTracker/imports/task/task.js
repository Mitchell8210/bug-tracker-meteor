import "./task.html";
import "./task.css";
import { Tasks } from "../api/tasks.js";

Template.task.helpers({
  rendered: function() {},
  backlogCheck() {
    return this.status === "Backlog" ? true : false;
  },
  todoCheck() {
    return this.status === "To Do" ? true : false;
  },
  inProgressCheck() {
    return this.status === "In Progress" ? true : false;
  },
  completedCheck() {
    return this.status === "Completed" ? true : false;
  }
});
Template.task.events({
  // toggle check boxes
  "click .backlogCheck"() {
    Tasks.update(this._id, { $set: { status: "Backlog" } });
  },
  "click .todoCheck"() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this._id, { $set: { status: "To Do" } });
  },
  "click .inProgressCheck"() {
    Tasks.update(this._id, { $set: { status: "In Progress" } });
  },
  "click .completedCheck"() {
    Tasks.update(this._id, { $set: { status: "Completed" } });
  },
  "click .deleteButton"() {
    Tasks.remove({ _id: this._id });
  }
});
