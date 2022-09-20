/***
 * Prompting Users for Input should be Easy...
 *
 * The following package is established with zero dependencies, and only
 * uses the node.js standard library.
 *
 * As such, context should be kept to devDependencies, and should never
 * be attempted to be used within a browser.
 *
 * Simply prompt the user for input at a given "key", and after a response,
 * a "value" will be set to that same index -- a simple key-value data-structure.
 */

import Input from "readline";

/***
 * User-Input Handler
 * ---
 *
 * @experimental
 * @constructor
 *
 */
export const Handler = async (cursor?: boolean) => {
    process?.on("exit", async (code = 0) => {
        await clear();

        process?.exit(code ? code : 0);
    });

    ( cursor ) || process?.stdout?.write("\u001B[?25l" + "\r");

    process?.stdin?.setRawMode(true);

    process?.stdin?.on("open", () => {
        process?.stdin?.on("timeout", () => {
            console.debug("[Debug] Standard-Input Timeout Event Trigger");
        });
    });

    const clear = async (wipe?: boolean) => {
        const [ X, Y ] = process?.stdout?.getWindowSize();

        const buffer = " ".repeat(process?.stdout?.columns) ?? null;

        process?.stdout?.cursorTo(0, Y);
        process?.stdout?.clearLine(0);

        process?.stdout?.write(buffer);

        process?.stdout?.cursorTo(0, process?.stdout?.rows);
        process?.stdout?.write("\u001B[?25h");

        process?.stdout?.emit("drain");

        ( wipe ) && process?.stdout?.cursorTo(0, 0);
        ( wipe ) && process?.stdout?.clearScreenDown();
    };

    process?.stdin?.on("data", async ($) => {
        /// Exit if User Inputs := CTRL + C
        Buffer.from([ 0x3 ]).equals($) && process?.exit(0);

        /// Exit if User Inputs := CTRL + D
        Buffer.from([ 0x4 ]).equals($) && process?.exit(0);

        /// Exit if User Inputs := CTRL + Z
        Buffer.from([ 0x1a ]).equals($) && process?.exit(0);
    });

    process?.on("exit", async (code = 0) => {
        await clear();

        process?.exit(code ? code : 0);
    });

    await clear(true);
};

/***
 * An Array of Question(s) to Feed into the Prompt Function
 */
export type Questions = ( { value?: null | string; key: string; prompt?: string, type?: StringConstructor } )[];

export type Answers = { [$: string]: { key: string; value: string; } };

export type State = { counter: number }

export interface Settings {
    /*** Lowercase all keys in return data structure - evaluates to true by default */
    normalize?: boolean;
}

/***
 * @example
 * ( async () => {
 *     const answers = await Prompt( [
 *         { key: "CI", type: String }
 *     ] ).catch( ( Utility.inspect ) );
 *
 *     console.log( answers );
 * } )();
 *
 * @param {Questions} questions
 * @param {Settings} settings
 * @return {Promise<unknown>}
 * @constructor
 */
export async function Prompt(questions: Questions, settings?: Settings): Promise<Answers> {
    if ( settings?.normalize ?? true ) {
        /*** Normalize Question Prompts */
        questions.forEach((question, index) => {
            if ( question?.prompt && question.prompt.includes(":") ) {
                questions[ index ]!.prompt = questions[ index ]!.prompt!.split(":")[ 0 ]! + ":" + " ";
            } else if ( question?.prompt ) {
                questions[ index ]!.prompt = questions[ index ]!.prompt + ":" + " ";
            } else {
                questions[ index ]!.prompt = questions[ index ]!.key + ":" + " ";
            }
        });

        questions.forEach((element, index) => {
            const reassignment = element.key.toLowerCase();

            if ( questions[ index ]?.key ) questions[ index ]!.key = reassignment;
        });
    }

    process?.stdin?.emit("open");

    return new Promise<Answers>((resolve, reject) => {
        const total = questions.length;
        const output: State = { counter: 0 };

        const Interface = Input.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: process.stdout.isTTY,
            historySize: 0
        });

        if ( !( questions[ output.counter ] )?.prompt || ( questions.length < 1 ) ) throw new Error("Error Establishing Question's Output Counter");

        Interface.setPrompt(questions[ output.counter ]!.prompt!);

        Interface.on("line", (data) => {
            ( questions[ output.counter ] ) && Object.assign(questions[ output.counter ]!, { value: data, ... questions[ output.counter ] });

            output.counter++;

            if ( output.counter === total ) {
                Interface.close();
                const container = Object.create({});

                for ( const question of questions ) {
                    const fn = question[ "type" ];

                    container[ question[ "key" ] ] = {
                        key: question[ "key" ],
                        value: ( fn ) ? fn(question[ "value" ]) : question.value
                    };
                }

                resolve(container);
            } else {
                Interface.setPrompt(questions[ output.counter ]!.prompt!);

                Interface.prompt();
            }
        });

        try {
            Interface.prompt();
        } catch ( _ ) {
            reject(_);
        } finally {
            process?.stdin?.emit("close");
        }
    }).catch((exception) => {
        throw exception;
    });
}

export default Prompt;