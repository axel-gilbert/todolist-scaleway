<script lang="ts">
  export let id: string = '';
  export let name: string = '';
  export let type: string = 'text';
  export let label: string = '';
  export let placeholder: string = '';
  export let value: string = '';
  export let error: string = '';
  export let required: boolean = false;
  export let disabled: boolean = false;
</script>

<div class="mb-4">
  {#if label}
    <label for={id} class="block text-sm font-medium mb-1">
      {label} {#if required}<span class="text-red-600">*</span>{/if}
    </label>
  {/if}
  
  <input
    {id}
    {name}
    {type}
    {placeholder}
    {disabled}
    {required}
    bind:value
    class={`
      w-full p-2 
      border border-gray-300 
      focus:border-black focus:ring-1 focus:ring-black 
      outline-none 
      transition-all duration-200 ease-in-out
      ${error ? 'border-red-500' : ''}
      ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
    `}
  />
  
  {#if error}
    <p class="mt-1 text-xs text-red-600">{error}</p>
  {/if}
</div>

<style>
  input {
    letter-spacing: 0.025em;
  }
</style> 