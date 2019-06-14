# vscode-gekko-ext

Gekko Strategy Builder for Vscode

## Running the Extension

- Run `npm install` in terminal to install dependencies
- Run the `Run Extension` target in the Debug View. This will:
	- Start a task `npm: watch` to compile the code
	- Run the extension in a new VS Code window

## Installing

> *Note*: Currently this extension is not published over marketplace since the platform is in development. In the future as part of our requirement we want to expose the extension together with a new Gekko DSL.

It's required to have the `code` installed in your system, follow this instructions below:

> Your OS can not find the VS Code binary code on its path. The VS Code Windows and Linux installations should have installed VS Code on your path. Try uninstalling and reinstalling VS Code. If code is still not found, consult the platform specific setup topics for Windows and Linux.
> On macOS, you need to manually run the Shell Command: Install 'code' command in PATH command (available through the Command Palette ⇧⌘P). Consult the macOS specific setup topic for details.


**Installing from Cloud Artifact**

```bash
# Set the desired version here. eg. EXT_VERSION=0.0.2
EXT_VERSION=0.1.0
curl https://storage.googleapis.com/vscode-ext/vscode-gekko-ext/vscode-gekko-ext-$EXT_VERSION.vsix --output vscode-gekko-ext-$EXT_VERSION.vsix
code --install-extension ./vscode-gekko-ext-$EXT_VERSION.vsix
```

**Installing from Build**

```bash
git clone https://bitbucket.org/jspare-wallet-platform/vscode-gekko-ext.git
npm i -g vsce
npm run compile
npm run package
code --install-extension ./dist/vscode-gekko-ext.vsix
```

**Uninstallling**

```bash
code --uninstall-extension jspare.vscode-gekko-ext
```


> Furthermore, the dist is currenlty delivered together with the code because was a problem with gcp cloud build to execute the vscode:prepublish command. It should be fixed ASAP.

## Usage

Structure expected:

- example-strategy/
- example-strategy/example-strategy.js (Strategy)
- example-strategy/example-strategy.toml (Strategy Configuration Parameters) - OPTIONAL
- example-strategy/paper-trader.js (Paper Trader in TOML format) - OPTIONAL
- example-strategy/backtest.json (Backtest in JSON format) - OPTIONAL

Command Pallete: `Platform Gekko: Stage Active Editor Strategy` or `Platform Gekko: Unstage Active Editor Strategy`
Command Pallete: `Platform Gekko: Backtest Active Editor Strategy`

## Changelog

> A release can be downloaded at: https://storage.googleapis.com/vscode-ext/vscode-gekko-ext/vscode-gekko-ext-<X.X.X>.zip

*Version 0.1.0*

[Download](https://storage.googleapis.com/vscode-ext/vscode-gekko-ext/vscode-gekko-ext-0.1.0.zip)

* Added Paper Trader to Backtest.
* Added General Configuration for Backtest for each Strategy.

*Version 0.0.2*

[Download](https://storage.googleapis.com/vscode-ext/vscode-gekko-ext/vscode-gekko-ext-0.0.2.zip)

* Fixed missing fields on backtest report.

*Version 0.0.1*

[Download](https://storage.googleapis.com/vscode-ext/vscode-gekko-ext/vscode-gekko-ext-0.0.1.zip)

* Added a `command` to Stage & Unstage a Strategy on a Gekko Instance.
* Added a `command` to submit a Backtest to the current active Strategy on Editor.
* Added an extension configuration to setup the environment used. Either are available `localhost` or `api-gekko.platform.jspare.org`.

## Backlog

*Version 0.X.0 (Backlog)*

* Add better support to parameterize a backtest on configuration tab.
* Connect into Sandbox Websocket to retrieve logs. (Server future feature)
* Add Code Snippets.
* Export results locally and save it in a history folder.
* Create a CSV with all performance reports and add a new line for each new backtest executed using this plugin.
* Intelissence based on Gekko core. Use the vscode api to help to indicate the essentials functions provided by the gekko since its not exposed by one library.
