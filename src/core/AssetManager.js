import * as THREE from 'three';

class AssetManager {
  constructor() {
    this.textures = new Map();
    this.models = new Map();
    this.textureLoader = new THREE.TextureLoader();
    this.isLoading = false;
  }

  /**
   * Load a texture with lazy loading and caching support.
   * @param {string} url - The texture URL
   * @returns {Promise<THREE.Texture>}
   */
  async loadTexture(url) {
    if (this.textures.has(url)) {
      const asset = this.textures.get(url);
      asset.refCount++;
      return asset.texture;
    }

    this.isLoading = true;
    return new Promise((resolve, reject) => {
      this.textureLoader.load(
        url,
        (texture) => {
          this.textures.set(url, { texture, refCount: 1 });
          this.isLoading = false;
          resolve(texture);
        },
        undefined,
        (err) => {
          console.error(`AssetManager: Failed to load texture at ${url}`, err);
          this.isLoading = false;
          reject(err);
        }
      );
    });
  }

  /**
   * Decrease reference count and dispose of asset if no longer needed.
   * @param {string} url 
   */
  releaseTexture(url) {
    if (!this.textures.has(url)) return;

    const asset = this.textures.get(url);
    asset.refCount--;

    if (asset.refCount <= 0) {
      asset.texture.dispose();
      this.textures.delete(url);
    }
  }

  disposeAll() {
    for (const [url, asset] of this.textures.entries()) {
      asset.texture.dispose();
    }
    this.textures.clear();
  }
}

export const assetManager = new AssetManager();
