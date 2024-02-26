import axios from "axios";
import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = (content: string) => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log("onResole", args);

        if (args.path === "index.js") {
          return { path: args.path, namespace: "a" };
        }

        // handle relative path such as ./ or ../
        if (args.path.includes("./") || args.path.includes("../")) {
          return {
            namespace: "a",
            path: new URL(
              args.path,
              "https://unpkg.com" + args.resolveDir + "/"
            ).href,
          };
        }

        return {
          namespace: "a",
          path: `https://www.unpkg.com/${args.path}`,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);

        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: content,
          };
        }

        const { data, request } = await axios.get(args.path);
        console.log({ data });
        return {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname, // get exactly path of current file
        };
      });
    },
  };
};
