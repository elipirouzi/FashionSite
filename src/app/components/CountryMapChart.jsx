import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { feature } from 'topojson-client';
import { scaleLinear } from 'd3-scale'; // برای ایجاد مقیاس رنگی

const CountryMapChart = ({ users }) => {
  const [geoData, setGeoData] = useState(null);
  const [countryCount, setCountryCount] = useState({});


// تعریف یک آرایه از رنگ‌های خاص
const colorPalette = ['#FFFD55', '#FF1E96', '#10CF9E', '#FFA800', '#33FFF7', '#DABAFF', '#33FFBD', '#91CEFF', '#FFA694', '#A133FF', '#FFBAE2'];

// تخصیص رنگ به کشورها بر اساس تعداد
const getCountryColor = (country) => {
  const count = countryCount[country];
  if (count) {
    // تخصیص یک رنگ از آرایه colorPalette
    const index = Object.keys(countryCount).indexOf(country) % colorPalette.length;
    return colorPalette[index];  // استفاده از رنگ از آرایه
  }
  return '#D3D3D3'; // رنگ پیش‌فرض برای کشورهای بدون مشتری
};

  useEffect(() => {
    // بارگذاری فایل JSON از CDN
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then((response) => response.json())
      .then((data) => {
        setGeoData(feature(data, data.objects.countries)); // پردازش داده‌های TopoJSON
      })
      .catch((error) => {
        console.error('Error loading the world map:', error);
      });

    // محاسبه تعداد مشتریان در هر کشور
    const countryDistribution = {};
    users.forEach((user) => {
      if (user.country) {
        countryDistribution[user.country] = (countryDistribution[user.country] || 0) + 1;
      }
    });
    setCountryCount(countryDistribution);
  }, [users]);

  if (!geoData) {
    return <div>Loading...</div>;
  }

  return (
    <ComposableMap>
      <ZoomableGroup>
        <Geographies geography={geoData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryName = geo.properties.name; // نام کشور را از داده‌های جغرافیایی استخراج کنید

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={getCountryColor(countryName)} // رنگ هر کشور
                  onClick={() => console.log(`Clicked on ${countryName}`)} // کلیک روی کشور
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: '#ff5722', transition: 'all 0.3s' },
                    pressed: { fill: '#e64a19' },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default CountryMapChart;
