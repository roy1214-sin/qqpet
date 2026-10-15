/**
 * Linux / Kylin V10 mouse input compatibility for QQPet.
 *
 * QQPet uses a transparent, frameless BrowserWindow and may toggle
 * setIgnoreMouseEvents() for click-through behavior. Some Linux desktop
 * environments do not reliably restore mouse input for this kind of window.
 *
 * Import this module once, before any BrowserWindow is created. On Linux it
 * forces QQPet windows to keep accepting mouse input. Windows and macOS are
 * not changed.
 */
import { BrowserWindow } from 'electron'

if (process.platform === 'linux') {
  const originalSetIgnoreMouseEvents = BrowserWindow.prototype.setIgnoreMouseEvents

  Object.defineProperty(BrowserWindow.prototype, 'setIgnoreMouseEvents', {
    configurable: true,
    writable: true,
    value: function linuxSafeSetIgnoreMouseEvents(
      this: BrowserWindow,
      _ignore: boolean,
      _options?: { forward?: boolean }
    ): void {
      // Always keep mouse input enabled on Linux/Kylin.
      originalSetIgnoreMouseEvents.call(this, false)
    }
  })
}
