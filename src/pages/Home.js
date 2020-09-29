import React, { Component } from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";

class Home extends Component {
    componentDidMount() {
        document.title = "Yeaay Ganti Title"
    }
  render() {
    return (
      <div>
        <Navbar />
        
        <div className="list">
        <Card type="list" />
        <Card type="list" />
        <Card type="list" />
        <Card type="list" />
        </div>
      </div>
    );
  }
}

export default Home;
