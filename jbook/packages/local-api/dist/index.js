"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const serve = (port, filename, dir) => {
    console.log("serving on port", port);
    console.log("saving/fetching cell from", filename);
    console.log("pathname", dir);
};
exports.serve = serve;
