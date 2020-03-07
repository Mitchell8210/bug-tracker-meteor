import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Tasks } from "../api/tasks.js";
import { Projects } from "../api/projects.js";
import { ReactiveDict } from "meteor/reactive-dict";
import "../taskBoard/taskBoard.html";
import "./dashboard.html"
Template.project.onCreated(function projectOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe("projects");
    Meteor.subscribe("tasks");
});

Template.project.helpers({
    rendered: function () { },
    myProjects() {
        let projects = Projects.find({ owner: Meteor.userId() });
        console.log(projects.fetch())
        if (Object.keys(projects).length > 0) {
            return projects;
        } else {
            return false;
        }
    },
    tasks() {
        let tasks = Tasks.find({ projectScope: this.projectName });
        console.log("tasks", tasks.fetch())
        if (Object.keys(tasks).length > 0) {
            return tasks
        } else {
            return false
        }
    }
});