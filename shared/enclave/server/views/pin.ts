import { BrowserWindow, ipcMain, IpcMessageEvent } from 'electron';
import template from './pin.html';

const EVENT = 'enclave:pin';

export function showPinPrompt(): Promise<string> {
  return new Promise((resolve, reject) => {
    const scriptNonce = Math.floor(Math.random() * 1000000000000);
    const html = template.replace(/\$scriptNonce/g, scriptNonce.toString());

    const window = new BrowserWindow({
      width: 320,
      height: 380,
      frame: false,
      backgroundColor: '#21252B',
      darkTheme: true
    });

    window.on('closed', () => {
      reject(new Error('ENCLAVE_TREZOR_CANCELED'));
    });

    ipcMain.once(EVENT, (_: IpcMessageEvent, pin: string) => {
      resolve(pin);
    });

    window.loadURL(`data:text/html;charset=UTF-8,${encodeURIComponent(html)}`);
    window.show();
    window.focus();
  });
}
