import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
};

type AuthState = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
};

const defaultState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false
};

// Récupérer l'état depuis localStorage au démarrage
const initialState = browser 
  ? JSON.parse(localStorage.getItem('auth') || JSON.stringify(defaultState)) 
  : defaultState;

const authStore = writable<AuthState>(initialState);

// Mettre à jour localStorage quand l'état change
if (browser) {
  authStore.subscribe((state) => {
    localStorage.setItem('auth', JSON.stringify(state));
  });
}

// Actions du store
export const login = async (email: string, password: string) => {
  try {
    console.log('Tentative de connexion avec email:', email);
    
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        username: email,
        password: password,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erreur de connexion:', errorText);
      throw new Error(`Identifiants incorrects: ${errorText}`);
    }

    const data = await response.json();
    console.log('Token reçu:', data.access_token);
    
    try {
      console.log('Récupération des informations utilisateur...');
      const userResponse = await fetch('/api/users/me', {
        headers: {
          'Authorization': `Bearer ${data.access_token}`
        }
      });
      
      if (!userResponse.ok) {
        const errorText = await userResponse.text();
        console.error('Impossible de récupérer les informations utilisateur:', errorText);
        throw new Error(`Impossible de récupérer les informations utilisateur: ${errorText}`);
      }
      
      const userData = await userResponse.json();
      console.log('Informations utilisateur récupérées:', userData);
      
      authStore.update(() => ({
        token: data.access_token,
        user: userData,
        isAuthenticated: true,
      }));
      
      return true;
    } catch (userError) {
      console.error('Erreur lors de la récupération des informations utilisateur:', userError);
      
      // En cas d'erreur avec /users/me, on stocke quand même le token
      // ce qui permettra une réauthentification ultérieure
      authStore.update(() => ({
        token: data.access_token,
        user: null,
        isAuthenticated: true,
      }));
      
      return true;
    }
  } catch (error) {
    console.error('Erreur de connexion:', error);
    return false;
  }
};

export const register = async (email: string, password: string, firstName: string, lastName: string) => {
  try {
    console.log("Tentative d'inscription avec email:", email);
    
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erreur d'inscription:", errorData);
      throw new Error(errorData.detail || "Erreur lors de l'inscription");
    }

    // Récupérer le token retourné à l'inscription
    const data = await response.json();
    console.log('Inscription réussie, token reçu:', data.access_token);
    
    try {
      console.log('Récupération des informations utilisateur...');
      const userResponse = await fetch('/api/users/me', {
        headers: {
          'Authorization': `Bearer ${data.access_token}`
        }
      });
      
      if (!userResponse.ok) {
        const errorText = await userResponse.text();
        console.error('Impossible de récupérer les informations utilisateur:', errorText);
        throw new Error(`Impossible de récupérer les informations utilisateur: ${errorText}`);
      }
      
      const userData = await userResponse.json();
      console.log('Informations utilisateur récupérées:', userData);
      
      authStore.update(() => ({
        token: data.access_token,
        user: userData,
        isAuthenticated: true,
      }));
      
      return true;
    } catch (userError) {
      console.error("Erreur lors de la récupération des informations d'utilisateur:", userError);
      
      // En cas d'erreur avec /users/me, on stocke quand même le token
      authStore.update(() => ({
        token: data.access_token,
        user: null,
        isAuthenticated: true,
      }));
      
      return true;
    }
  } catch (error) {
    console.error("Erreur d'inscription:", error);
    return false;
  }
};

export const logout = () => {
  console.log('Déconnexion...');
  authStore.set(defaultState);
  console.log('Déconnexion réussie');
};

export default authStore;