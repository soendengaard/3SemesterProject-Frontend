import React, { Component } from 'react';
import Carousel from 'react-elastic-carousel';

class App extends Components {
    state = {
        items: [
            {id: 1, url: "item #1"},
            {id: 2, title: "item #2"},
            {id: 3, title: "item #3"},
            {id: 4, title: "item #4"},
            {id: 5, title: "item #5"},
            {id: 6, title: "item #6"},
            {id: 7, title: "item #7"},
            {id: 8, title: "item #8"},
            {id: 9, title: "item #9"},
            {id: 10, title: "item #10"},

        ]

        
    }


render () {
    const { items } = this.state;
    return (
        <Carousel>
            {items.map(item => <div key={item.id}>{item.title}</div>)}
        </Carousel>
    )
}
}