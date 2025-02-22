import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from './common/Footer'
import axios from 'axios'

function Home() {
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get(`${process.env.REACT_APP_API_URL}/api/blogs`).then((res) => {
            console.log(res.data)
            setBlogs(res.data)
            setLoading(false)
        }).catch(() => {
            console.log("Error fetching data")
            setLoading(false)
        })
    }, [])

    const sortedBlogs = blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
    const latestBlogs = sortedBlogs.slice(0, 3);

    const popularBlogs = blogs.sort((a, b) => b.likes - a.likes);
    const featuredBlogs = popularBlogs.slice(0, 3);

    return (

        <div className="min-h-screen bg-gray-100 text-gray-900">
            <header className="relative w-full h-[500px] bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/1600/900?category=blog')" }}>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center">
                    <h2 className="text-5xl font-bold">Welcome to My Blog</h2>
                    <p className="mt-4 text-lg max-w-2xl">Sharing ideas, insights, and inspiration from around the world.</p>
                </div>
            </header>

            <section className="max-w-4xl mx-auto py-20 px-4 text-center">
                <h3 className="text-3xl font-semibold text-orange-400 mb-4">About This Blog</h3>
                <p className="text-gray-700 text-lg">This blog is a space to explore and share thoughts on various topics, ranging from technology to lifestyle. Join the conversation and be inspired!</p>
            </section>

            <section className="max-w-6xl mx-auto py-20 px-4 flex flex-col md:flex-row items-center">
                <img src="https://picsum.photos/1200/600?random=1" alt="Blogging" className="rounded-lg shadow-lg w-full md:w-1/2" />
                <div className="md:ml-8 mt-6 md:mt-0 text-center md:text-left">
                    <h3 className="text-3xl font-semibold text-orange-400 mb-4">Why Blogging Matters?</h3>
                    <p className="text-gray-700 text-lg">Blogging allows you to share your voice, connect with like-minded individuals, and establish a personal or professional brand. Start your journey today!</p>
                </div>
            </section>

            <section className="max-w-6xl mx-auto py-20 px-4 text-center">
                <h3 className="text-3xl font-semibold text-orange-400 mb-4">Latest Posts</h3>
                <div className="grid md:grid-cols-3 gap-6">
                    {
                        loading ?
                            [1, 2, 3].map((index) => (
                                <div key={index} className="animate-pulse bg-gray-300 h-[200px] rounded-lg"></div>
                            )) :
                            latestBlogs.map((blog) => (
                                <div key={blog._id} className="bg-white text-gray-900 p-6 shadow-md rounded-lg">
                                    <h4 className="text-xl font-bold mb-2">{blog.newTitle}</h4>
                                    <p className="text-gray-700 mb-4">{blog.newContent.substring(0, 100)}...</p>
                                    <button
                                        onClick={() => navigate("/blogs")}
                                        className="bg-orange-400 hover:bg-orange-600 text-white p-3 rounded-lg"
                                    >
                                        Read More
                                    </button>
                                </div>
                            ))
                    }
                </div>
            </section>

            <section className="max-w-6xl mx-auto py-20 px-4 text-center">
                <h3 className="text-3xl font-semibold text-orange-400 mb-4">Popular Tags</h3>
                <div className="flex flex-wrap justify-center gap-4">
                    {
                        loading ?
                            [1, 2, 3, 4, 5].map((index) => (
                                <div key={index} className="bg-gray-300 animate-pulse py-2 px-6 rounded-lg w-24 h-8"></div>
                            )) :
                            popularBlogs.slice(0, 5).map((blog, index) => (
                                <button
                                    key={index}
                                    className="bg-orange-400 hover:bg-orange-600 text-white py-2 px-4 rounded-lg"
                                    onClick={() => navigate("/blogs")}
                                >
                                    {blog.newTitle}
                                </button>
                            ))
                    }
                </div>
            </section>

            <section className="bg-orange-400 py-20 text-center text-white">
                <h3 className="text-3xl font-semibold mb-6">Featured Content</h3>
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-4">
                    {
                        loading ?
                            [1, 2, 3].map((index) => (
                                <div key={index} className="animate-pulse bg-gray-300 h-[200px] rounded-lg"></div>
                            )) :
                            featuredBlogs.map((blog) => (
                                <div key={blog._id} className="bg-white text-gray-900 p-6 shadow-md rounded-lg">
                                    <h4 className="text-xl font-bold mb-2">{blog.newTitle}</h4>
                                    <p className="text-gray-700">{blog.newContent.substring(0, 100)}...</p>
                                </div>
                            ))
                    }
                </div>
            </section>

            <section className="max-w-4xl mx-auto py-20 px-4 text-center">
                <h3 className="text-3xl font-semibold text-orange-400 mb-4">Stay Updated</h3>
                <p className="text-gray-700 mb-6">Explore more content and get inspired by reading our latest posts!</p>
                <button
                    onClick={() => navigate("/blogs")}
                    className="bg-orange-400 hover:bg-orange-600 text-white p-3 rounded-lg"
                >
                    Go to Blog
                </button>
            </section>

            <Footer />

        </div>
    )
}

export default Home


