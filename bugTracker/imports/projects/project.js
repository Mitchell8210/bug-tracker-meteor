import './project.css'
import './project.html'
import './projectTile/projectTile.js'
import { Meteor } from "meteor/meteor";
import { Tasks } from "../api/tasks.js"
import { Template } from "meteor/templating";
import { Projects } from "../api/projects.js";
import { ReactiveDict } from "meteor/reactive-dict";
Template.project.onCreated(function projectOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe("projects");
    Meteor.subscribe("tasks");
});
console.log(Projects.find({}).fetch())
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
    // use in file that links to page showing only one projects tickets
    // tasks() {
    //     let tasks = Tasks.find({ projectScope: this.projectName });
    //     console.log("tasks", tasks.fetch())
    //     if (Object.keys(tasks).length > 0) {
    //         return tasks
    //     } else {
    //         return false
    //     }
    // }
});

Template.project.events({
    "submit .new-project-form": function (event) {
        event.preventDefault();
        // Get value from form element
        const name = event.target.projectName.value;
        const project = { name }
        // Insert a task into the collection
        Meteor.call("projects.insert", project);
        // Clear form
        event.target.title.value = "";
    },
    "submit .new-task-form": function (event) {
        event.preventDefault();

        // Get value from form element
        const title = event.target.title.value;
        const content = event.target.content.value;
        const projectScope = event.target.parentProject.value
        const ticket = { title, content, projectScope };
        // Insert a task into the collection
        Meteor.call("tasks.insert", ticket);
        // Clear form
        event.target.title.value = "";
        event.target.content.value = "";
    }
});