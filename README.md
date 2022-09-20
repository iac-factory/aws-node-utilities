# @iac-factory/aws-node-s3-utilities #

<details>
<summary>Usage & Security Disclaimer</summary>

**CLI utilities can be incredibly dangerous.**

- `stdin`, `os.exec`, and shells are easy to interface and therefore exploit.
- Having the ability to issue `os.exec` or interface `stdin` always makes the
  application dangerous.
- Protecting against harmful bugs or malicious actors isn't difficult if
  the application's logic is handled correctly, and precautions are made
  to disable [`REPLs`](https://en.wikipedia.org/wiki/Read–eval–print_loop)
  (but allowing `SIGKILL`, `SIGSTOP`, and other user-controlled signals).

A language's packaging utility (`npx`, `pep`, `cargo`, etc.) extends amazing capabilities,
but should never have the opportunity to be taken advantage of (***Development Supply-Chain Attacks***).

Ensure due diligence in writing cli applications.

</details>

## Usage(s) ##

| Package                   | Command                                           | Description                         |
|---------------------------|---------------------------------------------------|-------------------------------------|
| `@iac-factory/s3-tagging` | `npm run start --workspace packages/s3-tagging`   | Run the package in development mode |
| `@iac-factory/s3-tagging` | `npm run execute --workspace packages/s3-tagging` | Run the package in `npx` mode       |

### Setup (Local Development) ###

```shell
# --> (1) Clone the repository
# --> (2) Change into the local clone's directory

cd "$(git rev-parse --show-toplevel)" && npm install
```

#### Workspaces ####

"Workspaces" is a generic term that refers to the set of features in the `npm` cli that provides support to managing
multiple packages from within a singular top-level, root package.

These packages are additionally auto-symlinked during `npm install` as a single workspace. Symbolic-linking
largely eliminates run-script overhead and installation times.

**Example**

```bash
npm run start --workspace packages/s3-tagging
```

## `npm` Configuration  ##

<details>
<summary> Advanced <code>~/.npmrc</code> Configuration</summary>

### `~/.npmrc` ###

```ini
; For reference, every programming language's package-manager
; has a similar *.*rc (dot-rc) related setup (few exceptions
; include Go, C, etc.)

;
; Defaults := $ npm config ls --list
;          -> $ npm config ls --json

fund = false
cache = ~/.npm
prefix = /usr/local
package-lock = true
engine-strict = false

# --> loglevel = debug

registry = https://registry.npmjs.org/

; Package Initialization

; Personal Preference
init.author.email = jacob.sanders@cloudhybrid.io
init.author.name = Jacob B. Sanders
init.author.url = https://github.com/iac-factory
init.license = BSD-2-Clause
init.version = 0.0.1

; @cloud-technology:registry=https://gitlab.cloud-technology.io/api/v4/packages/npm/
; @iac-factory:registry=https://gitlab.cloud-technology.io/api/v4/packages/npm/

bin-links = true

; GitHub `npm` Configuration for the `@cloud-technology` Scope
@cloud-technology:registry = https://npm.pkg.github.com

; GitHub `npm` Configuration for the `@iac-factory` Scope
@iac-factory:registry = https://npm.pkg.github.com

; Scope Authentication - See EOF (1) Reference
; //npm.pkg.github.com/:_authToken=[TOKEN]

# /// (1) https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
```

</details>

### Authenticating against GitHub's `npm` Registry ####

Reading & writing packages via GitHub's registry requires appropriate authorization.

Once established, organizations can artifact + version their applications via
common package manager(s) (`npm` in the context of `node` & the following repository).

**Setup**

1. Add a `npm` registry authorization token to `~/.npmrc` 

    ```ini
    //npm.pkg.github.com/:_authToken=[redacted]
    ```
   - **Note** - the `//` ***are a requirement***; the double-forward-slashes
   have a special meaning to `npm`'s cli.

2. Ensure the line that reads `//npm.pkg.github.com/:_authToken=[redacted]` replaces the `[redacted]` text
with a ***GitHub PAT*** (Personal-Access-Token).
   - Refer to [Creating a GH Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-token)
     for further instruction. **Creating a token shouldn't take longer than a minute.**
   - At a minimum, token configuration requires `packages:read` access.
       - Package maintainers who are expected to publish releases further require `packages:write`.

Please visit [GitHub's Official Documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages)
for additional information.

#### Resolving `npm` Dependencies via GitHub ####

If a particular package depends on a scope'd `npm` package
that lives in GitHub, there's similar, however, subtle local
requirements that a package must include.

**In order to consume `npm` dependencies from GitHub**:

1. Establish a local `.npmrc` relative to the root of the project.
    
    ```bash
    cd "$(git rev-parse --show-toplevel)"
    touch .npmrc && git add --force .npmrc
    ```
   
2. Lastly, append the `npm` **scope** (i.e. the GitHub organization name)
to the local `.npmrc` file:

    ```bash
    cat << EOF >> .npmrc
    @example-organization:registry=https://npm.pkg.github.com
    EOF
    ```
   - Now any package of which contains the `@example-organization` scope
   will successfully resolve GitHub's `npm` registry (https://npm.pkg.github.com).
   - **Note** - if the `npm` package is *private*, ensure to have completed the
   setup instructions found in section [*Authenticating against GitHub's `npm` Registry*](#authenticating-against-githubs-npm-registry).
