<template>
  <div class="todo-list-wrapper">
    <div v-if="todos.length === 0" class="empty-todos">
      해야 할 일을 채워주세요!
    </div>
    <div v-else>
      <TodoListItem v-for="todo in todos" :key="todo.id" :todo="todo" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import TodoListItem from '@/components/TodoListItem.vue';
import { useTodoStore } from '@/stores/todo';

const store = useTodoStore();

// pinia store에 있는 값을 뽑아쓸때 특히, store의 state가 변하는 걸 렌더링 하려면
// computed속성을 활용해야한다.(반응성 유지 목적)
const todos = computed(() => store.todoState.todos);
</script>

<style lang="scss">
.todo-list-wrapper {
  min-height: 320px;
  max-height: 513px;
  overflow-y: auto;
}
.empty-todos {
  text-align: center;
  margin-top: 8rem;
  color: #adb5bd;
  font-size: 2rem;
}
</style>
