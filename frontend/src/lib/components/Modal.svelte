<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  
  export let showModal = false;
  export let title = '';
  
  const dispatch = createEventDispatcher();
  
  function closeModal() {
    dispatch('close');
  }
  
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }
  
  // Empêcher le scroll du body lorsque la modale est ouverte
  $: if (typeof document !== 'undefined') {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if showModal}
  <div 
    class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0"
    transition:fade={{ duration: 200 }}
  >
    <!-- Backdrop avec effet de flou -->
    <div 
      class="fixed inset-0 backdrop-blur-sm bg-black/50" 
      on:click={closeModal}
      transition:fade={{ duration: 150 }}
    ></div>
    
    <!-- Contenu de la modale -->
    <div 
      class="relative z-10 w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden"
      transition:scale={{ duration: 200, start: 0.95 }}
    >
      <div class="flex items-center justify-between p-4 border-b">
        <h3 class="text-lg font-medium">{title}</h3>
        <button 
          class="text-gray-500 hover:text-gray-700 focus:outline-none"
          on:click={closeModal}
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="p-4">
        <slot></slot>
      </div>
    </div>
  </div>
{/if} 