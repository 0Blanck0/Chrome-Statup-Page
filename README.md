# Chevron [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE.md) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

> Fork of [kholmogorov27/chevron](https://github.com/kholmogorov27/chevron), modernised (React 19, Vite 8, clean architecture, tests) with bug fixes.

<p align=center>
  <img width="80%" src="https://i.imgur.com/Wa7HcuW.png">
</p>

<p align=center>
  Сhevron is a <i>powerful</i> and highly <i>functional</i> startpage<br/> hidden under the super <i>minimalistic</i> and <i>animated</i> design
</p>

<p align=center>
  available in <i>static</i>, <i>hosted</i> and <i>github pages</i> options
</p>

<p align=center>
  <font size=4>
    <a href="https://kholmogorov27.github.io/chevron/">Live Demo</a> | 
    <a href="https://github.com/kholmogorov27/chevron/releases/latest">Download</a> |
    <a href="#installation">Installation</a>
  </font>
</p>

## Content

- [Features](#features)
- [Screenshots](#screenshots)
- [Installation](#installation)
  <font size=2>
  - [Static _<sup>(recommended)</sup>_](#static-recommended)
  - [Hosted](#hosted)
  - [GitHub Pages](#github-pages)
    </font>
- [Build](#build)
- [Development](#development)
  <font size=2>
  - [Architecture](#architecture)
    </font>
- [Usage](#usage)
  <font size=2>
  - [Websites (closest match)](#websites-closest-match)
  - [Commands](#commands)
  - [Macros menu](#macros-menu)
  - [Hotkeys](#hotkeys)
  - [Currency converter](#currency-converter)
    </font>
- [Configuration](#configuration)
  <font size=2>
  - [Settings](#settings)
  - [config.js](#configjs)
    </font>
- [TODO](#todo)
- [Technologies](#technologies)

## Features

closest-match website suggestions, autosuggestions, history, commands, macros menu, hotkeys, currency converter, calculator, animated and minimalist design

## Screenshots

<table>
  <tbody>
    <tr>
      <td>
        <img src="https://i.imgur.com/7j0f88w.png"/>
      </td>
      <td>
        <img src="https://i.imgur.com/eaBEk6m.png"/>
      </td>
    </tr>
    <tr>
      <td>
        <img src="https://i.imgur.com/0bNz1vL.png"/>
      </td>
      <td>
        <img src="https://i.imgur.com/TSY3T6k.png"/>
      </td>
    </tr>
    <tr>
      <td>
        <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWZmMTY3YmI1YzkxMDMyNDhmZmFhMTAzZTc2MTcwZWM1NDZiNGJiZSZjdD1n/libdVLG7NrsRv9LYAJ/giphy.gif"/>
      </td>
      <td>
        <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzc3ZDI3NTczNWMyMzcyMjUxMmEzNmVhNGIzMTcwYmYyNDZhOTk2MCZjdD1n/P6sYvkQHOpjVTGhZHv/giphy.gif"/>
      </td>
    </tr>
    <tr>
      <td colspan=2 align=center>
        <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2YyOTI3Yzg3NWU2MzhkZjBjZWVjN2EzMTY2YzNlNGIzZDQzNmVkZiZjdD1n/FoIvawvfxuoQ2IMZ8H/giphy.gif"/>
      </td>
    </tr>
  </tbody>
</table>

## Installation

You can set Chevron as the homepage (in the browser settings) or the new tab (you will need a custom tab extension).

<a id="focus-problem"></a>

> **Warning**
> If you want the app itself to be focused when opening a new tab and not the address bar,
> I recommend [this](https://chrome.google.com/webstore/detail/new-tab-redirect/icpgjfneehieebagbmdbhnlpiopdcmna) extension in tandem with the [hosted](#hosted) or [github pages](#github-pages) installation method for all chromium based browsers (_Google Chrome, Microsoft Edge, Brave, Opera, Vivaldi etc_)

There are a few ways to install Chevron:

### Static _<sup>(recommended)</sup>_

> This method is **recommended** because it doesn't depend on your internet connection or any remote servers, and the UI will be loaded instantly.
> Some browser and extensions might have [the focus problem](#focus-problem)

1. [Build](#build) the app (or download a release)
1. Open `dist/index.html` from your browser, or set it as your homepage (`file:///path/to/dist/index.html`)

### Hosted

> This method is useful when you want to fix [the focus problem](#focus-problem) or for any other reason the _Static_ method doesn't work for you

1. [Build](#build) the app
1. Start the local server: `npm run serve` (Chevron is then available on **_localhost:8000_**, set `PORT` to change it)
1. _(optional)_ register the server as a system service so it starts with your computer:

   ```bash
   npm install -g node-linux && npm link node-linux   # or node-windows / node-mac
   npm run register_linux                               # or register_windows / register_mac
   ```

   > **Note**
   > Administrator privileges are required. Run the command again to uninstall the service.

### GitHub Pages

> This method **isn't recommended** because it depends on your internet connection and GitHub servers

1. Fork this repository
1. Run `npm run deploy` (builds the app and pushes `dist/` to the `gh-pages` branch)
1. Go `Settings` &rarr; `Pages` &rarr; <code>Branch: <i>"gh-pages"</i></code> &rarr; `Save`

## Build

> **Note**
> [Node.js](https://nodejs.org/en/download/) **22.22 or newer** is required (Node 24 LTS recommended)

```bash
npm install
npm run build
```

After building, you can find all the necessary files in the `/dist` folder: the whole app is inlined in `index.html`, next to the user editable files (`config.js`, `icons.js`, fonts).

## Development

| Command            | Description                                  |
| ------------------ | -------------------------------------------- |
| `npm run dev`      | Development server with hot reload           |
| `npm run build`    | Production build in `dist/`                  |
| `npm run preview`  | Serve the production build                   |
| `npm run serve`    | Serve `dist/` on port 8000 (hosted method)   |
| `npm test`         | Tests in watch mode (Vitest)                 |
| `npm run test:run` | Run the tests once                           |
| `npm run lint`     | Lint the code (ESLint)                       |
| `npm run deploy`   | Build and publish to GitHub Pages            |

### Architecture

The code follows a simple **clean architecture**: dependencies only point inwards
(`presentation → application → domain`), and the technical details (`infrastructure`) are plugged in
at a single place, `src/main.jsx`, then given to the UI through a React context (`useServices()`).

```
src/
├── main.jsx            Composition root: builds the services and renders the app
├── domain/             Pure logic, no React and no browser API
│   ├── query/          Query parsing: closest websites, commands, direct URLs, search URL
│   ├── suggestions/    Merging and ranking of suggestions
│   ├── currency/       Currency conversion queries ("100 usd to eur")
│   ├── colors/         Gradients, generated colors, APCA contrast
│   └── settings/       Merge of saved settings with the defaults
├── application/        Use cases: search history, settings, currency conversion
├── infrastructure/     localStorage, Google autocomplete (JSONP), exchange rates API,
│                       user config (config.js / icons.js)
├── presentation/       React UI: App, components, hooks, contexts, settings schema
└── test/               Test setup and fixtures
```

Tests live next to the code they cover (`*.test.js(x)`).

## Usage

To use Chevron's main functionality, just type something (you don't need to worry about focus on the input field, it is always in focus at the right moment).

As soon as you type something, the query is parsed and suggestions are shown: the closest websites first, then your history and the [search suggestions](#autocomplete). You can limit the number of suggestions of each source in the settings.

By default, <kbd>Enter</kbd> searches on DuckDuckGo. If what you typed clearly designates one of your websites, <kbd>Enter</kbd> opens it instead.

- #### **Websites (closest match)**:<br/>

  There is no shortcut to learn: Chevron compares what you type with the **name**, the **keywords** and the **domain** of the websites of `config.js`, and the matching websites always come first.

  - If a website name (or keyword) **starts with** what you typed, <kbd>Enter</kbd> opens it, even after a single letter.
  - Names win over keywords, then **the order of `config.js` breaks ties**: put your favourite websites first.
  - Typos and skipped letters only _suggest_ the website (first suggestion: <kbd>↓</kbd> then <kbd>Enter</kbd>).
  - Anything else is searched on DuckDuckGo.

  | You type      | <kbd>Enter</kbd> opens                       |
  | ------------- | -------------------------------------------- |
  | `y`           | **YouTube**                                  |
  | `a`           | **Amazon** (name before Claude's keyword "ai") |
  | `c`           | **Claude** (first in `config.js`), then Canal+, Correcteur... suggested |
  | `disnye`      | DuckDuckGo search, **Disney+** suggested first |
  | `meteo paris` | DuckDuckGo search                            |

- #### **Commands**:<br/>

  A command after a website name opens a specific page of that website. Everything after the command symbol is the _argument_:
  <pre><span style="color: grey">></span> <span style="color: orange">netflix</span><span style="color: limegreen">?</span><span style="color: steelblue">stranger things</span>       search on Netflix
<span style="color: grey">></span> <span style="color: orange">youtube</span><span style="color: limegreen">/</span><span style="color: steelblue">dQw4w9WgXcQ</span>            open a video</pre>

  To ignore websites and force the search engine, hold <kbd><font size=3>Ctrl</font></kbd>.

- #### **Macros menu**:

  Pinned websites are shown in the macros menu.

  **_Controls_**:

  - **open/close**:

    - the _macros menu toggle button_ in the right bottom corner
      > **Note**
      > The macros menu toggle button will appear only on hover after you click it at least once
    - <kbd><font size=3>RMB</font></kbd>
    - <kbd><font size=3>Shift</font></kbd>

  - **navigation**:

    - <kbd><font size=3>←</font></kbd> <kbd><font size=3>→</font></kbd>
    - mouse wheel
    - drag

- #### **Hotkeys**:

  <kbd><font size=3>Shift</font></kbd> + \<**key**\> opens the pinned website that has this `key` (e.g. <kbd>Shift</kbd> + <kbd>N</kbd> for Netflix).

- #### **Currency converter**:

  Type a conversion such as `100 usd to eur`: the result appears as the first suggestion.
  Rates come from the free [ExchangeRate-API](https://www.exchangerate-api.com/) open access endpoint (no key needed, fiat currencies only).

<a id="autocomplete"></a>

- #### **Search suggestions**:

  They come from Google's public autocomplete endpoint, in the language of the `Locale` setting (`fr` by default).
  DuckDuckGo also has one, but it cannot be read from a web page (no CORS nor JSONP support).

## Configuration

### Settings

You can configure main functionality of the app in **Settings**.

To open **Settings**, click on the _gear icon_ in the top right corner.

You can click the _show/hide_ icon at the bottom of the **Settings** window to show advanced settings.

> **Note**
> The gear icon will appear only on hover after you visit **Settings** at least once

### config.js

Websites and commands are edited in `/config.js` (next to `index.html`, no rebuild needed).
It contains a single JS object named **CONFIG** with 3 properties:

- **macros** `Array`: your websites

  ```javascript
  {
    name: string, // displayed name, used for the closest match
    category: string, // category (informative)
    url: string, // page opened
    keywords: [ string, ... ], // (optional) other names, e.g. ['wiki'] for Wikipédia
    commands: { // (optional) commands of the website
      [type]: {
        // {@} - website URL
        // {$} - command argument
        template: string, // URL template
        description: string // (optional) label shown while typing
      }
    },
    bgColor: complexColor, // background color
    textColor: string, // icon / text color
    pinned: boolean, // shown in the macros menu
    key: string, // (optional) hotkey: 'Key' + letter, e.g. 'KeyN'
    icon: string // (optional) name of an SVG in "/icons.js", the initial of the name is shown otherwise
  }
  ```

- **commands** `Array`

  ```javascript
  {
    type: string, // command type (name)
    trigger: string // symbol typed between the website name and the argument
  }
  ```

- **engine** `Object`: the search engine (DuckDuckGo)

  ```javascript
  {
    name: string,
    bgColor: complexColor,
    textColor: string,
    types: { // query (required), calculator, currency
      [type]: {
        // {@} - raw query (what user typed)
        // {$} - parsed query (what is in the query field)
        template: string // URL template
      }
    }
  }
  ```

Because of the limitations of the CORS policy, icons must be stored in `/icons.js` in the `ICONS` object. You can put there any valid HTML SVG as a string.

> **Warning**
> be aware of quotes

## TODO

- [ ] The _"Legacy"_ mode
- [x] Macros menu toggle button
- [ ] Weather widget
- [ ] Settings description
- [ ] Redirect button
- [x] Force search engine on <kbd>Ctrl</kbd>
- [ ] Fix transition animations
- [ ] Macros and Commands editor
- [ ] Macros Menu categories
- [ ] Localisation
- [x] LocalStorage reset buttons
- [x] Refactor search engines system (single engine: DuckDuckGo)
- [ ] Time settings

## Technologies

- [React 19](https://react.dev/)
- MUI ([Joy UI](https://mui.com/joy-ui/getting-started/overview/))
- [Motion](https://motion.dev/)
- [Splide](https://splidejs.com/)
- [Vite](https://vite.dev/) and [Vitest](https://vitest.dev/)

> <font size=2 color=grey>JS, CSS, HTML, <a href="https://github.com/Myndex/SAPC-APCA">APCA</a> (from <a href="https://colorjs.io/">color.js</a>)</font>

---

<p align=center>
inspired by <a href="https://github.com/xvvvyz/tilde">Tilde</a>
</p>
