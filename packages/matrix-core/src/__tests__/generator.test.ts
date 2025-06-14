import { createMatrixGenerator } from '..';

test('generates frames with correct cell count', () => {
  const gen = createMatrixGenerator({ columns: 2, rows: 4, tailLength: 2 });
  const frame = gen.nextFrame();
  expect(frame.cells.length).toBeLessThanOrEqual(4);
});
