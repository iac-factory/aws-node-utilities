#!/usr/bin/env node

import FS from "fs";
import Path from "path";
import Utility from "util";

import * as $ from "./src";

import type { AWS } from "./src";

/***
 * Imports
 */
const { S3, Prompt, Handler, Color, Modifiers, Interface } = $;

/***
 * TTY Standard-Output Color + Styling Object Wrapper
 *
 * @type {{modifiers: Modifiers, utilities: Interface, colors: Color}}
 */
const Style = { colors: Color, modifiers: Modifiers, utilities: Interface };

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

module Types {
    export type Tags = { bucket: string, tags: import("@aws-sdk/client-s3").Tag[] | undefined } | { bucket: string, tags: null };
}

type Tags = "legacy" | "all" | "standard";

function Tags(type: Tags): Array<string> & { contains: (comparators?: { Key?: string, Value?: string }[] | null) => boolean } {
    /*** Array monkey-patch that will validate if a given S3's TagSet includes all appropriate tag key-value pairs */

    switch ( type ) {
        case "all": {
            const $ = [
                "Namespace",
                "Environment",
                "Application",
                "Service",
                "Legacy"
            ];

            Reflect.set($, "contains", (comparators?: { Key?: string, Value?: string }[] | null) => {
                const total = $.length;
                const iterator = { count: 0 };

                if ( !( comparators ) ) {
                    return false;
                }

                for ( const tag of $ ) {
                    for ( const comparator of comparators ) {
                        const assignment = {
                            key: false,
                            value: false
                        };

                        if ( "Key" in comparator && comparator?.[ "Key" ] && comparator?.[ "Key" ].length > 0 ) {
                            if ( comparator[ "Key" ] === tag ) {
                                assignment.key = true;
                            }
                        }

                        if ( "Value" in comparator && comparator?.[ "Value" ] && comparator?.[ "Value" ].length > 0 ) {
                            assignment.value = true;
                        }

                        if ( assignment.key && assignment.value ) {
                            iterator.count++;
                        }
                    }
                }

                return ( iterator.count === total );
            });

            return $ as Array<string> & {
                contains: (comparators?: { Key?: string, Value?: string }[] | null) => boolean;
            };
        }
        case "legacy": {
            const $ = [
                "Legacy"
            ];
            Reflect.set($, "contains", (comparators?: { Key?: string, Value?: string }[] | null) => {
                const total = $.length;
                const iterator = { count: 0 };

                if ( !( comparators ) ) {
                    return false;
                }

                for ( const tag of $ ) {
                    for ( const comparator of comparators ) {
                        const assignment = {
                            key: false,
                            value: false
                        };

                        if ( "Key" in comparator && comparator?.[ "Key" ] && comparator?.[ "Key" ].length > 0 ) {
                            if ( comparator[ "Key" ] === tag ) {
                                assignment.key = true;
                            }
                        }

                        if ( "Value" in comparator && comparator?.[ "Value" ] && comparator?.[ "Value" ].length > 0 ) {
                            assignment.value = true;
                        }

                        if ( assignment.key && assignment.value ) {
                            iterator.count++;
                        }
                    }
                }

                return ( iterator.count === total );
            });

            return $ as Array<string> & {
                contains: (comparators?: { Key?: string, Value?: string }[] | null) => boolean;
            };
        }
        case "standard": {
            const $ = [
                "Namespace",
                "Environment",
                "Application",
                "Service"
            ];

            Reflect.set($, "contains", (comparators?: { Key?: string, Value?: string }[] | null) => {
                const total = $.length;
                const iterator = { count: 0 };

                if ( !( comparators ) ) {
                    return false;
                }

                for ( const tag of $ ) {
                    for ( const comparator of comparators ) {
                        const assignment = {
                            key: false,
                            value: false
                        };

                        if ( "Key" in comparator && comparator?.[ "Key" ] && comparator?.[ "Key" ].length > 0 ) {
                            if ( comparator[ "Key" ] === tag ) {
                                assignment.key = true;
                            }
                        }

                        if ( "Value" in comparator && comparator?.[ "Value" ] && comparator?.[ "Value" ].length > 0 ) {
                            assignment.value = true;
                        }

                        if ( assignment.key && assignment.value ) {
                            iterator.count++;
                        }
                    }
                }

                return ( iterator.count === total );
            });

            return $ as Array<string> & {
                contains: (comparators?: { Key?: string, Value?: string }[] | null) => boolean;
            };
        }
        default: {
            const $ = [
                "Namespace",
                "Environment",
                "Application",
                "Service",
                "Legacy"
            ];

            Reflect.set($, "contains", (comparators?: { Key?: string, Value?: string }[] | null) => {
                const total = $.length;
                const iterator = { count: 0 };

                if ( !( comparators ) ) {
                    return false;
                }

                for ( const tag of $ ) {
                    for ( const comparator of comparators ) {
                        const assignment = {
                            key: false,
                            value: false
                        };

                        if ( "Key" in comparator && comparator?.[ "Key" ] && comparator?.[ "Key" ].length > 0 ) {
                            if ( comparator[ "Key" ] === tag ) {
                                assignment.key = true;
                            }
                        }

                        if ( "Value" in comparator && comparator?.[ "Value" ] && comparator?.[ "Value" ].length > 0 ) {
                            assignment.value = true;
                        }

                        if ( assignment.key && assignment.value ) {
                            iterator.count++;
                        }
                    }
                }

                return ( iterator.count === total );
            });

            return $ as Array<string> & {
                contains: (comparators?: { Key?: string, Value?: string }[] | null) => boolean;
            };
        }
    }
};

