(function (exports) {
  "use strict";

  // ---------- your shortcuts (edit freely) ----------
  // The WHOLE message must equal the shortcut (case-insensitive) for it to be replaced.
  const SHORTCUTS = {
    ".s": "shoot",
    ".y": "dynamite",
    ".d": "disarm",
    ".j": "jump",
    ".r": "radar",
    ".f": "flashbang",
    ".v": "vent",
    ".l": "flee",
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
        const key = msg.content.trim().toLowerCase();
        if (Object.prototype.hasOwnProperty.call(SHORTCUTS, key)) {
          msg.content = SHORTCUTS[key];
        }
      } catch (e) {}
    }));
  }

  exports.onUnload = function () {
    unpatches.forEach(function (u) { try { u(); } catch (e) {} });
  };
  return exports;
})({});
