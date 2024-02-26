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
      build.onLoad({ filter: /^index.js$/ }, () => {
        return {
          loader: "jsx",
          contents: inputCode,
        };
      });

      build.onLoad({ filter: /.css$/ }, async (args: esbuild.OnLoadArgs) => {
        const cached = await fileCached.getItem<esbuild.OnLoadResult>(
          args.path
        );

        if (cached) return cached;

        const { data, request } = await axios.get(args.path);

        const escaped = data
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");

        const contents = `
            const style = document.createElement('style');
            style.innerText = '${escaped}';
            document.head.appendChild(style);
        `;

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname, // get exactly path of current file
        };

        fileCached.setItem(args.path, result);

        return result;
      });

      build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
        const cached = await fileCached.getItem<esbuild.OnLoadResult>(
          args.path
        );

        if (cached) return cached;

        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname, // get exactly path of current file
        };

        fileCached.setItem(args.path, result);

        return result;
      });
    },
  };
};
