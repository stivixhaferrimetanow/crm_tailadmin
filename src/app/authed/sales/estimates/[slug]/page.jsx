import React from 'react'

const page = ({params}) => {
    return(
        <div>
            Page: {params.slug}
        </div>
    )
}

export default page