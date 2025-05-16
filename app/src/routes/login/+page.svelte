<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';
	
	export let form;
	
	$: if (form?.success) {
		goto('/app');
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-slate-100 flex flex-col">
	<header class="bg-white/80 backdrop-blur-sm shadow-sm">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
			<div class="flex items-center">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
					<path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
					<path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
				</svg>
				<h1 class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">TodoList</h1>
			</div>
		</div>
	</header>

	<main class="flex-1 flex items-center justify-center p-6">
		<div class="w-full max-w-md" in:fly={{ y: 20, duration: 600, delay: 200 }}>
			<div class="bg-white p-8 rounded-2xl shadow-xl border border-indigo-50 relative overflow-hidden">
				<!-- Éléments décoratifs -->
				<div class="absolute -top-24 -right-24 w-48 h-48 bg-indigo-100 rounded-full opacity-60"></div>
				<div class="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-100 rounded-full opacity-60"></div>
				
				<div class="relative">
					<h2 class="text-2xl font-bold text-gray-800 mb-1">Bon retour parmi nous</h2>
					<p class="text-gray-500 mb-6">Connectez-vous pour continuer</p>
					
					{#if form?.error}
						<div class="mb-6 p-4 border-l-4 border-red-400 bg-red-50 text-red-600 rounded-md text-sm" 
							 in:fade={{ duration: 300 }}>
							{form.error}
						</div>
					{/if}
					
					<form method="POST" use:enhance class="space-y-5">
						<div>
							<label for="email" class="block text-sm font-medium text-gray-700 mb-2">
								Email
							</label>
							<div class="relative">
								<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
										<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
										<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
									</svg>
								</div>
								<input
									type="email"
									id="email"
									name="email"
									value={form?.email || ''}
									required
									class="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
									placeholder="vous@exemple.com"
								/>
							</div>
						</div>
						
						<div>
							<div class="flex items-center justify-between mb-2">
								<label for="password" class="block text-sm font-medium text-gray-700">
									Mot de passe
								</label>
								<a href="#" class="text-xs text-indigo-600 hover:text-indigo-500">Mot de passe oublié ?</a>
							</div>
							<div class="relative">
								<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
										<path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
									</svg>
								</div>
								<input
									type="password"
									id="password"
									name="password"
									required
									class="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
									placeholder="••••••••"
								/>
							</div>
						</div>
						
						<button
							type="submit"
							class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all font-medium shadow-md hover:shadow-lg"
						>
							Se connecter
						</button>
					</form>
					
					<div class="mt-6 text-center">
						<p class="text-sm text-gray-600">
							Pas encore de compte ?
							<a href="/register" class="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">Inscrivez-vous</a>
						</p>
					</div>
					
					<div class="mt-4 text-center">
						<button 
							on:click={() => goto('/')}
							class="inline-flex items-center text-sm text-gray-600 hover:text-indigo-600 transition-colors focus:outline-none"
						>
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
							</svg>
							Revenir à l'accueil
						</button>
					</div>
				</div>
			</div>
		</div>
	</main>
</div> 