<script setup>
let newTask = { completed: false };
import { useTasksStore } from '../stores/tasks.store';
const store = useTasksStore();
</script>

<template>
    <div class="form">
        <div class="add-task">
          <h3>Add a new task</h3>
          <input v-model="newTask.name" type="text" name="title" placeholder="Enter a title..."><br />
          <textarea v-model="newTask.description" name="description" rows="4" placeholder="Enter a description..."></textarea><br />
          <button @click="store.addTask(newTask)" class="btn gray">Add Task</button>
        </div>
      </div>
</template>