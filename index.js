(function (exports) {
  "use strict";

  // ---------- your shortcuts (edit freely) ----------
  // The WHOLE message must equal the shortcut (case-insensitive) for it to be replaced.
  // "m" can be used instead of "." (e.g. ms = .s)
  const SHORTCUTS = {
    ".s": "shoot",
    ".y": "dynamite",
    ".d": "disarm",
    ".j": "jump",
    ".r": "radar",
    ".f": "flashbang",
    ".v": "vent",
    ".l": "flee",
    ".e": "explode",
    ".w": "waypoint",
    "w.": "wwwww",
    "s.": "Sssss",
    "a.": "Aaaaa",
    "d.": "Ddddd",
  };
  // ---------------------------------------------------

  const { findByProps } = vendetta.metro;
  const { before } = vendetta.patcher;

  const MessageActions = findByProps("sendMessage", "receiveMessage");
  const unpatches = [];

  if (MessageActions) {
    // runs just before a message is sent; only touches messages that exactly match a shortcut
    unpatches.push(before("sendMessage", MessageActions, function (args) {
      try {
        const msg = args[1];
        if (!msg || typeof msg.content !== "string") return;
        let key = msg.content.trim().toLowerCase();
        if (/^m[a-z]$/.test(key)) key = "." + key[1];
        if (Object.prototype.hasOwnProperty.call(SHORTCUTS, key)) {
          msg.content = SHORTCUTS[key];
