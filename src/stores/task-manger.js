import { ref, computed, reactive, watch } from "vue";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const useTaksManagerStore = defineStore("taskManager", () => {
  const data = ref([
    {
      id: "67cd333c-cecb-4d5a-8d83-73125a65d23c",
      name: "Project 1",
      description: "Project 1 description",
      tasks: [
        {
          id: "sssss-cecb-ddddd-8d83-73125a65d23c",
          name: "Task 1",
          description: "Task 1 description",
          completed: true,
        },
        {
          id: "dffgdfg-ssdasd-ddddd-dfggg-ddddddd",
          name: "Task 2",
          description: "Task 2 description",
          completed: false,
        },
      ],
    },
    {
      id: "3333444-cecb-4d5a-8d83-73125a65d23c",
      name: "Project 2",
      description: "Project 2 description",
      tasks: [
        {
          id: "sssss-caecb-ddddss-4444-73125a65d23c",
          name: "Task 3",
          description: "Task 3 description",
          completed: true,
        },
      ],
    },
  ]);

  const projects = computed(() => {
    return data.value.map((project) => {
      const totalTasks = project.tasks.length;
      const completedTasks = project.tasks.filter(
        (task) => task.completed
      ).length;
      const completedPercentage =
        totalTasks !== 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

      return {
        ...project,
        completedPercentage,
      };
    });
  });

  const tasks = computed(() => {
    const allTasks = reactive([]);
    data.value.forEach((project) => {
      project.tasks.forEach((task) => {
        const taskWithProject = {
          ...task,
          project: {
            id: project.id,
            name: project.name,
          },
        };
        allTasks.push(taskWithProject);
      });
    });
    return allTasks;
  });

  function updateTaskState(taskId, completed) {
    data.value.forEach((project) => {
      const task = project.tasks.find((task) => task.id === taskId);
      if (task) {
        task.completed = completed;
      }
    });
  }

  function filterTasksByProjectsAndStates(projectIds, states) {
    if (projectIds.length === 0 && states.length === 0) return tasks.value;

    const filteredTasks = tasks.value.filter((task) => {
      const projectMatch =
        projectIds.includes(task.project.id) || projectIds.length === 0;
      const stateMatch = states.includes(task.completed) || states.length === 0;
      return projectMatch && stateMatch;
    });
    return filteredTasks;
  }

  return {
    projects,
    tasks,
    updateTaskState,
    filterTasksByProjectsAndStates,
  };
});
