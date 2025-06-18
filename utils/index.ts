import { CarProps, FilterProps } from "@/types";

export async function fetchCars( filters: FilterProps) {

    const { manufacturer, year, model, fuel, limit } = filters;
    
    const headers = {
        'X-RapidAPI-Key': '9798d72b04msh8bf6082c33da6fbp1564b6jsnc6fa69da43ec',
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }

    const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&fuel_type=${fuel}&limit=${limit}`, {
        headers: headers,
    });

    const result = await response.json();
    return result;
}


export function calculateRentalRate(city_mpg: any, year: number): number {
    const basePricePerDay = 50;
    const mileageFactor = 0.1;
    const ageFactor = 0.05;

    const currentYear = new Date().getFullYear();

    // Error in API, use static value 
    const validCityMpg = typeof city_mpg === 'number' && !isNaN(city_mpg) ? city_mpg : 18;

    const mileageRate = validCityMpg * mileageFactor;
    const ageRate = (currentYear - year) * ageFactor;

    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
    return Number(rentalRatePerDay.toFixed(2));
}


export const generateCarImageUrl = (car: any, angle?: string) => {
    const url = new URL("https://cdn.imagin.studio/getimage");
  
    const { make, year, model } = car;
  
    url.searchParams.append("customer", "hrjavascript-mastery");
    url.searchParams.append("zoomType", "fullscreen");
    url.searchParams.append("paintdescription", "radiant-green");
    url.searchParams.append("modelFamily", model.split(" ")[0]);
    url.searchParams.append("make", make);
    url.searchParams.append("modelYear", `${year}`);
    url.searchParams.append("angle", `${angle || "0"}`);
  
    return `${url}`;
  };

export const updateSearchParams = (type: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
  
    searchParams.set(type, value);
  
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  
    return newPathname;
  };