import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
const pages = import.meta.glob('./Pages/**/*.jsx')
console.log('Available pages in glob:', Object.keys(pages))
