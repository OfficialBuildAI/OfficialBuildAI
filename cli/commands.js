import BuildAI from "../sdk/index.js";

export const getTaskList = async (buildAI) => {
  const tasks = await buildAI.getPendingTasks();
  console.log("Pending Tasks:");
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. ID: ${task.id}, Input: ${task.input}`);
  });
};

export const completeTaskCLI = async (buildAI, taskId, output) => {
  await buildAI.completeTask(taskId, output);
  console.log(`Task ${taskId} completed successfully.`);
};
