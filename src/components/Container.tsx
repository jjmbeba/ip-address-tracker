"use client";

import React, { useState } from "react";
import AddressForm from "./AddressForm";
import Map from "./Map";

type Props = {};

const Container = (props: Props) => {

    const [coordinates, setCoordinates] = useState({
        latitude:48.8566,
        longitude:2.3522
    })

  return (
    <>
      <div className="h-[300px] w-full bg-small">
        <h1 className="pt-[30px] font-medium text-[26px] md:text-[32px] text-white text-center">
          IP Address Tracker
        </h1>
        <AddressForm setCoordinates={setCoordinates}/>
      </div>
      <Map coordinates={coordinates}/>
    </>
  );
};

export default Container;
