import type { Ref } from "vue";

export interface TodoItem {
  id: number;
  text: string;
  isDone: boolean;
  doneAt: string | null;
}

export interface RootState {
  id: number;
  todoInput: string;
  editInput: string;
  todos: Ref<TodoItem[]>;
}
