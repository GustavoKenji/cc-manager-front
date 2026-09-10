import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Estas chaves NÃO são secretas — o Firebase é projetado para que a
// config do client SDK fique exposta no bundle do front-end. A segurança
// real vem do back-end validando o token em cada requisição.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
