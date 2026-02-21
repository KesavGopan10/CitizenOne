import { defineConfig } from 'wxt';

export default defineConfig({
    modules: ['@wxt-dev/module-react'],
    srcDir: 'src',
    outDir: 'dist',
    manifest: {
        name: 'CitizenOne – Smart Form Filler',
        description:
            'BYOK autonomous agent for automating government and bureaucratic forms. Privacy-first, AI-powered.',
        version: '1.0.0',
        permissions: ['storage', 'activeTab', 'scripting'],
        host_permissions: ['<all_urls>'],
        action: {
            default_title: 'CitizenOne',
            default_popup: 'popup/index.html',
        },
    },
    vite: () => ({
        css: {
            postcss: {
                plugins: [
                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                    require('tailwindcss'),
                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                    require('autoprefixer'),
                ],
            },
        },
    }),
});
