import React from "react";

export default function GiftCards() {
  return (
    <div className="w-full 2xl:w-11/12 3xl:w-80 4xl:w-70 5xl:w-60 h-full flex justify-start flex-wrap m-auto">
      <div className="w-full text-2xl font-bold text-center tracking-widest my-10">
        <h4>Gift Cards</h4>
      </div>
      <div className="w-full xl:w-[100%] flex justify-start flex-wrap mb-10 mx-5">
        <div className="mb-5">
          <div>
            <h5 className="font-bold">To get a Gift Card from Access Fashion:</h5>
          </div>
          <div>
            <p className="my-3 text-justify">
              Select the gift card and inform us by writing in the comments the
              email of the recipient . When the order is completed, we will send
              an email to your loved one with the code of the gift card to use
              it for online purchases and a copy of it to use it for an Access
              store purchase. The gift card is valid for 24months from the date
              of issue. It can only be used once, its value cannot be divided
              into more purchases.
            </p>
          </div>
        </div>
        <div className="mb-5">
          <div>
            <h5 className="font-bold">To use the Gift Card:</h5>
          </div>
          <div>
            <p className="my-3 text-justify">
              Select the products that you want and before checking out, enter
              the gift voucher code. Its value will be deducted from the total
              value of the order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
