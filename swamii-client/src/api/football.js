const getFootballGamesByWeek = async(year, week) => {
    const url = `https://api.collegefootballdata.com/games?year=${year}&week=${week}&seasonType=regular&home=Alabama`
    const responce = await fetch(url, {
        mode: 'no-cors',
        headers: {
            "accept": "application/json",
            "Authorization": "Bearer vQvF/YyT0brXEi7igtFTBeOYvlQp8K3GpiV46IDCsDrelVWFm5P3L7DNgZpkC02K",
                    }
    })
    const JSON = await responce.json();
    console.log(JSON)
}

getFootballGamesByWeek(2021, 14)