import { rest } from 'msw';

export const handlers = [
  /***************************
   *  GET
   ******************************/

  rest.get('*/proteins', async (req, res, ctx) => {
    return res(ctx.json([{ id: 55, protein_name: 'Beef' }]));
  }),

  rest.get('*/wines', async (req, res, ctx) => {
    return res(ctx.json([{ id: 100, wine_name: 'Cabernet Sauvignon' }]));
  }),

  rest.get('*/sauces', async (req, res, ctx) => {
    return res(ctx.json([{ id: 100, sauce_name: 'Marinara' }]));
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

  rest.get('*/proteins/55', async (req, res, ctx) => {
    return res(
      ctx.json({
        id: 55,
        protein_name: 'Beef',
      })
    );
  }),

  rest.get('*/sauces/100', async (req, res, ctx) => {
    return res(
      ctx.json({
        id: 100,
        sauce_name: 'Marinara',
      })
    );
  }),

  rest.get('*/proteins/55/wines', async (req, res, ctx) => {
    return res(ctx.json([{ id: 100, wine_name: 'Cabernet Sauvignon' }]));
  }),
  
  rest.get('*/sauces/100/wines', async (req, res, ctx) => {
    return res(ctx.json([{ id: 100, sauce_name: 'Marinara' }]));
  }),

  /***************************
   *  POST
   ******************************/

  rest.post('*/wines', async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'Success!',
      })
    );
  }),

  rest.post('*/proteins', async (req, res, ctx) => {
    console.log(req.body);
    return res(
      ctx.status(200),
      ctx.json({
        message: 'Success!',
      })
    );
  }),

  rest.post('*/wines_proteins', async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'Success!',
      })
    );
  }),
  
  rest.post('*/wines_sauces', async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'Success!',
      })
    );
  }),

  /***************************
   *  PUT
   ******************************/

  rest.put('*/wines/100', async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'Success!',
      })
    );
  }),

  /***************************
   *  DELETE
   ******************************/

  rest.delete('*/proteins/55', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'success!' }));
  }),

  rest.delete('*/wines/100', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'success!' }));
  }),
  
  rest.delete('*/sauces/100', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'success!' }));
  }),
];
