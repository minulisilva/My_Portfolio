/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@react-three/fiber', '@react-three/drei', 'three'],
  turbopack: {},
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    };
    return config;
  },
};

module.exports = nextConfig;