/***
 * Acquire all S3 Resource(s) regardless of tag key-value assignment(s)
 *
 * @param {AWS.Types["Client"]["S3"]} client
 * @param {string} name
 * @return {Promise<Types.Tags>}
 * @constructor
 */
const API = async (client: AWS.Types["Client"]["S3"], name: string): Promise<Types.Tags> => {
    try {
        const response = validate(await client?.getBucketTagging({ Bucket: name }));

        return {
            bucket: name,
            tags: response[ "TagSet" ]
        };
    } catch ( exception ) {
        /*** --> Continue */
    }

    return {
        bucket: name,
        tags: null
    };
};

/***
 * Acquire all S3 Buckets without Tags
 *
 * @return {Promise<string[]>}
 */
async function Resources(client: AWS.Types["Client"]["S3"], validator: Tags, cache?: string) {
    if ( cache ) {
        return JSON.parse(( await FS.promises.readFile(cache, "utf-8") )) as { name: string, iterator: string[], tags: import("@aws-sdk/client-s3").Tag[] | null | undefined }[];
    }

    const buckets = validate(( await client?.listBuckets({}) )?.Buckets);
    const names = buckets.map(($) => $[ "Name" ]).filter(($) => $) as string[];

    const untagged: { name: string, iterator: string[], tags: import("@aws-sdk/client-s3").Tag[] | null | undefined }[] = [];
    for ( const name of names ) {
        const { tags } = await API(client, name);

        if ( !( tags ) ) {
            untagged.push({
                name, tags, iterator: Tags(validator)
            });
        } else if ( !( Tags(validator).contains(tags) ) ) {
            untagged.push({
                name, tags, iterator: Tags(validator)
            });
        }
    }

    return untagged;
}

async function Cache(client: AWS.Types["Client"]["S3"], settings: { clear?: boolean, rehydrate?: boolean } = {}) {
    const System = await import("fs/promises");

    settings.clear ??= false;
    settings.rehydrate ??= false;

    const directory = async (target: string = ".cache") => {
        target = Path.join(process.cwd(), Path.basename(target));
        if ( FS.existsSync(target) ) {
            const statistics = await System.stat(target);
            if ( statistics.isDirectory() ) {
                return true;
            }
        }

        return false;
    };

    const file = async (target: string) => {
        target = Path.join(process.cwd(), ".cache", Path.basename(target));
        if ( FS.existsSync(target) ) {
            const statistics = await System.stat(target);
            if ( statistics.isFile() ) {
                return true;
            }
        }

        return false;
    };

    !( await directory() ) && await System.mkdir(".cache");

    ( ( settings.rehydrate == true ) || !( await file("s3-buckets.json") ) ) && await ( async () => {
        const buckets = await Resources(client, "all");
        await System.writeFile(Path.join(process.cwd(), ".cache", Path.basename("s3-buckets.json")), JSON.stringify(buckets, null, 4), "utf-8");
    } )();

    return {
        "s3-buckets": Path.join(process.cwd(), ".cache", Path.basename("s3-buckets.json")),
        $: class {
            private path: string = Path.join(process.cwd(), ".cache", Path.basename("tag-projection.json"));

            public get file() {
                return this.path;
            }

            public static clear() {
                FS.rmSync(Path.join(process.cwd(), ".cache", Path.basename("tag-projection.json")), { recursive: true, force: true });
            }

            private read() {
                this.validate();
                const raw = FS.readFileSync(this.file, "utf-8");
                const serial = JSON.parse(raw);

                if ( Array.isArray(serial) ) {
                    return serial;
                }

                return null;
            }

            public get index() {
                const contents = this.read();
                if ( Array.isArray(contents) ) {
                    return contents.length;
                }

                return null;
            }

            public validate() {
                if ( !( FS.existsSync(this.file) ) ) {
                    FS.writeFileSync(this.file, JSON.stringify([], null, 4), "utf-8");
                }
            }

            public async write(data: { bucket: string, tags: { [ $: string ]: { key: string, value: string } } }) {
                const contents = this.read();
                if ( contents !== null ) {
                    const array = Array.from(contents);
                    array.push(data);
                    await FS.promises.writeFile(this.file, JSON.stringify(array, null, 4), "utf-8");
                }
            }

            public get array() {
                const contents = this.read();
                if ( contents !== null ) {
                    return contents;
                }

                return null;
            }
        }
    };
}

