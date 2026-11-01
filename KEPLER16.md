# Kepler-16 binary-star correction

The stars previously used untextured spheres, equally strong point lights, and circular binary paths. Kepler-16 A and B now have separate generated photospheres, self-luminous materials with limb darkening, separate searchable entries and labels, and 4K full-size illustrations. The red dwarf's halo and planet-lighting contribution are reduced relative to the primary.

The model uses the Doyle-era parameter set: stellar masses 0.6897 and 0.20255 solar masses; radii 0.6489 and 0.22623 solar radii; binary semimajor axis 0.22431 AU and eccentricity 0.15944. The displayed period remains rounded to 41.08 days. Approximate temperatures of 4450 K and 3311 K provide bolometric luminosity weights using R²(T/5772 K)⁴. These make A about 26 times as luminous as B. Halo opacity is a compressed visual brightness cue, not a calibrated photometric observable.

The same Kepler ellipse drives stellar positions and the two orbit lines. Each star's semimajor axis is mass weighted, maintaining the shared center of mass. The binary's orientation and phase remain illustrative; this is not an eclipse ephemeris. Circumbinary planet positions retain the app's existing simplified model.

The two 1774 × 887 photosphere maps are separately AI-generated artistic illustrations. They are not resolved images of Kepler-16 or observed starspot maps. Full-size images render at 3840 × 2160. Checksums are recorded in `stellar-image-manifest.json`.

## References

- [Doyle et al. 2011: Kepler-16, a transiting circumbinary planet](https://arxiv.org/abs/1109.3432)
- [NASA: eccentric 41-day binary orbits](https://science.nasa.gov/photojournal/a-dance-of-two-suns-and-one-planet-artist-concept/)
- [Georgakarakos et al. 2021: adopted stellar radii, temperatures and binary parameters](https://www.frontiersin.org/journals/astronomy-and-space-sciences/articles/10.3389/fspas.2021.640830/full)

Run `node verify-kepler.cjs` for barycenter, ellipse, periodicity, parameter ratio and image uniqueness checks. Existing orbital, quantum, search and planetary-image checks remain applicable.
