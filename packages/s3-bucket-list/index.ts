#!/usr/bin/env node

import FS from "fs";
import Path from "path";
import Utility from "util";

import * as $ from "./src";

/***
 * Imports
 */
const { S3 } = $;

/***
 * Narrowing Type Validator
 *
 * @param {Generic | undefined} input
 * @param {any} properties
 * @return {Required<Generic>}
 */
function validate<Generic>(input: Generic | undefined, ... properties: ( object | boolean | number | null | undefined | Function["prototype"] )) {
    if ( !( input ) ) {
        throw Error("Validation Failure - Received Null Value as Input");
    }

    // @ts-ignore
    return input! as Required<Generic>;
}

/***
 * Acquire all S3 Buckets without Tags
 *
 * @return {Promise<string[]>}
 */
async function Resources(profiles: string[] = [ "default" ]) {
    const s3: { name: string, profile: string }[] = [];

    for await ( const profile of profiles ) {
        /*** S3 Service Client */
        const client = await S3(profile);

        const buckets = validate(( await client?.listBuckets({}) )?.Buckets);
        const names = buckets.map(($) => $[ "Name" ]).filter(($) => $) as string[];

        for ( const name of names ) {
            if ( name && typeof name === "string" ) {
                s3.push({
                    name, profile
                });
            }
        }

    }

    return s3;
}

( async () => {
    const profiles = [
        "production",
        "development"
    ];

    /*** AWS S3 Buckets of which do not have appropriate tags assigned */
    const buckets = await Resources(profiles);

    for ( const bucket of buckets ) {
        console.log(Utility.inspect(bucket, { depth: Infinity, sorted: true, compact: false, colors: true }) + "\n");
    }
} )();