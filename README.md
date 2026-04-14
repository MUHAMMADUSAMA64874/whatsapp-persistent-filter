# WhatsApp Search Lock

A Chrome extension that keeps the WhatsApp Web search bar locked to a persistent filter text, preventing accidental clearing of search queries.

## Features

- Automatically maintains search text in WhatsApp Web search box
- Prevents the search filter from being cleared
- Lightweight and non-intrusive

## Installation

1. Download or clone this repository 
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the folder containing the extension files (`manifest.json`, `content.js`, `styles.css`)
5. The extension is now installed and active on WhatsApp Web

## Usage

1. Navigate to [WhatsApp Web](https://web.whatsapp.com/)
2. The search box will automatically be set to the filter text ("deco")
3. Any attempt to clear the search will be reverted, keeping the filter active

## How it Works

The extension injects a content script into WhatsApp Web that:
- Locates the search input box
- Sets and maintains the specified search text
- Uses a MutationObserver to detect changes and restore the text if cleared

## Customization

To change the persistent search text, edit the `SEARCH_TEXT` variable in `content.js` (currently set to "deco").

## Compatibility

- Chrome (and Chromium-based browsers)
- WhatsApp Web

## License

This project is open source. Feel free to modify and distribute.
