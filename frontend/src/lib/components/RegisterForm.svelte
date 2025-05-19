<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { register } from '../stores/authStore';
  import Input from './Input.svelte';
  import Button from './Button.svelte';
  
  const dispatch = createEventDispatcher();
  
  let firstName = '';
  let lastName = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let loading = false;
  let error = '';
  
  async function handleSubmit() {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      error = 'Veuillez remplir tous les champs';
      return;
    }
    
    if (password !== confirmPassword) {
      error = 'Les mots de passe ne correspondent pas';
      return;
    }
    
    loading = true;
    error = '';
    
    const success = await register(email, password, firstName, lastName);
    
    loading = false;
    
    if (success) {
      dispatch('success');
    } else {
      error = 'Erreur lors de l\'inscription. Veuillez réessayer.';
    }
  }
  
  function handleLoginClick() {
    dispatch('login');
  }
</script>

<div class="bg-white max-w-md w-full mx-auto">
  <form on:submit|preventDefault={handleSubmit} class="space-y-4">
    {#if error}
      <div class="bg-red-50 border border-red-200 p-3 text-sm text-red-700">
        {error}
      </div>
    {/if}
    
    <Input
      id="firstName"
      name="firstName"
      type="text"
      label="Prénom"
      placeholder="Votre prénom"
      bind:value={firstName}
      required
    />
    
    <Input
      id="lastName"
      name="lastName"
      type="text"
      label="Nom"
      placeholder="Votre nom"
      bind:value={lastName}
      required
    />
    
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
    
    <Input
      id="confirmPassword"
      name="confirmPassword"
      type="password"
      label="Confirmer le mot de passe"
      bind:value={confirmPassword}
      required
    />
    
    <Button
      type="submit"
      fullWidth
      loading={loading}
      disabled={loading}
    >
      S'inscrire
    </Button>
    
    <div class="text-center mt-4">
      <p class="text-sm text-gray-600">
        Déjà un compte ? 
        <button 
          type="button" 
          on:click={handleLoginClick}
          class="text-black underline hover:text-gray-700 transition-colors"
        >
          Se connecter
        </button>
      </p>
    </div>
  </form>
</div> 