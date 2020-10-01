

 export function givePositionY   (someArray)   {
    someArray.map((departament, departamentIndex) => {
        return departament.workers.map(worker => {

            return worker.projects.reduce((acc, proj, i) => {
                if (worker.projects.length < 1) return

                if (i !== 0) {
                  
                    acc.forEach((v, i) => {
                     
                        if (v.positionY === proj.positionY) {
                            if (proj.positionX + proj.duration <= v.positionX || v.positionX + v.duration <= proj.positionX) {
                                // proj.positionY = 0

                            } else {
                                proj.positionY = v.positionY + 1

                            }
                        }
                    })


                }

                acc.push(proj)
                 const maxPos = acc.sort((a,b)=> b.positionY - a.positionY  )[0].positionY+1
                   worker.blockHeight = maxPos
                    // console.log(maxPos)
                return acc
            }, [])

        })
    })

    return someArray
}