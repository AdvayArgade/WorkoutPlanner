// pages/home/Home.jsx

import React from 'react'
import "./home.css"

import Navbar from '../../Navbar/Navbar'
import Footer from '../../Footer/Footer'
import HomeComp from '../../homeComp/homeComp'

const Home = () => {
    return (
        <div className='home'>
            <Navbar />
            <div className="banner">
                <h1>Welcome to SWEAT PLAN</h1>
                <p>The one stop solution for your fitness journey</p>
            </div>
            <div className="mainContainer">
                <HomeComp
                    image="https://media.geeksforgeeks.org/wp-content/uploads/20240308220039/planner.png"
                    name="Entries"
                    description="Keep track of your daily progress"
                    view="/entries"
                />
                <HomeComp
                    image="https://media.geeksforgeeks.org/wp-content/uploads/20240308220039/routine.png"
                    name="Routines"
                    description="Add personalized routines"
                    view="/routines"
                />
                <HomeComp
                    image="https://media.geeksforgeeks.org/wp-content/uploads/20240308220038/meal.png"
                    name="Meals"
                    description="Add personalized meals"
                    view="/meals"
                />

            </div>
            <Footer />

        </div>
    )
}

export default Home
