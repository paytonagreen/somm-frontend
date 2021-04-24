import { rest } from 'msw';

export const handlers = [
  rest.get('*/proteins', async (req, res, ctx) => {
    return res(ctx.json([{ id: 55, protein_name: 'Beef' }]));
  }),

  rest.post('*/wines', async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'Success!',
      })
    );
  }),

  rest.get('*/wines/100', async (req, res, ctx) => {
    return res(
      ctx.json({
        id: 100,
        wine_name: 'Cabernet Sauvignon',
        wine_description: 'An absolute classic.',
      })
    );
  }),

  rest.put('*/wines/100', async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'Success!',
      })
    );
  }),

  rest.post('*/proteins', async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'Success!',
      })
    );
  }),

  rest.delete('*/proteins/55', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'success!' }));
  }),

  rest.get('*/proteins/55', async (req, res, ctx) => {
    return res(
      ctx.json({
        id: 55,
        protein_name: 'Beef',
      })
    );
  }),

  rest.get('*/proteins/55/wines', async (req, res, ctx) => {
    return res(ctx.json([{ id: 100, wine_name: 'Cabernet Sauvignon' }]));
  }),
];
