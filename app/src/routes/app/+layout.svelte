<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	
	export let data;
	
	async function handleLogout() {
		await fetch('/api/auth/logout', { method: 'POST' });
		goto('/login');
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
	<header class="bg-white shadow-sm sticky top-0 z-10">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
			<div class="flex items-center">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
					<path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
					<path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
				</svg>
				<h1 class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">TodoList</h1>
			</div>
			
			<div class="flex items-center gap-4">
				<div class="hidden md:flex items-center bg-indigo-50 py-1 px-3 rounded-full">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
					</svg>
					<span class="text-sm text-gray-700 font-medium">
						{data.user.firstName} {data.user.lastName}
					</span>
				</div>
				<button 
					on:click={handleLogout}
					class="flex items-center text-sm text-gray-600 hover:text-red-500 transition-colors duration-200 bg-white py-1 px-3 border border-gray-200 rounded-full shadow-sm hover:shadow-md"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm4.5 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm4-4a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clip-rule="evenodd" />
						<path fill-rule="evenodd" d="M5.5 5.5a.5.5 0 01.5-.5h8a.5.5 0 01.5.5v8a.5.5 0 01-.5.5h-8a.5.5 0 01-.5-.5v-8z" clip-rule="evenodd" />
					</svg>
					Déconnexion
				</button>
			</div>
		</div>
	</header>
	
	<main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8" in:fade={{ duration: 300, delay: 100 }}>
		<slot />
	</main>
</div> 