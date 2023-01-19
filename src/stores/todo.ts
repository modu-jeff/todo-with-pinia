import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import type { RootState, TodoItem } from '@/stores/todo.type';

export const useTodoStore = defineStore('Todo', () => {
  const todos = ref<TodoItem[]>([]);
  const todoState = reactive<RootState>({
    id: todos.value.length + 1,
    todoInput: '',
    editInput: '',
    todos,
  });

  const changeField = (payload: string) => {
    todoState.todoInput = payload;
  };

  const editChange = (payload: string) => {
    todoState.editInput = payload;
  };

  const addTodo = () => {
    todoState.todos = todoState.todos.concat({
      id: todoState.id,
      text: todoState.todoInput,
      isDone: false,
      doneAt: null,
    });
    todoState.id++;
    todoState.todoInput = '';
  };

  const deleteTodo = (payload: number) => {
    todoState.todos = todoState.todos.filter((todo) => todo.id !== payload);
  };

  function checkTodo(payload: number) {
    todoState.todos = todoState.todos.map((todo) =>
      todo.id === payload
        ? {
            ...todo,
            isDone: !todo.isDone,
            doneAt: `${new Intl.DateTimeFormat('ko-kr', {
              year: '2-digit',
              month: 'numeric',
              day: 'numeric',
            }).format()}(${new Intl.DateTimeFormat('ko-kr', {
              weekday: 'short',
            }).format()})에 완료`,
          }
        : todo,
    );
  }

  const editTodo = (payload: number) => {
    todoState.todos = todoState.todos.map((todo) =>
      todo.id === payload ? { ...todo, text: todoState.editInput } : todo,
    );
    todoState.editInput = '';
  };

  return {
    todoState,
    changeField,
    editChange,
    addTodo,
    deleteTodo,
    checkTodo,
    editTodo,
  };
});
