var background = (function() {
  "use strict";
  function defineBackground(arg) {
    if (arg == null || typeof arg === "function") return { main: arg };
    return arg;
  }
  const SETTINGS_KEY = "citizen_one_settings";
  const DEFAULT_SETTINGS = {
    activeProvider: "gemini",
    providers: {
      gemini: {
        key: "gemini",
        model: "gemini-1.5-flash",
        enabled: true
      },
      groq: {
        key: "groq",
        model: "llama3-8b-8192",
        enabled: false
      },
      nvidia: {
        key: "nvidia",
        baseUrl: "https://integrate.api.nvidia.com/v1",
        model: "meta/llama-3.1-70b-instruct",
        enabled: false
      },
      ollama: {
        key: "ollama",
        baseUrl: "http://localhost:11434/v1",
        model: "llama3",
        enabled: false
      }
    },
    vaultExists: false,
    autoFill: false,
    highlightFields: true
  };
  async function getSettings() {
    return new Promise((resolve) => {
      chrome.storage.local.get([SETTINGS_KEY], (result2) => {
        if (result2[SETTINGS_KEY]) {
          resolve({ ...DEFAULT_SETTINGS, ...result2[SETTINGS_KEY] });
        } else {
          resolve(DEFAULT_SETTINGS);
        }
      });
    });
  }
  function buildSystemPrompt(vaultKeys) {
    return `You are CitizenOne, a privacy-first form assistant.
Your task is to analyze a web form and map each form field to the correct data key.

Available data keys from the user's local vault:
${vaultKeys.map((k) => `  - ${k}`).join("\n")}

Rules:
1. Respond ONLY with a valid JSON object mapping field IDs to vault keys.
2. Only include fields you can confidently map. Skip fields you are unsure about.
3. Do NOT invent or hallucinate keys not in the vault list above.
4. Format: { "field_id_or_name": "vault_key" }
5. Example: { "first-name": "first_name", "dob": "date_of_birth" }

Output ONLY the JSON object. No explanation, no markdown fences.`;
  }
  function buildUserPrompt(map) {
    const fieldLines = map.fields.map((f) => {
      const parts = [`id="${f.id}"`, `type="${f.type}"`, `label="${f.label}"`];
      if (f.placeholder) parts.push(`placeholder="${f.placeholder}"`);
      if (f.name) parts.push(`name="${f.name}"`);
      if (f.options?.length) parts.push(`options=[${f.options.slice(0, 8).join(", ")}]`);
      if (f.required) parts.push(`required`);
      if (f.context) parts.push(`context="${f.context.slice(0, 80)}"`);
      return `  { ${parts.join(", ")} }`;
    }).join(",\n");
    return `Form URL: ${map.url}
Form Title: ${map.title}
Fields:
[
${fieldLines}
]

Map these fields to vault keys.`;
  }
  async function callGemini(apiKey, model, system, user) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: system }] },
        contents: [{ parts: [{ text: user }], role: "user" }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 1024,
          responseMimeType: "application/json"
        }
      })
    });
    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Gemini error ${response.status}: ${err}`);
    }
    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    return text.trim();
  }
  async function callOpenAICompat(baseUrl, apiKey, model, system, user) {
    const url = `${baseUrl}/chat/completions`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user }
        ],
        temperature: 0.1,
        max_tokens: 1024,
        response_format: { type: "json_object" }
      })
    });
    if (!response.ok) {
      const err = await response.text();
      throw new Error(`API error ${response.status}: ${err}`);
    }
    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content ?? "";
    return text.trim();
  }
  const PROVIDER_DEFAULTS = {
    gemini: {
      baseUrl: "https://generativelanguage.googleapis.com",
      model: "gemini-1.5-flash"
    },
    groq: {
      baseUrl: "https://api.groq.com/openai/v1",
      model: "llama3-8b-8192"
    },
    nvidia: {
      baseUrl: "https://integrate.api.nvidia.com/v1",
      model: "meta/llama-3.1-70b-instruct"
    },
    ollama: {
      baseUrl: "http://localhost:11434/v1",
      model: "llama3"
    }
  };
  async function analyzeForm(opts, semanticMap, vaultKeys) {
    const defaults = PROVIDER_DEFAULTS[opts.key];
    const model = opts.model ?? defaults.model;
    const baseUrl = opts.baseUrl ?? defaults.baseUrl;
    const systemPrompt = buildSystemPrompt(vaultKeys);
    const userPrompt = buildUserPrompt(semanticMap);
    let rawJson;
    if (opts.key === "gemini") {
      if (!opts.apiKey) throw new Error("Gemini API key is required.");
      rawJson = await callGemini(opts.apiKey, model, systemPrompt, userPrompt);
    } else {
      if (opts.key !== "ollama" && !opts.apiKey) {
        throw new Error(`${opts.key} API key is required.`);
      }
      rawJson = await callOpenAICompat(
        baseUrl,
        opts.apiKey ?? "ollama",
        model,
        systemPrompt,
        userPrompt
      );
    }
    let mapping;
    try {
      const cleaned = rawJson.replace(/```json\n?|```\n?/g, "").trim();
      mapping = JSON.parse(cleaned);
    } catch {
      throw new Error(`Failed to parse LLM response as JSON. Raw: ${rawJson}`);
    }
    const validKeys = new Set(vaultKeys);
    const validated = {};
    for (const [fieldId, vaultKey] of Object.entries(mapping)) {
      if (validKeys.has(vaultKey)) {
        validated[fieldId] = vaultKey;
      }
    }
    return validated;
  }
  async function testProvider(opts) {
    const pingMap = {
      url: "https://test.example",
      title: "Test Form",
      fields: [
        { id: "first_name_field", type: "text", label: "First Name", required: true }
      ]
    };
    await analyzeForm(opts, pingMap, ["first_name", "last_name", "email"]);
    return "Connection successful!";
  }
  const providers = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    analyzeForm,
    testProvider
  }, Symbol.toStringTag, { value: "Module" }));
  const definition = defineBackground(() => {
    console.log("[CitizenOne] Background service worker started.");
    chrome.runtime.onMessage.addListener(
      (message, sender, sendResponse) => {
        handleMessage(message, sender, sendResponse);
        return true;
      }
    );
  });
  async function handleMessage(message, sender, sendResponse) {
    try {
      switch (message.type) {
        case "ANALYZE_FORM": {
          const semanticMap = message.semanticMap;
          const vaultKeys = message.vaultKeys;
          const settings = await getSettings();
          const activeProviderConfig = settings.providers[settings.activeProvider];
          const opts = {
            key: settings.activeProvider,
            apiKey: activeProviderConfig.apiKey,
            baseUrl: activeProviderConfig.baseUrl,
            model: activeProviderConfig.model
          };
          const mapping = await analyzeForm(opts, semanticMap, vaultKeys);
          sendResponse({ success: true, data: mapping });
          break;
        }
        case "INJECT_AND_GET_MAP": {
          const tabId = sender.tab?.id ?? message.tabId;
          if (!tabId) {
            sendResponse({ success: false, error: "No tab ID provided." });
            return;
          }
          const results = await chrome.scripting.executeScript({
            target: { tabId },
            func: getSemanticMapFromPage
          });
          const semanticMap = results?.[0]?.result;
          if (!semanticMap) {
            sendResponse({ success: false, error: "Failed to extract semantic map." });
            return;
          }
          sendResponse({ success: true, data: semanticMap });
          break;
        }
        case "TEST_PROVIDER": {
          const { providerKey, apiKey, baseUrl, model } = message;
          const { testProvider: testProvider2 } = await Promise.resolve().then(() => providers);
          const result2 = await testProvider2({
            key: providerKey,
            apiKey,
            baseUrl,
            model
          });
          sendResponse({ success: true, data: result2 });
          break;
        }
        default:
          sendResponse({ success: false, error: `Unknown message type: ${message.type}` });
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error("[CitizenOne] Background error:", errorMsg);
      sendResponse({ success: false, error: errorMsg });
    }
  }
  function getSemanticMapFromPage() {
    const MAX_BYTES = 2048;
    function resolveLabel(el) {
      const ariaLabel = el.getAttribute("aria-label");
      if (ariaLabel) return ariaLabel.trim();
      const labelledBy = el.getAttribute("aria-labelledby");
      if (labelledBy) {
        const labelEl = document.getElementById(labelledBy);
        if (labelEl) return (labelEl.textContent ?? "").trim();
      }
      const id = el.id;
      if (id) {
        const label = document.querySelector(
          `label[for="${CSS.escape(id)}"]`
        );
        if (label) return (label.textContent ?? "").trim();
      }
      const wrapping = el.closest("label");
      if (wrapping) {
        const clone = wrapping.cloneNode(true);
        clone.querySelectorAll("input,select,textarea").forEach((e) => e.remove());
        const text = (clone.textContent ?? "").trim();
        if (text) return text;
      }
      const placeholder = el.placeholder;
      if (placeholder) return placeholder.trim();
      const name = el.getAttribute("name");
      if (name) return name.replace(/[_-]/g, " ").trim();
      return "";
    }
    const selector = 'input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="reset"]):not([type="image"]), select, textarea';
    const elements = Array.from(document.querySelectorAll(selector));
    const fields = [];
    let bytesUsed = 0;
    for (const el of elements) {
      if (!el.offsetParent) continue;
      if (bytesUsed >= MAX_BYTES) break;
      const id = el.id || el.getAttribute("name") || `field_${fields.length}`;
      const type = el.tagName === "SELECT" ? "select" : el.tagName === "TEXTAREA" ? "textarea" : el.type || "text";
      const label = resolveLabel(el);
      if (!label) continue;
      const field = { id, type, label };
      const placeholder = el.placeholder;
      if (placeholder && placeholder !== label) field.placeholder = placeholder;
      const name = el.getAttribute("name");
      if (name && name !== id) field.name = name;
      if (el.tagName === "SELECT") {
        const opts = Array.from(el.options).map((o) => o.text.trim()).filter((t) => t && t.toLowerCase() !== "select");
        if (opts.length) field.options = opts.slice(0, 10);
      }
      if (el.required) field.required = true;
      fields.push(field);
      bytesUsed += JSON.stringify(field).length;
    }
    return {
      url: window.location.href,
      title: document.title,
      fields,
      totalFields: elements.length
    };
  }
  function initPlugins() {
  }
  const browser$1 = globalThis.browser?.runtime?.id ? globalThis.browser : globalThis.chrome;
  const browser = browser$1;
  var _MatchPattern = class {
    constructor(matchPattern) {
      if (matchPattern === "<all_urls>") {
        this.isAllUrls = true;
        this.protocolMatches = [..._MatchPattern.PROTOCOLS];
        this.hostnameMatch = "*";
        this.pathnameMatch = "*";
      } else {
        const groups = /(.*):\/\/(.*?)(\/.*)/.exec(matchPattern);
        if (groups == null)
          throw new InvalidMatchPattern(matchPattern, "Incorrect format");
        const [_, protocol, hostname, pathname] = groups;
        validateProtocol(matchPattern, protocol);
        validateHostname(matchPattern, hostname);
        this.protocolMatches = protocol === "*" ? ["http", "https"] : [protocol];
        this.hostnameMatch = hostname;
        this.pathnameMatch = pathname;
      }
    }
    includes(url) {
      if (this.isAllUrls)
        return true;
      const u = typeof url === "string" ? new URL(url) : url instanceof Location ? new URL(url.href) : url;
      return !!this.protocolMatches.find((protocol) => {
        if (protocol === "http")
          return this.isHttpMatch(u);
        if (protocol === "https")
          return this.isHttpsMatch(u);
        if (protocol === "file")
          return this.isFileMatch(u);
        if (protocol === "ftp")
          return this.isFtpMatch(u);
        if (protocol === "urn")
          return this.isUrnMatch(u);
      });
    }
    isHttpMatch(url) {
      return url.protocol === "http:" && this.isHostPathMatch(url);
    }
    isHttpsMatch(url) {
      return url.protocol === "https:" && this.isHostPathMatch(url);
    }
    isHostPathMatch(url) {
      if (!this.hostnameMatch || !this.pathnameMatch)
        return false;
      const hostnameMatchRegexs = [
        this.convertPatternToRegex(this.hostnameMatch),
        this.convertPatternToRegex(this.hostnameMatch.replace(/^\*\./, ""))
      ];
      const pathnameMatchRegex = this.convertPatternToRegex(this.pathnameMatch);
      return !!hostnameMatchRegexs.find((regex) => regex.test(url.hostname)) && pathnameMatchRegex.test(url.pathname);
    }
    isFileMatch(url) {
      throw Error("Not implemented: file:// pattern matching. Open a PR to add support");
    }
    isFtpMatch(url) {
      throw Error("Not implemented: ftp:// pattern matching. Open a PR to add support");
    }
    isUrnMatch(url) {
      throw Error("Not implemented: urn:// pattern matching. Open a PR to add support");
    }
    convertPatternToRegex(pattern) {
      const escaped = this.escapeForRegex(pattern);
      const starsReplaced = escaped.replace(/\\\*/g, ".*");
      return RegExp(`^${starsReplaced}$`);
    }
    escapeForRegex(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
  };
  var MatchPattern = _MatchPattern;
  MatchPattern.PROTOCOLS = ["http", "https", "file", "ftp", "urn"];
  var InvalidMatchPattern = class extends Error {
    constructor(matchPattern, reason) {
      super(`Invalid match pattern "${matchPattern}": ${reason}`);
    }
  };
  function validateProtocol(matchPattern, protocol) {
    if (!MatchPattern.PROTOCOLS.includes(protocol) && protocol !== "*")
      throw new InvalidMatchPattern(
        matchPattern,
        `${protocol} not a valid protocol (${MatchPattern.PROTOCOLS.join(", ")})`
      );
  }
  function validateHostname(matchPattern, hostname) {
    if (hostname.includes(":"))
      throw new InvalidMatchPattern(matchPattern, `Hostname cannot include a port`);
    if (hostname.includes("*") && hostname.length > 1 && !hostname.startsWith("*."))
      throw new InvalidMatchPattern(
        matchPattern,
        `If using a wildcard (*), it must go at the start of the hostname`
      );
  }
  function print(method, ...args) {
    if (typeof args[0] === "string") method(`[wxt] ${args.shift()}`, ...args);
    else method("[wxt]", ...args);
  }
  const logger = {
    debug: (...args) => print(console.debug, ...args),
    log: (...args) => print(console.log, ...args),
    warn: (...args) => print(console.warn, ...args),
    error: (...args) => print(console.error, ...args)
  };
  let ws;
  function getDevServerWebSocket() {
    if (ws == null) {
      const serverUrl = "ws://localhost:3001";
      logger.debug("Connecting to dev server @", serverUrl);
      ws = new WebSocket(serverUrl, "vite-hmr");
      ws.addWxtEventListener = ws.addEventListener.bind(ws);
      ws.sendCustom = (event, payload) => ws?.send(JSON.stringify({
        type: "custom",
        event,
        payload
      }));
      ws.addEventListener("open", () => {
        logger.debug("Connected to dev server");
      });
      ws.addEventListener("close", () => {
        logger.debug("Disconnected from dev server");
      });
      ws.addEventListener("error", (event) => {
        logger.error("Failed to connect to dev server", event);
      });
      ws.addEventListener("message", (e) => {
        try {
          const message = JSON.parse(e.data);
          if (message.type === "custom") ws?.dispatchEvent(new CustomEvent(message.event, { detail: message.data }));
        } catch (err) {
          logger.error("Failed to handle message", err);
        }
      });
    }
    return ws;
  }
  function keepServiceWorkerAlive() {
    setInterval(async () => {
      await browser.runtime.getPlatformInfo();
    }, 5e3);
  }
  function reloadContentScript(payload) {
    if (browser.runtime.getManifest().manifest_version == 2) reloadContentScriptMv2();
    else reloadContentScriptMv3(payload);
  }
  async function reloadContentScriptMv3({ registration, contentScript }) {
    if (registration === "runtime") await reloadRuntimeContentScriptMv3(contentScript);
    else await reloadManifestContentScriptMv3(contentScript);
  }
  async function reloadManifestContentScriptMv3(contentScript) {
    const id = `wxt:${contentScript.js[0]}`;
    logger.log("Reloading content script:", contentScript);
    const registered = await browser.scripting.getRegisteredContentScripts();
    logger.debug("Existing scripts:", registered);
    const existing = registered.find((cs) => cs.id === id);
    if (existing) {
      logger.debug("Updating content script", existing);
      await browser.scripting.updateContentScripts([{
        ...contentScript,
        id,
        css: contentScript.css ?? []
      }]);
    } else {
      logger.debug("Registering new content script...");
      await browser.scripting.registerContentScripts([{
        ...contentScript,
        id,
        css: contentScript.css ?? []
      }]);
    }
    await reloadTabsForContentScript(contentScript);
  }
  async function reloadRuntimeContentScriptMv3(contentScript) {
    logger.log("Reloading content script:", contentScript);
    const registered = await browser.scripting.getRegisteredContentScripts();
    logger.debug("Existing scripts:", registered);
    const matches = registered.filter((cs) => {
      const hasJs = contentScript.js?.find((js) => cs.js?.includes(js));
      const hasCss = contentScript.css?.find((css) => cs.css?.includes(css));
      return hasJs || hasCss;
    });
    if (matches.length === 0) {
      logger.log("Content script is not registered yet, nothing to reload", contentScript);
      return;
    }
    await browser.scripting.updateContentScripts(matches);
    await reloadTabsForContentScript(contentScript);
  }
  async function reloadTabsForContentScript(contentScript) {
    const allTabs = await browser.tabs.query({});
    const matchPatterns = contentScript.matches.map((match) => new MatchPattern(match));
    const matchingTabs = allTabs.filter((tab) => {
      const url = tab.url;
      if (!url) return false;
      return !!matchPatterns.find((pattern) => pattern.includes(url));
    });
    await Promise.all(matchingTabs.map(async (tab) => {
      try {
        await browser.tabs.reload(tab.id);
      } catch (err) {
        logger.warn("Failed to reload tab:", err);
      }
    }));
  }
  async function reloadContentScriptMv2(_payload) {
    throw Error("TODO: reloadContentScriptMv2");
  }
  {
    try {
      const ws2 = getDevServerWebSocket();
      ws2.addWxtEventListener("wxt:reload-extension", () => {
        browser.runtime.reload();
      });
      ws2.addWxtEventListener("wxt:reload-content-script", (event) => {
        reloadContentScript(event.detail);
      });
      if (true) {
        ws2.addEventListener("open", () => ws2.sendCustom("wxt:background-initialized"));
        keepServiceWorkerAlive();
      }
    } catch (err) {
      logger.error("Failed to setup web socket connection with dev server", err);
    }
    browser.commands.onCommand.addListener((command) => {
      if (command === "wxt:reload-extension") browser.runtime.reload();
    });
  }
  let result;
  try {
    initPlugins();
    result = definition.main();
    if (result instanceof Promise) console.warn("The background's main() function return a promise, but it must be synchronous");
  } catch (err) {
    logger.error("The background crashed on startup!");
    throw err;
  }
  var background_entrypoint_default = result;
  return background_entrypoint_default;
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vbm9kZV9tb2R1bGVzL3d4dC9kaXN0L3V0aWxzL2RlZmluZS1iYWNrZ3JvdW5kLm1qcyIsIi4uLy4uL3NyYy9saWIvc2V0dGluZ3MudHMiLCIuLi8uLi9zcmMvbGliL3Byb3ZpZGVycy50cyIsIi4uLy4uL3NyYy9lbnRyeXBvaW50cy9iYWNrZ3JvdW5kLnRzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0B3eHQtZGV2L2Jyb3dzZXIvc3JjL2luZGV4Lm1qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy93eHQvZGlzdC9icm93c2VyLm1qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9Ad2ViZXh0LWNvcmUvbWF0Y2gtcGF0dGVybnMvbGliL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vI3JlZ2lvbiBzcmMvdXRpbHMvZGVmaW5lLWJhY2tncm91bmQudHNcbmZ1bmN0aW9uIGRlZmluZUJhY2tncm91bmQoYXJnKSB7XG5cdGlmIChhcmcgPT0gbnVsbCB8fCB0eXBlb2YgYXJnID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB7IG1haW46IGFyZyB9O1xuXHRyZXR1cm4gYXJnO1xufVxuXG4vLyNlbmRyZWdpb25cbmV4cG9ydCB7IGRlZmluZUJhY2tncm91bmQgfTsiLCIvLyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcclxuLy8gQ2l0aXplbk9uZSDigJMgRXh0ZW5zaW9uIFNldHRpbmdzIChjaHJvbWUuc3RvcmFnZS5sb2NhbCwgdW5lbmNyeXB0ZWQpXHJcbi8vIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxyXG5cclxuaW1wb3J0IHR5cGUgeyBFeHRlbnNpb25TZXR0aW5ncywgUHJvdmlkZXJDb25maWcsIFByb3ZpZGVyS2V5IH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5cclxuY29uc3QgU0VUVElOR1NfS0VZID0gJ2NpdGl6ZW5fb25lX3NldHRpbmdzJztcclxuXHJcbmNvbnN0IERFRkFVTFRfU0VUVElOR1M6IEV4dGVuc2lvblNldHRpbmdzID0ge1xyXG4gICAgYWN0aXZlUHJvdmlkZXI6ICdnZW1pbmknLFxyXG4gICAgcHJvdmlkZXJzOiB7XHJcbiAgICAgICAgZ2VtaW5pOiB7XHJcbiAgICAgICAgICAgIGtleTogJ2dlbWluaScsXHJcbiAgICAgICAgICAgIG1vZGVsOiAnZ2VtaW5pLTEuNS1mbGFzaCcsXHJcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBncm9xOiB7XHJcbiAgICAgICAgICAgIGtleTogJ2dyb3EnLFxyXG4gICAgICAgICAgICBtb2RlbDogJ2xsYW1hMy04Yi04MTkyJyxcclxuICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBudmlkaWE6IHtcclxuICAgICAgICAgICAga2V5OiAnbnZpZGlhJyxcclxuICAgICAgICAgICAgYmFzZVVybDogJ2h0dHBzOi8vaW50ZWdyYXRlLmFwaS5udmlkaWEuY29tL3YxJyxcclxuICAgICAgICAgICAgbW9kZWw6ICdtZXRhL2xsYW1hLTMuMS03MGItaW5zdHJ1Y3QnLFxyXG4gICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9sbGFtYToge1xyXG4gICAgICAgICAgICBrZXk6ICdvbGxhbWEnLFxyXG4gICAgICAgICAgICBiYXNlVXJsOiAnaHR0cDovL2xvY2FsaG9zdDoxMTQzNC92MScsXHJcbiAgICAgICAgICAgIG1vZGVsOiAnbGxhbWEzJyxcclxuICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB2YXVsdEV4aXN0czogZmFsc2UsXHJcbiAgICBhdXRvRmlsbDogZmFsc2UsXHJcbiAgICBoaWdobGlnaHRGaWVsZHM6IHRydWUsXHJcbn07XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2V0dGluZ3MoKTogUHJvbWlzZTxFeHRlbnNpb25TZXR0aW5ncz4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFtTRVRUSU5HU19LRVldLCAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHRbU0VUVElOR1NfS0VZXSkge1xyXG4gICAgICAgICAgICAgICAgLy8gTWVyZ2Ugd2l0aCBkZWZhdWx0cyB0byBoYW5kbGUgbmV3IGZpZWxkcyBpbiB1cGRhdGVzXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHsgLi4uREVGQVVMVF9TRVRUSU5HUywgLi4ucmVzdWx0W1NFVFRJTkdTX0tFWV0gfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKERFRkFVTFRfU0VUVElOR1MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNhdmVTZXR0aW5ncyhzZXR0aW5nczogRXh0ZW5zaW9uU2V0dGluZ3MpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgW1NFVFRJTkdTX0tFWV06IHNldHRpbmdzIH0sICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihjaHJvbWUucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVByb3ZpZGVyKFxyXG4gICAga2V5OiBQcm92aWRlcktleSxcclxuICAgIGNvbmZpZzogUGFydGlhbDxQcm92aWRlckNvbmZpZz4sXHJcbik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgY29uc3Qgc2V0dGluZ3MgPSBhd2FpdCBnZXRTZXR0aW5ncygpO1xyXG4gICAgc2V0dGluZ3MucHJvdmlkZXJzW2tleV0gPSB7IC4uLnNldHRpbmdzLnByb3ZpZGVyc1trZXldLCAuLi5jb25maWcgfTtcclxuICAgIGF3YWl0IHNhdmVTZXR0aW5ncyhzZXR0aW5ncyk7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXRBY3RpdmVQcm92aWRlcihrZXk6IFByb3ZpZGVyS2V5KTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zdCBzZXR0aW5ncyA9IGF3YWl0IGdldFNldHRpbmdzKCk7XHJcbiAgICBzZXR0aW5ncy5hY3RpdmVQcm92aWRlciA9IGtleTtcclxuICAgIGF3YWl0IHNhdmVTZXR0aW5ncyhzZXR0aW5ncyk7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBtYXJrVmF1bHRFeGlzdHMoZXhpc3RzOiBib29sZWFuKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zdCBzZXR0aW5ncyA9IGF3YWl0IGdldFNldHRpbmdzKCk7XHJcbiAgICBzZXR0aW5ncy52YXVsdEV4aXN0cyA9IGV4aXN0cztcclxuICAgIGF3YWl0IHNhdmVTZXR0aW5ncyhzZXR0aW5ncyk7XHJcbn1cclxuIiwiLy8g4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXHJcbi8vIENpdGl6ZW5PbmUg4oCTIEJZT0sgUHJvdmlkZXIgRmFjdG9yeVxyXG4vLyBaZXJvLUtub3dsZWRnZTogTExNIG9ubHkgc2VlcyBmb3JtIGZpZWxkIGxhYmVscy9JRHMsIG5ldmVyIFBJSSB2YWx1ZXMuXHJcbi8vIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxyXG5cclxuaW1wb3J0IHR5cGUgeyBGaWVsZE1hcHBpbmcsIFByb3ZpZGVyS2V5LCBTZW1hbnRpY01hcCB9IGZyb20gJy4uL3R5cGVzJztcclxuXHJcbi8vIOKUgOKUgOKUgCBTeXN0ZW0gUHJvbXB0IOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxyXG5cclxuZnVuY3Rpb24gYnVpbGRTeXN0ZW1Qcm9tcHQodmF1bHRLZXlzOiBzdHJpbmdbXSk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gYFlvdSBhcmUgQ2l0aXplbk9uZSwgYSBwcml2YWN5LWZpcnN0IGZvcm0gYXNzaXN0YW50LlxyXG5Zb3VyIHRhc2sgaXMgdG8gYW5hbHl6ZSBhIHdlYiBmb3JtIGFuZCBtYXAgZWFjaCBmb3JtIGZpZWxkIHRvIHRoZSBjb3JyZWN0IGRhdGEga2V5LlxyXG5cclxuQXZhaWxhYmxlIGRhdGEga2V5cyBmcm9tIHRoZSB1c2VyJ3MgbG9jYWwgdmF1bHQ6XHJcbiR7dmF1bHRLZXlzLm1hcCgoaykgPT4gYCAgLSAke2t9YCkuam9pbignXFxuJyl9XHJcblxyXG5SdWxlczpcclxuMS4gUmVzcG9uZCBPTkxZIHdpdGggYSB2YWxpZCBKU09OIG9iamVjdCBtYXBwaW5nIGZpZWxkIElEcyB0byB2YXVsdCBrZXlzLlxyXG4yLiBPbmx5IGluY2x1ZGUgZmllbGRzIHlvdSBjYW4gY29uZmlkZW50bHkgbWFwLiBTa2lwIGZpZWxkcyB5b3UgYXJlIHVuc3VyZSBhYm91dC5cclxuMy4gRG8gTk9UIGludmVudCBvciBoYWxsdWNpbmF0ZSBrZXlzIG5vdCBpbiB0aGUgdmF1bHQgbGlzdCBhYm92ZS5cclxuNC4gRm9ybWF0OiB7IFwiZmllbGRfaWRfb3JfbmFtZVwiOiBcInZhdWx0X2tleVwiIH1cclxuNS4gRXhhbXBsZTogeyBcImZpcnN0LW5hbWVcIjogXCJmaXJzdF9uYW1lXCIsIFwiZG9iXCI6IFwiZGF0ZV9vZl9iaXJ0aFwiIH1cclxuXHJcbk91dHB1dCBPTkxZIHRoZSBKU09OIG9iamVjdC4gTm8gZXhwbGFuYXRpb24sIG5vIG1hcmtkb3duIGZlbmNlcy5gO1xyXG59XHJcblxyXG5mdW5jdGlvbiBidWlsZFVzZXJQcm9tcHQobWFwOiBTZW1hbnRpY01hcCk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBmaWVsZExpbmVzID0gbWFwLmZpZWxkc1xyXG4gICAgICAgIC5tYXAoKGYpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcGFydHMgPSBbYGlkPVwiJHtmLmlkfVwiYCwgYHR5cGU9XCIke2YudHlwZX1cImAsIGBsYWJlbD1cIiR7Zi5sYWJlbH1cImBdO1xyXG4gICAgICAgICAgICBpZiAoZi5wbGFjZWhvbGRlcikgcGFydHMucHVzaChgcGxhY2Vob2xkZXI9XCIke2YucGxhY2Vob2xkZXJ9XCJgKTtcclxuICAgICAgICAgICAgaWYgKGYubmFtZSkgcGFydHMucHVzaChgbmFtZT1cIiR7Zi5uYW1lfVwiYCk7XHJcbiAgICAgICAgICAgIGlmIChmLm9wdGlvbnM/Lmxlbmd0aCkgcGFydHMucHVzaChgb3B0aW9ucz1bJHtmLm9wdGlvbnMuc2xpY2UoMCwgOCkuam9pbignLCAnKX1dYCk7XHJcbiAgICAgICAgICAgIGlmIChmLnJlcXVpcmVkKSBwYXJ0cy5wdXNoKGByZXF1aXJlZGApO1xyXG4gICAgICAgICAgICBpZiAoZi5jb250ZXh0KSBwYXJ0cy5wdXNoKGBjb250ZXh0PVwiJHtmLmNvbnRleHQuc2xpY2UoMCwgODApfVwiYCk7XHJcbiAgICAgICAgICAgIHJldHVybiBgICB7ICR7cGFydHMuam9pbignLCAnKX0gfWA7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuam9pbignLFxcbicpO1xyXG5cclxuICAgIHJldHVybiBgRm9ybSBVUkw6ICR7bWFwLnVybH1cclxuRm9ybSBUaXRsZTogJHttYXAudGl0bGV9XHJcbkZpZWxkczpcXG5bXFxuJHtmaWVsZExpbmVzfVxcbl1cclxuXHJcbk1hcCB0aGVzZSBmaWVsZHMgdG8gdmF1bHQga2V5cy5gO1xyXG59XHJcblxyXG4vLyDilIDilIDilIAgUHJvdmlkZXIgSW1wbGVtZW50YXRpb25zIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxyXG5cclxuYXN5bmMgZnVuY3Rpb24gY2FsbEdlbWluaShcclxuICAgIGFwaUtleTogc3RyaW5nLFxyXG4gICAgbW9kZWw6IHN0cmluZyxcclxuICAgIHN5c3RlbTogc3RyaW5nLFxyXG4gICAgdXNlcjogc3RyaW5nLFxyXG4pOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgY29uc3QgdXJsID0gYGh0dHBzOi8vZ2VuZXJhdGl2ZWxhbmd1YWdlLmdvb2dsZWFwaXMuY29tL3YxYmV0YS9tb2RlbHMvJHttb2RlbH06Z2VuZXJhdGVDb250ZW50P2tleT0ke2FwaUtleX1gO1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIHN5c3RlbV9pbnN0cnVjdGlvbjogeyBwYXJ0czogW3sgdGV4dDogc3lzdGVtIH1dIH0sXHJcbiAgICAgICAgICAgIGNvbnRlbnRzOiBbeyBwYXJ0czogW3sgdGV4dDogdXNlciB9XSwgcm9sZTogJ3VzZXInIH1dLFxyXG4gICAgICAgICAgICBnZW5lcmF0aW9uQ29uZmlnOiB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wZXJhdHVyZTogMC4xLFxyXG4gICAgICAgICAgICAgICAgbWF4T3V0cHV0VG9rZW5zOiAxMDI0LFxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2VNaW1lVHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pLFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICAgIGNvbnN0IGVyciA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEdlbWluaSBlcnJvciAke3Jlc3BvbnNlLnN0YXR1c306ICR7ZXJyfWApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICBjb25zdCB0ZXh0ID0gZGF0YT8uY2FuZGlkYXRlcz8uWzBdPy5jb250ZW50Py5wYXJ0cz8uWzBdPy50ZXh0ID8/ICcnO1xyXG4gICAgcmV0dXJuIHRleHQudHJpbSgpO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBjYWxsT3BlbkFJQ29tcGF0KFxyXG4gICAgYmFzZVVybDogc3RyaW5nLFxyXG4gICAgYXBpS2V5OiBzdHJpbmcsXHJcbiAgICBtb2RlbDogc3RyaW5nLFxyXG4gICAgc3lzdGVtOiBzdHJpbmcsXHJcbiAgICB1c2VyOiBzdHJpbmcsXHJcbik6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICBjb25zdCB1cmwgPSBgJHtiYXNlVXJsfS9jaGF0L2NvbXBsZXRpb25zYDtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7YXBpS2V5fWAsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIG1vZGVsLFxyXG4gICAgICAgICAgICBtZXNzYWdlczogW1xyXG4gICAgICAgICAgICAgICAgeyByb2xlOiAnc3lzdGVtJywgY29udGVudDogc3lzdGVtIH0sXHJcbiAgICAgICAgICAgICAgICB7IHJvbGU6ICd1c2VyJywgY29udGVudDogdXNlciB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICB0ZW1wZXJhdHVyZTogMC4xLFxyXG4gICAgICAgICAgICBtYXhfdG9rZW5zOiAxMDI0LFxyXG4gICAgICAgICAgICByZXNwb25zZV9mb3JtYXQ6IHsgdHlwZTogJ2pzb25fb2JqZWN0JyB9LFxyXG4gICAgICAgIH0pLFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICAgIGNvbnN0IGVyciA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEFQSSBlcnJvciAke3Jlc3BvbnNlLnN0YXR1c306ICR7ZXJyfWApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICBjb25zdCB0ZXh0ID0gZGF0YT8uY2hvaWNlcz8uWzBdPy5tZXNzYWdlPy5jb250ZW50ID8/ICcnO1xyXG4gICAgcmV0dXJuIHRleHQudHJpbSgpO1xyXG59XHJcblxyXG4vLyDilIDilIDilIAgUHJvdmlkZXIgRmFjdG9yeSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUHJvdmlkZXJPcHRpb25zIHtcclxuICAgIGtleTogUHJvdmlkZXJLZXk7XHJcbiAgICBhcGlLZXk/OiBzdHJpbmc7XHJcbiAgICBiYXNlVXJsPzogc3RyaW5nO1xyXG4gICAgbW9kZWw/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmNvbnN0IFBST1ZJREVSX0RFRkFVTFRTOiBSZWNvcmQ8UHJvdmlkZXJLZXksIHsgYmFzZVVybDogc3RyaW5nOyBtb2RlbDogc3RyaW5nIH0+ID0ge1xyXG4gICAgZ2VtaW5pOiB7XHJcbiAgICAgICAgYmFzZVVybDogJ2h0dHBzOi8vZ2VuZXJhdGl2ZWxhbmd1YWdlLmdvb2dsZWFwaXMuY29tJyxcclxuICAgICAgICBtb2RlbDogJ2dlbWluaS0xLjUtZmxhc2gnLFxyXG4gICAgfSxcclxuICAgIGdyb3E6IHtcclxuICAgICAgICBiYXNlVXJsOiAnaHR0cHM6Ly9hcGkuZ3JvcS5jb20vb3BlbmFpL3YxJyxcclxuICAgICAgICBtb2RlbDogJ2xsYW1hMy04Yi04MTkyJyxcclxuICAgIH0sXHJcbiAgICBudmlkaWE6IHtcclxuICAgICAgICBiYXNlVXJsOiAnaHR0cHM6Ly9pbnRlZ3JhdGUuYXBpLm52aWRpYS5jb20vdjEnLFxyXG4gICAgICAgIG1vZGVsOiAnbWV0YS9sbGFtYS0zLjEtNzBiLWluc3RydWN0JyxcclxuICAgIH0sXHJcbiAgICBvbGxhbWE6IHtcclxuICAgICAgICBiYXNlVXJsOiAnaHR0cDovL2xvY2FsaG9zdDoxMTQzNC92MScsXHJcbiAgICAgICAgbW9kZWw6ICdsbGFtYTMnLFxyXG4gICAgfSxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBbmFseXplcyBhIGZvcm0gYW5kIHJldHVybnMgYSBmaWVsZOKGknZhdWx0S2V5IG1hcHBpbmcuXHJcbiAqIFplcm8tS25vd2xlZGdlOiB2YXVsdEtleXMgYXJlIHNlbWFudGljIGxhYmVscyBvbmx5IChlLmcuIFwiZmlyc3RfbmFtZVwiKS5cclxuICogQWN0dWFsIFBJSSB2YWx1ZXMgYXJlIE5FVkVSIHNlbnQgdG8gdGhlIExMTS5cclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhbmFseXplRm9ybShcclxuICAgIG9wdHM6IFByb3ZpZGVyT3B0aW9ucyxcclxuICAgIHNlbWFudGljTWFwOiBTZW1hbnRpY01hcCxcclxuICAgIHZhdWx0S2V5czogc3RyaW5nW10sXHJcbik6IFByb21pc2U8RmllbGRNYXBwaW5nPiB7XHJcbiAgICBjb25zdCBkZWZhdWx0cyA9IFBST1ZJREVSX0RFRkFVTFRTW29wdHMua2V5XTtcclxuICAgIGNvbnN0IG1vZGVsID0gb3B0cy5tb2RlbCA/PyBkZWZhdWx0cy5tb2RlbDtcclxuICAgIGNvbnN0IGJhc2VVcmwgPSBvcHRzLmJhc2VVcmwgPz8gZGVmYXVsdHMuYmFzZVVybDtcclxuXHJcbiAgICBjb25zdCBzeXN0ZW1Qcm9tcHQgPSBidWlsZFN5c3RlbVByb21wdCh2YXVsdEtleXMpO1xyXG4gICAgY29uc3QgdXNlclByb21wdCA9IGJ1aWxkVXNlclByb21wdChzZW1hbnRpY01hcCk7XHJcblxyXG4gICAgbGV0IHJhd0pzb246IHN0cmluZztcclxuXHJcbiAgICBpZiAob3B0cy5rZXkgPT09ICdnZW1pbmknKSB7XHJcbiAgICAgICAgaWYgKCFvcHRzLmFwaUtleSkgdGhyb3cgbmV3IEVycm9yKCdHZW1pbmkgQVBJIGtleSBpcyByZXF1aXJlZC4nKTtcclxuICAgICAgICByYXdKc29uID0gYXdhaXQgY2FsbEdlbWluaShvcHRzLmFwaUtleSwgbW9kZWwsIHN5c3RlbVByb21wdCwgdXNlclByb21wdCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIGdyb3EsIG52aWRpYSwgb2xsYW1hIOKAlCBhbGwgT3BlbkFJLWNvbXBhdGlibGVcclxuICAgICAgICBpZiAob3B0cy5rZXkgIT09ICdvbGxhbWEnICYmICFvcHRzLmFwaUtleSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7b3B0cy5rZXl9IEFQSSBrZXkgaXMgcmVxdWlyZWQuYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJhd0pzb24gPSBhd2FpdCBjYWxsT3BlbkFJQ29tcGF0KFxyXG4gICAgICAgICAgICBiYXNlVXJsLFxyXG4gICAgICAgICAgICBvcHRzLmFwaUtleSA/PyAnb2xsYW1hJyxcclxuICAgICAgICAgICAgbW9kZWwsXHJcbiAgICAgICAgICAgIHN5c3RlbVByb21wdCxcclxuICAgICAgICAgICAgdXNlclByb21wdCxcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFBhcnNlIGFuZCB2YWxpZGF0ZVxyXG4gICAgbGV0IG1hcHBpbmc6IEZpZWxkTWFwcGluZztcclxuICAgIHRyeSB7XHJcbiAgICAgICAgLy8gU3RyaXAgcG90ZW50aWFsIG1hcmtkb3duIGZlbmNlc1xyXG4gICAgICAgIGNvbnN0IGNsZWFuZWQgPSByYXdKc29uLnJlcGxhY2UoL2BgYGpzb25cXG4/fGBgYFxcbj8vZywgJycpLnRyaW0oKTtcclxuICAgICAgICBtYXBwaW5nID0gSlNPTi5wYXJzZShjbGVhbmVkKSBhcyBGaWVsZE1hcHBpbmc7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBwYXJzZSBMTE0gcmVzcG9uc2UgYXMgSlNPTi4gUmF3OiAke3Jhd0pzb259YCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVmFsaWRhdGUgdGhhdCBhbGwgbWFwcGVkIGtleXMgYXJlIGluIHRoZSB2YXVsdFxyXG4gICAgY29uc3QgdmFsaWRLZXlzID0gbmV3IFNldCh2YXVsdEtleXMpO1xyXG4gICAgY29uc3QgdmFsaWRhdGVkOiBGaWVsZE1hcHBpbmcgPSB7fTtcclxuICAgIGZvciAoY29uc3QgW2ZpZWxkSWQsIHZhdWx0S2V5XSBvZiBPYmplY3QuZW50cmllcyhtYXBwaW5nKSkge1xyXG4gICAgICAgIGlmICh2YWxpZEtleXMuaGFzKHZhdWx0S2V5KSkge1xyXG4gICAgICAgICAgICB2YWxpZGF0ZWRbZmllbGRJZF0gPSB2YXVsdEtleTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHZhbGlkYXRlZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRlc3RzIHByb3ZpZGVyIGNvbm5lY3Rpdml0eSB3aXRoIGEgbWluaW1hbCBwaW5nIHJlcXVlc3QuXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdGVzdFByb3ZpZGVyKG9wdHM6IFByb3ZpZGVyT3B0aW9ucyk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICBjb25zdCBwaW5nTWFwOiBTZW1hbnRpY01hcCA9IHtcclxuICAgICAgICB1cmw6ICdodHRwczovL3Rlc3QuZXhhbXBsZScsXHJcbiAgICAgICAgdGl0bGU6ICdUZXN0IEZvcm0nLFxyXG4gICAgICAgIGZpZWxkczogW1xyXG4gICAgICAgICAgICB7IGlkOiAnZmlyc3RfbmFtZV9maWVsZCcsIHR5cGU6ICd0ZXh0JywgbGFiZWw6ICdGaXJzdCBOYW1lJywgcmVxdWlyZWQ6IHRydWUgfSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIHRvdGFsRmllbGRzOiAxLFxyXG4gICAgfTtcclxuXHJcbiAgICBhd2FpdCBhbmFseXplRm9ybShvcHRzLCBwaW5nTWFwLCBbJ2ZpcnN0X25hbWUnLCAnbGFzdF9uYW1lJywgJ2VtYWlsJ10pO1xyXG4gICAgcmV0dXJuICdDb25uZWN0aW9uIHN1Y2Nlc3NmdWwhJztcclxufVxyXG4iLCIvLyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcclxuLy8gQ2l0aXplbk9uZSDigJMgQmFja2dyb3VuZCBTZXJ2aWNlIFdvcmtlciAoTVYzKVxyXG4vLyBPcmNoZXN0cmF0ZXM6IHRhYiBpbmplY3Rpb24sIHByb3ZpZGVyIGNhbGxzLCBtZXNzYWdlIHJvdXRpbmcuXHJcbi8vIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxyXG5cclxuaW1wb3J0IHsgZ2V0U2V0dGluZ3MgfSBmcm9tICd+L2xpYi9zZXR0aW5ncyc7XHJcbmltcG9ydCB7IGFuYWx5emVGb3JtLCB0eXBlIFByb3ZpZGVyT3B0aW9ucyB9IGZyb20gJ34vbGliL3Byb3ZpZGVycyc7XHJcbmltcG9ydCB0eXBlIHtcclxuICAgIEZpZWxkTWFwcGluZyxcclxuICAgIE1lc3NhZ2VSZXNwb25zZSxcclxuICAgIFNlbWFudGljTWFwLFxyXG59IGZyb20gJ34vdHlwZXMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQmFja2dyb3VuZCgoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnW0NpdGl6ZW5PbmVdIEJhY2tncm91bmQgc2VydmljZSB3b3JrZXIgc3RhcnRlZC4nKTtcclxuXHJcbiAgICBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoXHJcbiAgICAgICAgKFxyXG4gICAgICAgICAgICBtZXNzYWdlOiB7IHR5cGU6IHN0cmluZztba2V5OiBzdHJpbmddOiB1bmtub3duIH0sXHJcbiAgICAgICAgICAgIHNlbmRlcixcclxuICAgICAgICAgICAgc2VuZFJlc3BvbnNlLFxyXG4gICAgICAgICkgPT4ge1xyXG4gICAgICAgICAgICBoYW5kbGVNZXNzYWdlKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7IC8vIEtlZXAgY2hhbm5lbCBvcGVuIGZvciBhc3luYyByZXNwb25zZVxyXG4gICAgICAgIH0sXHJcbiAgICApO1xyXG59KTtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZU1lc3NhZ2UoXHJcbiAgICBtZXNzYWdlOiB7IHR5cGU6IHN0cmluZztba2V5OiBzdHJpbmddOiB1bmtub3duIH0sXHJcbiAgICBzZW5kZXI6IGNocm9tZS5ydW50aW1lLk1lc3NhZ2VTZW5kZXIsXHJcbiAgICBzZW5kUmVzcG9uc2U6IChyZXNwb25zZTogTWVzc2FnZVJlc3BvbnNlKSA9PiB2b2lkLFxyXG4pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgc3dpdGNoIChtZXNzYWdlLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnQU5BTFlaRV9GT1JNJzoge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VtYW50aWNNYXAgPSBtZXNzYWdlLnNlbWFudGljTWFwIGFzIFNlbWFudGljTWFwO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmF1bHRLZXlzID0gbWVzc2FnZS52YXVsdEtleXMgYXMgc3RyaW5nW107XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSBhd2FpdCBnZXRTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlUHJvdmlkZXJDb25maWcgPSBzZXR0aW5ncy5wcm92aWRlcnNbc2V0dGluZ3MuYWN0aXZlUHJvdmlkZXJdO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IG9wdHM6IFByb3ZpZGVyT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBrZXk6IHNldHRpbmdzLmFjdGl2ZVByb3ZpZGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGFwaUtleTogYWN0aXZlUHJvdmlkZXJDb25maWcuYXBpS2V5LFxyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VVcmw6IGFjdGl2ZVByb3ZpZGVyQ29uZmlnLmJhc2VVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGFjdGl2ZVByb3ZpZGVyQ29uZmlnLm1vZGVsLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXBwaW5nOiBGaWVsZE1hcHBpbmcgPSBhd2FpdCBhbmFseXplRm9ybShvcHRzLCBzZW1hbnRpY01hcCwgdmF1bHRLZXlzKTtcclxuICAgICAgICAgICAgICAgIHNlbmRSZXNwb25zZSh7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IG1hcHBpbmcgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2FzZSAnSU5KRUNUX0FORF9HRVRfTUFQJzoge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFiSWQgPSBzZW5kZXIudGFiPy5pZCA/PyAobWVzc2FnZS50YWJJZCBhcyBudW1iZXIgfCB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0YWJJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbmRSZXNwb25zZSh7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ05vIHRhYiBJRCBwcm92aWRlZC4nIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJbmplY3QgdGhlIGNvbnRlbnQgc2NyaXB0IGFuZCByZXRyaWV2ZSB0aGUgc2VtYW50aWMgbWFwXHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgY2hyb21lLnNjcmlwdGluZy5leGVjdXRlU2NyaXB0KHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHsgdGFiSWQgfSxcclxuICAgICAgICAgICAgICAgICAgICBmdW5jOiBnZXRTZW1hbnRpY01hcEZyb21QYWdlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VtYW50aWNNYXAgPSByZXN1bHRzPy5bMF0/LnJlc3VsdCBhcyBTZW1hbnRpY01hcCB8IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIGlmICghc2VtYW50aWNNYXApIHtcclxuICAgICAgICAgICAgICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdGYWlsZWQgdG8gZXh0cmFjdCBzZW1hbnRpYyBtYXAuJyB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogc2VtYW50aWNNYXAgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2FzZSAnVEVTVF9QUk9WSURFUic6IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHsgcHJvdmlkZXJLZXksIGFwaUtleSwgYmFzZVVybCwgbW9kZWwgfSA9IG1lc3NhZ2UgYXMge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICBwcm92aWRlcktleTogc3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIGFwaUtleT86IHN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICBiYXNlVXJsPzogc3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsPzogc3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IHRlc3RQcm92aWRlciB9ID0gYXdhaXQgaW1wb3J0KCd+L2xpYi9wcm92aWRlcnMnKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRlc3RQcm92aWRlcih7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiBwcm92aWRlcktleSBhcyBuZXZlcixcclxuICAgICAgICAgICAgICAgICAgICBhcGlLZXksXHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZVVybCxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcmVzdWx0IH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGBVbmtub3duIG1lc3NhZ2UgdHlwZTogJHttZXNzYWdlLnR5cGV9YCB9KTtcclxuICAgICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zdCBlcnJvck1zZyA9IGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiBTdHJpbmcoZXJyKTtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdbQ2l0aXplbk9uZV0gQmFja2dyb3VuZCBlcnJvcjonLCBlcnJvck1zZyk7XHJcbiAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBlcnJvck1zZyB9KTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gVGhpcyBmdW5jdGlvbiBpcyBzZXJpYWxpemVkIGFuZCBpbmplY3RlZCBpbnRvIHRoZSBwYWdlXHJcbmZ1bmN0aW9uIGdldFNlbWFudGljTWFwRnJvbVBhZ2UoKTogU2VtYW50aWNNYXAge1xyXG4gICAgLy8gSW5saW5lIHZlcnNpb24gZm9yIGluamVjdGlvbiBjb250ZXh0IChubyBtb2R1bGUgaW1wb3J0cyBhdmFpbGFibGUgaGVyZSlcclxuICAgIGNvbnN0IE1BWF9CWVRFUyA9IDIwNDg7XHJcblxyXG4gICAgZnVuY3Rpb24gcmVzb2x2ZUxhYmVsKGVsOiBIVE1MRWxlbWVudCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgYXJpYUxhYmVsID0gZWwuZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJyk7XHJcbiAgICAgICAgaWYgKGFyaWFMYWJlbCkgcmV0dXJuIGFyaWFMYWJlbC50cmltKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGxhYmVsbGVkQnkgPSBlbC5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWxsZWRieScpO1xyXG4gICAgICAgIGlmIChsYWJlbGxlZEJ5KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxhYmVsRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChsYWJlbGxlZEJ5KTtcclxuICAgICAgICAgICAgaWYgKGxhYmVsRWwpIHJldHVybiAobGFiZWxFbC50ZXh0Q29udGVudCA/PyAnJykudHJpbSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaWQgPSBlbC5pZDtcclxuICAgICAgICBpZiAoaWQpIHtcclxuICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxMYWJlbEVsZW1lbnQ+KFxyXG4gICAgICAgICAgICAgICAgYGxhYmVsW2Zvcj1cIiR7Q1NTLmVzY2FwZShpZCl9XCJdYCxcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgaWYgKGxhYmVsKSByZXR1cm4gKGxhYmVsLnRleHRDb250ZW50ID8/ICcnKS50cmltKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB3cmFwcGluZyA9IGVsLmNsb3Nlc3QoJ2xhYmVsJyk7XHJcbiAgICAgICAgaWYgKHdyYXBwaW5nKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNsb25lID0gd3JhcHBpbmcuY2xvbmVOb2RlKHRydWUpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgICAgICBjbG9uZS5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCxzZWxlY3QsdGV4dGFyZWEnKS5mb3JFYWNoKChlKSA9PiBlLnJlbW92ZSgpKTtcclxuICAgICAgICAgICAgY29uc3QgdGV4dCA9IChjbG9uZS50ZXh0Q29udGVudCA/PyAnJykudHJpbSgpO1xyXG4gICAgICAgICAgICBpZiAodGV4dCkgcmV0dXJuIHRleHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IChlbCBhcyBIVE1MSW5wdXRFbGVtZW50KS5wbGFjZWhvbGRlcjtcclxuICAgICAgICBpZiAocGxhY2Vob2xkZXIpIHJldHVybiBwbGFjZWhvbGRlci50cmltKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBlbC5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcclxuICAgICAgICBpZiAobmFtZSkgcmV0dXJuIG5hbWUucmVwbGFjZSgvW18tXS9nLCAnICcpLnRyaW0oKTtcclxuXHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNlbGVjdG9yID1cclxuICAgICAgICAnaW5wdXQ6bm90KFt0eXBlPVwiaGlkZGVuXCJdKTpub3QoW3R5cGU9XCJzdWJtaXRcIl0pOm5vdChbdHlwZT1cImJ1dHRvblwiXSk6bm90KFt0eXBlPVwicmVzZXRcIl0pOm5vdChbdHlwZT1cImltYWdlXCJdKSwgc2VsZWN0LCB0ZXh0YXJlYSc7XHJcblxyXG4gICAgY29uc3QgZWxlbWVudHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KHNlbGVjdG9yKSk7XHJcbiAgICBjb25zdCBmaWVsZHM6IFNlbWFudGljRmllbGRbXSA9IFtdO1xyXG4gICAgbGV0IGJ5dGVzVXNlZCA9IDA7XHJcblxyXG4gICAgZm9yIChjb25zdCBlbCBvZiBlbGVtZW50cykge1xyXG4gICAgICAgIGlmICghZWwub2Zmc2V0UGFyZW50KSBjb250aW51ZTtcclxuICAgICAgICBpZiAoYnl0ZXNVc2VkID49IE1BWF9CWVRFUykgYnJlYWs7XHJcblxyXG4gICAgICAgIGNvbnN0IGlkID0gZWwuaWQgfHwgZWwuZ2V0QXR0cmlidXRlKCduYW1lJykgfHwgYGZpZWxkXyR7ZmllbGRzLmxlbmd0aH1gO1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPVxyXG4gICAgICAgICAgICBlbC50YWdOYW1lID09PSAnU0VMRUNUJ1xyXG4gICAgICAgICAgICAgICAgPyAnc2VsZWN0J1xyXG4gICAgICAgICAgICAgICAgOiBlbC50YWdOYW1lID09PSAnVEVYVEFSRUEnXHJcbiAgICAgICAgICAgICAgICAgICAgPyAndGV4dGFyZWEnXHJcbiAgICAgICAgICAgICAgICAgICAgOiAoZWwgYXMgSFRNTElucHV0RWxlbWVudCkudHlwZSB8fCAndGV4dCc7XHJcblxyXG4gICAgICAgIGNvbnN0IGxhYmVsID0gcmVzb2x2ZUxhYmVsKGVsKTtcclxuICAgICAgICBpZiAoIWxhYmVsKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgY29uc3QgZmllbGQ6IFNlbWFudGljRmllbGQgPSB7IGlkLCB0eXBlLCBsYWJlbCB9O1xyXG5cclxuICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IChlbCBhcyBIVE1MSW5wdXRFbGVtZW50KS5wbGFjZWhvbGRlcjtcclxuICAgICAgICBpZiAocGxhY2Vob2xkZXIgJiYgcGxhY2Vob2xkZXIgIT09IGxhYmVsKSBmaWVsZC5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xyXG5cclxuICAgICAgICBjb25zdCBuYW1lID0gZWwuZ2V0QXR0cmlidXRlKCduYW1lJyk7XHJcbiAgICAgICAgaWYgKG5hbWUgJiYgbmFtZSAhPT0gaWQpIGZpZWxkLm5hbWUgPSBuYW1lO1xyXG5cclxuICAgICAgICBpZiAoZWwudGFnTmFtZSA9PT0gJ1NFTEVDVCcpIHtcclxuICAgICAgICAgICAgY29uc3Qgb3B0cyA9IEFycmF5LmZyb20oKGVsIGFzIEhUTUxTZWxlY3RFbGVtZW50KS5vcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgLm1hcCgobykgPT4gby50ZXh0LnRyaW0oKSlcclxuICAgICAgICAgICAgICAgIC5maWx0ZXIoKHQpID0+IHQgJiYgdC50b0xvd2VyQ2FzZSgpICE9PSAnc2VsZWN0Jyk7XHJcbiAgICAgICAgICAgIGlmIChvcHRzLmxlbmd0aCkgZmllbGQub3B0aW9ucyA9IG9wdHMuc2xpY2UoMCwgMTApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKChlbCBhcyBIVE1MSW5wdXRFbGVtZW50KS5yZXF1aXJlZCkgZmllbGQucmVxdWlyZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICBmaWVsZHMucHVzaChmaWVsZCk7XHJcbiAgICAgICAgYnl0ZXNVc2VkICs9IEpTT04uc3RyaW5naWZ5KGZpZWxkKS5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB1cmw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxyXG4gICAgICAgIHRpdGxlOiBkb2N1bWVudC50aXRsZSxcclxuICAgICAgICBmaWVsZHMsXHJcbiAgICAgICAgdG90YWxGaWVsZHM6IGVsZW1lbnRzLmxlbmd0aCxcclxuICAgIH07XHJcbn1cclxuXHJcbi8vIFR5cGVzIG5lZWRlZCBpbiBpbmplY3RlZCBjb250ZXh0IChtdXN0IGJlIGRlZmluZWQgbG9jYWxseSlcclxuaW50ZXJmYWNlIFNlbWFudGljRmllbGQge1xyXG4gICAgaWQ6IHN0cmluZztcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIGxhYmVsOiBzdHJpbmc7XHJcbiAgICBwbGFjZWhvbGRlcj86IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICBvcHRpb25zPzogc3RyaW5nW107XHJcbiAgICByZXF1aXJlZD86IGJvb2xlYW47XHJcbn1cclxuXHJcbmludGVyZmFjZSBTZW1hbnRpY01hcCB7XHJcbiAgICB1cmw6IHN0cmluZztcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBmaWVsZHM6IFNlbWFudGljRmllbGRbXTtcclxuICAgIHRvdGFsRmllbGRzOiBudW1iZXI7XHJcbn1cclxuIiwiLy8gI3JlZ2lvbiBzbmlwcGV0XG5leHBvcnQgY29uc3QgYnJvd3NlciA9IGdsb2JhbFRoaXMuYnJvd3Nlcj8ucnVudGltZT8uaWRcbiAgPyBnbG9iYWxUaGlzLmJyb3dzZXJcbiAgOiBnbG9iYWxUaGlzLmNocm9tZTtcbi8vICNlbmRyZWdpb24gc25pcHBldFxuIiwiaW1wb3J0IHsgYnJvd3NlciBhcyBicm93c2VyJDEgfSBmcm9tIFwiQHd4dC1kZXYvYnJvd3NlclwiO1xuXG4vLyNyZWdpb24gc3JjL2Jyb3dzZXIudHNcbi8qKlxuKiBDb250YWlucyB0aGUgYGJyb3dzZXJgIGV4cG9ydCB3aGljaCB5b3Ugc2hvdWxkIHVzZSB0byBhY2Nlc3MgdGhlIGV4dGVuc2lvbiBBUElzIGluIHlvdXIgcHJvamVjdDpcbiogYGBgdHNcbiogaW1wb3J0IHsgYnJvd3NlciB9IGZyb20gJ3d4dC9icm93c2VyJztcbipcbiogYnJvd3Nlci5ydW50aW1lLm9uSW5zdGFsbGVkLmFkZExpc3RlbmVyKCgpID0+IHtcbiogICAvLyAuLi5cbiogfSlcbiogYGBgXG4qIEBtb2R1bGUgd3h0L2Jyb3dzZXJcbiovXG5jb25zdCBicm93c2VyID0gYnJvd3NlciQxO1xuXG4vLyNlbmRyZWdpb25cbmV4cG9ydCB7IGJyb3dzZXIgfTsiLCIvLyBzcmMvaW5kZXgudHNcbnZhciBfTWF0Y2hQYXR0ZXJuID0gY2xhc3Mge1xuICBjb25zdHJ1Y3RvcihtYXRjaFBhdHRlcm4pIHtcbiAgICBpZiAobWF0Y2hQYXR0ZXJuID09PSBcIjxhbGxfdXJscz5cIikge1xuICAgICAgdGhpcy5pc0FsbFVybHMgPSB0cnVlO1xuICAgICAgdGhpcy5wcm90b2NvbE1hdGNoZXMgPSBbLi4uX01hdGNoUGF0dGVybi5QUk9UT0NPTFNdO1xuICAgICAgdGhpcy5ob3N0bmFtZU1hdGNoID0gXCIqXCI7XG4gICAgICB0aGlzLnBhdGhuYW1lTWF0Y2ggPSBcIipcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZ3JvdXBzID0gLyguKik6XFwvXFwvKC4qPykoXFwvLiopLy5leGVjKG1hdGNoUGF0dGVybik7XG4gICAgICBpZiAoZ3JvdXBzID09IG51bGwpXG4gICAgICAgIHRocm93IG5ldyBJbnZhbGlkTWF0Y2hQYXR0ZXJuKG1hdGNoUGF0dGVybiwgXCJJbmNvcnJlY3QgZm9ybWF0XCIpO1xuICAgICAgY29uc3QgW18sIHByb3RvY29sLCBob3N0bmFtZSwgcGF0aG5hbWVdID0gZ3JvdXBzO1xuICAgICAgdmFsaWRhdGVQcm90b2NvbChtYXRjaFBhdHRlcm4sIHByb3RvY29sKTtcbiAgICAgIHZhbGlkYXRlSG9zdG5hbWUobWF0Y2hQYXR0ZXJuLCBob3N0bmFtZSk7XG4gICAgICB2YWxpZGF0ZVBhdGhuYW1lKG1hdGNoUGF0dGVybiwgcGF0aG5hbWUpO1xuICAgICAgdGhpcy5wcm90b2NvbE1hdGNoZXMgPSBwcm90b2NvbCA9PT0gXCIqXCIgPyBbXCJodHRwXCIsIFwiaHR0cHNcIl0gOiBbcHJvdG9jb2xdO1xuICAgICAgdGhpcy5ob3N0bmFtZU1hdGNoID0gaG9zdG5hbWU7XG4gICAgICB0aGlzLnBhdGhuYW1lTWF0Y2ggPSBwYXRobmFtZTtcbiAgICB9XG4gIH1cbiAgaW5jbHVkZXModXJsKSB7XG4gICAgaWYgKHRoaXMuaXNBbGxVcmxzKVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgY29uc3QgdSA9IHR5cGVvZiB1cmwgPT09IFwic3RyaW5nXCIgPyBuZXcgVVJMKHVybCkgOiB1cmwgaW5zdGFuY2VvZiBMb2NhdGlvbiA/IG5ldyBVUkwodXJsLmhyZWYpIDogdXJsO1xuICAgIHJldHVybiAhIXRoaXMucHJvdG9jb2xNYXRjaGVzLmZpbmQoKHByb3RvY29sKSA9PiB7XG4gICAgICBpZiAocHJvdG9jb2wgPT09IFwiaHR0cFwiKVxuICAgICAgICByZXR1cm4gdGhpcy5pc0h0dHBNYXRjaCh1KTtcbiAgICAgIGlmIChwcm90b2NvbCA9PT0gXCJodHRwc1wiKVxuICAgICAgICByZXR1cm4gdGhpcy5pc0h0dHBzTWF0Y2godSk7XG4gICAgICBpZiAocHJvdG9jb2wgPT09IFwiZmlsZVwiKVxuICAgICAgICByZXR1cm4gdGhpcy5pc0ZpbGVNYXRjaCh1KTtcbiAgICAgIGlmIChwcm90b2NvbCA9PT0gXCJmdHBcIilcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNGdHBNYXRjaCh1KTtcbiAgICAgIGlmIChwcm90b2NvbCA9PT0gXCJ1cm5cIilcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNVcm5NYXRjaCh1KTtcbiAgICB9KTtcbiAgfVxuICBpc0h0dHBNYXRjaCh1cmwpIHtcbiAgICByZXR1cm4gdXJsLnByb3RvY29sID09PSBcImh0dHA6XCIgJiYgdGhpcy5pc0hvc3RQYXRoTWF0Y2godXJsKTtcbiAgfVxuICBpc0h0dHBzTWF0Y2godXJsKSB7XG4gICAgcmV0dXJuIHVybC5wcm90b2NvbCA9PT0gXCJodHRwczpcIiAmJiB0aGlzLmlzSG9zdFBhdGhNYXRjaCh1cmwpO1xuICB9XG4gIGlzSG9zdFBhdGhNYXRjaCh1cmwpIHtcbiAgICBpZiAoIXRoaXMuaG9zdG5hbWVNYXRjaCB8fCAhdGhpcy5wYXRobmFtZU1hdGNoKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGhvc3RuYW1lTWF0Y2hSZWdleHMgPSBbXG4gICAgICB0aGlzLmNvbnZlcnRQYXR0ZXJuVG9SZWdleCh0aGlzLmhvc3RuYW1lTWF0Y2gpLFxuICAgICAgdGhpcy5jb252ZXJ0UGF0dGVyblRvUmVnZXgodGhpcy5ob3N0bmFtZU1hdGNoLnJlcGxhY2UoL15cXCpcXC4vLCBcIlwiKSlcbiAgICBdO1xuICAgIGNvbnN0IHBhdGhuYW1lTWF0Y2hSZWdleCA9IHRoaXMuY29udmVydFBhdHRlcm5Ub1JlZ2V4KHRoaXMucGF0aG5hbWVNYXRjaCk7XG4gICAgcmV0dXJuICEhaG9zdG5hbWVNYXRjaFJlZ2V4cy5maW5kKChyZWdleCkgPT4gcmVnZXgudGVzdCh1cmwuaG9zdG5hbWUpKSAmJiBwYXRobmFtZU1hdGNoUmVnZXgudGVzdCh1cmwucGF0aG5hbWUpO1xuICB9XG4gIGlzRmlsZU1hdGNoKHVybCkge1xuICAgIHRocm93IEVycm9yKFwiTm90IGltcGxlbWVudGVkOiBmaWxlOi8vIHBhdHRlcm4gbWF0Y2hpbmcuIE9wZW4gYSBQUiB0byBhZGQgc3VwcG9ydFwiKTtcbiAgfVxuICBpc0Z0cE1hdGNoKHVybCkge1xuICAgIHRocm93IEVycm9yKFwiTm90IGltcGxlbWVudGVkOiBmdHA6Ly8gcGF0dGVybiBtYXRjaGluZy4gT3BlbiBhIFBSIHRvIGFkZCBzdXBwb3J0XCIpO1xuICB9XG4gIGlzVXJuTWF0Y2godXJsKSB7XG4gICAgdGhyb3cgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWQ6IHVybjovLyBwYXR0ZXJuIG1hdGNoaW5nLiBPcGVuIGEgUFIgdG8gYWRkIHN1cHBvcnRcIik7XG4gIH1cbiAgY29udmVydFBhdHRlcm5Ub1JlZ2V4KHBhdHRlcm4pIHtcbiAgICBjb25zdCBlc2NhcGVkID0gdGhpcy5lc2NhcGVGb3JSZWdleChwYXR0ZXJuKTtcbiAgICBjb25zdCBzdGFyc1JlcGxhY2VkID0gZXNjYXBlZC5yZXBsYWNlKC9cXFxcXFwqL2csIFwiLipcIik7XG4gICAgcmV0dXJuIFJlZ0V4cChgXiR7c3RhcnNSZXBsYWNlZH0kYCk7XG4gIH1cbiAgZXNjYXBlRm9yUmVnZXgoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZywgXCJcXFxcJCZcIik7XG4gIH1cbn07XG52YXIgTWF0Y2hQYXR0ZXJuID0gX01hdGNoUGF0dGVybjtcbk1hdGNoUGF0dGVybi5QUk9UT0NPTFMgPSBbXCJodHRwXCIsIFwiaHR0cHNcIiwgXCJmaWxlXCIsIFwiZnRwXCIsIFwidXJuXCJdO1xudmFyIEludmFsaWRNYXRjaFBhdHRlcm4gPSBjbGFzcyBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IobWF0Y2hQYXR0ZXJuLCByZWFzb24pIHtcbiAgICBzdXBlcihgSW52YWxpZCBtYXRjaCBwYXR0ZXJuIFwiJHttYXRjaFBhdHRlcm59XCI6ICR7cmVhc29ufWApO1xuICB9XG59O1xuZnVuY3Rpb24gdmFsaWRhdGVQcm90b2NvbChtYXRjaFBhdHRlcm4sIHByb3RvY29sKSB7XG4gIGlmICghTWF0Y2hQYXR0ZXJuLlBST1RPQ09MUy5pbmNsdWRlcyhwcm90b2NvbCkgJiYgcHJvdG9jb2wgIT09IFwiKlwiKVxuICAgIHRocm93IG5ldyBJbnZhbGlkTWF0Y2hQYXR0ZXJuKFxuICAgICAgbWF0Y2hQYXR0ZXJuLFxuICAgICAgYCR7cHJvdG9jb2x9IG5vdCBhIHZhbGlkIHByb3RvY29sICgke01hdGNoUGF0dGVybi5QUk9UT0NPTFMuam9pbihcIiwgXCIpfSlgXG4gICAgKTtcbn1cbmZ1bmN0aW9uIHZhbGlkYXRlSG9zdG5hbWUobWF0Y2hQYXR0ZXJuLCBob3N0bmFtZSkge1xuICBpZiAoaG9zdG5hbWUuaW5jbHVkZXMoXCI6XCIpKVxuICAgIHRocm93IG5ldyBJbnZhbGlkTWF0Y2hQYXR0ZXJuKG1hdGNoUGF0dGVybiwgYEhvc3RuYW1lIGNhbm5vdCBpbmNsdWRlIGEgcG9ydGApO1xuICBpZiAoaG9zdG5hbWUuaW5jbHVkZXMoXCIqXCIpICYmIGhvc3RuYW1lLmxlbmd0aCA+IDEgJiYgIWhvc3RuYW1lLnN0YXJ0c1dpdGgoXCIqLlwiKSlcbiAgICB0aHJvdyBuZXcgSW52YWxpZE1hdGNoUGF0dGVybihcbiAgICAgIG1hdGNoUGF0dGVybixcbiAgICAgIGBJZiB1c2luZyBhIHdpbGRjYXJkICgqKSwgaXQgbXVzdCBnbyBhdCB0aGUgc3RhcnQgb2YgdGhlIGhvc3RuYW1lYFxuICAgICk7XG59XG5mdW5jdGlvbiB2YWxpZGF0ZVBhdGhuYW1lKG1hdGNoUGF0dGVybiwgcGF0aG5hbWUpIHtcbiAgcmV0dXJuO1xufVxuZXhwb3J0IHtcbiAgSW52YWxpZE1hdGNoUGF0dGVybixcbiAgTWF0Y2hQYXR0ZXJuXG59O1xuIl0sIm5hbWVzIjpbInJlc3VsdCIsInRlc3RQcm92aWRlciIsImJyb3dzZXIiXSwibWFwcGluZ3MiOiI7O0FBQ0EsV0FBUyxpQkFBaUIsS0FBSztBQUM5QixRQUFJLE9BQU8sUUFBUSxPQUFPLFFBQVEsV0FBWSxRQUFPLEVBQUUsTUFBTSxJQUFHO0FBQ2hFLFdBQU87QUFBQSxFQUNSO0FDRUEsUUFBTSxlQUFlO0FBRXJCLFFBQU0sbUJBQXND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QUE7QUFBQSxJQUFPO0FBR1gsVUFBQSxXQUFBO0FBR0EsVUFBQSxXQUFBLE1BQUEsS0FBQSxTQUFBLGlCQUFBLFFBQUEsQ0FBQTtBQUNBLFVBQUEsU0FBQSxDQUFBO0FBQ0EsUUFBQSxZQUFBO0FBRUEsZUFBQSxNQUFBLFVBQUE7QUFDSSxVQUFBLENBQUEsR0FBQSxhQUFBO0FBQ0EsVUFBQSxhQUFBLFVBQUE7QUFFQSxZQUFBLEtBQUEsR0FBQSxNQUFBLEdBQUEsYUFBQSxNQUFBLEtBQUEsU0FBQSxPQUFBLE1BQUE7QUFDQSxZQUFBLE9BQUEsR0FBQSxZQUFBLFdBQUEsV0FBQSxHQUFBLFlBQUEsYUFBQSxhQUFBLEdBQUEsUUFBQTtBQU9BLFlBQUEsUUFBQSxhQUFBLEVBQUE7QUFDQSxVQUFBLENBQUEsTUFBQTtBQUVBLFlBQUEsUUFBQSxFQUFBLElBQUEsTUFBQSxNQUFBO0FBRUEsWUFBQSxjQUFBLEdBQUE7QUFDQSxVQUFBLGVBQUEsZ0JBQUEsTUFBQSxPQUFBLGNBQUE7QUFFQSxZQUFBLE9BQUEsR0FBQSxhQUFBLE1BQUE7QUFDQSxVQUFBLFFBQUEsU0FBQSxHQUFBLE9BQUEsT0FBQTtBQUVBLFVBQUEsR0FBQSxZQUFBLFVBQUE7QUFDSSxjQUFBLE9BQUEsTUFBQSxLQUFBLEdBQUEsT0FBQSxFQUFBLElBQUEsQ0FBQSxNQUFBLEVBQUEsS0FBQSxLQUFBLENBQUEsRUFBQSxPQUFBLENBQUEsTUFBQSxLQUFBLEVBQUEsWUFBQSxNQUFBLFFBQUE7QUFHQSxZQUFBLEtBQUEsT0FBQSxPQUFBLFVBQUEsS0FBQSxNQUFBLEdBQUEsRUFBQTtBQUFBLE1BQWlEO0FBR3JELFVBQUEsR0FBQSxTQUFBLE9BQUEsV0FBQTtBQUVBLGFBQUEsS0FBQSxLQUFBO0FBQ0EsbUJBQUEsS0FBQSxVQUFBLEtBQUEsRUFBQTtBQUFBLElBQW1DO0FBR3ZDLFdBQUE7QUFBQSxNQUFPLEtBQUEsT0FBQSxTQUFBO0FBQUEsTUFDa0IsT0FBQSxTQUFBO0FBQUEsTUFDTDtBQUFBLE1BQ2hCLGFBQUEsU0FBQTtBQUFBLElBQ3NCO0FB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
