// import PropTypes from "prop-types";

function AddIcon({ width = 24, height = 24, color = "#0d0d0d" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            color={color}
            fill="none"
        >
            <path
                d="M12 4V20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4 12H20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

// BookIcon.propTypes = {

// }

export default AddIcon;
