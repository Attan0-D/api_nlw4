import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {
    //chamando configs do ormconfig
    const defaultOptions = await getConnectionOptions();

    return createConnection(
        //sobrescrevendo o objeto defaultOptions
        Object.assign(defaultOptions, {
        // se a variavelde ambiente (process.env) for igual ao "test" direcione-se para o database de testes, ao contário
        //vá para o database normal
         database:
           process.env.NODE_ENV ==='test' 
            ? "./src/database/database.test.sqlite" 
            : defaultOptions.database,
        })
    );
    
};