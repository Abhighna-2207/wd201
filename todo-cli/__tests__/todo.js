const todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();
describe("Todo List Test Suite", () => {
  beforeAll(() => {
    const today__= new Date();
    const day__ = 60 * 60 * 24 * 1000;
    [
      {
        title: "Evaluate exam",
        completed: false,
        dueDate: new Date(today__.getTime() - 3 * day__).toLocaleDateString("en-CA"),
      },
      {
        title: "Count Eggs",
        completed: false,
        dueDate: new Date(today__.getTime() - day__).toLocaleDateString("en-CA"),
      },
      {
        title: "Operate on MS",
        completed: false,
        dueDate: new Date().toLocaleDateString("en-CA"),
      },
      {
        title: "Print cards",
        completed: false,
        dueDate: new Date().toLocaleDateString("en-CA"),
      },
      {
        title: "Eat lunch",
        completed: false,
        dueDate: new Date(today__.getTime() + 2 * day__).toLocaleDateString(
          "en-CA"
        ),
      },
    ].forEach(add);
  });
  test("Should add a new todo", () => {
    expect(all.length).toEqual(5);

    add({
      title: "A test item",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });

    expect(all.length).toEqual(6);
  });

  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toEqual(false);
    markAsComplete(0);
    expect(all[0].completed).toEqual(true);
  });

  test("Should retrieve overdue items", () => {
    expect(overdue().length).toEqual(2);
  });

  test("Should retrieve due today items", () => {
    expect(dueToday().length).toEqual(3);
  });

  test("Should retrieve due later items", () => {
    expect(dueLater().length).toEqual(1);
  });
});
