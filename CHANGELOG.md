# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

## Backlog

*Version 0.X.0 (Backlog)*

* Add better support to parameterize a backtest on configuration tab.
* Connect into Sandbox Websocket to retrieve logs. (Server future feature)
* Add Code Snippets.
* Export results locally and save it in a history folder.
* Create a CSV with all performance reports and add a new line for each new backtest executed using this plugin.
* Intelissence based on Gekko core. Use the vscode api to help to indicate the essentials functions provided by the gekko since its not exposed by one library.

## [0.2.0]

* Create Workspace command.
* Support to `vscode-gekko-ext.json` under a Workspace.

## [0.1.0]

* Use the `backtest.json` under a strategy package to retrieve the a configuration of the backtest.
* Removed `paper-trader.toml` dependency for each strategy in order to read from `backtest.json`.

## [0.0.3]

* Fixed "command [x] not found" error.

## [0.0.1]

* Added a `command` to submit a Backtest to the current active Strategy on Editor.
* Added Paper Trader to Backtest.
* Added General Configuration for Backtest for each Strategy.
* Added an extension configuration to setup the environment used. Either are available `localhost` or `api-gekko.platform.jspare.org`.