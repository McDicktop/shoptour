import { useState } from "react";
import { ALL_PROMOS } from "../../constants";

function Promo({ setPromo, promo }) {
  const [input, setInput] = useState("");
  const [show, setShow] = useState(false);
  const promocode = '123';

  return (
    <div className="flex gap-6 justify-center items-center border rounded-xl shadow-md mt-4 py-4">
      <div className="relative">
        <input
          className="p-2 border rounded-xl placeholder-gray-500"
          placeholder="enter promocode here"
          id="promo"
          value={input}
          onChange={(e) => {
            setInput((prev) => e.target.value);
            setShow(false);
            setPromo(false);
          }}
        />
        <div
          className={`${show === false || input === '' ? 'hidden' : 'absolute w-5 h-5 text-black text-xs rounded-full top-[12px] right-[6px] pointer-events-none select-none'} ${promo ? 'bg-green-500 pl-[3px]' : 'bg-red-500 pl-[7px]'}`}
        >
          {promo ? 'ok' : 'x'}
        </div>
      </div>


      <button
        className={`${input === '' ? 'pointer-events-none opacity-50 select-none' : ''} bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full px-4 py-2`}
        onClick={() => {
          setPromo(promocode === input);
          setShow(true);
        }}
      >
        Apply
      </button>
    </div>
  );
}

export default Promo;