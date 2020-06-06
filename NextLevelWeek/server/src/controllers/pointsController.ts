import { Request, Response } from 'express';
import knex from '../database/connection';
import { celebrate, Joi } from "celebrate";

class PointsController {

    async create(request: Request, response: Response) {

        // Grava um objeto com os dados a serem inseridos pelo request
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;

        const point = {
            image: request.file.filename,
            name: name.toUpperCase(),
            email: email.toLowerCase(),
            whatsapp,
            latitude,
            longitude,
            city: city.toUpperCase(),
            uf: uf.toUpperCase()
        };

        // Cria transação
        const trx = await knex.transaction();

        // insere os dados na tabela 'points' e grava em um array
        const insertedIds = await trx('points').insert(point);

        const point_id = insertedIds[0];

        // Insere na tabela 'point_items' cada item passado no request
        const pointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) => {
                return {
                    item_id,
                    point_id,
                };
            });
        await trx('point_items').insert(pointItems);

        // Commita os dados inseridos
        await trx.commit();

        // Retorna o ID do point criado e o restante das informações do Point
        return response.json({
            id: point_id,
            ...point
        });
    };

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({
                message: 'Point Not Found',
            });
        }
        const serializedPoints = {
            ...point,
            image_url: `http://10.0.0.110:3333/uploads/${point.image}`,
        };

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id);

        // Fiz isso para que os itens fiquem dentro do objeto 'Point'
        serializedPoints["items"] = items;
        return response.json({ serializedPoints });
    };

    async index(request: Request, response: Response) {
        // Filtros: Cidade, uf, items
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map((item => Number(item.trim())));

        const allItems = (await knex('items').select('id')).map((item) => {
            return item.id;
        });


        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')

            // Caso não sejam informados itens, compara com todos itens cadastrados
            .whereIn('point_items.item_id', items == undefined ? allItems : parsedItems)

            // Caso não for informada a cidade, considera todas
            .where((builder) => {
                if (city) {
                    builder.where('city', String(city).toUpperCase())
                }
            })

            // Caso não for informado o uf, considera todos
            .where((builder) => {
                if (uf) {
                    builder.where('uf', String(uf).toUpperCase())
                }
            })

            .distinct()
            .select('points.*');

        const serializedPoints = points.map(point => {
            return {
                ...point,
                image_url: `http://10.0.0.110:3333/uploads/${point.image}`
            };
        })

        return response.json(serializedPoints);
    };
}


export default PointsController;