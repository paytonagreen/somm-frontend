import { rest } from 'msw';
import {
  adminUser,
  regUser,
  mockWine,
  mockWine2,
  mockWine3,
  mockWine4,
  mockWine5,
  mockWine6,
  mockGrape,
  mockGrape2,
  mockGrape3,
  mockGrape4,
  mockGrape5,
  mockGrape6,
  mockProtein,
  mockSauce,
} from 'lib/test-utils';

const successMessage = {
  message: 'Success!',
};

export const handlers = [
  /***************************
   *  GET
   ******************************/

  rest.get('*/logged_in', async (req, res, ctx) => {
    return res(ctx.json({ logged_in: true, user: regUser }));
  }),

  rest.get('*/users', async (req, res, ctx) => {
    return res(ctx.json({ users: [adminUser, regUser] }));
  }),

  rest.get('*/proteins', async (req, res, ctx) => {
    return res(ctx.json({ proteins: [mockProtein] }));
  }),

  rest.get('/api/wines', async (req, res, ctx) => {
    return res(
      ctx.json({
        wines: [
          mockWine,
          mockWine2,
          mockWine3,
          mockWine4,
          mockWine5,
          mockWine6,
        ],
        total_pages: 2,
      })
    );
  }),
  
  rest.get('/api/grapes', async (req, res, ctx) => {
    return res(
      ctx.json({
        grapes: [
          mockGrape,
          mockGrape2,
          mockGrape3,
          mockGrape4,
          mockGrape5,
          mockGrape6,
        ],
        total_pages: 2,
      })
    );
  }),

  rest.get('*/sauces', async (req, res, ctx) => {
    return res(ctx.json({ sauces: [mockSauce] }));
  }),

  rest.get('*/users/1', async (req, res, ctx) => {
    return res(ctx.json({ user: regUser }));
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
  
  rest.get('*/grapes/100', async (req, res, ctx) => {
    return res(ctx.json(mockGrape));
  }),

  rest.get('*/proteins/100/wines', async (req, res, ctx) => {
    return res(ctx.json([mockWine, mockWine2]));
  }),
  
  rest.get('*/proteins/100/grapes', async (req, res, ctx) => {
    return res(ctx.json([mockGrape, mockGrape2]));
  }),

  rest.get('*/sauces/100/wines', async (req, res, ctx) => {
    return res(ctx.json([mockWine, mockWine3]));
  }),
  
  rest.get('*/sauces/100/grapes', async (req, res, ctx) => {
    return res(ctx.json([mockGrape, mockGrape3]));
  }),
  
  rest.get('*/wines/100/grapes', async (req, res, ctx) => {
    return res(ctx.json([mockGrape, mockGrape3]));
  }),

  rest.get('*/users/1', async (req, res, ctx) => {
    return res(ctx.json(regUser));
  }),

  rest.get('*/users/2', async (req, res, ctx) => {
    return res(ctx.json(adminUser));
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

  rest.post('*/sauces', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successMessage));
  }),

  rest.post('*/wines_proteins', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successMessage));
  }),

  rest.post('*/wines_sauces', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successMessage));
  }),
  
  rest.post('*/proteins_grapes', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successMessage));
  }),
  
  rest.post('*/sauces_grapes', async (req, res, ctx) => {
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

  rest.post('*/password/forgot', async (req,res, ctx) => {
    return res(ctx.status(200), ctx.json(successMessage));
  }),

  rest.post('*/password/reset', async (req,res, ctx) => {
    return res(ctx.status(200), ctx.json(successMessage));
  }),

  /***************************
   *  PUT
   ******************************/

  rest.put('*/wines/100', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successMessage));
  }),
  
  rest.put('*/grapes/100', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successMessage));
  }),

  rest.put('*/users/1', async (req, res, ctx) => {
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
  
  rest.delete('*/grapes/100', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successMessage));
  }),
];
