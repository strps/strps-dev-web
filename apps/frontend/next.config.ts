import type { NextConfig } from "next";


const payloadUrl = new URL(process.env.NEXT_PUBLIC_PAYLOAD_URL!)


const remotePatterns = [{
  protocol: payloadUrl.protocol.replace(':', '') as 'http' | 'https',
  hostname: payloadUrl.hostname,
  port: payloadUrl.port || '',        // keep original port
  pathname: '/api/media/**',
}
]

//add unsplash in development for placeholder images
if (process.env.NODE_ENV === 'development') {
  remotePatterns.push({
    protocol: 'https',
    hostname: 'images.unsplash.com',
    port: '',
    pathname: '**',
  })
}

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns,
    qualities: [75, 85, 90, 95, 100],
    dangerouslyAllowLocalIP: process.env.NODE_ENV === 'development',
  },

};

export default nextConfig;
