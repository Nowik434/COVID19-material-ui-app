import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import GridWrapper from './components/GridWrapper/GridWrapper';
import Container from '@material-ui/core/Container';
import { fetchData } from './api/index';
import Chart from './components/Chart/Chart';
import SelectCountry from './components/SelectCountry/SelectCountry';

export const ApiContext = React.createContext({});

const useStyles = () => ({
  root: {
    backgroundColor: '#f5f5f5',
  },
});

class App extends Component {
  state = {
    data: {},
    country: '',
  }

  async componentDidMount() {
    const data = await fetchData();
    this.setState({
      data
    });
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);
    this.setState({
      data: data,
      country: country
    });
  }

  render() {
    const { classes } = this.props;
    const { data, country } = this.state;
    return (
      <ApiContext.Provider value={data}>
        <div className={classes.root}>
          <Container maxWidth="lg" color="primary">
            <GridWrapper color="primary" />
            <SelectCountry handleCountryChange={this.handleCountryChange} />
            <Chart data={data} country={country} />
          </Container>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default withStyles(useStyles)(App);
