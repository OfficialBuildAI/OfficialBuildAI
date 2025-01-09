export class TaskQueue {
  constructor() {
    this.queue = [];
  }

  addTask(task) {
    this.queue.push(task);
  }

  getPendingTasks() {
    return this.queue.filter((task) => !task.completed);
  }

  markTaskCompleted(taskId, output) {
    const task = this.queue.find((t) => t.id === taskId);
    if (task) {
      task.completed = true;
      task.output = output;
    }
  }
}
