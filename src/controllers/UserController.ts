import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UserRepository';
import * as yup from 'yup'; 
import { AppError } from '../errors/AppError';

class UserController{
	async create(request: Request, response: Response){
		//Desconstrução
		const {name, email} = request.body;

		const schema = yup.object().shape({
			name: yup.string().required("Name is Required"),
			email: yup.string().email("Email isn't valid").required("Email is Required"),
		});

		//Forma 1 de chamar o erro
		// if (!(await schema.isValid(request.body))) {
		// 	return response.status(400).json({error: "Validation Failed! "});
		// }

		//Forma 2 (Melhor) de chamar o erro
		try{
			await schema.validate(request.body, { abortEarly: false });

		}catch (err){
			throw new AppError(err);

		}

		//Repository para controle de DMLs (SELECT, INSERTS, ETC)
		const usersRepository = getCustomRepository(UsersRepository);

		//SELECT * FROM users WHERE EMAIL = "EMAIL"
		const userAlreadyExists = await usersRepository.findOne({
			email
		});
		
		//Condicional para impedir duplicação de usuarios de mesmo email
		if (userAlreadyExists){
			throw new AppError("User already exists!")
		}

		//INSERT INTO users(name, email) VALUES ("name", "email")
		const user = usersRepository.create({
			name, email
		});		


		//salvando no banco
		await usersRepository.save(user);

		return response.status(201).json(user);

	}
}

export { UserController };
