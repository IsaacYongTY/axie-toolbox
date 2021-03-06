import axios from "axios";

export const fetchData = async (
    query: string,
    variables: { [key: string]: any }
) => {
    const { data } = await axios.post(
        'https://axieinfinity.com/graphql-server-v2/graphql',
        {
            query,
            variables,
        }
    );

    return data;
};

