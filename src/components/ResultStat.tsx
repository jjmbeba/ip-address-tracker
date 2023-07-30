import React from "react";

type Props = {
    statTitle:string;
    statResult:string;
    border?:boolean;
};

const ResultStat = ({statTitle, statResult, border}: Props) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-[7px] md:gap-[13px] text-[#2C2C2C] border ${border ? 'border-transparent border-r-[rgb(0_0_0/0.15)] pr-8' : 'border-none'}`}>
      <h3 className="text-[10px] md:text-[12px] opacity-50 uppercase leading-[1.458px] md:leading-[1.75px]">{statTitle}</h3>
      <p className="text-[20px] md:text-[26px] leading-[24px] md:leading-[30px] tracking-[-0.179px] md:tracking-[-0.232px]">{statResult}</p>
    </div>
  );
};

export default ResultStat;
