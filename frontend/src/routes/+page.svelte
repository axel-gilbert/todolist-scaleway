<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import authStore from '$lib/stores/authStore';
  import TodoList from '$lib/components/TodoList.svelte';
  import LoginForm from '$lib/components/LoginForm.svelte';
  import RegisterForm from '$lib/components/RegisterForm.svelte';
  import Modal from '$lib/components/Modal.svelte';
  
  let showLoginModal = false;
  let showRegisterModal = false;
  
  function openLoginModal() {
    showLoginModal = true;
    showRegisterModal = false;
  }
  
  function openRegisterModal() {
    showRegisterModal = true;
    showLoginModal = false;
  }
  
  function closeModals() {
    showLoginModal = false;
    showRegisterModal = false;
  }
</script>

<svelte:head>
  <title>TodoList - Organisez vos tâches simplement</title>
</svelte:head>

{#if $authStore.isAuthenticated}
  <div in:fade={{ duration: 300 }}>
    <TodoList />
  </div>
{:else}
  <div class="py-12 px-4">
    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row items-center justify-between gap-8 py-16">
        <div class="md:w-1/2 space-y-6">
          <h1 class="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            Simplifiez votre quotidien avec notre <span class="text-black bg-yellow-300 px-2">gestionnaire de tâches</span>
          </h1>
          <p class="text-lg md:text-xl text-gray-600 max-w-lg">
            Organisez, hiérarchisez et suivez toutes vos tâches en un seul endroit. Restez concentré sur ce qui compte vraiment.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              on:click={openRegisterModal}
              class="px-6 py-3 text-white bg-black rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Commencer gratuitement
            </button>
            <button 
              on:click={openLoginModal}
              class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Se connecter
            </button>
          </div>
        </div>
        <div class="md:w-1/2 relative">
          <div class="w-full h-auto relative z-10">
            <img 
              src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2940&auto=format&fit=crop"
              alt="Interface TodoList" 
              class="w-full h-auto object-cover rounded-lg shadow-xl"
            />
          </div>
          <div class="absolute -bottom-4 -right-4 w-full h-full bg-black rounded-lg -z-10"></div>
        </div>
      </div>
    </section>
    
    <!-- Features Section -->
    <section class="max-w-7xl mx-auto py-16">
      <h2 class="text-3xl font-bold text-center mb-12">Fonctionnalités principales</h2>
      
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="bg-yellow-100 p-3 rounded-lg inline-block mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Organisation simple</h3>
          <p class="text-gray-600">Créez, modifiez et organisez vos tâches en quelques clics. Tout est instantané et synchronisé.</p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="bg-blue-100 p-3 rounded-lg inline-block mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Suivi de progression</h3>
          <p class="text-gray-600">Visualisez votre avancement avec notre barre de progression intuitive. Célébrez chaque tâche accomplie.</p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="bg-green-100 p-3 rounded-lg inline-block mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Filtres intelligents</h3>
          <p class="text-gray-600">Filtrez vos tâches pour afficher uniquement celles qui sont terminées, en cours, ou visualisez l'ensemble.</p>
        </div>
      </div>
    </section>
    
    <!-- CTA Section -->
    <section class="max-w-5xl mx-auto py-16 text-center">
      <div class="bg-black text-white p-8 md:p-12 rounded-xl">
        <h2 class="text-3xl font-bold mb-4">Prêt à mieux organiser votre temps ?</h2>
        <p class="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          Créez un compte gratuit en quelques secondes et commencez immédiatement à gérer vos tâches de façon plus efficace.
        </p>
        <button 
          on:click={openRegisterModal}
          class="px-8 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors"
        >
          S'inscrire maintenant
        </button>
      </div>
    </section>
  </div>
  
  <!-- Modales -->
  <Modal showModal={showLoginModal} title="Connexion" on:close={closeModals}>
    <LoginForm on:success={closeModals} on:signup={openRegisterModal} />
  </Modal>
  
  <Modal showModal={showRegisterModal} title="Inscription" on:close={closeModals}>
    <RegisterForm on:success={closeModals} on:login={openLoginModal} />
  </Modal>
{/if}
