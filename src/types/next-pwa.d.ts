// src/types/next-pwa.d.ts
declare module "next-pwa" {
  import { NextConfig } from "next";

  type PWAConfig = {
    dest?: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
    scope?: string;
    sw?: string;
    runtimeCaching?: any[];
    buildExcludes?: (string | RegExp)[];
    publicExcludes?: string[];
    fallbacks?: Record<string, string>;
  };

  export default function withPWA(
    config?: PWAConfig
  ): (nextConfig: NextConfig) => NextConfig;
}