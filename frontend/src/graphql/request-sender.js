export const sendRequest = async (requestBody, query, token) => {

    try {
        const res = await fetch('http://localhost:8000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token ? `Bearer ${token}` : '',
            },
            body: JSON.stringify(requestBody)
        });

        if (res.status !== 200 && res.status !== 201) {
            throw new Error('Error while trying to communicate with the API. Operation: ' + query);
        }

        let resData = await res.json();
        resData = resData.data[query];
        return resData;
    } catch (error) {
        console.log(error);
    }

}