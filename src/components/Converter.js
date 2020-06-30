import React, { Component } from "react";
import "./style.css";

class Converter extends Component {
  state = {
    currencies: ["EUR", "USD", "CHF"],
    base: "EUR",
    amount: "",
    convertTo: "USD",
    result: ""
  };

  handleSelect = e => {
    this.setState(
      {
        [e.target.name]: e.target.value,
        result: null
      },
      this.calculate
    );
  };

  handleInput = e => {
    this.setState(
      {
        amount: e.target.value,
        result: null,
        date: null
      },
      this.calculate
    );
  };

  calculate = () => {
    const amount = this.state.amount;
    if (amount === isNaN) {
      return;
    } else {
      fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
        .then(res => res.json())
        .then(data => {
          const date = data.date;
          const result = (data.rates[this.state.convertTo] * amount).toFixed(4);
          this.setState({
            result,
            date
          });
        });
    }
  };

  handleSwap = e => {
    const base = this.state.base;
    const convertTo = this.state.convertTo;
    e.preventDefault();
    this.setState(
      {
        convertTo: base,
        base: convertTo,
        result: null
      },
      this.calculate
    );
  };

  render() {
    const { currencies, base, amount, convertTo, result, date } = this.state;
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="card card-body">
            <div class="header">
              <h1>Convert currencies in real time</h1>
            </div>
             
              <div className="row">
                <div className="col-lg-10">
                  <form className="form-inline mb-4">
                  <label>Amount</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={this.handleInput}
                      className="form-control form-control-lg mx-3"
                    />
                    <select
                      name="base"
                      value={base}
                      onChange={this.handleSelect}
                      className="form-control form-control-lg"
                    >
                      {currencies.map(currency => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </select>
                    <h1 onClick={this.handleSwap} className="swap">
                  &#x21cb;
                  </h1>
                    <select
                      name="convertTo"
                      value={convertTo}
                      onChange={this.handleSelect}
                      className="form-control form-control-lg">
                      {
                      currencies.map(currency => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))
                      }
                    </select>
                  </form>
                </div>
              </div>
              <h5>
                {amount} {base} =
              </h5>
              <h2>
                {amount === ""
                  ? "0"
                  : result === null
                  ? "Calculating..."
                  : result}{" "}
                {convertTo}
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Converter;
