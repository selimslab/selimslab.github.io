---
title: VSCode Settings 
tags: pro 
---

## Some default keyboard shortcuts 


    Multiple cursors: option + shift + click


    Go top: cmd ⬆️

    Go bottom: cmd ⬇️


    Zoom in: cmd shift 0 

    Zoom out: cmd - 


    Select next occurrence: cmd D

    Select all occurrences: cmd + shift + L


    Fold all: Ctrl + K + 0

    Unfold all: Ctrl + K + J


    swith to explorer: cmd 0 





## settings.json 

install macros geddski.macros 

add macros to vscode settings 


    {  
        "task.allowAutomaticTasks": "on",
        "files.autoSave": "afterDelay",
        "files.autoSaveDelay": 1000,
        "files.exclude": {
            "**/__pycache__": true
        },
        "extensions.ignoreRecommendations": true,
        "macros": {
            "downAndOpen": [ "list.focusDown", "list.selectAndPreserveFocus" ],
            "upAndOpen": [ "list.focusUp", "list.selectAndPreserveFocus" ]
        }
    }

## keybindings 

open keyboard shortcuts json and add keybindings

// Place your key bindings in this file to override the defaults
[
    {
        "key": "ctrl+[Backquote]",
        "command": "workbench.action.navigateBack"
    },
    {
        "key": "ctrl+-",
        "command": "-workbench.action.navigateBack"
    },
    {
        "key": "cmd+s cmd+s",
        "command": "git.stageAll"
    },
    {
        "key": "cmd+n cmd+n",
        "command": "explorer.newFile"
    },
    {
        "key": "cmd+down",
        "command": "list.select",
        "when": "listFocus && !inputFocus"
    },
    {
        "key": "cmd+down",
        "command": "-list.select",
        "when": "listFocus && !inputFocus"
    },
    { "key": "down", "command": "macros.downAndOpen", "when": "listFocus" },
    { "key": "up", "command": "macros.upAndOpen", "when": "listFocus" },
    {
        "key": "ctrl+n",
        "command": "explorer.newFile",
        "when": "explorerViewletFocus"
    },
    {
        "key": "ctrl+shift+n",
        "command": "explorer.newFolder",
        "when": "explorerViewletFocus"
    },
    {
        "key": "shift+e",
        "command": "workbench.view.explorer",
        "when": "viewContainer.workbench.view.explorer.enabled"
    },
    {
        "key": "ctrl+shift+e",
        "command": "-workbench.view.explorer",
        "when": "viewContainer.workbench.view.explorer.enabled"
    }
]


## extensions.json 

    {
        // See https://go.microsoft.com/fwlink/?LinkId=827846 to learn about workspace recommendations.
        // Extension identifier format: ${publisher}.${name}. Example: vscode.csharp

        // List of extensions which should be recommended for users of this workspace.
        "recommendations": [
            "foam.foam-vscode",
            "pomdtr.excalidraw-editor",
            "geddski.macros",
            "yzhang.markdown-all-in-one",
            "mdickin.markdown-shortcuts",
            "equinusocio.vsc-material-theme",
            "gruntfuggly.todo-tree",
            "uctakeoff.vscode-counter",
            "golang.go",
            "formulahendry.code-runner",
            "samuelcolvin.jinjahtml",
            "znck.grammarly"
        ],
        // List of extensions recommended by VS Code that should not be recommended for users of this workspace.
        "unwantedRecommendations": [
            
        ]
    }

## tasks.json 

    {
        "version": "2.0.0",
        "tasks": [
        {
            "label": "Serve", 
            "type": "shell",
            "command": "git pull && git push gitlab master && bundle exec jekyll serve",
            "group": "none",
            "presentation": {
            "reveal": "always",
            "panel": "new"
            },
            "runOptions": {
            "runOn": "folderOpen"
            }
        }
        ]
    }


