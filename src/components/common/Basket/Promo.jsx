import { useState } from "react";

function Promo({ promoValue, handlePromo }) {
  const [input, setInput] = useState("");
  const [show, setShow] = useState(false);

  return (
    <div className="flex gap-6 justify-center items-center border rounded-xl shadow-md mt-2 py-4">
      <div className="relative">
        <input
          className="p-2 border rounded-xl placeholder-gray-500"
          placeholder="enter promocode here"
          id="promo"
          value={input}
          onChange={(e) => {
            setInput((prev) => e.target.value);
            setShow(false);
            handlePromo(0);
          }}
        />
        <div
          className={`${show === false || input === '' ? 'hidden' : 'absolute w-5 h-5 text-black text-xs rounded-full top-[12px] right-[6px] pointer-events-none select-none'} ${promoValue !== 0 ? 'bg-green-500 pl-[3px]' : 'bg-red-500 pl-[7px]'}`}
        >
          {promoValue !== 0 ? 'ok' : 'x'}
        </div>
      </div>

      <button
        className={`${input === '' ? 'pointer-events-none opacity-50 select-none' : ''} bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full px-4 py-2`}
        onClick={() => {
          handlePromo(input);
          setShow(true);
        }}
      >
        Apply
      </button>
    </div>
  );
}

export default Promo;