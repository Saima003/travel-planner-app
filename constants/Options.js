export const SelectTravellersList = [
    {
        id:1,
        title:"Just Me",
        desc: "A sole traveles in exploration",
        icon:"😎",
        people:"1"
    },
    {
        id:2,
        title:"A Couple",
        desc: "Two traveles in tandem",
        icon:"🧑‍🤝‍🧑",
        people:"2 People"
    },
    {
        id:3,
        title:"Family",
        desc: "A group of fun loving adventure",
        icon:'🏠',
        people:"3 to 5 People"
    },
    {
        id:4,
        title:"Friends",
        desc: "A bunch of thrill-seekes",
        icon:'🛩️',
        people:"5 to 10 People"
    }
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:"Cheap",
        desc:"Stay Conscious of Costs",
        icon:"✌️"
    },
    {
        id:2,
        title:"Moderate",
        desc:"Keep Cost on the Average Side",
        icon: "😉",
    },
    {
        id:3,
        title:"Luxury",
        desc:"Don't Worry About Cost",
        icon:"💰"
    }
]

export const AI_PROMPT="Generate travel plan for location: {location}, for {totalDays} day and {totalNights} night for {travellers} with a {budget} budget with a flight details. approx estimations of flight price with booking url of any website like bookmyticket etc. Hotels options list with hotel name, hotel address, price and hotel image urls. geo coordinates, rating, descriptions and places to visit nearby with place name, place details , place image url, geo coordinates, ticket pricing, time to travel each of the location for {totalDays} day and {totalNights} night with each day plan with best time to visit in JSON format"