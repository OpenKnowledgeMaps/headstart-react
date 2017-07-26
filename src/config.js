const config =
  {
    sortOptions: {readers: 'citations', authors: 'authors', title: 'title', year: 'year'},
    forceSimParameters: {
      manyBodyForceStrength: 1000,
      collisionForceRadius: this.previousSVGSize / 8.,
      bubblesAlphaMin: 0.8,
      papersAlphaMin: 0.008,
      centerXForceStrength: 0.5,
      centerYForceStrength: 0.5,
    }
  };

export default config;