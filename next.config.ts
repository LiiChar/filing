import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	experimental: {
		serverActions: {
			bodySizeLimit: '500mb',
		},
	},
	webpack: (config, { dev }) => {
		if (dev) {
			config.watchOptions = {
				ignored: /\/public\//,
			};
		}
		return config;
	},
};

export default nextConfig;
