<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { fade, slide, scale } from 'svelte/transition';
  import Modal from './Modal.svelte';
  
  export let id: number;
  export let title: string;
  export let description: string | null = null;
  export let completed: boolean = false;
  export let createdAt: string;
  
  const dispatch = createEventDispatcher();
  
  let isHovered = false;
  let showEditModal = false;
  let editedTitle = title;
  let editedDescription = description || '';
  
  // Réinitialiser les valeurs éditées lorsque le titre ou la description changent
  $: {
    if (!showEditModal) {
      editedTitle = title;
      editedDescription = description || '';
    }
  }
  
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  }
  
  function openEditModal() {
    showEditModal = true;
  }
  
  function closeEditModal() {
    showEditModal = false;
    // Réinitialiser les valeurs
    editedTitle = title;
    editedDescription = description || '';
  }
  
  function handleUpdate() {
    if (editedTitle.trim()) {
      dispatch('update', {
        id,
        title: editedTitle,
        description: editedDescription || null
      });
      showEditModal = false;
    }
  }
  
  function handleToggleComplete() {
    dispatch('toggle', {
      id,
      completed: !completed
    });
  }
  
  function handleDelete() {
    dispatch('delete', { id });
  }
</script>

<div
  class="group border-b border-gray-200 py-4 px-4"
  class:opacity-75={completed}
  class:bg-gray-50={isHovered}
  on:mouseenter={() => { isHovered = true }}
  on:mouseleave={() => { isHovered = false }}
  in:fade={{ duration: 300 }}
  out:slide={{ duration: 300 }}
>
  <div class="flex items-start gap-3">
    <input
      type="checkbox"
      checked={completed}
      on:change={handleToggleComplete}
      class="mt-1 h-5 w-5 rounded border-gray-300 text-black focus:ring-black transition-all duration-200 cursor-pointer"
    />
    
    <div class="flex-1 min-w-0">
      <h3 
        class="text-lg font-medium transition-all duration-200"
        class:line-through={completed}
        class:text-gray-500={completed}
      >
        {title}
      </h3>
      
      {#if description}
        <p 
          class="text-sm text-gray-600 mt-1 transition-all duration-200"
          class:line-through={completed}
          class:text-gray-400={completed}
        >
          {description}
        </p>
      {/if}
      
      <p class="text-xs text-gray-400 mt-1">Créé le {formatDate(createdAt)}</p>
    </div>
    
    <!-- Les boutons d'action -->
    {#if completed}
      <!-- Seulement le bouton de suppression pour les tâches complétées -->
      <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          on:click={handleDelete}
          class="p-1 text-gray-500 hover:text-red-600 transition-colors"
          title="Supprimer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    {:else}
      <!-- Les deux boutons pour les tâches non complétées -->
      <div class="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          on:click={openEditModal}
          class="p-1 text-gray-500 hover:text-black transition-colors"
          title="Modifier"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
        
        <button
          on:click={handleDelete}
          class="p-1 text-gray-500 hover:text-red-600 transition-colors"
          title="Supprimer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    {/if}
  </div>

  <!-- Modal de modification -->
  <Modal showModal={showEditModal} title="Modifier la tâche" on:close={closeEditModal}>
    <div class="space-y-4">
      <div>
        <label for="edit-title" class="block text-sm font-medium mb-1">Titre *</label>
        <input
          id="edit-title"
          type="text"
          bind:value={editedTitle}
          class="w-full p-2 border border-gray-300 rounded-md focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
          placeholder="Titre de la tâche"
        />
      </div>
      
      <div>
        <label for="edit-description" class="block text-sm font-medium mb-1">Description (optionnelle)</label>
        <textarea
          id="edit-description"
          bind:value={editedDescription}
          rows="3"
          class="w-full p-2 border border-gray-300 rounded-md focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
          placeholder="Description détaillée de la tâche..."
        ></textarea>
      </div>
      
      <div class="pt-2 flex justify-end space-x-2">
        <button
          on:click={closeEditModal}
          class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Annuler
        </button>
        
        <button
          on:click={handleUpdate}
          disabled={!editedTitle.trim()}
          class="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Enregistrer
        </button>
      </div>
    </div>
  </Modal>
</div>

<style>
  /* Animation de transition lorsque la tâche est complétée */
  input[type="checkbox"] {
    transform-origin: center;
  }
  
  input[type="checkbox"]:checked {
    animation: pulse 0.5s;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
</style> 