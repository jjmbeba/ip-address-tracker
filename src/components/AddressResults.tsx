import React from 'react'
import ResultStat from './ResultStat'

type Props = {
  data:{
    ip: string;
    location: {
      country: string;
      region: string;
      timezone: string;
    };
    domains: string[];
    as: {
      asn: number;
      name: string;
      route: string;
      domain: string;
      type: string;
    };
    isp: string;
  } | undefined
}

const AddressResults = ({data}: Props) => {
  return (
    <div className='absolute z-10 md:left-1/2 md:translate-x-[-50%] mt-[24px] md:mt-[48px] w-[325px] lg:w-[1110px] h-[294px] md:h-[161px] bg-white rounded-[15px] flex flex-col md:flex-row items-center justify-center gap-[24px]'>
        <ResultStat statTitle='ip address' statResult={data ? `${data?.ip}` : '192.212.174.101'} border/>
        <ResultStat statTitle='location' statResult={data ? `${data?.location.region} ${data?.location.country}` : 'Brooklyn, NY 10001'} border/>
        <ResultStat statTitle='timezone' statResult={data ? `${data?.location.timezone}` : 'UTC -05:00'} border/>
        <ResultStat statTitle='isp' statResult={data ? `${data?.isp}` : 'SpaceX Starlink'}/>
    </div>
  )
}

export default AddressResults