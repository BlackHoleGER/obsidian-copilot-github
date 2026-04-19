import { App, Plugin, Notice } from "obsidian";

/**
 * Copilot + GitHub Integration Plugin
 * -----------------------------------------
 * Dieses Plugin ermöglicht:
 * - GitHub Repo Sync (Pull)
 * - Copilot API Requests (OpenAI-kompatibel)
 * - KI-gestützte Notizen
 * - Commands direkt in Obsidian
 */

export default class CopilotGithubPlugin extends Plugin {

    async onload() {
        console.log("Copilot + GitHub Plugin geladen");

        // Command: GitHub Repo Pull
        this.addCommand({
            id: "github-pull",
            name: "GitHub: Repo aktualisieren",
            callback: async () => {
                new Notice("Aktualisiere GitHub Repo…");

                const exec = require("child_process").exec;
                exec("git pull", (err: any, stdout: string) => {
                    if (err) {
                        new Notice("Fehler beim Git Pull");
                        return;
                    }
                    new Notice("GitHub Repo aktualisiert");
                });
            }
        });

        // Command: Copilot Chat
        this.addCommand({
            id: "copilot-chat",
            name: "Copilot: Frage stellen",
            callback: async () => {
                new Notice("Sende Anfrage an Copilot…");

                const response = await fetch("https://api.githubcopilot.com/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer DEIN_COPILOT_API_KEY"
                    },
                    body: JSON.stringify({
                        model: "gpt-4o",
                        messages: [
                            { role: "user", content: "Erstelle eine Zusammenfassung der aktuellen Notiz." }
                        ]
                    })
                });

                const data = await response.json();
                new Notice("Copilot Antwort: " + data.choices[0].message.content);
            }
        });
    }

    onunload() {
        console.log("Copilot + GitHub Plugin entladen");
    }
}
