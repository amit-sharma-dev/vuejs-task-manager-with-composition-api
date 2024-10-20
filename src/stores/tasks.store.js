import { defineStore } from 'pinia';
import { reactive, ref, computed } from "vue";

export const useTasksStore = defineStore('tasks', () => {
    const tasks = reactive(JSON.parse(localStorage.getItem('tasks')) || []);
    // const tasks = reactive([
    //     {
    //       name: "Website design",
    //       description: "Define the style guide, branding and create the webdesign on Figma.",
    //       completed: true,
    //       id: 1
    //     },
    //     {
    //       name: "Website development",
    //       description: "Develop the portfolio website using Vue JS.",
    //       completed: false,
    //       id: 2
    //     },
    //     {
    //       name: "Hosting and infrastructure",
    //       description: "Define hosting, domain and infrastructure for the portfolio website.",
    //       completed: false,
    //       id: 3
    //     },
    //     {
    //       name: "Composition API",
    //       description: "Learn how to use the composition API and how it compares to the options API.",
    //       completed: true,
    //       id: 4
    //     },
    //     {
    //       name: "Pinia",
    //       description: "Learn how to setup a store using Pinia.",
    //       completed: true,
    //       id: 5
    //     },
    //     {
    //       name: "Groceries",
    //       description: "Buy rice, apples and potatos.",
    //       completed: false,
    //       id: 6
    //     },
    //     {
    //       name: "Bank account",
    //       description: "Open a bank account for my freelance business.",
    //       completed: false,
    //       id: 7
    //     }
    // ]);
  
    let modalIsActive = ref(false);
    let filterBy = ref("");

    function setFilter(val) {
        filterBy.value = val;
    }

    const filteredTask = computed(() => {
        switch (filterBy.value) {
          case 'todo':
            return tasks.filter(task => !task.completed);
          case 'done':
            return tasks.filter(task => task.completed);
          default:
            return tasks;
        }
    });

    function addTask(newTask) {
        if(newTask.name && newTask.description) {
            newTask.id = tasks.length ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
            tasks.push(newTask);
            newTask = { completed: false };
            closeModal();
            } else {
            alert("Please enter title and description!");
        }
    }

    function toggleCompleted(id) {
        tasks.forEach(task => {
            if(task.id === id) {
                task.completed = !task.completed;
            }
        })
    }

    function openModal() {
        modalIsActive.value = true;
    }

    function closeModal() {
        modalIsActive.value = false;
    }

    return { tasks, filterBy, setFilter, filteredTask, addTask,  toggleCompleted, modalIsActive, openModal, closeModal }
  });