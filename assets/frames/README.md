# Flipbook frames

Drop your scroll-sequence images here, named exactly:

```
frame_001.webp
frame_002.webp
...
frame_150.webp
```

(zero-padded to 3 digits, `.webp`)

## How it works
- `flipbook.js` draws **only `frame_001.webp`** on first load, then lazy-loads
  `frame_002`…`frame_150` after the page finishes loading (`window.onload`).
- As you scroll the landing page, the canvas swaps to the frame matching the
  scroll percentage (0% → frame 1, 100% → frame 150).
- The effect runs **only on the landing page**. Inside the game it turns off and
  the normal dark theme returns.

## Until you add frames
The background stays the existing dark theme — no errors, no broken-image icons.
The effect simply appears once the files are present.

## Recommended specs
- Width ~1280px (covers most phones/laptops; canvas center-crops to fill).
- WebP, quality ~75, aim for ~30–60 KB per frame.
- 150 frames × ~45 KB ≈ ~6.6 MB total, loaded lazily after first paint.
- Keep the framing centered — the canvas uses `object-fit: cover` (center-crop).
