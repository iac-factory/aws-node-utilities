#!/usr/bin/env node

import FS from "fs";
import Path from "path";
import Utility from "util";

import SM from "./src";

( async () => {
    /*** Secrets-Manager Service Client */
    const client = await SM.Client();

    console.log(Utility.inspect(client, { depth: Infinity, sorted: true, colors: true }));
} )();