import { getCustomRepository } from "typeorm";
import { Request, Response } from "express";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { AppError } from "../errors/AppError";


class AnswerController {
    // Exemplo de rota -> http://localhost:3333/answers/10?u=1aea5d48-296b-4f71-99f2-5c5a67fdc4e3
    
    async execute(request: Request, response: Response){
        const { value } = request.params;
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u),
        });

        if(!surveyUser){
            throw new AppError("Survey User does not exists!")
        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);

    }
}


export { AnswerController }