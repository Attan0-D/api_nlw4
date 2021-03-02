
//Esta classe Aprimora a exibição de possiveis erros para ser mostrados ao usuario
export class AppError{
   public readonly message: string;
   public readonly statusCode: number;

   constructor(message: string, statusCode = 400) {
       this.message = message;
       this.statusCode = statusCode;
   }


}