import { describe, it, expect, beforeEach } from 'vitest';
import { sceneManager } from '../src/core/SceneManager.js';

describe('SceneManager', () => {
  beforeEach(() => {
    sceneManager.scenes.clear();
    sceneManager.activeScene = null;
  });

  it('registers a scene successfully', () => {
    const mockScene = { id: 'test-scene' };
    sceneManager.register(mockScene);
    
    expect(sceneManager.scenes.get('test-scene')).toBe(mockScene);
  });
});
