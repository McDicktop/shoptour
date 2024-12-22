import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useProduct } from "../../../context/dataContext";
import InputField from "../../common/InputField";
import Validation from "../../../utils/validateProduct";
import "./styles.css";

function AddForm({ closeForm }) {
  const validation = new Validation();

  const { addProduct } = useProduct();

  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState("");

  const handlePhotoChange = (event) => {
    const newPhotos = Array.from(event.target.files);
    if (photos.length + newPhotos.length > 4) {
      setError("Можно загрузить только 4 фото!");
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
    <form className="form" onSubmit={(e) => handleSubmit(e)}>
      <InputField
        label={"Code"}
        placeholder="Enter product code"
        id="code_add"
        value={product.code}
        onChange={(value) => handleInputChange("code", value)}
      />

      <InputField
        label={"Title"}
        placeholder="Enter product title"
        id="title_add"
        value={product.title}
        onChange={(value) => handleInputChange("title", value)}
      />

      <InputField
        label={"Type"}
        placeholder="Enter product type"
        id="type_add"
        value={product.type}
        onChange={(value) => handleInputChange("type", value)}
      />

      <InputField
        label={"Description"}
        placeholder="Enter product description"
        id="description_add"
        value={product.description}
        onChange={(value) => handleInputChange("description", value)}
      />

      <InputField
        label={"Price"}
        placeholder="Enter product price"
        id="price_add"
        value={product.price}
        onChange={(value) => handleInputChange("price", value)}
      />

      <InputField
        label={"Rating"}
        placeholder="Enter product rating"
        id="rating_add"
        value={product.rating}
        onChange={(value) => handleInputChange("rating", value)}
      />

      <InputField
        label={"Quantity"}
        placeholder="Enter product quantity"
        id="quantity_add"
        value={product.quantity}
        onChange={(value) => handleInputChange("quantity", value)}
      />

      <InputField
        label={"Sale"}
        placeholder="Enter product sale"
        id="sale_add"
        value={product.sale}
        onChange={(value) => handleInputChange("sale", value)}
      />

      <div>
        <label
          htmlFor="photo_input_field"
          style={{
            cursor: `${photos.length < 4 ? 'pointer' : 'default'}`,
            border: "1px solid black",
            borderRadius: "12px",
            padding: "0.5rem",
            margin: "0 auto",
            display: "block",
            width: "fit-content",
            opacity: `${photos.length < 4 ? '1' : '0.5'}`
          }}
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
          style={{
            visibility: "hidden",
            pointerEvents: "none"
          }}
        />

        {/* <span>{photos.length}</span> */}
      </div>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {photos.map((photo, index) => (
          <div key={index} style={{ position: "relative" }}>
            <img
              src={photo.preview}
              alt={`Photo ${index + 1}`}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            <button
              type="button"
              onClick={() => handlePhotoRemove(index)}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                backgroundColor: "red",
                color: "white",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
              }}
            >
              x
            </button>
          </div>
        ))}
      </div>

      {error && console.log(error)}

      <button type="submit" className={`submit_btn`} disabled={!isFilled()}>
        Submit
      </button>
    </form>
  );
}

export default AddForm;
