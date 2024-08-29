"use client"
import React from 'react'
import Navbar from "@/components/Navbar";

const idea = () => {
    return (
        <div className="idea">
            <div className="box-border mx-auto w-[1100px] max-2xl:w-[1200px] max-xl:w-[920px] max-lg:w-[680px] max-md:w-[440px] max-sm:w-[340px]">
                <Navbar />
                <Docs />

            </div>
        </div>
    )
}

function Docs() {
    return (
        <div className='box-border mx-auto w-[1100px] max-2xl:w-[1200px] max-xl:w-[920px] max-lg:w-[680px] max-md:w-[440px] max-sm:w-[340px] mt-12 mb-24 max-w-3xl'>
            {/* <h1 className="heading-h1 text-4xl font-extrabold tracking-tight lg:text-5xl">building images effortlessly.</h1>

            <h2 className='heading-h2 pb-2 text-3xl font-medium tracking-tight first:mt-0 mt-10'>problem with traditionally building container images with docker files.
            </h2> */}

            <p className='heading-h2 pb-2 text-xl font-medium tracking-tight first:mt-0 mt-10'>updating soon...</p>











        </div>
    )
}

export default idea;

