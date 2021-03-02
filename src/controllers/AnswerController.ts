import { getCustomRepository } from "typeorm";
import { Request, Response } from "express";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { AppError } from "../errors/AppError";
import { resolve } from 'path';

import handlebars from 'handlebars';
import fs from 'fs';

class AnswerController {
    // Exemplo de rota -> http://localhost:3333/answers/10?u=1aea5d48-296b-4f71-99f2-5c5a67fdc4e3
    
    async execute(request: Request, response: Response){
        const endPage = resolve(__dirname, "..", "views", "emails", "endPage.html");

        const { value } = request.params;
        const { u } = request.query;
        // const { comment } = request.get()

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u),
        });

        if(!surveyUser){
            throw new AppError("Survey User does not exists!")
        }

        surveyUser.value = Number(value);

        // surveyUser.comment = string(comment);

        await surveysUsersRepository.save(surveyUser);

        return response.sendFile(endPage);

    }

    async getComment(){}
}


export { AnswerController }