<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import TodoItem from './TodoItem.svelte';
  import todoStore, { completedTodos, incompleteTodos } from '../stores/todoStore';
  import Button from './Button.svelte';
  
  let newTodoTitle = '';
  let newTodoDescription = '';
  let loading = false;
  let filterMode: 'all' | 'active' | 'completed' = 'all';
  // Par défaut, on trie du plus récent au plus ancien
  let sortOrder: 'newest' | 'oldest' = 'newest';
  
  // Liste filtrée de todos basée sur le mode de filtrage
  $: unsortedFilteredTodos = filterMode === 'all' 
    ? $todoStore.todos 
    : filterMode === 'active' 
      ? $todoStore.todos.filter(todo => !todo.completed) 
      : $todoStore.todos.filter(todo => todo.completed);
  
  // Liste filtrée et triée
  $: filteredTodos = [...unsortedFilteredTodos].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });
  
  // Calcul du pourcentage de complétion pour la barre de progression
  $: completionPercentage = $todoStore.todos.length > 0 
    ? Math.round(($todoStore.todos.filter(todo => todo.completed).length / $todoStore.todos.length) * 100) 
    : 0;
  
  onMount(() => {
    todoStore.fetchTodos();
  });
  
  function handleAddTodo() {
    if (newTodoTitle.trim()) {
      todoStore.addTodo(newTodoTitle, newTodoDescription);
      newTodoTitle = '';
      newTodoDescription = '';
    }
  }
  
  function handleUpdateTodo(event: CustomEvent) {
    const { id, title, description } = event.detail;
    todoStore.updateTodo(id, { title, description });
  }
  
  function handleToggleTodo(event: CustomEvent) {
    const { id, completed } = event.detail;
    todoStore.updateTodo(id, { completed });
  }
  
  function handleDeleteTodo(event: CustomEvent) {
    const { id } = event.detail;
    todoStore.deleteTodo(id);
  }
  
  // Change le mode de filtrage
  function setFilterMode(mode: 'all' | 'active' | 'completed') {
    filterMode = mode;
  }
  
  // Bascule l'ordre de tri
  function toggleSortOrder() {
    sortOrder = sortOrder === 'newest' ? 'oldest' : 'newest';
  }
</script>

<div class="max-w-2xl mx-auto py-6">
  <div class="mb-8 bg-white p-6 shadow-sm border border-gray-100">
    <h2 class="text-xl font-medium mb-4">Ajouter une tâche</h2>
    
    <div class="space-y-4">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium mb-1">Titre *</label>
        <input
          id="title"
          type="text"
          bind:value={newTodoTitle}
          placeholder="Qu'avez-vous à faire ?"
          class="w-full p-2 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
        />
      </div>
      
      <div class="mb-4">
        <label for="description" class="block text-sm font-medium mb-1">Description (optionnelle)</label>
        <textarea
          id="description"
          bind:value={newTodoDescription}
          rows="2"
          placeholder="Détails supplémentaires..."
          class="w-full p-2 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
        ></textarea>
      </div>
      
      <Button 
        on:click={handleAddTodo} 
        disabled={!newTodoTitle.trim() || $todoStore.loading}
        loading={$todoStore.loading}
      >
        Ajouter la tâche
      </Button>
    </div>
  </div>
  
  <!-- Barre de progression -->
  <div class="mb-6 bg-white p-4 shadow-sm border border-gray-100">
    <div class="flex items-center justify-between mb-2">
      <h3 class="text-sm font-medium">Progression</h3>
      <span class="text-sm font-medium">
        {$todoStore.todos.filter(todo => todo.completed).length} / {$todoStore.todos.length} tâches complétées
      </span>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        class="bg-black h-2.5 rounded-full transition-all duration-500" 
        style="width: {completionPercentage}%"
      ></div>
    </div>
    <div class="text-xs text-gray-500 mt-1 text-right">{completionPercentage}%</div>
  </div>
  
  <div class="mb-4 flex flex-col sm:flex-row justify-between items-center gap-4">
    <div class="flex items-center gap-2">
      <h2 class="text-xl font-medium">Vos tâches ({filteredTodos.length})</h2>
      <!-- Bouton de tri -->
      <button 
        class="p-1 ml-2 text-gray-600 hover:text-black transition-colors rounded focus:outline-none"
        on:click={toggleSortOrder}
        title={sortOrder === 'newest' ? "Plus récentes d'abord" : "Plus anciennes d'abord"}
      >
        {#if sortOrder === 'newest'}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
          </svg>
        {/if}
      </button>
    </div>
    
    <!-- Filtres -->
    <div class="flex gap-2">
      <button 
        class="px-3 py-1 text-sm border transition-colors {filterMode === 'all' ? 'bg-black text-white border-black' : 'bg-white border-gray-300 hover:bg-gray-50'}" 
        on:click={() => setFilterMode('all')}
      >
        Toutes
      </button>
      <button 
        class="px-3 py-1 text-sm border transition-colors {filterMode === 'active' ? 'bg-black text-white border-black' : 'bg-white border-gray-300 hover:bg-gray-50'}" 
        on:click={() => setFilterMode('active')}
      >
        À faire
      </button>
      <button 
        class="px-3 py-1 text-sm border transition-colors {filterMode === 'completed' ? 'bg-black text-white border-black' : 'bg-white border-gray-300 hover:bg-gray-50'}" 
        on:click={() => setFilterMode('completed')}
      >
        Terminées
      </button>
    </div>
  </div>
  
  {#if $todoStore.loading}
    <p class="text-sm text-gray-500 mb-4">Chargement...</p>
  {/if}
  
  {#if $todoStore.error}
    <div class="bg-red-50 border border-red-200 p-4 mb-4 text-red-700">
      {$todoStore.error}
    </div>
  {/if}
  
  {#if filteredTodos.length === 0 && !$todoStore.loading}
    <div class="text-center py-12 bg-gray-50" in:fade>
      {#if filterMode === 'all'}
        <p class="text-gray-500">Aucune tâche pour le moment</p>
      {:else if filterMode === 'active'}
        <p class="text-gray-500">Aucune tâche à faire</p>
      {:else}
        <p class="text-gray-500">Aucune tâche terminée</p>
      {/if}
    </div>
  {:else}
    <div class="bg-white shadow-sm border border-gray-100">
      {#each filteredTodos as todo (todo.id)}
        <div animate:flip={{ duration: 300 }}>
          <TodoItem 
            id={todo.id}
            title={todo.title}
            description={todo.description}
            completed={todo.completed}
            createdAt={todo.created_at}
            on:update={handleUpdateTodo}
            on:toggle={handleToggleTodo}
            on:delete={handleDeleteTodo}
          />
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  /* Animation pour la barre de progression */
  .bg-black {
    transition: width 0.5s ease-in-out;
  }
</style> 