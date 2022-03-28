// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchData } from '../../common/utils';

type Data = {
    name?: string;
    error?: string;
    result?: any; // TODO: to write types based on response received
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { axieId } = req.query;

    if (typeof axieId !== 'string') {
        res.status(400).json({ error: 'Invalid request' });
        return;
    }

    if (req.method === 'GET') {
        const { data } = await fetchData(
            `query GetAxieDetail($axieId: ID!) {
                        axie(axieId: $axieId) {
                            ...AxieDetail    
                            __typename  
                        }   
                    }
                    fragment AxieDetail on Axie {
                        id
                        image
                        class
                        chain
                        name
                        genes
                        owner  
                        birthDate  
                        bodyShape  
                        class  
                        sireId  
                        sireClass  
                        matronId  
                        parts {
                            id
                            name
                            class
                            type
                            specialGenes
                            __typename 
                        }
                    }
               
                    `,

            { axieId }
        );

        const result = data.axie;
        console.log(data.axie);
        res.status(200).json({ result });
        return;
    }

    res.status(200).json({ name: 'John Doe' });
}
