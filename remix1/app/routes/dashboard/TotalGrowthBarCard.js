import PropTypes from "prop-types";
import { useState } from "react";

// project imports
import SkeletonTotalGrowthBarChart from "../../ui-component/cards/Skeleton/TotalGrowthBarChart";
import MainCard from "../../ui-component/cards/MainCard";
import { gridSpacing } from "../../store/constant";

// material-ui
import { Grid, MenuItem, TextField, Typography } from "@mui/material";
import TotalGrowthBarChart from "./TotalGrowthBarChart.client";

const status = [
  {
    value: "today",
    label: "Today",
  },
  {
    value: "month",
    label: "This Month",
  },
  {
    value: "year",
    label: "This Year",
  },
];

const TotalGrowthBarCard = ({ isLoading }) => {
  const [value, setValue] = useState("today");

  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="subtitle2">Total Growth</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h3">$2,324.00</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <TextField
                    id="standard-select-currency"
                    select
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  >
                    {status.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TotalGrowthBarChart isLoading={isLoading} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

TotalGrowthBarCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default TotalGrowthBarCard;
