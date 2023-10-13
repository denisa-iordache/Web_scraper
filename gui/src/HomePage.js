import { useEffect, useState, useRef } from "react";

function HomePage() {
    const [posts, setPosts] = useState([]);
    const site = useRef();
    const getPosts = (
    ) => {
        fetch(
            "http://localhost:8080/api/",
            {
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((data) => {
                setPosts(JSON.stringify(data, undefined, 3));
            });
    };

    const getPost = (title) => {
        fetch(
            `http://localhost:8080/api/${title}`
            )
            .then((res) => res.json())
            .then((data) => {
                setPosts(JSON.stringify(data, undefined, 3));
            });
    };

    const saveJson = () => {
        try {
            const blob = new Blob([posts], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = 'posts.json';
            link.href = url;
            link.click();
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <div className="flex flex-row fixed top-0 left-0 right-0 z-50 bg-orange-50 shadow-lg shadow-orange-100 p-3">
                <img
                    className="h-8 w-15 pl-1"
                    src="undraw_code_review_re_woeb.svg"
                    alt="Code"
                />
                <p className="pl-3 font-serif antialiased font-semibold text-orange-400">Web Scaper</p>
            </div>
            <div className="flex flex-col items-center m-20">
                <div className="flex flex-row justify-items-center gap-4 p-10">
                    <form className="w-96">
                        <input className="bg-white appearance-none border-2 border-orange-200 w-full rounded py-2 px-2 text-gray-700 focus:outline-orange-400 focus:bg-white focus:border-orange-400" type="text" placeholder="https://wsa-test.vercel.app/" ref={site}></input>
                    </form>
                    <button
                        type="button"
                        className="text-gray-700 transition-colors duration-150 outline outline-orange-200 rounded-full focus:shadow-outline hover:bg-orange-50 px-2 hover:outline-orange-400 hover:text-orange-400"
                        data-te-ripple-init onClick={() => {
                            if (site.current.value == "https://wsa-test.vercel.app/") {
                                getPosts();
                            }
                            else if (site.current.value.includes("https://wsa-test.vercel.app/") && site.current.value.split("/")[3] != "") {
                                getPost(site.current.value.split("/")[3])
                            } else {
                                setPosts("Din pacate, nu s-au putut extrage date.")
                            }
                        }}>
                        Search
                    </button>
                    <button
                        type="button"
                        className="text-gray-700 transition-colors duration-150 outline outline-orange-200 rounded-full focus:shadow-outline hover:bg-orange-50 px-2 hover:outline-orange-400 hover:text-orange-400"
                        data-te-ripple-init onClick={saveJson}>
                        Download JSON
                    </button>
                </div>
                <div
                    className="w-1/2 block">
                    <h5
                        className="mb-5 text-xl font-medium leading-tight text-neutral-800 dark:text-dark" >
                        Results
                    </h5>
                    <div className="rounded-lg bg-white shadow-lg shadow-orange-100 dark:bg-orange-50 text-left">
                        <pre className="overflow-auto">{posts}</pre>
                    </div>
                </div>
            </div></>
    )
}

export default HomePage;