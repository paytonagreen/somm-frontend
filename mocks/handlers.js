import { rest } from 'msw';
import { mockWine, mockProtein, mockSauce } from '../lib/test-utils';

const successMessage = {
  message: 'Success!',
};

export const handlers = [
  /***************************
   *  GET
   ******************************/

  rest.get('*/proteins', async (req, res, ctx) => {
    return res(ctx.json([mockProtein]));
  }),

  rest.get('*/wines', async (req, res, ctx) => {
    return res(ctx.json([mockWine]));
  }),

  rest.get('*/sauces', async (req, res, ctx) => {
    return res(ctx.json([mockSauce]));
  }),

  rest.get('*/wines/100', async (req, res, ctx) => {
    return res(ctx.json(mockWine));
  }),

  rest.get('*/proteins/100', async (req, res, ctx) => {
    return res(ctx.json(mockProtein));
  }),

  rest.get('*/sauces/100', async (req, res, ctx) => {
    return res(ctx.json(mockSauce));
  }),

  rest.get('*/proteins/100/wines', async (req, res, ctx) => {
    return res(ctx.json([mockWine]));
  }),

  rest.get('*/sauces/100/wines', async (req, res, ctx) => {
    return res(ctx.json([mockWine]));
  }),

  /***************************
   *  POST
   ******************************/

  rest.post('*/wines', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successMessage));
  }),

  rest.post('*/proteins', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successMessage));
  }),

  rest.post('*/wines_proteins', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successMessage));
  }),

  rest.post('*/wines_sauces', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successMessage));
  }),

  rest.post('*/users', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successMessage));
  }),

  rest.post('*/login', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successMessage));
  }),

  rest.post('*/logout', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successMessage));
  }),

  /***************************
   *  PUT
   ******************************/

  rest.put('*/wines/100', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successMessage));
  }),

  /***************************
   *  DELETE
   ******************************/

  rest.delete('*/proteins/100', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successMessage));
  }),

  rest.delete('*/wines/100', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successMessage));
  }),

  rest.delete('*/sauces/100', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successMessage));
  }),
];
