import { rest } from 'msw'

export const handlers = [
    rest.get('*/proteins', async (req, res, ctx) => {
        return res(ctx.json([
            {id: 101, protein_name: "Beef"}
        ])
        )
    }),

    rest.post('*/wines', async (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            message: 'Success!'
        }))
    }),
    
    rest.post('*/proteins', async (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            message: 'Success!'
        }))
    })
]