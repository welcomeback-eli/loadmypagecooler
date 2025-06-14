export interface GlyphCell {
  x: number;
  y: number;
  char: string;
  opacity: number;
}

export interface Frame {
  cells: GlyphCell[];
}

export interface MatrixConfig {
  columns: number;
  rows: number;
  glyphs?: string;
  tailLength?: number;
  speed?: number;
}

interface ColumnState {
  head: number;
}

const DEFAULT_GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789\u30A0-\u30FF';

export function createMatrixGenerator(config: MatrixConfig) {
  const columns: ColumnState[] = Array.from({ length: config.columns }, () => ({
    head: Math.floor(Math.random() * config.rows)
  }));
  const glyphs = config.glyphs || DEFAULT_GLYPHS;
  const tail = config.tailLength || 10;
  const speed = config.speed || 1;

  function randomGlyph() {
    const i = Math.floor(Math.random() * glyphs.length);
    return glyphs[i];
  }

  return {
    nextFrame(): Frame {
      const cells: GlyphCell[] = [];
      columns.forEach((col, x) => {
        col.head = (col.head + speed) % (config.rows + tail);
        for (let i = 0; i < tail; i++) {
          const y = col.head - i;
          if (y >= 0 && y < config.rows) {
            cells.push({
              x,
              y,
              char: randomGlyph(),
              opacity: 1 - i / tail
            });
          }
        }
      });
      return { cells };
    }
  };
}
