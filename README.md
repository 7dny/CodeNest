# CodeNest — Code Studio

A static HTML, CSS and JavaScript playground. No installation, build tools, API keys or backend required.

## GitHub Pages

1. Upload all seven app files: `index.html`, `style.css`, `app.js`, `workspace.js`, `menu.js`, `settings.js`, and `favicon.svg` to the root of your GitHub repository. These are at the root of the downloadable ZIP, or inside `dist` in the source folder.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select **main** and **/(root)**, then save.
5. GitHub will display the website address after deployment.

You can also open `dist/index.html` directly in a browser. The optional Google Fonts stylesheet needs internet; system fonts are used otherwise.

## Included

- A three-line menu opens a sidebar with topic tabs and a main settings pane.
- Saving & files contains project naming, local save, named export, ZIP export and import.
- Dedicated tabs for Saving & files, Projects & templates, Version history, Layout & personalize, Editor behavior, Preview, Keyboard shortcuts, Accessibility, and Backups & storage.
- Ten customizable keyboard shortcuts with recording, collision detection, reset buttons, browser-shortcut protections, and local persistence.
- 24 color palettes: each rainbow color and pink in dark/light; cacao/caramel; dark roast/toffee; black, white, and dark/light grey. Logos, favicon, controls, syntax colors and scrollbars follow the theme.
- 12 code-font choices and 14 interface-font choices. Additional open-source fonts load through Google Fonts with installed/system fallbacks.
- UI design choices: corners, surfaces, button style, menu width, panel dividers, density and text size.
- Editor settings for indentation, automatic indentation, syntax colors and active-line highlighting.
- Preview settings for automatic updates, delay, viewport, canvas backdrop and title bar.
- Accessibility settings for motion, keyboard focus, borders, larger targets and status bar.
- Full project-library JSON backups with version history. Import merges copies without replacing existing projects; preferences and shortcuts are device-local.
- Browser translation guards on source editors, highlights and fixed-height line-number rows. The menus remain translatable. An already-translated old page may need refreshing after deploying this update.
- Editor orientation is immediately before the language buttons in the workspace toolbar.
- Personalization includes code/interface fonts, code size and spacing, interface size and density, line numbers, status bar, reduced motion and saved layouts. Preferences persist locally.
- Fixed compact move/minimize buttons sit outside each panel's draggable title handle.

- HTML, CSS and JavaScript editors with syntax colors, line numbers and Tab indentation.
- CodeNest nested-bracket logo and favicon.
- Draggable editor headers to reorder panels, with accessible move buttons.
- Named saved layouts that include panel order, visibility, theme, font size, preview width and split position.
- Fullscreen preview with Escape to exit, and adjustable 10–28px code font size.
- Live, sandboxed preview; manual run and Ctrl/Cmd+Enter.
- Vertical stack, columns, focus/tabs, individual minimize controls.
- Drag or keyboard-resize the editor/preview split.
- Desktop, tablet and phone preview widths.
- Multiple browser-local projects with autosave, switching and duplication.
- Version history: automatic checkpoints every minute while editing and before switching/importing; manual named checkpoints; restore preserves previous work. Last 40 versions per project.
- Blank, welcome, portfolio, landing page and counter starter templates.
- Named standalone HTML, editable JSON and ZIP exports. ZIP contains `index.html`, `style.css`, `script.js` and `codenest-project.json`.
- Import HTML, CSS, JS or CodeNest JSON (older Kiln JSON is compatible). Select CSS/JS alongside HTML to replace extracted inline code.
- Console output and runtime errors.


## Notes

Syntax highlighting is lightweight lexical coloring; autocomplete and full language parsing are not included. Dragging reorders the three code panels within the stack or column layout. Use the move arrows on touch devices. Projects, versions and layouts are saved only in the current browser and origin, not in GitHub or a cloud account. Export backups before clearing browser data or changing the hosting address. ZIP exports do not include remote assets and ZIP import is not included; use the included project JSON to reopen the project. Import replaces corresponding code and keeps a checkpoint. Relative external assets must be hosted at suitable URLs. The preview isolates code from the editor but allows scripts to load external resources. A full browser page running an infinite loop can still become unresponsive. No server or multi-user storage is included.


