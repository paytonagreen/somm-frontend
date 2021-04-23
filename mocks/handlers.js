import { rest } from 'msw'

export const handlers = [
    rest.get('*/proteins', async (req, res, ctx) => {
        return res(ctx.json([
            {id: 101, protein_name: "Beef"}
        ])
        )
    })
]