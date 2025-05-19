<script lang="ts">
  import { fade } from 'svelte/transition';
  import authStore, { logout } from '../stores/authStore';
  import { createEventDispatcher } from 'svelte';

  let isMenuOpen = false;
  
  const dispatch = createEventDispatcher();
  
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
  
  function handleLogout() {
    logout();
    isMenuOpen = false;
  }
  
  function handleLoginClick() {
    dispatch('login');
    isMenuOpen = false;
  }
  
  function handleRegisterClick() {
    dispatch('register');
    isMenuOpen = false;
  }
</script>

<nav class="bg-black text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <div class="flex items-center">
        <a href="/" class="text-xl font-bold flex items-center">
          <span class="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </span>
          TodoList
        </a>
      </div>
      
      <div class="hidden md:block">
        <div class="ml-10 flex items-center space-x-4">
          {#if $authStore.isAuthenticated}
            <span>Bonjour, {$authStore.user?.first_name} {$authStore.user?.last_name}</span>
            <button 
              on:click={handleLogout}
              class="px-3 py-2 text-sm hover:bg-gray-800 transition-colors"
            >
              Déconnexion
            </button>
          {:else}
            <button 
              on:click={handleLoginClick}
              class="px-3 py-2 text-sm hover:bg-gray-800 transition-colors"
            >
              Connexion
            </button>
            <button 
              on:click={handleRegisterClick}
              class="px-3 py-2 text-sm bg-white text-black hover:bg-gray-200 transition-colors"
            >
              Inscription
            </button>
          {/if}
        </div>
      </div>
      
      <div class="md:hidden">
        <button
          type="button"
          class="bg-black inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-800 focus:outline-none"
          aria-expanded={isMenuOpen}
          on:click={toggleMenu}
        >
          <span class="sr-only">{isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}</span>
          {#if isMenuOpen}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          {:else}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          {/if}
        </button>
      </div>
    </div>
  </div>
  
  {#if isMenuOpen}
    <div class="md:hidden" transition:fade={{ duration: 150 }}>
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {#if $authStore.isAuthenticated}
          <div class="px-3 py-2 text-sm text-gray-100">
            Bonjour, {$authStore.user?.first_name} {$authStore.user?.last_name}
          </div>
          <button 
            on:click={handleLogout}
            class="block px-3 py-2 text-sm text-left w-full hover:bg-gray-800 transition-colors"
          >
            Déconnexion
          </button>
        {:else}
          <button 
            on:click={handleLoginClick}
            class="block px-3 py-2 text-sm text-left w-full hover:bg-gray-800 transition-colors"
          >
            Connexion
          </button>
          <button 
            on:click={handleRegisterClick}
            class="block px-3 py-2 text-sm text-left w-full hover:bg-gray-700 transition-colors bg-gray-800"
          >
            Inscription
          </button>
        {/if}
      </div>
    </div>
  {/if}
</nav> 