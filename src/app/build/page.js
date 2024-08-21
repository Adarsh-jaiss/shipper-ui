"use client"
import React from 'react'
import { useState } from 'react'


export default function BuildImg() {
    return (
        <Build />
    )
}

function Build() {
    const [registryServer, setRegistryServer] = useState("");
    const [registryUser, setRegistryUser] = useState("");
    const [registryEmail, setRegistryEmail] = useState("");
    const [registryPassword, setRegistryPassword] = useState("");
    const [buildName, setBuildName] = useState("");
    const [sourceType, setSourceType] = useState("");
    const [buildRunDeletion, setBuildRunDeletion] = useState("");
    const [githubUrl, setGithubUrl] = useState("");
    const [buildStrategy, setBuildStrategy] = useState("");
    const [imageName, setImageName] = useState("");
    const [timeOut, setTimeOut] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(
            registryServer,
            registryUser,
            registryEmail,
            registryPassword,
            buildName,
            sourceType,
            buildRunDeletion,
            githubUrl,
            buildStrategy,
            imageName,
            timeOut
        );

        // API Logic here
        const userData = {
            registryServer,
            registryUser,
            registryEmail,
            registryPassword,
            buildName,
            sourceType,
            buildRunDeletion,
            githubUrl,
            buildStrategy,
            imageName,
            timeOut
        };

        try {
            console.log("Sending user data:", JSON.stringify(userData))
            const res = await fetch("http://localhost:8080/build", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (res.ok) {
                alert("Account created successfully");
            } else {
                const data = await res.json();
                throw new Error(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className=" min-h-screen flex items-center justify-center ">
            <div className=" rounded-2xl border border-slate-300 shadow-2xl pt-10 pb-10 pl-20 pr-20 ">
                <h2 className="text-center text-2xl font-bold mb-">Shipper</h2>
                <p className="text-center text-gray-600 mb-6">Build your own container image</p>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label htmlFor="RegistryServer" className=" block text-gray-700 font-bold mb-2">
                            Registry Server
                        </label>
                        <input
                            type="text"
                            id="RegistryServer"
                            name="RegistryServer"
                            value={registryServer}
                            onChange={(e) => setRegistryServer(e.target.value)}
                            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Registry Server"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="RegistryUser" className="block text-gray-700 font-bold mb-2">
                            Registry User
                        </label>
                        <input
                            type="text"
                            id="RegistryUser"
                            name="RegistryUser"
                            value={registryUser}
                            onChange={(e) => setRegistryUser(e.target.value)}
                            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Registry User"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="RegistryEmail" className="block text-gray-700 font-bold mb-2">
                            Registry Email
                        </label>
                        <input
                            type="email"
                            id="RegistryEmail"
                            name="RegistryEmail"
                            value={registryEmail}
                            onChange={(e) => setRegistryEmail(e.target.value)}
                            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Registry Email address"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="RegistryPassword" className="block text-gray-700 font-bold mb-2">
                            Registry Password
                        </label>
                        <input
                            type="password"
                            id="RegistryPassword"
                            name="RegistryPassword"
                            value={registryPassword}
                            onChange={(e) => setRegistryPassword(e.target.value)}
                            className="font-medium shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Registry Password"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="BuildName" className="block text-gray-700 font-bold mb-2">
                            Build Name
                        </label>
                        <input
                            type="text"
                            id="BuildName"
                            name="BuildName"
                            value={buildName}
                            onChange={(e) => setBuildName(e.target.value)}
                            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Build Name"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="SourceType" className="block text-gray-700 font-bold mb-2">
                            Source Type
                        </label>
                        <input
                            type="text"
                            id="SourceType"
                            name="SourceType"
                            value={sourceType}
                            onChange={(e) => setSourceType(e.target.value)}
                            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Source Type"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="BuildRunDeletion" className="block text-gray-700 font-bold mb-2">
                            Build Run Deletion
                        </label>
                        <input
                            type="text"
                            id="BuildRunDeletion"
                            name="BuildRunDeletion"
                            value={buildRunDeletion}
                            onChange={(e) => setBuildRunDeletion(e.target.value)}
                            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Build Run Deletion"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="GithubUrl" className="block text-gray-700 font-bold mb-2">
                            Github URL
                        </label>
                        <input
                            type="text"
                            id="GithubUrl"
                            name="GithubUrl"
                            value={githubUrl}
                            onChange={(e) => setGithubUrl(e.target.value)}
                            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Github URL"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="BuildStrategy" className="block text-gray-700 font-bold mb-2">
                            Build Strategy
                        </label>
                        <input
                            type="text"
                            id="BuildStrategy"
                            name="BuildStrategy"
                            value={buildStrategy}
                            onChange={(e) => setBuildStrategy(e.target.value)}
                            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Build Strategy"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="ImageName" className="block text-gray-700 font-bold mb-2">
                            Image Name
                        </label>
                        <input
                            type="text"
                            id="ImageName"
                            name="ImageName"
                            value={imageName}
                            onChange={(e) => setImageName(e.target.value)}
                            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Image Name"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="TimeOut" className="block text-gray-700 font-bold mb-2">
                            Time Out
                        </label>
                        <input
                            type="text"
                            id="TimeOut"
                            name="TimeOut"
                            value={timeOut}
                            onChange={(e) => setTimeOut(e.target.value)}
                            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Time Out"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between mt-2 col-span-2">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-950"
                        >
                            Create Conatiner Image
                        </button>
                    </div>
                </form>

                {/* <p className="text-center text-gray-600 mt-4">
                    Already have an account? <a href="./signin" className="text-blue-500 hover:text-blue-700">Sign in</a>
                </p> */}
            </div>
        </div>
    );
}