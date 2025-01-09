import React, { useEffect, useState } from "react";
import BuildAI from "@buildai/sdk";

const Dashboard = ({ buildAI }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Load pending tasks on mount
    const loadTasks = async () => {
      const pendingTasks = await buildAI.getPendingTasks();
      setTasks(pendingTasks);
    };
    loadTasks();
  }, [buildAI]);

  const completeTask = async (taskId, output) => {
    await buildAI.completeTask(taskId, output);
    alert("Task completed!");
  };

  return (
    <div>
      <h2>Task Dashboard</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.input} - {task.completed ? "Completed" : "Pending"}
            {!task.completed && (
              <button onClick={() => completeTask(task.id, "Sample Output")}>
                Complete Task
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
