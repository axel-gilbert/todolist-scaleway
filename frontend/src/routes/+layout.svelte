<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import '../app.css';
  import Navbar from '$lib/components/Navbar.svelte';
  import authStore from '$lib/stores/authStore';
  import Modal from '$lib/components/Modal.svelte';
  import LoginForm from '$lib/components/LoginForm.svelte';
  import RegisterForm from '$lib/components/RegisterForm.svelte';
  
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

<div class="min-h-screen bg-gray-50 flex flex-col">
  <Navbar 
    on:login={openLoginModal}
    on:register={openRegisterModal}
  />
  
  <main class="flex-1 p-4">
    <slot />
  </main>
  
  <footer class="bg-white border-t border-gray-200 py-4">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p class="text-center text-sm text-gray-500">
        TodoList - Axel GILBERT © {new Date().getFullYear()}
      </p>
    </div>
  </footer>
  
  <!-- Modales globales -->
  <Modal showModal={showLoginModal} title="Connexion" on:close={closeModals}>
    <LoginForm on:success={closeModals} on:signup={openRegisterModal} />
  </Modal>
  
  <Modal showModal={showRegisterModal} title="Inscription" on:close={closeModals}>
    <RegisterForm on:success={closeModals} on:login={openLoginModal} />
  </Modal>
</div>
