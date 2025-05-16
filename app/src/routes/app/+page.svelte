<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { fly, slide, fade, scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	import type { Todo } from '$lib/server/db/schema';
	
	export let data;
	let newTodoTitle = '';
	let newTodoDescription = '';
	let showNewTodoForm = false;
	
	let editMode = false;
	let editTodoId = '';
	let editTodoTitle = '';
	let editTodoDescription = '';
	
	function startEdit(todo: Todo): void {
		editMode = true;
		editTodoId = todo.id;
		editTodoTitle = todo.title;
		editTodoDescription = todo.description || '';
	}
	
	function cancelEdit(): void {
		editMode = false;
		editTodoId = '';
		editTodoTitle = '';
		editTodoDescription = '';
	}
	
	function submitToggleForm(event: Event): void {
		const form = (event.target as HTMLInputElement).form;
		if (form) form.submit();
	}
	
	function toggleNewTodoForm(): void {
		showNewTodoForm = !showNewTodoForm;
		if (!showNewTodoForm) {
			newTodoTitle = '';
			newTodoDescription = '';
		}
	}
	
	// Filtrage et tri des tâches
	let filterStatus: 'all' | 'active' | 'completed' = 'all';
	let sortOrder: 'newest' | 'oldest' | 'alphabetical' = 'newest';
	
	$: filteredTodos = data.todos ? data.todos.filter((todo: Todo) => {
		if (filterStatus === 'all') return true;
		if (filterStatus === 'active') return !todo.completed;
		if (filterStatus === 'completed') return todo.completed;
		return true;
	}) : [];
	
	$: sortedTodos = [...filteredTodos].sort((a: Todo, b: Todo) => {
		if (sortOrder === 'newest') {
			return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
		} else if (sortOrder === 'oldest') {
			return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
		} else if (sortOrder === 'alphabetical') {
			return a.title.localeCompare(b.title);
		}
		return 0;
	});
	
	// Statistiques
	$: totalTodos = data.todos ? data.todos.length : 0;
	$: completedTodos = data.todos ? data.todos.filter((todo: Todo) => todo.completed).length : 0;
	$: activeTodos = totalTodos - completedTodos;
	$: completionPercentage = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;
</script>

<div>
	<!-- Section en-tête avec statistiques -->
	<div class="mb-8">
		<div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
			<h2 class="text-3xl font-bold text-gray-800 flex items-center gap-2">
				<span>Mes tâches</span>
				<span class="text-sm bg-indigo-100 text-indigo-800 py-1 px-3 rounded-full">{totalTodos}</span>
			</h2>
			
			<div class="flex flex-wrap gap-2">
				<button 
					on:click={() => filterStatus = 'all'}
					class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 
						{filterStatus === 'all' 
							? 'bg-indigo-600 text-white shadow-md' 
							: 'bg-white text-gray-700 hover:bg-indigo-50'}"
				>
					Toutes ({totalTodos})
				</button>
				<button 
					on:click={() => filterStatus = 'active'}
					class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
						{filterStatus === 'active' 
							? 'bg-blue-600 text-white shadow-md' 
							: 'bg-white text-gray-700 hover:bg-blue-50'}"
				>
					En cours ({activeTodos})
				</button>
				<button 
					on:click={() => filterStatus = 'completed'}
					class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
						{filterStatus === 'completed' 
							? 'bg-green-600 text-white shadow-md' 
							: 'bg-white text-gray-700 hover:bg-green-50'}"
				>
					Terminées ({completedTodos})
				</button>
			</div>
		</div>
		
		<!-- Barre de progression -->
		{#if totalTodos > 0}
			<div class="bg-gray-100 rounded-full h-4 overflow-hidden mb-2" in:fade>
				<div
					class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
					style="width: {completionPercentage}%;"
				></div>
			</div>
			<p class="text-sm text-gray-600 text-right">{completionPercentage}% terminé</p>
		{/if}
	</div>

	<!-- Ajouter une nouvelle tâche -->
	<div class="mb-8 bg-white rounded-xl shadow-md overflow-hidden">
		{#if !showNewTodoForm}
			<button
				on:click={toggleNewTodoForm}
				class="w-full p-4 flex items-center justify-center gap-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 transition-colors duration-200"
				in:fade={{ duration: 200 }}
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
				</svg>
				<span>Ajouter une nouvelle tâche</span>
			</button>
		{:else}
			<div in:slide={{ duration: 300 }} class="p-4">
				<div class="flex justify-between items-center mb-4">
					<h3 class="text-lg font-semibold text-gray-800">Nouvelle tâche</h3>
					<button
						on:click={toggleNewTodoForm}
						class="text-gray-400 hover:text-gray-600"
						aria-label="Fermer le formulaire"
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
						</svg>
					</button>
				</div>
				<form method="POST" action="?/addTodo" use:enhance class="space-y-4">
					<div>
						<label for="title" class="block text-sm font-medium text-gray-700 mb-1">Titre</label>
						<input
							type="text"
							id="title"
							name="title"
							bind:value={newTodoTitle}
							placeholder="Que devez-vous faire ?"
							class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
							required
						/>
					</div>
					
					<div>
						<label for="newDescription" class="block text-sm font-medium text-gray-700 mb-1">Description (optionnelle)</label>
						<textarea
							id="newDescription"
							name="description"
							bind:value={newTodoDescription}
							placeholder="Détails supplémentaires..."
							class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[80px] transition-all duration-200"
						></textarea>
					</div>
					
					<div class="flex justify-end">
						<button
							type="submit"
							class="flex items-center gap-1 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-md hover:shadow-lg transition-all duration-200"
						>
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
							</svg>
							Ajouter
						</button>
					</div>
				</form>
			</div>
		{/if}
	</div>
	
	<!-- Options de tri -->
	<div class="mb-4 flex justify-end">
		<div class="inline-flex items-center bg-white rounded-lg shadow-sm border border-gray-200 p-1">
			<span class="text-xs font-medium text-gray-500 px-2">Trier:</span>
			<button 
				on:click={() => sortOrder = 'newest'}
				class="text-xs px-3 py-1 rounded-md {sortOrder === 'newest' ? 'bg-indigo-100 text-indigo-800' : 'text-gray-600 hover:bg-gray-100'}"
			>
				Plus récentes
			</button>
			<button 
				on:click={() => sortOrder = 'oldest'}
				class="text-xs px-3 py-1 rounded-md {sortOrder === 'oldest' ? 'bg-indigo-100 text-indigo-800' : 'text-gray-600 hover:bg-gray-100'}"
			>
				Plus anciennes
			</button>
			<button 
				on:click={() => sortOrder = 'alphabetical'}
				class="text-xs px-3 py-1 rounded-md {sortOrder === 'alphabetical' ? 'bg-indigo-100 text-indigo-800' : 'text-gray-600 hover:bg-gray-100'}"
			>
				A-Z
			</button>
		</div>
	</div>
	
	<!-- Liste des tâches -->
	{#if sortedTodos && sortedTodos.length > 0}
		<div class="space-y-3">
			{#each sortedTodos as todo, i (todo.id)}
				<div 
					animate:flip={{ duration: 300 }}
					in:fly={{ y: 20, duration: 300, delay: i * 50 }}
					class="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
				>
					{#if editMode && editTodoId === todo.id}
						<form 
							method="POST" 
							action="?/updateTodo" 
							use:enhance={({ form, data, action, cancel, submitter }) => {
								return async ({ result, update }) => {
									if (result.type === 'success') {
										cancelEdit(); // Fermer le formulaire après une mise à jour réussie
									}
									await update();
								};
							}} 
							class="space-y-4" 
							in:fade={{ duration: 200 }}
						>
							<input type="hidden" name="id" value={todo.id} />
							
							<div>
								<label for="title" class="block text-sm font-medium text-gray-700 mb-1">Titre</label>
								<input
									type="text"
									id="title"
									name="title"
									bind:value={editTodoTitle}
									class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
									required
								/>
							</div>
							
							<div>
								<label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
								<textarea
									id="description"
									name="description"
									bind:value={editTodoDescription}
									class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
								></textarea>
							</div>
							
							<div class="flex justify-end gap-2">
								<button 
									type="button" 
									on:click={cancelEdit}
									class="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-1"
								>
									<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
										<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
									</svg>
									Annuler
								</button>
								<button 
									type="submit" 
									class="px-3 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 shadow flex items-center gap-1"
								>
									<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
										<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
									</svg>
									Enregistrer
								</button>
							</div>
						</form>
					{:else}
						<div class="flex items-start gap-3">
							<form method="POST" action="?/toggleTodo" use:enhance class="pt-1">
								<input type="hidden" name="id" value={todo.id} />
								<div class="relative inline-block">
									<input 
										type="checkbox" 
										name="completed" 
										checked={todo.completed}
										class="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
										on:change={submitToggleForm}
									/>
									{#if todo.completed}
										<div in:scale={{ duration: 200 }} class="absolute -top-1 -right-1 bg-green-500 rounded-full h-3 w-3 border-2 border-white"></div>
									{/if}
								</div>
							</form>
							
							<div class="flex-1">
								<div class="flex justify-between">
									<h3 class="text-lg font-medium group flex items-center gap-2 {todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}">
										{todo.title}
										{#if todo.completed}
											<span class="text-xs bg-green-100 text-green-800 py-0.5 px-2 rounded-full" in:fade>Terminée</span>
										{/if}
									</h3>
									<div class="text-xs text-gray-500">
										{new Date(todo.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' })}
									</div>
								</div>
								{#if todo.description}
									<p class="text-gray-600 mt-2 {todo.completed ? 'line-through text-gray-400' : ''} whitespace-pre-wrap">
										{todo.description}
									</p>
								{/if}
							</div>
							
							<div class="flex gap-2 mt-1">
								<button 
									on:click={() => startEdit(todo)}
									class="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
									aria-label="Modifier la tâche"
								>
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
										<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
									</svg>
								</button>
								
								<form method="POST" action="?/deleteTodo" use:enhance>
									<input type="hidden" name="id" value={todo.id} />
									<button 
										type="submit"
										class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
										aria-label="Supprimer la tâche"
									>
										<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
											<path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
										</svg>
									</button>
								</form>
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{:else}
		<div class="bg-white p-8 rounded-xl shadow text-center" in:fade>
			<div class="flex flex-col items-center justify-center py-12">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-300 mb-4" viewBox="0 0 20 20" fill="currentColor">
					<path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
					<path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
				</svg>
				<p class="text-gray-500 text-lg mb-4">
					{#if filterStatus === 'all'}
						Vous n'avez pas encore de tâches.
					{:else if filterStatus === 'active'}
						Aucune tâche en cours.
					{:else if filterStatus === 'completed'}
						Aucune tâche terminée.
					{/if}
				</p>
				{#if filterStatus !== 'all' && data.todos && data.todos.length > 0}
					<button
						on:click={() => filterStatus = 'all'}
						class="text-indigo-600 border border-indigo-200 hover:bg-indigo-50 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
					>
						Voir toutes les tâches
					</button>
				{:else}
					<button
						on:click={toggleNewTodoForm}
						class="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2"
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
						</svg>
						Ajouter votre première tâche
					</button>
				{/if}
			</div>
		</div>
	{/if}
</div> 