"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import AddressResults from "./AddressResults";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inputSchema } from "../../types";
import Image from "next/image";
import warning from "../../public/warning.svg";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { SyncLoader } from "react-spinners";

type Props = {
  setCoordinates: React.Dispatch<
    React.SetStateAction<{
      latitude: number;
      longitude: number;
    }>
  >;
};

type Inputs = {
  ipAddress: string;
};

const AddressForm = ({ setCoordinates }: Props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(inputSchema) });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (ipAddress: Inputs) => {
      try {
        setLoading(isLoading);

        const res = await axios
          .post("/api/fetchDetails", ipAddress)
          .then((res) => res.data);
        setData(res);
        setCoordinates({
          latitude: res.location.lat,
          longitude: res.location.lng,
        });
      } catch (error) {
        throw new Error("Something went wrong");
      } finally {
        setLoading(false);
      }
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (ipAddress) => {
    mutate(ipAddress);
  };

  return (
    <div className="relative px-[25px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-[29px] flex items-center justify-center md:max-w-[555px] md:mx-auto">
          <input
            type="text"
            className={`h-[58px] flex-1 rounded-l-[15px] px-[24px] ${loading && 'cursor-not-allowed'}`}
            placeholder="192.212.174.101"
            {...register("ipAddress")}
            disabled={loading}
          />
          {!loading ? (
            <input
              type="submit"
              value=">"
              className="h-[58px] w-[58px] bg-black text-white rounded-r-[15px] font-bold cursor-pointer"
            />
          ) : (
            <div className="h-[58px] w-[58px] bg-black rounded-r-[15px] cursor-not-allowed flex items-center justify-center">
              <SyncLoader color="white" size={6} className="" />
            </div>
          )}
        </div>
        {errors.ipAddress?.message && (
          <p className="text-center mt-[10px] text-red-800 flex items-center justify-center gap-3">
            <Image src={warning} alt="warning-icon" />
            {errors.ipAddress.message}
          </p>
        )}
      </form>
      <AddressResults data={data} />
    </div>
  );
};
export default AddressForm;
