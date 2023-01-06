<template>
  <div class="todo-list-item-wrapper">
    <form
      v-show="isEdit"
      class="edit-form"
      @submit.prevent="submitEdit(todo.id)"
    >
      <input
        type="text"
        ref="editInput"
        class="edit-input"
        @input="store.editChange($event.target.value)"
        :placeholder="todo.text"
        :value="store.todoState.editInput"
      />
    </form>

    <div class="checkbox" @click="store.checkTodo(todo.id)">
      <font-awesome-icon
        v-show="todo.isDone === true"
        :icon="['fas', 'square-check']"
        class="check"
      />
      <font-awesome-icon
        v-show="todo.isDone === false"
        :icon="['far', 'square']"
      />
      <div
        v-show="!isEdit"
        :class="[todo.isDone === false ? 'text' : 'text completed']"
      >
        {{ todo.text }}
      </div>
    </div>
    <div v-if="todo.isDone" class="done-date">
      <span>{{ todo.doneAt }}</span>
    </div>
    <div :class="[todo.isDone === false ? 'edit' : 'none']" @click="toggleEdit">
      <font-awesome-icon :icon="['fas', 'pen']" />
    </div>
    <div class="remove" @click="store.deleteTodo(todo.id)">
      <font-awesome-icon :icon="['fas', 'trash-can']" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTodoStore } from "@/stores/todo";
import type { TodoItem } from "@/stores/todo.type";

const store = useTodoStore();

const isEdit = ref(false);
const editInput = ref(null);

defineProps<{ todo: TodoItem }>();

const toggleEdit = () => {
  isEdit.value = !isEdit.value;
  setTimeout(() => {
    if (editInput.value !== null) (editInput.value as HTMLInputElement).focus();
  }, 1);
};

const submitEdit = (id: number) => {
  if (store.todoState.editInput === "") return alert("내용을 입력해주세요");
  store.editTodo(id);
  isEdit.value = !isEdit.value;
};
</script>

<style lang="scss" scoped>
.todo-list-item-wrapper {
  padding: 1rem;
  display: flex;
  align-items: center;
  position: relative;

  &:nth-child(even) {
    background: #f8f9fa;
  }

  & + & {
    border-top: 1px solid #dee2e6;
  }

  .checkbox {
    cursor: pointer;
    flex: 1;
    display: flex;
    align-items: center;

    svg {
      font-size: 1.5rem;
    }

    .check {
      color: #22b8cf;
    }
  }

  .text {
    margin-left: 0.5rem;
    flex: 1;
    color: inherit;
    text-decoration: none;
  }

  .completed {
    text-decoration: line-through;
    color: #adb5bd;
  }

  .remove {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    color: #ff6b6b;
    cursor: pointer;

    &:hover {
      color: #ff8787;
    }
  }

  .edit {
    display: flex;
    margin-right: 1.5rem;
    align-items: center;
    font-size: 1.2rem;
    color: #868e96;
    cursor: pointer;

    &:hover {
      color: #ced4da;
    }
  }

  .none {
    display: none;
  }

  .edit-form {
    position: absolute;
    left: 9%;
    z-index: 10;
  }

  .edit-input {
    width: 24rem;
    height: 2rem;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid #adb5bd;
    padding: 0.5rem 0.5rem 0.5rem 0;
    font-size: 1rem;
    color: #868e96;

    &:focus {
      outline: none;
    }
  }
  .done-date {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 12px 0 0;
    padding: 7px;
    border: 1px solid #adb5bd;
    border-radius: 8px;
    height: 8px;
    color: #adb5bd;
  }
}
</style>
