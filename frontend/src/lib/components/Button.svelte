<script lang="ts">
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let variant: 'primary' | 'secondary' | 'danger' = 'primary';
  export let disabled: boolean = false;
  export let fullWidth: boolean = false;
  export let loading: boolean = false;
  
  const getVariantClass = (variant: string) => {
    switch (variant) {
      case 'primary':
        return 'bg-black text-white hover:bg-gray-800';
      case 'secondary':
        return 'bg-white text-black border border-black hover:bg-gray-100';
      case 'danger':
        return 'bg-white text-red-600 border border-red-600 hover:bg-red-50';
      default:
        return 'bg-black text-white hover:bg-gray-800';
    }
  };
</script>

<button
  {type}
  {disabled}
  class={`
    py-2 px-4
    transition-all duration-200 ease-in-out
    font-medium
    ${fullWidth ? 'w-full' : ''}
    ${getVariantClass(variant)}
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-gray-400
    transform hover:scale-[1.01] active:scale-[0.99]
  `}
  on:click
>
  {#if loading}
    <div class="flex justify-center">
      <div class="animate-spin h-5 w-5 border-2 border-t-transparent rounded-full"></div>
    </div>
  {:else}
    <slot />
  {/if}
</button>

<style>
  button {
    letter-spacing: 0.025em;
  }
</style> 