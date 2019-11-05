import React from 'react'

export default function Home({loginUser}) {
    return (
        <div>
            <h1> {loginUser.firstName} </h1>
        </div>
    )
}
