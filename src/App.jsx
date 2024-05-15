import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Chart from 'chart.js';

function App() {
  const [value, setValue] = useState(360000);
  const [loanpercent, setLoanpercent] = useState(50);
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedValues1, setSelectedValues1] = useState([]);
  const [averagesalry,setAveragesalry] = useState();
   const [totalCost, setTotalCost] = useState(100000);
  const topbranches = [
    { label: 'Computer Science' },
    { label: 'Information Technology' },
    { label: 'Mechanical Engeering' },
    { label: 'Electrical Engeneering' },
    { label: 'Aerospace Engineering'},
    { label: "Marine Engineering" },
  ];

 const topcurrency = [
    { label: 'AUD(Australia)' },
    { label: 'CAD(Canada)' },
    { label: 'Eur(Germany)' },
    { label: 'INR(India)' },
    { label: 'USD(United States)' },
    { label: "Marine Engineering" },
  ];



  const [rankings, setRankings] = useState([
    { title: '0-50'},
    { title: '51-100' },
    { title: '101-250' },
    { title: '251-500' },
    { title: '500+' },
  ]);
 const [topcountries, setTopCountries] = useState([
    { title: 'United States'},
    { title: 'Germany' },
    { title: 'Canada' },
    { title: 'Australia' },   
  ]);
const countryCostMap = {
     'United States': 89780,
    'Germany': 55000,
    'Canada': 78000,
    'Australia': 84800,
  };
