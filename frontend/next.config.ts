import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/enginehub-version/:path*",
                destination: "https://services.enginehub.org/:path*",
            },
            {
                source: "/api/minecraft-jar",
                destination:
                    "https://piston-data.mojang.com/v1/objects/ba2df812c2d12e0219c489c4cd9a5e1f0760f5bd/client.jar",
            },
        ];
    },
};

export default nextConfig;
