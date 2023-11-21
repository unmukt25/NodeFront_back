import React, { Component } from 'react'
import CheckUserSession from './CheckUserSession';

export default class ListData
  extends Component {
  constructor() {
    super()
    this.state = {
      jsonData: [],
      url: "https://dogapi.dog/api/v2/breeds",
      con_status: false
    }
  }

  componentDidMount() {
    this.setState({
      con_status: false
    })
    fetch("https://dogapi.dog/api/v2/breeds")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          jsonData: json,
          con_status: true,
        });
      });
  }

  render() {
    if (!CheckUserSession())
        return;

    return (
      <div className='container pt-3'>
        <div className='row'>
          {this.state.con_status && this.state.jsonData.data.map((item) => {
            return (
              <div className='col' style={{padding:"10px"}} key={item.id}>
                <div className="card" style={{ width: "18rem"}}>
                  <div className="card-body">
                    <h5 className="card-title">{item.attributes.name}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
                    <p className="card-text">{item.attributes.description}</p>
                    <a href="/" className="card-link">Card link</a>
                    <a href="/" className="card-link">Another link</a>
                  </div>
                </div>
              </div>
            )
          })}

        </div>
      </div>
    )
  }
}
