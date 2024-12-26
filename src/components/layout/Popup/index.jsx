import { useEffect, useState } from "react";
import popupStyles from "./custom-popup.module.css";
import PropTypes from "prop-types";


const CustomPopup = (props) => {
  const [show, setShow] = useState(false);

  const closeHandler = () => {
    setShow(false);
    props.onClose(false);
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  return (
    <div
      style={{
        visibility: show ? "visible" : "hidden",
        opacity: show ? "1" : "0",
        pointerEvents: show ? 'all' : 'none',
        zIndex: 20
      }}
      className={popupStyles.overlay}
    >
      <div className={popupStyles.popup}>
        <h2>{props.title}</h2>
        <span className={popupStyles.close} onClick={closeHandler}>
          &times;
        </span>
        <div className={popupStyles.content}>{props.children}</div>
      </div>
    </div>
  );
};

CustomPopup.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default CustomPopup;






























// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';



// const PopupComponent = () => (
//     <Popup trigger={<button>Add product</button>} position="top center">
//             <form action="" className='form'>
//             <label htmlFor="name">Product name</label>
//             <input name="name" type="text" />

//             <label htmlFor="code">Product code</label>
//             <input name="code" type="text" />

//             <label htmlFor="price">Product price</label>
//             <input name="price" type="text" />

//             <label htmlFor="quantity">Product quantity</label>
//             <input name="quantity" type="text" />

//             <button>Submit</button>
//         </form>
//     </Popup>
// )




// export default PopupComponent;