const calculateAverageCost = () => {
    let totalSalary = 0;
    if (selectedValues.length === 0) {
        setAveragesalry(0); // No values selected, set average salary to 0
        return;
    } else if (selectedValues.length === 1) {
        const singleCountrySalary = countryCostMap[selectedValues[0]] || 0;
        setAveragesalry(singleCountrySalary * 80);
        console.log(averagesalry)
        return;
    }
    selectedValues.forEach((country) => {
        totalSalary += countryCostMap[country] || 0;
    });
    const avgSalary = totalSalary / selectedValues.length;
    setAveragesalry(avgSalary * 80); // Multiply by 80 as per your requirement
};

 const handleSelectionChange = (e, values) => {
    const selectedTitles = values.map((value) => value.title);
    setSelectedValues(selectedTitles);
    console.log(selectedTitles);
  };
 const handleSelectionChange1 = (event, values) => {
    const selectedTitles = values.map((value) => value.title);
    setSelectedValues1(selectedTitles);
    console.log(selectedTitles);
    

  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleloanchange = (event, newValue) => {
    setLoanpercent(newValue);
  };
  const handlenumber = (event) => {
     setLoanpercent(event.target.value);
  };

  const handlevalues=(e)=>{
    setValue(e.target.value);
  }

useEffect(() => {
    calculateAverageCost();
     renderPieChart();
  }, [selectedValues,value,averagesalry]);


   const renderPieChart = () => {
    const ctx = document.getElementById('pieChart');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Average Salary', 'Total Cost'],
        datasets: [{
          label: 'Amount',
          data: [averagesalry, value],
          backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex justify-center flex-col items-center pb-6 pt-4">
        <div className="h-auto w-[70rem] shadow-2xl shadow-gray  rounded-3xl flex items-center flex-col gap-[4rem] pt-[2rem] border-1 border-slate-200 p-4
         mt-[4rem]">
          <div className="flex items-center flex-col gap-2 font-semibold font-sans">
            <p className="text-3xl text-[#4E3C86]">Estimate Your Future Earnings</p>
            <p className="text-slate-400 text-sm text-center w-[45rem] ">
             Know the value of your desired STEM Masters course—assess its real return on investment and compare across countries. Considering a different course? Connect with an expert to explore its ROI.
            </p>
          </div>
          <div className="flex justify-around w-full">
            <div>
              <div className="w-[25rem] flex justify-between">
                <p className="text-[#535353]">Loan Amount(%)</p>
                <div>
                  <input
                    type="number"
                    name="loanpercent"
                    value={loanpercent}
                    onChange={handlenumber}
                    className="w-12 h-8 shadow-md outline-none border-b border-black"
                  />
                  %
                </div>
              </div>
              <Box sx={{ width: 400 }}>
                <Slider
                  value={loanpercent}
                  onChange={handleloanchange}
                  min={0}
                  max={100}
                  step={1}
                  valueLabelDisplay="auto"
                  aria-label="Custom"
                  sx={{
                    color: '#E34731',
                    '& .MuiSlider-thumb': {
                      '&:hover, &.Mui-focusVisible': {
                        boxShadow: '0px 0px 0px 8px rgba(255, 0, 0, 0.16)',
                      },
                    },
                   '&:focus-within': {
                        borderColor: 'red'
                      }
                  }}
                />
              </Box>
              {/* Second slider */}
              <div className="w-[25rem] flex justify-between">
                <p className="text-[#535353]">Annual Salary</p>
                <div>
                  &#x20B9;
                  <input
                    type="number"
                    name="amount"
                    value={value}
                    onChange={handlevalues}
                    className="w-32 h-8 shadow-md outline-none border-b border-black"
                  />
                </div>
              </div>
              <Box sx={{ width: 400 }}>
                <Slider
                  value={value}
                  onChange={handleChange}
                  min={100000}
                  max={4000000}
                  step={10000}
                  valueLabelDisplay="auto"
                  aria-label="Custom"
                  sx={{
                    color: '#E34731',
                    '& .MuiSlider-thumb': {
                      '&:hover, &.Mui-focusVisible': {
                        boxShadow: '0px 0px 0px 8px rgba(255, 0, 0, 0.16)',
                      },
                    },
                    '& .MuiSlider-track': {
                      backgroundColor: 'red',
                    },
                  }}
                />
              </Box>

               {/* here is the single input */}
               <Stack spacing={3} sx={{ width: 400 }}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={topbranches}
                  sx={{
                    width: 400,
                    '& .MuiAutocomplete-inputRoot': { height: '3rem' },
                     
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Target Branch"
                      InputProps={{
                        ...params.InputProps,
                        style: { borderColor: params.inputProps.value ? 'green' : '' },
                      }}
                    />
                  )}

                  
                />
                {/* target country input */}
                    <Autocomplete
                      multiple
                      limitTags={2}
                      id="multiple-limit-tags2" 
                      options={topcountries}
                      getOptionLabel={(option) => option.title}
                      onChange={handleSelectionChange}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField {...params} label="Target Country" placeholder="Favorites" InputProps={{
                          ...params.InputProps,
                          endAdornment: null,
                          style: { paddingRight: '0' }
                        }} />
                      )}
                      ChipProps={{
                        style: { backgroundColor: '#E34731', color: 'white' },
                        deleteIcon: <span style={{ color: 'white' }}>&times;</span>
                      }}
                      sx={{ width: '400px' }}
                    />
                     <Autocomplete
                        multiple
                        limitTags={2}
                        id="multiple-limit-tags1" 
                        options={rankings}
                        getOptionLabel={(option) => option.title}
                        onChange={handleSelectionChange1}
                          filterSelectedOptions
                        renderInput={(params) => (
                          <TextField {...params} label="College Ranking Range" placeholder="Favorites"  InputProps={{
                            ...params.InputProps,
                            endAdornment: null,
                            style: { paddingRight: '0' }
                          }} />
                        )}
                        ChipProps={{
                          style: { backgroundColor: '#E34731', color: 'white' },
                          deleteIcon: <span style={{ color: 'white' }}>&times;</span>
                        }}
                        sx={{ width: '400px' }}
                      />

                <Autocomplete
                  disablePortal
                  id="combo-box-demo2"
                  options={topcurrency}
                  sx={{
                    width: 400,
                    '& .MuiAutocomplete-inputRoot': { height: '3rem' },
                     
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Currency"
                      InputProps={{
                        ...params.InputProps,
                        style: { borderColor: params.inputProps.value ? 'green' : '' },
                      }}
                    />
                  )}
                />
              </Stack>
            </div>
            
                <div>
                   <canvas id="pieChart" className="w-32 h-32 border-2 border-black p-2"></canvas>

                      <div className="pt-5 text-center">
                          <p className='text-red-400 font-semibold text-xl'>Here is the graph to show Total Investment Vs Returns</p>
                      </div>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
