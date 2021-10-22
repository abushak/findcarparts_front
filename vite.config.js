import svelte from 'vite-plugin-svelte-ssr-hot';

export default ({ command }) => {
  const isDev = command === 'serve';

  return {
    plugins: [
      svelte({
        hot: isDev,

        compilerOptions: {
          hydratable: true // true for SSR, false for CSR (Client-Side Rendering)
          // `generate` option will be auto set.
        }
      })
    ],
    
    resolve: {
      dedupe: ['svelte']
    },

    ssr: {
      external: ['svelte']
    },

    optimizeDeps: {
      exclude: ['svelte']
    }
  };
};