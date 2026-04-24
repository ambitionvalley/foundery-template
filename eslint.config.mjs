import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Client-facing modules must not import from server/. Go through a Server
  // Action or Server Component to bridge data from the server.
  {
    files: [
      "src/components/**",
      "src/hooks/**",
      "src/features/**/components/**",
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/server/*"],
              message:
                "Client-side modules may not import from @/server. Use a Server Action or Server Component to bridge.",
            },
          ],
        },
      ],
    },
  },

  // lib/ is framework-agnostic — no server, no next, no react deps.
  {
    files: ["src/lib/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/server/*"],
              message: "lib/ is framework-agnostic. Move server deps out.",
            },
            {
              group: ["next", "next/*", "react", "react-dom"],
              message: "lib/ should be framework-agnostic.",
            },
          ],
        },
      ],
    },
  },

  // proxy.ts runs before React — only server-only imports allowed.
  {
    files: ["src/proxy.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/components/*", "@/hooks/*", "@/features/*"],
              message:
                "proxy.ts runs before React; only server/ + next/server imports allowed.",
            },
          ],
        },
      ],
    },
  },

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
