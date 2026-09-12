import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { env } from 'process';

export default defineConfig(({ command }) => {
    let httpsConfig = false;
    let target = env.ASPNETCORE_HTTPS_PORT
        ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
        : env.ASPNETCORE_URLS
            ? env.ASPNETCORE_URLS.split(';')[0]
            : 'https://localhost:7081';

    // Only run certificate generation & filesystem checks during local development ('serve')
    if (command === 'serve') {
        const baseFolder =
            env.APPDATA !== undefined && env.APPDATA !== ''
                ? `${env.APPDATA}/ASP.NET/https`
                : `${env.HOME}/.aspnet/https`;

        const certificateName = "hw_app.client";
        const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
        const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

        if (!fs.existsSync(baseFolder)) {
            fs.mkdirSync(baseFolder, { recursive: true });
        }

        if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
            const certStatus = child_process.spawnSync('dotnet', [
                'dev-certs',
                'https',
                '--export-path',
                certFilePath,
                '--format',
                'Pem',
                '--no-password',
            ], { stdio: 'inherit' }).status;

            if (certStatus !== 0) {
                console.warn("Could not create dev certificate. Falling back to HTTP.");
            }
        }

        if (fs.existsSync(keyFilePath) && fs.existsSync(certFilePath)) {
            httpsConfig = {
                key: fs.readFileSync(keyFilePath),
                cert: fs.readFileSync(certFilePath),
            };
        }
    }

    return {
        plugins: [plugin()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        server: {
            proxy: {
                '^/weatherforecast': {
                    target,
                    secure: false
                },
                '^/api': {
                    target,
                    secure: false
                }
            },
            port: parseInt(env.DEV_SERVER_PORT || '60584'),
            https: httpsConfig
        },
        build: {
            outDir: 'dist'
        }
    };
});