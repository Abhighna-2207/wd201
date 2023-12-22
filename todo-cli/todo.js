const todoList = () => {
  all = []
  const add = (todoItem) => {
    all.push(todoItem)
  }
  const markAsComplete = (index) => {
    all[index].completed = true
  }

  const overdue = () => {
    return all.filter((i) => i.dueDate < new Date().toLocaleDateString("en-CA"));
  }

  const dueToday = () => {
    return all.filter((i) => i.dueDate === new Date().toLocaleDateString("en-CA"));
  }

  const dueLater = () => {
    return all.filter((i) => i.dueDate > new Date().toLocaleDateString("en-CA"));
  }

  const toDisplayableList = (list) => {
    return list.map((i) => {
      const cb = i.completed ? '[x]' : '[ ]';
      const dp = new Date(i.dueDate).toDateString()=== new Date().toDateString() ? '' : ` ${formattedDate(new Date(i.dueDate))}`;
      return `${cb} ${i.title}${dp}`;
    }).join('\n');
  }
   const formattedDate = (d) => {
     return d.toISOString().split("T")[0];
   };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList
  };
};
module.exports=todoList;
