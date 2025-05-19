import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

const API_URL = process.env.API_URL || 'http://localhost:8000/api';

export async function GET(event: RequestEvent) {
  try {
    const path = event.params.path;
    const originalUrl = new URL(event.request.url);
    const url = new URL(`${API_URL}/${path}${originalUrl.search}`);
    
    const headers = new Headers();
    // Copier les en-têtes d'origine, mais assurez-vous que l'en-tête Authorization est correctement conservé
    for (const [key, value] of event.request.headers.entries()) {
      if (key.toLowerCase() !== 'host') { 
        headers.set(key, value);
      }
    }
    
    console.log(`Proxying GET request to ${url} with headers:`, Object.fromEntries([...headers]));
    
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error from API: ${response.status} - ${errorText}`);
      return error(response.status, errorText);
    }
    
    const data = await response.json();
    return json(data);
  } catch (err) {
    console.error('Error proxying GET request:', err);
    return error(500, 'Internal Server Error');
  }
}

export async function POST(event: RequestEvent) {
  try {
    const path = event.params.path;
    const originalUrl = new URL(event.request.url);
    const url = new URL(`${API_URL}/${path}${originalUrl.search}`);
    
    const body = await event.request.text();
    const headers = new Headers();
    // Copier les en-têtes d'origine, mais assurez-vous que l'en-tête Authorization est correctement conservé
    for (const [key, value] of event.request.headers.entries()) {
      if (key.toLowerCase() !== 'host') { 
        headers.set(key, value);
      }
    }
    
    console.log(`Proxying POST request to ${url} with headers:`, Object.fromEntries([...headers]));
    
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error from API: ${response.status} - ${errorText}`);
      return error(response.status, errorText);
    }
    
    const data = await response.json();
    return json(data);
  } catch (err) {
    console.error('Error proxying POST request:', err);
    return error(500, 'Internal Server Error');
  }
}

export async function PUT(event: RequestEvent) {
  try {
    const path = event.params.path;
    const originalUrl = new URL(event.request.url);
    const url = new URL(`${API_URL}/${path}${originalUrl.search}`);
    
    const body = await event.request.text();
    const headers = new Headers();
    // Copier les en-têtes d'origine, mais assurez-vous que l'en-tête Authorization est correctement conservé
    for (const [key, value] of event.request.headers.entries()) {
      if (key.toLowerCase() !== 'host') { 
        headers.set(key, value);
      }
    }
    
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body,
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error from API: ${response.status} - ${errorText}`);
      return error(response.status, errorText);
    }
    
    const data = await response.json();
    return json(data);
  } catch (err) {
    console.error('Error proxying PUT request:', err);
    return error(500, 'Internal Server Error');
  }
}

export async function DELETE(event: RequestEvent) {
  try {
    const path = event.params.path;
    const originalUrl = new URL(event.request.url);
    const url = new URL(`${API_URL}/${path}${originalUrl.search}`);
    
    const headers = new Headers();
    // Copier les en-têtes d'origine, mais assurez-vous que l'en-tête Authorization est correctement conservé
    for (const [key, value] of event.request.headers.entries()) {
      if (key.toLowerCase() !== 'host') { 
        headers.set(key, value);
      }
    }
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers,
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error from API: ${response.status} - ${errorText}`);
      return error(response.status, errorText);
    }
    
    const data = await response.json();
    return json(data);
  } catch (err) {
    console.error('Error proxying DELETE request:', err);
    return error(500, 'Internal Server Error');
  }
} 