export class Task {
  constructor(id, input, completed = false, output = null) {
    this.id = id;
    this.input = input;
    this.completed = completed;
    this.output = output;
  }

  markCompleted(output) {
    this.completed = true;
    this.output = output;
  }
}
