import { io } from "socket.io-client";

let socket = null;

/**
 * Connect the socket client.
 * Call once (eg. in App.jsx) after user info is available.
 *
 * @param {Object} options
 *   - url: optional socket server URL
 *   - token: optional auth token to send during connection
 *   - onConnect: optional callback
 */
export function connectSocket({ url = "", token = null, onConnect = null } = {}) {
  if (socket && socket.connected) return socket;

  // Use VITE_API_URL by default if url not provided
  const endpoint = url || import.meta.env.VITE_API_URL || window.location.origin;

  // Build auth object if token is provided
  const auth = token ? { token } : {};

  socket = io(endpoint, {
    path: "/socket.io", // adjust if your server uses a custom socket path
    transports: ["websocket"],
    auth,
    autoConnect: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
  });

  socket.on("connect", () => {
    console.debug("[socket] connected", socket.id);
    if (typeof onConnect === "function") onConnect(socket);
  });

  socket.on("connect_error", (err) => {
    console.warn("[socket] connect_error", err.message || err);
  });

  return socket;
}

/** Disconnect the socket */
export function disconnectSocket() {
  if (!socket) return;
  try {
    socket.disconnect();
  } catch (e) {
    // ignore
  }
  socket = null;
}

/** Get current socket instance (may be null) */
export function getSocket() {
  return socket;
}

/** Convenience default export */
export default {
  connectSocket,
  disconnectSocket,
  getSocket,
};
