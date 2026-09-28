# FootQuery Project Page

Source of the official project website for:

> **FootQuery: Future-Touchdown-Guided Retrieval from Depth History for Perceptive Humanoid Locomotion**
> Tao Dong, Jia Yu, Yuxuan Fan, Linna Zhao, Jiaqi Gong, Andong Yang, Chao Gao, Guyue Zhou
> arXiv:2609.21447

**Live site:** <https://beiketaoerge.github.io/footquery/>

## Structure

```
├── index.html    # single-page site
├── style.css     # styles
├── script.js     # BibTeX copy button + video platform switcher
├── citation.bib
└── static/       # images and short video clips
```

## Editing

Edit `index.html` / `style.css` and push to `main` — GitHub Pages rebuilds automatically, usually within a minute. Helpful markers to search for in `index.html`: `PLACEHOLDER-TEASER`, `PLACEHOLDER-PIPELINE`, `PLACEHOLDER-RESULTS`, `CLIP-GRID`, `CODE-LINK`.

Long overview videos are embedded from YouTube / Bilibili rather than stored in the repo (GitHub Pages limits: 1 GB per site, 100 MB per file, no Git LFS). Short looping clips belong in `static/videos/` and are embedded with `<video autoplay muted loop playsinline>`.

## Citation

If you find our work useful, please cite:

```bibtex
@article{dong2026footquery,
  author  = {Dong, Tao and Yu, Jia and Fan, Yuxuan and Zhao, Linna and
             Gong, Jiaqi and Yang, Andong and Gao, Chao and Zhou, Guyue},
  title   = {{FootQuery}: Future-Touchdown-Guided Retrieval from Depth
             History for Perceptive Humanoid Locomotion},
  journal = {arXiv preprint arXiv:2609.21447},
  year    = {2026}
}
```

## Acknowledgements

This page follows the conventions of the [Nerfies](https://github.com/nerfies/nerfies.github.io)-style academic project page.
