"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CarProps } from "@/types";
import { calculateRentalRate, generateCarImageUrl } from "@/utils";
import { CustomButton, CardDetails } from "./";

interface CarCardProps {
    car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
    const {city_mpg, year, make, model, drive, transmission} = car;
    const [isOpen, setIsOpen] = useState(false);
    const carRent = calculateRentalRate(city_mpg, year);

    // const [imageUrl, setImageUrl] = useState<string | null>(null);
  
//     useEffect(() => {
//       fetchCarImageUrl(car).then((url) => {
//         console.log('Fetched image URL:', url);
//         if (url) {
//           console.log('Setting image URL for', car.make, car.model, ':', url);
//           setImageUrl(url);
//         } else {
//           console.log('No image URL returned for', car.make, car.model);
//         }
//       }).catch(error => {
//         console.error('Error fetching car image:', error);
//       });
//     }, [car]);

// console.log(imageUrl);

    return (
    <div className="car-card group">
        <div className="car-card__content">
            <h2 className="car-card__content-title">
                {make} {model}
            </h2>
        </div>
        <p className="flex mt-6 text-[32px] font-extrabold">
            <span className="self-start text-[14px] font-semibold">
                $
            </span>
            {carRent}
            <span className="self-end text-[14px] font-medium">
                /day
            </span>
        </p>

        <div className="relative w-full h-40 my-3 object-contain">
            {/* {!imageUrl && <div className="absolute inset-0 flex items-center justify-center bg-gray-100">Loading...</div>}
            {imageUrl && (
                <Image 
                    src={imageUrl}  
                    alt={`${car.make} ${car.model}`}
                    fill 
                    priority 
                    className="object-contain"
                    onError={(e) => {
                        console.error('Error loading image:', imageUrl);
                    }}
                />
            )} */}
            <Image src={generateCarImageUrl(car)} alt='car model' fill priority className='object-contain' />
        </div>

        <div className="relative flex w-full mt-2">
            <div className="flex group-hover:invisible w-full justify-between text-gray">
                <div className="flex flex-col justify-center items-center gap-2">
                    <Image src="/steering-wheel.svg" width={20} height={20} alt="steering wheel" />
                    <p className="text-[14px]">
                        {transmission === "a" ? "Automatic" : "Manual"}
                    </p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <Image src="/tire.svg" width={20} height={20} alt="tire" />
                    <p className="text-[14px]">
                        {drive.toUpperCase()}
                    </p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <Image src="/gas.svg" width={20} height={20} alt="gas" />
                    <p className="text-[14px]">
                        {!isNaN(city_mpg) ? city_mpg : 24} MPG
                    </p>
                </div>
            </div>
            <div className="car-card__btn-container">
                <CustomButton
                    title="View More"
                    containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
                    textStyles="text-white text-[14px] leading-[17.2px] font-bold"
                    rightIcon="/right-arrow.svg"
                    handleClick={() => setIsOpen(true)}
                />
            </div>
            <CardDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
        </div>
    </div>
    )
}

export default CarCard; 