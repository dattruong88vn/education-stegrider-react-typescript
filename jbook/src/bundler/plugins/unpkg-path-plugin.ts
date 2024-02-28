import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      // file index.js
      build.onResolve({ filter: /^index\.js$/ }, () => {
        return { path: "index.js", namespace: "a" };
      });

      // handle relative path such as ./ or ../ and nested directory
      build.onResolve(
        { filter: /^\.+\// },
        async (args: esbuild.OnResolveArgs) => {
          return {
            namespace: "a",
            path: new URL(
              args.path,
              "https://unpkg.com" + args.resolveDir + "/"
            ).href,
          };
        }
      );

      // load main file of package
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: "a",
          path: `https://www.unpkg.com/${args.path}`,
        };
      });
    },
  };
};