( async () => {
    await ( async () => Handler(true) )();

    /*** S3 Service Client */
    const client = await S3();

    const clear = process.argv.includes("--clear");
    const cache = await Cache(client, { rehydrate: clear });

    const { $ } = cache;

    ( clear ) && $.clear();

    const pointer = ( new $() ).index;

    /*** AWS S3 Buckets of which do not have appropriate tags assigned */
    const buckets = await Resources(client, "all", cache[ "s3-buckets" ]);

    /***
     * @type {{readonly total: number, prompts: number}}
     */
    const progression: { prompts: number, readonly total: number } = {
        prompts: ( pointer ) ? pointer : 0,
        total: buckets.length
    };

    /*** Data structure housing projected s3 resource that need tag updates */
    const projections: ( { bucket: string } & { tags: { [ $: string ]: { key: string, value: string } } } )[] = [];
    /*** Data structure housing standardized tags to prompt for user-input */
    const questions: { bucket: string, prompts: () => { prompt: string, key: string }[] }[] = [];

    /***
     * Prompt wrapper that bolds input for usage as a title
     *
     * @param {string} name
     */
    const title = (name: string) => Style.modifiers.bold(Style.colors.bright.red(name));

    /***
     * Prompt wrapper that returns prompt progress
     *
     * @return {string}
     */
    const progress = () => {
        return Style.colors.blue("Bucket") + " " + "[" + Style.colors.blue(String(progression.prompts)) + "/" + Style.colors.blue(String(progression.total)) + "]";
    };

    /***
     * Prompt wrapper that returns `title` constructor + TagSet data-structure, Progress
     *
     * @param {string} name
     */
    const context = (name: string, body: Types.Tags["tags"]) => {
        return title(name) + " " + Utility.inspect(body, { compact: false, colors: true }) + " " + progress();
    };

    /***
     * Contextual information where users can examine the applicable s3 resource while determining appropriate tag values
     *
     * @param {string} input
     */
    const assignment = (input: string) => Style.modifiers.bold(Style.modifiers.underline(Style.colors.magenta(input)));

    for ( const bucket of buckets ) {
        const { name } = bucket;
        const { tags } = bucket;
        const { iterator } = bucket;

        /***
         * Callable that will recalculate progression + user-input
         *
         * @return {{prompt: string, key: string}[] | undefined}
         */
        const fn = () => {
            return iterator?.map((tag, count) => ( count > 0 ) ? {
                    prompt: "(" + " " + title(name) + " " + ")"
                        + " " + "➔" + " "
                        + assignment(tag)
                        + ":" + " ",
                    key: tag
                } : {
                    prompt: "(" + " " + context(name, tags) + " " + ")"
                        + " " + "➔" + " "
                        + assignment(tag)
                        + ":" + " ",
                    key: tag
                }
            );
        };

        questions.push({
            bucket: name, prompts: fn
        });
    }

    for ( const resource of questions.splice(( pointer ) ? pointer : 0) ) {
        const tags = await Prompt(resource.prompts(), {
            normalize: false
        });

        const storable: { bucket: string, prompts?: () => any } & { tags: ( { [ $: string ]: { key: string, value: string } } ) } = {
            ... resource, tags
        };

        delete storable.prompts;

        await ( new $() ).write(storable);

        progression.prompts++;
    }

    const { array } = ( new $() );

    ( array ) && array.forEach((projection) => projections.push(projection));
} )();