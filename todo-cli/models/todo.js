"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static async addTask(params) {
      return Todo.create(params);
    }

    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      const todoOverdue = await Todo.overdue();
      const formattedOverdue = todoOverdue
        .map((todo) => todo.displayableString())
        .join("\n")
        .trim();
      console.log(formattedOverdue);
      console.log("\n");

      console.log("Due Today");
      const todoDueToday = await Todo.dueToday();
      const formattedDueToday = todoDueToday
        .map((todo) => todo.displayableString())
        .join("\n")
        .trim();
      console.log(formattedDueToday);
      console.log("\n");

      console.log("Due Later");
      const todoDueLater = await Todo.dueLater();
      const formattedDueLater = todoDueLater
        .map((todo) => todo.displayableString())
        .join("\n")
        .trim();
      console.log(formattedDueLater);
    }

    static async overdue() {
      const todoOverdue = await Todo.findAll({
        where: {
          dueDate: { [Op.lt]: new Date() },
        },
      });

      return todoOverdue;
    }

    static async dueToday() {
      const todoDueToday = await Todo.findAll({
        where: {
          dueDate: { [Op.eq]: new Date() },
        },
      });

      return todoDueToday;
    }

    static async dueLater() {
      const todoDueLater = await Todo.findAll({
        where: {
          dueDate: { [Op.gt]: new Date() },
        },
      });

      return todoDueLater;
    }

    static async markAsComplete(id) {
      await Todo.update(
        {
          completed: true,
        },
        {
          where: { id: id },
        }
      );
    }

    displayableString() {
      const checkbox = this.completed ? "[x]" : "[ ]";
      let dueDateString = "";

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const dueDate = new Date(this.dueDate);
      dueDate.setHours(0, 0, 0, 0);

      if (this.completed || dueDate > today) {
        dueDateString = dueDate.toISOString().slice(0, 10);
      }

      return `${this.id}. ${checkbox} ${this.title} ${dueDateString}`;
    }

    static associate(models) {
      // If you have associations to define, you can include them here
    }
  }

  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
