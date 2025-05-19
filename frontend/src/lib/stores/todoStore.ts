import { writable, derived } from 'svelte/store';
import authStore from './authStore';

interface Todo {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  user_id: number;
  created_at: string;
  updated_at: string | null;
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const createTodoStore = () => {
  const initialState: TodoState = {
    todos: [],
    loading: false,
    error: null
  };

  const { subscribe, update, set } = writable<TodoState>(initialState);

  return {
    subscribe,
    
    // Récupérer tous les todos
    fetchTodos: async () => {
      let token: string | null = null;
      
      // Obtenir le token depuis authStore
      const unsubscribe = authStore.subscribe(state => {
        token = state.token;
      });
      unsubscribe();
      
      if (!token) {
        update(state => ({ ...state, error: 'Non authentifié' }));
        return;
      }
      
      update(state => ({ ...state, loading: true, error: null }));
      
      try {
        const response = await fetch('/api/todos', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Échec de récupération des todos');
        }
        
        const data = await response.json();
        update(state => ({ ...state, todos: data, loading: false }));
      } catch (error) {
        console.error('Fetch todos error:', error);
        update(state => ({ 
          ...state, 
          loading: false, 
          error: error instanceof Error ? error.message : 'Erreur inconnue' 
        }));
      }
    },
    
    // Ajouter un todo
    addTodo: async (title: string, description: string = '') => {
      let token: string | null = null;
      
      const unsubscribe = authStore.subscribe(state => {
        token = state.token;
      });
      unsubscribe();
      
      if (!token) {
        update(state => ({ ...state, error: 'Non authentifié' }));
        return;
      }
      
      update(state => ({ ...state, loading: true, error: null }));
      
      try {
        const response = await fetch('/api/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            title,
            description: description || null,
            completed: false
          })
        });
        
        if (!response.ok) {
          throw new Error('Échec de création du todo');
        }
        
        const newTodo = await response.json();
        
        update(state => ({ 
          ...state, 
          todos: [...state.todos, newTodo], 
          loading: false 
        }));
      } catch (error) {
        console.error('Add todo error:', error);
        update(state => ({ 
          ...state, 
          loading: false, 
          error: error instanceof Error ? error.message : 'Erreur inconnue' 
        }));
      }
    },
    
    // Mettre à jour un todo
    updateTodo: async (id: number, data: { title?: string; description?: string; completed?: boolean }) => {
      let token: string | null = null;
      
      const unsubscribe = authStore.subscribe(state => {
        token = state.token;
      });
      unsubscribe();
      
      if (!token) {
        update(state => ({ ...state, error: 'Non authentifié' }));
        return;
      }
      
      update(state => ({ ...state, loading: true, error: null }));
      
      try {
        const response = await fetch(`/api/todos/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(data)
        });
        
        if (!response.ok) {
          throw new Error('Échec de mise à jour du todo');
        }
        
        const updatedTodo = await response.json();
        
        update(state => ({
          ...state,
          todos: state.todos.map(todo => todo.id === id ? updatedTodo : todo),
          loading: false
        }));
      } catch (error) {
        console.error('Update todo error:', error);
        update(state => ({ 
          ...state, 
          loading: false, 
          error: error instanceof Error ? error.message : 'Erreur inconnue' 
        }));
      }
    },
    
    // Supprimer un todo
    deleteTodo: async (id: number) => {
      let token: string | null = null;
      
      const unsubscribe = authStore.subscribe(state => {
        token = state.token;
      });
      unsubscribe();
      
      if (!token) {
        update(state => ({ ...state, error: 'Non authentifié' }));
        return;
      }
      
      update(state => ({ ...state, loading: true, error: null }));
      
      try {
        const response = await fetch(`/api/todos/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Échec de suppression du todo');
        }
        
        // Mise à jour de l'état en supprimant le todo
        update(state => ({
          ...state,
          todos: state.todos.filter(todo => todo.id !== id),
          loading: false
        }));
      } catch (error) {
        console.error('Delete todo error:', error);
        update(state => ({ 
          ...state, 
          loading: false, 
          error: error instanceof Error ? error.message : 'Erreur inconnue' 
        }));
      }
    },
    
    // Réinitialiser le store
    reset: () => set(initialState)
  };
};

const todoStore = createTodoStore();

// Store dérivé pour les todos complétés
export const completedTodos = derived(todoStore, $todoStore => 
  $todoStore.todos.filter(todo => todo.completed)
);

// Store dérivé pour les todos non complétés
export const incompleteTodos = derived(todoStore, $todoStore => 
  $todoStore.todos.filter(todo => !todo.completed)
);

export default todoStore; 