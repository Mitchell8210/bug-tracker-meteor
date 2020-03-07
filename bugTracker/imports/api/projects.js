import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";
import { Random } from 'meteor/random'
import { Tasks } from "./tasks.js";
export const Projects = new Mongo.Collection("projects");
if (Meteor.isServer) {
    // Only publish tasks that are public or belong to the current user
    Meteor.publish("projects", function projectsPublication() {
        return Projects.find({ owner: this.userId })
    });
}
Meteor.methods({
    "projects.insert"(project) {
        // Make sure the user is logged in before inserting a task
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        let date = new Date();
        let day = date.getDay();
        let month = date.getMonth();
        let year = date.getFullYear();
        let now = month + "/" + day + "/" + year;
        let projectId = Random.id();
        let projectName = project.name;
        Projects.insert({
            projectName,
            createdAt: now,
            projectId,
            owner: Meteor.userId(),
            status: "To Do",
            username: Meteor.user().username
        });
    },
    "projects.remove"(taskId) {
        check(taskId, String);
        const task = Tasks.findOne(taskId);
        if (task.private && task.owner !== Meteor.userId()) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error("not-authorized");
        }

        Projects.remove(taskId);
    },
    "projects.setChecked"(taskId, setChecked) {
        check(taskId, String);
        check(setChecked, Boolean);
        const task = Tasks.findOne(taskId);
        if (task.private && task.owner !== Meteor.userId()) {
            // If the task is private, make sure only the owner can check it off
            throw new Meteor.Error("not-authorized");
        }

        Projects.update(taskId, { $set: { checked: setChecked } });
    },
    "projects.setPrivate"(taskId, setToPrivate) {
        check(taskId, String);
        check(setToPrivate, Boolean);

        const task = Tasks.findOne(taskId);

        // Make sure only the task owner can make a task private
        if (task.owner !== Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Projects.update(taskId, { $set: { private: setToPrivate } });
    }
});
