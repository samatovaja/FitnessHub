
console.log({env: process.env})
export const exerciseOptions =  { 
    method: 'GET',
    headers: {
    'X-RapidAPI-Key': '1032a8d42bmsh408cd363571546fp1e5b70jsn56323b9fea18',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  }
}

export const fetchData = async (url, options) => {
    try {
        const response = await fetch(url, options);
        return response;
    } catch (error) {
        console.error('Error in fetchData:', error);
        throw error;
    }
};
