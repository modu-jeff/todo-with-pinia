<template>
  <form class="todo-insert-form" @submit.prevent="submitTodo">
    <input
      :value="store.todoState.todoInput"
      type="text"
      class="todo-input"
      placeholder="할 일을 입력해주세요"
      @input="sendInputToStore(($event.target as HTMLInputElement).value)"
    />
    <button class="add-button" aria-label="add-button">
      <font-awesome-icon :icon="['fas', 'plus']" />
    </button>
  </form>
</template>
<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';

const store = useTodoStore();

const sendInputToStore = (value: string) => {
  store.changeField(value);
};

const submitTodo = () => {
  if (store.todoState.todoInput.length === 0) {
    alert('내용을 입력해주세요');
  } else {
    store.addTodo();
  }
};
</script>

<style lang="scss" scoped>
.todo-insert-form {
  display: flex;
  background: #495057;
  position: sticky;
  top: 0;
  z-index: 2;

  .todo-input {
    background: none;
    outline: none;
    border: none;
    padding: 0.5rem;
    font-size: 1.125rem;
    line-height: 1.5;
    color: white;

    &::placeholder {
      color: #dee2e6;
    }

    flex: 1;
  }

  .add-button {
    background: none;
    outline: none;
    border: none;
    background: #868e96;
    color: white;
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background 0.1s ease-in;

    &:hover {
      background: #adb5bd;
    }
  }
}
</style>
