import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useProduct } from "../../../context/dataContext";
import InputField from "../../common/InputField";
import Validation from "../../../utils/validateProduct";

function AddForm({ closeForm }) {
  const validation = new Validation();

  const { addProduct } = useProduct();

  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState("");

  const handlePhotoChange = (event) => {
    const newPhotos = Array.from(event.target.files);
    if (photos.length + newPhotos.length > 4) {
      setError("Можно загрузить только 4 фото!");
      toast("You can upload no more than 4 photos!")
      return;
    }

    const newPhotosPreview = newPhotos.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setPhotos((prev) => [...prev, ...newPhotosPreview]);
    setError("");
  };

  const handlePhotoRemove = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const [product, setProduct] = useState({
    code: "",
    title: "",
    type: "",
    description: "",
    price: "",
    rating: "",
    quantity: "",
    sale: "",
  });

  const isFilled = useCallback(() => {
    return (
      Object.values(product).every((field) => field) &&
      photos.length > 0 &&
      photos.length <= 4
    );
  }, [product, photos]);

  const handleInputChange = useCallback((key, value) => {
    setProduct((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const sale =
      product.sale === "0" || product.sale.length === 0
        ? { status: false }
        : { status: true, value: +product.sale };

    const data = {
      code: product.code,
      title: product.title,
      type: product.type,
      description: product.description,
      price: product.price,
      rating: product.rating,
      quantity: product.quantity,
      sale,
    };

    const formData = new FormData();
    formData.append("content", JSON.stringify(data));
    photos.forEach(({ file }) => formData.append("images", file));

    try {
      validation.totalValidation(
        data.code,
        data.price,
        data.quantity
        // доделать валидацию на клиенте!!!!
      )
    } catch (e) {
      toast(e.message);
      return;
    }

    const res = await addProduct(formData, data);
    toast(res.message);
    if (res.status === 200) {
      closeForm();
    }
  };

  return (
    <form
      className="px-10 py-8 flex flex-col justify-self-center place-items-center border-[1px] rounded-3xl bg-white"
      onSubmit={(e) => handleSubmit(e)}
    >
      <InputField
        className="w-64 mb-3 px-4 py-1 border-[1px] rounded-full bg-gray-300 text-slate-700 focus:outline-none focus:border-sky-500 focus:border-[1px]"
        label={"Code"}
        placeholder="Enter product code"
        id="code_add"
        value={product.code}
        onChange={(value) => handleInputChange("code", value)}
      />

      <InputField
        className="w-64 mb-3 px-4 py-1 border-[1px] rounded-full bg-gray-300 text-slate-700 focus:outline-none focus:border-sky-500 focus:border-[1px]"
        label={"Title"}
        placeholder="Enter product title"
        id="title_add"
        value={product.title}
        onChange={(value) => handleInputChange("title", value)}
      />

      <InputField
        className="w-64 mb-3 px-4 py-1 border-[1px] rounded-full bg-gray-300 text-slate-700 focus:outline-none focus:border-sky-500 focus:border-[1px]"
        label={"Type"}
        placeholder="Enter product type"
        id="type_add"
        value={product.type}
        onChange={(value) => handleInputChange("type", value)}
      />

      <InputField
        className="w-64 mb-3 px-4 py-1 border-[1px] rounded-full bg-gray-300 text-slate-700 focus:outline-none focus:border-sky-500 focus:border-[1px]"
        label={"Description"}
        placeholder="Enter product description"
        id="description_add"
        value={product.description}
        onChange={(value) => handleInputChange("description", value)}
      />

      <InputField
        className="w-64 mb-3 px-4 py-1 border-[1px] rounded-full bg-gray-300 text-slate-700 focus:outline-none focus:border-sky-500 focus:border-[1px]"
        label={"Price"}
        placeholder="Enter product price"
        id="price_add"
        value={product.price}
        onChange={(value) => handleInputChange("price", value)}
      />

      <InputField
        className="w-64 mb-3 px-4 py-1 border-[1px] rounded-full bg-gray-300 text-slate-700 focus:outline-none focus:border-sky-500 focus:border-[1px]"
        label={"Rating"}
        placeholder="Enter product rating"
        id="rating_add"
        value={product.rating}
        onChange={(value) => handleInputChange("rating", value)}
      />

      <InputField
        className="w-64 mb-3 px-4 py-1 border-[1px] rounded-full bg-gray-300 text-slate-700 focus:outline-none focus:border-sky-500 focus:border-[1px]"
        label={"Quantity"}
        placeholder="Enter product quantity"
        id="quantity_add"
        value={product.quantity}
        onChange={(value) => handleInputChange("quantity", value)}
      />

      <InputField
        className="w-64 mb-3 px-4 py-1 border-[1px] rounded-full bg-gray-300 text-slate-700 focus:outline-none focus:border-sky-500 focus:border-[1px]"
        label={"Sale"}
        placeholder="Enter product sale"
        id="sale_add"
        value={product.sale}
        onChange={(value) => handleInputChange("sale", value)}
      />

      <div>
        <label
          htmlFor="photo_input_field"
          className={`rounded-full py-1 w-64 mx-auto block mt-4 text-center text-slate-200 bg-sky-700 ${photos.length >= 4 ? 'opacity-25' : 'cursor-pointer hover:bg-sky-800'}`}
        >
          Добавить фото
        </label>
        <input
          type="file"
          id="photo_input_field"
          accept="image/*"
          multiple
          onChange={handlePhotoChange}
          disabled={photos.length >= 4}
          className="invisible pointer-events-none"
        />
      </div>

      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", height: "70px" }}>
        {photos.map((photo, index) => (
          <div key={index} style={{ position: "relative" }}>
            <img
              src={photo.preview}
              alt={`Photo ${index + 1}`}
              className="w-[60px] h-[60px] object-cover rounded-xl"
            />
            <button
              type="button"
              onClick={() => handlePhotoRemove(index)}
              className="absolute top-[4px] right-[4px] bg-red-600 w-5 h-5 text-white rounded-full cursor-pointer text-xs pb-[2px]"
            >
              x
            </button>
          </div>
        ))}
      </div>

      {error && console.log(error)}

      <button
        type="submit"
        className={`block mx-auto mt-4 py-1 w-64 rounded-full bg-sky-700 text-slate-200 ${!isFilled() ? 'opacity-50  cursor-default' : 'font-bold hover:bg-sky-800 cursor-pointer'}`}
        disabled={!isFilled()}
      >Submit
      </button>
    </form>
  );
}

export default AddForm;
