import React from 'react'



const dataStaff = [
    {
        title: 'BACKEND WEB TEAM', personals: [
            { id: 'back-1', name: 'Leonid', surname: 'Bondar' },
            { id: 'back-2', name: 'Boris', surname: 'Koval' },
            { id: 'back-3', name: 'Afanasy', surname: 'Marchenko' },
            { id: 'back-4', name: 'Artur', surname: 'Rudenko' },
            { id: 'back-5', name: 'Mikhail', surname: 'Petrenko' },
        ]
    },
    {
        title: 'QA TEAM', personals: [
            { id: 'qa-1', name: 'Vadim', surname: 'Oliynyk' },
            { id: 'qa-2', name: 'Bogdan', surname: 'Tkachenko' },
            { id: 'qa-3', name: 'Valentin', surname: 'Boyko' },
            { id: 'qa-4', name: 'Valery', surname: 'Smirnov' },
        ]
    },
    {
        title: 'MOBILE TEAM', personals: [
            { id: 'mob-1', name: 'Vasily', surname: 'Kuznetsov' },
            { id: 'mob-2', name: 'Maxim', surname: 'Volkov' },
            { id: 'mob-3', name: 'Vladislav', surname: 'Lebedev' },
            { id: 'mob-4', name: 'Vitaly', surname: 'Novikov' },
            { id: 'mob-5', name: 'Artur', surname: 'Semyonov' },
        ]
    },

]



export default function Staff() {
    return (
        <div className="Staff">
            {dataStaff.map((group, i) => {
                return (
                    <div key={group+i}>
                        <h5>{group.title}</h5>
                        <ul>
                          {  group.personals.map(worker=> {
                              return (
                                <li key={worker.name+" "+worker.surname}>{worker.name+" "+worker.surname}</li>
                              )
                          })}
                        </ul>
                    </div>
                )
            })}

        

        </div>
    )
}



  //     {
    //         title: 'FRONTEND WEB TEAM', personals: []
    //     },
    //     {
    //         title: 'DESIGN AND BA', personals: []
    //     },
    //     {
    //         title: 'PM TEAM', personals: []
    //     }