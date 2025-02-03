import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faAt } from "@fortawesome/free-solid-svg-icons";

export default function Contact() {
  return (
    <div className="w-full 2xl:w-11/12 3xl:w-80 4xl:w-70 5xl:w-60 h-full flex justify-start flex-wrap m-auto">
      <div className="w-full text-2xl font-bold text-center tracking-widest my-10">
        <h4>Contact us</h4>
      </div>
      <div className="w-full xl:w-[100%] flex justify-start flex-wrap mb-10 mx-5">
        <p className="my-5">
          You can contact us via phone or email. We recommend trying email
          first. This is the quickest way to get answers to common queries, such
          as your order status, a copy of your invoice or even a return label.
        </p>
        <div className="my-5">
          <p>
            You can also contact us by phone. We are available Monday to Friday
            from 8:00 a.m. to 8:00 p.m. and Saturday from 8:00 a.m. to 6:00 p.m.
          </p>
          <span className="py-3 flex">
            <FontAwesomeIcon icon={faPhone} className="mr-3"/>
            801 +43 982-314-0958
          </span>
        </div>
        <div className="my-5">
          <p>
            Of course, you can also write us an email. Our team will process
            your request Monday to Friday from 8:00 a.m. to 8:00 p.m. and
            Saturday from 8:00 a.m. to 6:00 p.m. We endeavor to respond to email
            inquiries within 1 to 2 working days. However, it may take a little
            longer during peak periods.
          </p>
          <span className="py-3 flex">
            <FontAwesomeIcon icon={faAt} className="mr-3"/>service@male&femailfashion.com
          </span>
        </div>
      </div>
    </div>
  );
}
