import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Tasks } from "../api/tasks.js";
import { Projects } from "../api/projects.js";
import { ReactiveDict } from "meteor/reactive-dict";
import "../taskBoard/taskBoard.html";
import "./dashboard.html"
Template.inProject.onCreated(function inProjectOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe("projects");
    Meteor.subscribe("tasks");
});
let projectId = window.location.pathname.split("/")[2]
Template.inProject.helpers({
    rendered: function () { },
    myProjects() {
        let projectId = window.location.pathname.split("/")[2]
        let projects = Projects.find({ $and: [{ owner: Meteor.userId() }, { projectId: projectId }] });
        if (Object.keys(projects).length > 0) {
            return projects;
        } else {
            return false;
        }
    },
    projectId() {
        let projectId = window.location.pathname.split("/")[2];
        return projectId
    },
    tasks() {
        let projectId = window.location.pathname.split("/")[2]
        let tasks = Tasks.find({ projectScope: projectId });
        if (Object.keys(tasks).length > 0) {
            return tasks
        } else {
            return false
        }
    }
});

Template.project.events({
    "submit .new-task-form": function (event) {
        event.preventDefault();

        // Get value from form element
        const title = event.target.title.value;
        const content = event.target.content.value;
        const projectScope = projectId
        const ticket = { title, content, projectScope };
        console.log("TICKET -->", ticket)
        // Insert a task into the collection
        Meteor.call("tasks.insert", ticket);
        // Clear form
        event.target.title.value = "";
        event.target.content.value = "";
    }
});