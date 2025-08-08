//@ts-nocheck

// Function to trigger Simple Analytics events
export const saEvent = (eventName) => {
  if (window && window.sa_event) return window.sa_event(eventName)
}
