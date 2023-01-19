<template>
  <TodoTemplate>
    <TodoInsert />
    <TodoList />
  </TodoTemplate>
</template>

<script setup lang="ts">
import TodoTemplate from '@/components/TodoTemplate.vue';
import TodoInsert from '@/components/TodoInsert.vue';
import TodoList from '@/components/TodoList.vue';
</script>
