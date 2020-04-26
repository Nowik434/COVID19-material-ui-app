import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, FormHelperText, NativeSelect } from '@material-ui/core';
import { countries } from '../../api/index';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
    root: {
        paddingTop: 40,
        paddingBottom: 10
    },
}));

const SelectCountry = ({ handleCountryChange }) => {
    const [countriesData, setCountriesData] = useState([]);

    const classes = useStyles();

    useEffect(() => {
        const fetchAPI = async () => {
            setCountriesData(await countries());
        }
        fetchAPI();
    }, [setCountriesData]);
    // console.log(countriesData);

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.root}
        >
            <FormControl>
                <NativeSelect defaultValue="aaa" onChange={(e) => handleCountryChange(e.target.value)}>
                    {countriesData.map((country) => <option key={country} value={country}>{country}</option>)}
                </NativeSelect>
                <FormHelperText id="my-helper-text">Wybierz kraj</FormHelperText>
            </FormControl>
        </Grid>
    );
}

export default SelectCountry;