# Project pages

One folder per project. Drop it in, commit, done — the page builds itself.

    public/work/marble/
      index.md          the writing + frontmatter
      cover.jpg         images live beside the text
      screens.jpg

## index.md

    ---
    title: Marble
    date: July 2026
    medium: iOS App
    description: One line, used on the homepage row and in the archive.
    cover: cover.jpg          # optional — first image is used otherwise
    tint: "#E8E5DE"           # optional page background
    featured: true            # optional — adds a homepage row
    ---

    Opening context: what it is, why, your role, where it landed.
    Write as much as it deserves; blank lines separate paragraphs.

    ![](cover.jpg)

    A passage between images, only where an image needs its "why".

    ![](a.jpg) ![](b.jpg)

## The rules

- Blank-line-separated prose becomes a text block (cols 5-9 of the page).
- A line holding one image becomes a full-width frame.
- Two images on one line become a 6/6 pair — good for portrait shots.
- Image paths are relative to the folder; paths starting with `/` are
  used as-is, so `/images/foo.png` also works.
- The folder name is the URL: `public/work/marble/` -> `/work/marble`.
- Writing a project replaces its placeholder entry automatically; the
  placeholders that remain keep showing until you write them.

Any plain-text editor works — TextEdit (Format -> Make Plain Text),
VS Code, iA Writer, Obsidian. It's just a `.md` file.
