import React from "react";

export default function Delivery() {
  return (
    <div className="w-full 2xl:w-11/12 3xl:w-80 4xl:w-70 5xl:w-60 flex justify-start flex-wrap m-auto">
      <div className="w-full text-2xl font-bold text-center tracking-widest my-10">
        <h4>Delivery Conditions</h4>
      </div>
      <div className="w-full xl:w-[100%] flex justify-start flex-wrap mb-10 mx-5">
        <h5 className="font-bold">1. Delivery time</h5>
        <p className="my-5 text-justify px-3">
          All orders are shipped from USA. The delivery time is 1-3 working
          days, unless otherwise stated on the respective product page or at
          checkout. Working days are Monday to Friday, excluding public holidays
          in Germany. If the order contains a personalized item, the delivery
          time will be extended to up to 5-9 working days.
        </p>
      </div>
      <div className="w-full xl:w-[100%] flex justify-start flex-wrap mb-10 mx-5">
        <h5 className="font-bold">2. Delivery costs</h5>
        <p className="my-5 text-justify px-3">
          We offer free standard shipping for orders over €50. For orders under
          this amount we charge €4.95 per order. We offer express shipping to
          most countries we can deliver to (excluding Switzerland, Romania,
          Croatia and Norway) for a fee of €9.95. Orders placed before 2pm on
          working days Monday to Friday can be delivered the next working day
          (Saturdays not included). For logistical reasons, orders placed after
          2pm on Friday will not be delivered until the following Monday. In
          exceptional cases, express delivery may be delayed.
        </p>
      </div>
      <div className="w-full xl:w-[100%] flex justify-start flex-wrap mb-10 mx-5">
        <h5 className="font-bold">3. Delivery restrictions</h5>
        <p className="my-5 text-justify px-3">
          We currently only offer shipping to the following countries: Belgium,
          Bulgaria, Denmark (except Greenland, Faroe Islands), Germany (except
          Helgoland, Büsingen am Hochrhein), Estonia, Finland (except Åland),
          France (except overseas territories/DOM, French Guiana and Monaco),
          Greece (except Athos), Ireland, Italy (except San Marino, Livigno,
          Campione d'Italia), Croatia, Latvia, Lithuania, Luxembourg,
          Netherlands (except ABC Islands), Norway (except Svalbard -
          Spitsbergen), Austria, Poland, Portugal (except Azores and Madeira),
          Romania, Slovakia, Slovenia, Spain (except Canary Islands, Ceuta and
          Melilla), Sweden, Switzerland, Czech Republic and Hungary.
        </p>
        <p className="my-5 text-justify px-3">
          f you wish to place an order to an EU member state that is not listed
          above or is listed as an exception among the eligible countries, you
          are free to place an order to do so. However, you will then be
          responsible for coordinating delivery to your desired address. We will
          prepare the goods for collection by you or the shipping service
          provider you have commissioned within 5 working days of placing the
          order and successful payment. Collection from our warehouse is only
          possible within a period of 20 days from ordering and successful
          payment.
        </p>
        <p className="my-5 text-justify px-3">
            Please contact our customer service ( Customer Service ) to coordinate your pickup address.
        </p>
      </div>
    </div>
  );
}
