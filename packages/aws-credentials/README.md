# @iac-factory/s3-tagging #

S3 Tagging CLI Application with User Prompt(s)

## Usage(s) ##

| Package                   | Command     | Description                         |
|---------------------------|-------------|-------------------------------------|
| `@iac-factory/s3-tagging` | `npm start` | Run the package in development mode |

### Setup (Local Development) ###

```shell
# --> (1) Clone the repository
# --> (2) Change into the local clone's directory

cd "$(git rev-parse --show-toplevel)" && npm install
```

#### Testing an NPX Executable, Locally ####

The following command is a common pattern I've personally
been using to test `npx` executables as if I were running them
from a `npm` registry:

```bash
npm install --global $(dirname $(npm root)) && $(basename $(dirname $(npm root)))
```

If a `command not found` error is returned, then the package
was incorrectly built, installed, and would otherwise not correctly
run if officially published.

Common mistakes include a misconfigured `package.json` & forgoing a special type of metadata called a [`shebang`](https://en.wikipedia.org/wiki/Shebang_(Unix)).

The `package.json` must contain the following section:

```json5
{
    "bin": {
        "package-name": "index.js",
        // Scope'd Package, Optional
        "@example/package-name": "index.js"
    }
}
```

Lastly, the package's entry-point (often `index.js` or `main.js`) must have the following
line at the top of the file:

```node
#!/usr/bin/env node
```
