import axios from "axios";
import * as esbuild from "esbuild-wasm";
import localforage from "localforage";

const fileCached = localforage.createInstance({
  name: "package",
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: inputCode,
          };
        }

        // check cached already exists
        const cached = await fileCached.getItem<esbuild.OnLoadResult>(
          args.path
        );

        // if it is, return immediatly
        if (cached) return cached;

        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname, // get exactly path of current file
        };

        // save to indexedDB
        fileCached.setItem(args.path, result);

        return result;
      });
    },
  };
};
