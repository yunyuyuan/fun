import React from 'react';
import {doMount} from "@/utils";
import route from "@/route";

const Home = (props)=>{
    return (
        <div className='home'>
            <a href={route.algorithm.sort}>sort</a>
        </div>
    )
}

doMount(<Home/>)
