import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { getDayOfWeek } from "utils/getToday";
import { getIconWeather } from "apis/metaweather";

import humidity from 'assets/icons/humidity.svg'
import wind from 'assets/icons/wind.svg'
import noData from 'assets/icons/no-data.svg'

export const WeatherWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.bgPrimary};
  border-radius: 1rem;
  width: 100%;
  margin-bottom: 3rem;
  min-height: 33rem;

  @media screen and (min-width: ${(props) =>
    props.theme.responsive.tabletM}rem) {
      width: 60%;
  }
`;

const Item = styled.li`
  width: 100%;
  display: flex;

  &:last-child > div {
    border: 0;
  }
`;

const ItemContent = styled.div`
  border-bottom: 1px solid;
  border-color: ${(props) => props.theme.colors.borderGrey};
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 2rem;
  text-align: center;

  p {
    color: ${(props) => props.theme.colors.textPrimary};
  }
`

const Day = styled.p``

const TempWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Slash = styled.p``;

const TempMax = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
`

const TempMin = styled.p``

const CloudWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Image = styled.img`
  width: 3rem;
  margin-right: 1rem;
`

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  img {
    width: 2rem;
    margin-right: 0.5rem;
  }
`

const IconNodata = styled.img`
  width: 10rem;
`

const NoDataText = styled.p`
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.textPrimary};
`

const Weather = ({ data }) => {
  return (
    data && data.length > 0 ?
      <WeatherWrapper>
        {data.map(item => (
          <Item key={item.id}>
            <ItemContent>
              <Day>{getDayOfWeek(new Date(item.applicable_date))}</Day>
              <TempWrapper>
                <TempMax>{Math.round(item.min_temp) + "°"}</TempMax>
                <Slash>/</Slash>
                <TempMin>{Math.round(item.max_temp) + "°"}</TempMin>
              </TempWrapper>
              <CloudWrapper>
                <Image src={getIconWeather(item.weather_state_abbr)} alt={item.weather_state_name} />
                <p>{item.weather_state_name}</p>
              </CloudWrapper>
              <IconWrapper>
                <img src={humidity} alt="Humidity" />
                <p>{Math.round(item.humidity)}%</p>
              </IconWrapper>
              <IconWrapper>
                <img src={wind} alt="Wind" />
                <p>{item.wind_direction_compass} {Math.round(item.wind_speed)} mph</p>
              </IconWrapper>
            </ItemContent>
          </Item>
        ))}
      </WeatherWrapper>
      : <WeatherWrapper>
        <IconNodata src={noData} alt="No data" />
        <NoDataText>No data</NoDataText>
      </WeatherWrapper>
  )
};

Weather.propTypes = {
  data: PropTypes.array,
};

Weather.defaultProps = {
  data: [],
};

export default Weather;
