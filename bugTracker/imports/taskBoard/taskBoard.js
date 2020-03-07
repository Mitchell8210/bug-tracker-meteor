import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Tasks } from "../api/tasks.js";
import "../projects/project.js"
import "../taskBoard/taskBoard.html";
import "../task/task.js";
import "../noTasks/noTasks.js";
import "../home/home.js";
import "./taskBoard.css";
import { ReactiveDict } from "meteor/reactive-dict";
Template.taskBoard.onCreated(function taskBoardOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe("tasks");
});

Template.taskBoard.helpers({
  rendered: function () { },
  backlogTasks() {
    let tasks = Tasks.find({ status: "Backlog" });
    console.log(tasks);
    if (Object.keys(tasks).length > 0) {
      return tasks;
    } else {
      return false;
    }
  },
  toDoTasks() {
    let tasks = Tasks.find({ status: "To Do" });
    console.log(tasks);
    console.log(Object.keys(tasks).length);
    if (Object.keys(tasks).length > 0) {
      return tasks;
    } else {
      return false;
    }
  },
  inProgressTasks() {
    let tasks = Tasks.find({ status: "In Progress" });
    if (Object.keys(tasks).length > 0) {
      return tasks;
    } else {
      return false;
    }
  },
  completedTasks() {
    let tasks = Tasks.find({ status: "Completed" });
    if (Object.keys(tasks).length > 0) {
      return tasks;
    } else {
      return false;
    }
  },

});

Template.taskBoard.events({
  "submit .new-task-form": function (event) {
    event.preventDefault();

    // Get value from form element
    const title = event.target.title.value;
    const content = event.target.content.value;
    const ticket = { title, content };
    // Insert a task into the collection
    Meteor.call("tasks.insert", ticket);
    // Clear form
    event.target.title.value = "";
    event.target.content.value = "";
  }
});
