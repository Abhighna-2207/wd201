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
      const todoover__due = await Todo.overdue();
      const formattedOver__due = todoover__due
        .map((todo) => todo.displayableString())
        .join("\n")
        .trim();
      console.log(formattedOver__due);
      console.log("\n");

      console.log("Due Today");
      const tododue__Today = await Todo.dueToday();
      const formattedDue__Today = tododue__Today
        .map((todo) => todo.displayableString())
        .join("\n")
        .trim();
      console.log(formattedDue__Today);
      console.log("\n");

      console.log("Due Later");
      const tododue__Later = await Todo.dueLater();
      const formattedDue__Later = dueLater
        .map((todo) => todo.displayableString())
        .join("\n")
        .trim();
      console.log(formattedDue__Later);
    }

    static async overdue() {
      const todooverdue = await Todo.findAll({
        where: {
          dueDate: { [Op.lt]: new Date() },
        },
      });

      return todoover__due;
    }

    static async dueToday() {
      const tododue__Today = await Todo.findAll({
        where: {
          dueDate: { [Op.eq]: new Date() },
        },
      });

      return tododue__Today;
    }

    static async dueLater() {
      const tododueLater = await Todo.findAll({
        where: {
          dueDate: { [Op.gt]: new Date() },
        },
      });

      return tododue__Later;
    }

    static async markAsComplete(id) {
      await Todo.update(
        {
          completed: true,
        },
        {
          // eslint-disable-next-line object-shorthand
          where: { id: id },
        }
      );
    }

    displayableString() {
      const check_box = this.completed ? "[x]" : "[ ]";
      let dueDate__String="";

      const todayy = new Date();
      todayy.setHours(0, 0, 0, 0);

      const duedate = new Date(this.dueDate);
      dueDate.setHours(0, 0, 0, 0);

      if (this.completed || dueDate > todayy) {
        dueDate__String = dueDate.toISOString().slice(0, 10);
      }

      return `${this.id}. ${check_box} ${this.title} ${dueDate__String}`;
    }
    
    static associate(models) {
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
