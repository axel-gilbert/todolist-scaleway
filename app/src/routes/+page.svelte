<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fade, fly, slide } from 'svelte/transition';
	
	let isLoaded = false;
	
	onMount(() => {
		setTimeout(() => {
			isLoaded = true;
		}, 100);
	});
</script>

<div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-slate-100 overflow-hidden">
	<!-- Header avec effet de flou -->
	<header class="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
			<div class="flex items-center">
				<div class="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white mr-3">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
						<path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
						<path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
					</svg>
				</div>
				<h1 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">TodoList</h1>
			</div>
			
			<div class="flex items-center gap-3">
				<button 
					on:click={() => goto('/login')}
					class="flex items-center text-indigo-600 transition-colors duration-200 bg-white py-2 px-5 border border-indigo-200 rounded-full shadow-sm hover:shadow-md hover:border-indigo-300"
				>
					Connexion
				</button>
				<button 
					on:click={() => goto('/register')}
					class="flex items-center text-white transition-colors duration-200 bg-indigo-600 py-2 px-5 rounded-full shadow-sm hover:bg-indigo-700 hover:shadow-md"
				>
					Inscription
				</button>
			</div>
		</div>
	</header>

	<!-- Section Hero avec animation -->
	<section class="relative py-16 md:py-24 overflow-hidden">
		<!-- Cercles décoratifs -->
		<div class="absolute top-0 left-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
		<div class="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply opacity-20 translate-x-1/2 translate-y-1/2"></div>
		
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
			<div class="grid md:grid-cols-2 gap-12 items-center">
				<!-- Texte principal -->
				<div class="text-center md:text-left">
					{#if isLoaded}
						<h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight" in:fly={{ y: 20, duration: 800 }}>
							Gérez vos tâches <span class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">efficacement</span>
						</h2>
						<p class="text-xl text-gray-600 mb-8" in:fly={{ y: 20, duration: 800, delay: 200 }}>
							Une application simple et intuitive pour organiser votre journée et améliorer votre productivité.
						</p>
						<div in:fly={{ y: 20, duration: 800, delay: 400 }}>
							<button 
								on:click={() => goto('/register')}
								class="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
							>
								Commencer maintenant
							</button>
						</div>
					{/if}
				</div>
				
				<!-- Illustration -->
				{#if isLoaded}
					<div class="relative" in:fly={{ x: 20, duration: 800, delay: 200 }}>
						<div class="absolute inset-0 bg-gradient-to-tr from-indigo-200 to-purple-200 blur-3xl opacity-30 rounded-full"></div>
						<div class="relative bg-white rounded-2xl shadow-xl p-6 border border-indigo-50">
							<div class="flex items-center justify-between mb-6">
								<div class="flex items-center gap-2">
									<div class="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
											<path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
											<path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
										</svg>
									</div>
									<span class="font-bold">Mes tâches</span>
								</div>
								<div class="flex items-center gap-2">
									<div class="h-3 w-3 bg-red-400 rounded-full"></div>
									<div class="h-3 w-3 bg-yellow-400 rounded-full"></div>
									<div class="h-3 w-3 bg-green-400 rounded-full"></div>
								</div>
							</div>
							<div class="space-y-3">
								<div class="flex items-center p-3 bg-indigo-50 rounded-lg">
									<input type="checkbox" checked class="h-5 w-5 rounded text-indigo-600 mr-3" />
									<span class="text-gray-500 line-through">Répondre aux emails</span>
									<span class="ml-auto px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Terminé</span>
								</div>
								<div class="flex items-center p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
									<input type="checkbox" class="h-5 w-5 rounded text-indigo-600 mr-3" />
									<span class="text-gray-700">Préparer la présentation</span>
									<span class="ml-auto px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">En cours</span>
								</div>
								<div class="flex items-center p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
									<input type="checkbox" class="h-5 w-5 rounded text-indigo-600 mr-3" />
									<span class="text-gray-700">Organiser la réunion d'équipe</span>
									<span class="ml-auto px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">À faire</span>
								</div>
								<div class="flex items-center p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
									<input type="checkbox" class="h-5 w-5 rounded text-indigo-600 mr-3" />
									<span class="text-gray-700">Finaliser le projet</span>
									<span class="ml-auto px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">À faire</span>
								</div>
							</div>
							<div class="mt-4">
								<div class="relative">
									<input type="text" placeholder="Ajouter une tâche..." class="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
									<button class="absolute right-2 top-2 bg-indigo-600 text-white p-1 rounded-md">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
											<path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
										</svg>
									</button>
								</div>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</section>

	<!-- Section Caractéristiques -->
	<section class="py-16 bg-white/60 backdrop-blur-sm">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			{#if isLoaded}
				<div class="text-center mb-16" in:fade={{ duration: 800, delay: 400 }}>
					<h2 class="text-3xl font-bold text-gray-800 mb-4">Pourquoi choisir <span class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">TodoList</span> ?</h2>
					<p class="text-lg text-gray-600 max-w-3xl mx-auto">Découvrez les fonctionnalités qui font de notre application l'outil idéal pour gérer votre temps et vos tâches.</p>
				</div>
			{/if}
			
			<div class="grid md:grid-cols-3 gap-8">
				{#if isLoaded}
					<div class="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-indigo-50" in:fly={{ y: 20, duration: 800, delay: 500 }}>
						<div class="h-14 w-14 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-6">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
							</svg>
						</div>
						<h3 class="text-2xl font-bold text-gray-800 mb-3">Simple</h3>
						<p class="text-gray-600 mb-4">Interface intuitive et facile à utiliser pour gérer vos tâches quotidiennes sans effort.</p>
						<ul class="space-y-2">
							<li class="flex items-start">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
								</svg>
								<span>Prise en main rapide</span>
							</li>
							<li class="flex items-start">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
								</svg>
								<span>Organisation intuitive</span>
							</li>
							<li class="flex items-start">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
								</svg>
								<span>Sans complexité inutile</span>
							</li>
						</ul>
					</div>
				{/if}
				
				{#if isLoaded}
					<div class="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-indigo-50" in:fly={{ y: 20, duration: 800, delay: 600 }}>
						<div class="h-14 w-14 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-6">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
							</svg>
						</div>
						<h3 class="text-2xl font-bold text-gray-800 mb-3">Rapide</h3>
						<p class="text-gray-600 mb-4">Application réactive et performante pour une expérience utilisateur fluide et agréable.</p>
						<ul class="space-y-2">
							<li class="flex items-start">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
								</svg>
								<span>Chargement instantané</span>
							</li>
							<li class="flex items-start">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
								</svg>
								<span>Synchronisation en temps réel</span>
							</li>
							<li class="flex items-start">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
								</svg>
								<span>Performances optimisées</span>
							</li>
						</ul>
					</div>
				{/if}
				
				{#if isLoaded}
					<div class="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-indigo-50" in:fly={{ y: 20, duration: 800, delay: 700 }}>
						<div class="h-14 w-14 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-6">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
							</svg>
						</div>
						<h3 class="text-2xl font-bold text-gray-800 mb-3">Sécurisée</h3>
						<p class="text-gray-600 mb-4">Vos données sont protégées et accessibles uniquement par vous, en toute confidentialité.</p>
						<ul class="space-y-2">
							<li class="flex items-start">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
								</svg>
								<span>Chiffrement des données</span>
							</li>
							<li class="flex items-start">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
								</svg>
								<span>Connexion sécurisée</span>
							</li>
							<li class="flex items-start">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
								</svg>
								<span>Confidentialité respectée</span>
							</li>
						</ul>
					</div>
				{/if}
			</div>
		</div>
	</section>

	<!-- Section CTA -->
	<section class="py-20 relative overflow-hidden">
		<!-- Éléments décoratifs -->
		<div class="absolute top-0 left-1/2 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
		
		{#if isLoaded}
			<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" in:fade={{ duration: 800, delay: 800 }}>
				<h2 class="text-3xl font-bold text-gray-800 mb-6">Prêt à mieux organiser votre journée ?</h2>
				<p class="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">Rejoignez des milliers d'utilisateurs qui ont déjà amélioré leur productivité grâce à TodoList.</p>
				<button 
					on:click={() => goto('/register')}
					class="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
				>
					Commencer gratuitement
				</button>
				<p class="mt-4 text-sm text-gray-500">Aucune carte de crédit requise</p>
			</div>
		{/if}
	</section>

	<!-- Footer -->
	<footer class="bg-gray-50 border-t border-gray-200 py-12">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex flex-col md:flex-row justify-between items-center">
				<div class="flex items-center mb-6 md:mb-0">
					<div class="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white mr-2">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
							<path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
						</svg>
					</div>
					<h1 class="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">TodoList</h1>
				</div>
				<div class="text-sm text-gray-500">
					&copy; 2025 TodoList. Tous droits réservés.
				</div>
			</div>
		</div>
	</footer>
</div>

<style>
	:global(body) {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
</style>
