import TaskForm from "@/components/forms/TaskForm";
import { fetchNextTasks } from "@/infrastructure/actions/task.actions";
import { ITask } from "@/models/Task";
import React from "react";

const taskCard = (task: ITask) => (
  <div key={task.id} className="p-4 my-4 rounded-lg shadow-md bg-white">
    <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
    <p className="text-gray-700 mb-2">{task.description}</p>
    <p className="text-gray-900 font-bold">{task.points} points</p>
  </div>
);

export default async function TasksPage() {
  const tasks = (await fetchNextTasks()) as unknown as ITask[];

  console.log("TASKS", tasks);

  return (
    <div>
      <h1>Tasks</h1>
      <TaskForm />
      <ul className="grid grid-cols-6 gap-4 p-4">
        {tasks.map((task: ITask) => (
          <li key={task.id}>{taskCard(task)}</li>
        ))}
      </ul>
    </div>
  );
}
