import React from 'react'
import * as d3 from 'd3'

const Course = ({
    name,
}) => {

    //Create SVG element
    const svg = d3.selectAll("div")
        .append("svg")
        .attr("width", 100)
        .attr("height", 100)

    //Create group element
    const g = svg.append("g")
        .attr("transform", function (d, i) {
            return "translate(0,0)"
        })

    //Create and append rectangle element into group
    const rect = g.append("rect")
        .attr("width", 100)
        .attr("height", 100)
        .append("text")


    //Create and append text element into group
    g.append("text")
        .attr("x", 20)
        .attr("y", 40)
        .attr("fill", "white")
        .attr("font-size", "30px")
        .text(name)


    return (
        <div className="course">

        </div>
        //<h1>{name}</h1>
        //<svg width="100" height="75">
        //<rect x="0" y="0" width="200" height="200" />
        //</svg>
    )
}

export default Course
