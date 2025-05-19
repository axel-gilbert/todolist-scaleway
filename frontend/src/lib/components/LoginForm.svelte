<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { login } from '../stores/authStore';
  import Input from './Input.svelte';
  import Button from './Button.svelte';
  
  const dispatch = createEventDispatcher();
  
  let email = '';
  let password = '';
  let loading = false;
  let error = '';
  
  async function handleSubmit() {
    if (!email || !password) {
      error = 'Veuillez remplir tous les champs';
      return;
    }
    
    loading = true;
    error = '';
    
    const success = await login(email, password);
    
    loading = false;
    
    if (success) {
      dispatch('success');
    } else {
      error = 'Email ou mot de passe incorrect';
    }
  }
  
  function handleSignupClick() {
    dispatch('signup');
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-4">
  {#if error}
    <div class="bg-red-50 border border-red-200 p-3 text-sm text-red-700">
      {error}
    </div>
  {/if}
  
  <Input
    id="email"
    name="email"
    type="email"
    label="Email"
    placeholder="votre@email.com"
    bind:value={email}
    required
  />
  
  <Input
    id="password"
    name="password"
    type="password"
    label="Mot de passe"
    bind:value={password}
    required
  />
  
  <Button
    type="submit"
    fullWidth
    loading={loading}
    disabled={loading}
  >
    Se connecter
  </Button>
  
  <div class="text-center mt-4">
    <p class="text-sm text-gray-600">
      Pas encore de compte ? 
      <button 
        type="button" 
        on:click={handleSignupClick}
        class="text-black underline hover:text-gray-700 transition-colors"
      >
        S'inscrire
      </button>
    </p>
  </div>
</form> 