import { ref, onMounted, computed } from 'vue';

// Usamos una ref para el estado global del tema
const currentTheme = ref('light');

export function useTheme() {

  // Valor computado para determinar si el tema actual es oscuro
  const isDark = computed(() => currentTheme.value === 'dark');

  // Función interna para aplicar la clase 'dark' al elemento <html>
  const updateThemeClass = (theme: string) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Guardar la preferencia
    localStorage.setItem('theme', theme);
  };

  // Función para establecer el tema
  // Acepta un string ('dark' | 'light') o alterna si no se proporciona
  const setOrToggleTheme = (newTheme?: string) => {
    let finalTheme = newTheme;

    if (!finalTheme || (finalTheme !== 'light' && finalTheme !== 'dark')) {
      // Si no se proporciona un valor válido, simplemente alternamos
      finalTheme = currentTheme.value === 'dark' ? 'light' : 'dark';
    }

    currentTheme.value = finalTheme;
    updateThemeClass(finalTheme);
  };

  // Inicializar el tema al cargar la página
  onMounted(() => {
    const savedTheme = localStorage.getItem('theme');
    let initialTheme;

    if (savedTheme === 'light' || savedTheme === 'dark') {
      initialTheme = savedTheme;
    } else {
      // Usar la preferencia del sistema como fallback
      initialTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    currentTheme.value = initialTheme;
    updateThemeClass(initialTheme);
  });

  return {
    isDark,
    currentTheme,
    toggleTheme: setOrToggleTheme // Renombramos para mantener la interfaz del componente
  };
}
