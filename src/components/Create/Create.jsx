"use client";
import Image from "next/image";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import RoomPreferencesSharpIcon from "@mui/icons-material/RoomPreferencesSharp";
import MonetizationOnSharpIcon from "@mui/icons-material/MonetizationOnSharp";
import AddLocationSharpIcon from "@mui/icons-material/AddLocationSharp";
import StarRateSharpIcon from "@mui/icons-material/StarRateSharp";
const Create = () => {
  const [formData, setFormData] = useState({
    propertyName: "Property Name",
    location: "Property location",
    price: "Price per night",
    description: "Description About This Place",
    roomsAvailable: "Available  rooms",
    guests: "Available Guest",
    bedrooms: "Available bedrooms",
    beds: "Available bed",
    rating: "Rating Achieved",
    image: "https://placehold.co/600x400",
  });
  const [images, setImages] = useState([
    { src: "https://placehold.co/600x400", alt: "Main Room", span: true },
    { src: "https://placehold.co/600x400", alt: "Room 1" },
    { src: "https://placehold.co/600x400", alt: "Room 2" },
    { src: "https://placehold.co/600x400", alt: "Room 3" },
    { src: "https://placehold.co/600x400", alt: "Room 4" },
  ]);
  const [editing, setEditing] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [imageEditing, setImageEditing] = useState({});

  const handleImageEdit = (index) =>
    setImageEditing({ ...imageEditing, [index]: true });

  const handleImageSave = (index) =>
    setImageEditing({ ...imageEditing, [index]: false });

  const handleEdit = (field) => setEditing({ ...editing, [field]: true });

  const handleSave = (field) => setEditing({ ...editing, [field]: false });

  const handleChange = (e, field) =>
    setFormData({ ...formData, [field]: e.target.value });

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedImages = [...images];
        updatedImages[index] = { ...updatedImages[index], src: reader.result };
        setImages(updatedImages);
      };
      reader.readAsDataURL(file);
    }
  };
  const handlePublish = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Property published successfully!");
      } else {
        setMessage("Failed to publish the property.");
      }
    } catch (error) {
      console.error("Error publishing property:", error);
      setMessage("An error occurred while publishing the property.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 relative">
      <button
        onClick={handlePublish}
        disabled={loading}
        className={`px-4 py-2 bg-primary text-white rounded-lg hover:brightness-90 absolute top-4 right-4 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Publishing..." : "Publish"}
      </button>

      {message && (
        <p className="text-center font-semibold text-green-500 mt-4">
          {message}
        </p>
      )}
      {/* Editable Property Name */}
      <div className="mb-6">
        <div className="flex items-center">
          {editing.propertyName ? (
            <div className="flex items-center">
              <input
                type="text"
                placeholder="property Name"
                onChange={(e) => handleChange(e, "propertyName")}
                className="border px-2 py-1 rounded-lg"
              />
              <button
                onClick={() => handleSave("propertyName")}
                className="ml-2 px-2 py-1 bg-green-500 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <h1 className="text-3xl font-bold mb-2 text-zinc-500">
                {formData.propertyName}
              </h1>
              <EditIcon
                className=" ml-2 text-gray-400 cursor-pointer"
                onClick={() => handleEdit("propertyName")}
              />
            </div>
          )}
        </div>

        <div className="flex items-center text-gray-600">
          {editing.location ? (
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Property Location"
                onChange={(e) => handleChange(e, "location")}
                className="border px-2 py-1 rounded-lg"
              />
              <button
                onClick={() => handleSave("location")}
                className="ml-2 px-2 py-1 bg-green-500 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <span className=" text-gray-600">{formData.location}</span>
              <EditIcon
                className="text-lg ml-2 text-gray-400 cursor-pointer"
                onClick={() => handleEdit("location")}
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 grid-rows-2 gap-4 mb-16 h-[500px]">
        {images.map((image, index) => (
          <div
            key={index}
            className={`${image.span ? "col-span-2 row-span-2" : ""} relative`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover rounded-lg"
              width={600}
              height={400}
            />
          </div>
        ))}
      </div>

      {/* Editable Image */}
      <div className="mb-4">
        {editing.image ? (
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Enter Image URL"
              value={formData.image}
              onChange={(e) => handleChange(e, "image")}
              className="border px-2 py-1 rounded-lg "
            />
            <button
              onClick={() => handleSave("image")}
              className="ml-2 px-2 py-1 bg-green-500 hover:bg-green-400 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <Image
              src={formData.image}
              width={200}
              height={100}
              alt="Property"
              className="w-16 h-12 object-cover rounded-lg mr-2"
            />
            <span className="text-gray-500">Property Image</span>
            <EditIcon
              className="text-xl ml-2 text-gray-400 cursor-pointer hover:text-gray-500"
              onClick={() => handleEdit("image")}
            />
          </div>
        )}
      </div>

      {/* Editable Price */}

      <div className="mb-4">
        {editing.price ? (
          <div className="flex items-center">
            <input
              type="text"
              min="0"
              value={formData.price}
              placeholder="Price Per Night"
              onChange={(e) => handleChange(e, "price")}
              className="border px-2 py-1 rounded-lg "
            />
            <button
              onClick={() => handleSave("price")}
              className="ml-2 px-2 py-1 bg-green-500 hover:bg-green-400 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <MonetizationOnSharpIcon className="mr-2 text-gray-500" />
            <span className=" text-gray-500">{formData.price}</span>

            <EditIcon
              className="text-xl ml-2 text-gray-400 cursor-pointer hover:text-gray-500"
              onClick={() => handleEdit("price")}
            />
          </div>
        )}
      </div>

      {/* Editable Rooms Available */}

      <div className="mb-4">
        {editing.roomsAvailable ? (
          <div className="flex items-center">
            <input
              type="text"
              min="0"
              value={formData.roomsAvailable}
              onChange={(e) => handleChange(e, "roomsAvailable")}
              className="border px-2 py-1 rounded-lg "
              placeholder="Enter rooms available"
            />
            <button
              onClick={() => handleSave("roomsAvailable")}
              className="ml-2 px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <RoomPreferencesSharpIcon className="mr-2 text-gray-500" />
            <span className="text-gray-600">{formData.roomsAvailable}</span>
            <EditIcon
              className="text-lg ml-2 text-gray-400 cursor-pointer hover:text-gray-600"
              onClick={() => handleEdit("roomsAvailable")}
            />
          </div>
        )}
      </div>

      {/* Additional Information Section */}
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <div className="border-b pb-6 mb-6">
            <div className="grid grid-cols-1 gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                {editing.guests ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={formData.guests}
                      min="1"
                      onChange={(e) => handleChange(e, "guests")}
                      className="border px-2 py-1 rounded-lg"
                    />
                    <button
                      onClick={() => handleSave("guests")}
                      className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <i className="mr-2 fas fa-user text-gray-500"></i>
                    <span className="text-gray-600">{formData.guests}</span>
                    <EditIcon
                      className="text-lg text-gray-400 cursor-pointer hover:text-gray-600"
                      onClick={() => handleEdit("guests")}
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                {editing.bedrooms ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      min="1"
                      value={formData.bedrooms}
                      onChange={(e) => handleChange(e, "bedrooms")}
                      className="border px-2 py-1 rounded-lg "
                      placeholder="Bedrooms"
                    />
                    <button
                      onClick={() => handleSave("bedrooms")}
                      className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <i className="mr-2 fas fa-door-open text-gray-500"></i>
                    <span className="text-gray-600">{formData.bedrooms}</span>
                    <EditIcon
                      className="text-lg text-gray-400 cursor-pointer hover:text-gray-600"
                      onClick={() => handleEdit("bedrooms")}
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                {editing.beds ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      min="1"
                      value={formData.beds}
                      onChange={(e) => handleChange(e, "beds")}
                      className="border px-2 py-1 rounded-lg "
                      placeholder="Beds"
                    />
                    <button
                      onClick={() => handleSave("beds")}
                      className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <i className="mr-2 fas fa-bed text-gray-500"></i>
                    <span className="text-gray-600">{formData.beds}</span>
                    <EditIcon
                      className="text-lg text-gray-400 cursor-pointer hover:text-gray-600"
                      onClick={() => handleEdit("beds")}
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {editing.rating ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      min="1"
                      value={formData.rating}
                      onChange={(e) => handleChange(e, "rating")}
                      className="border px-2 py-1 rounded-lg "
                      placeholder="Rating"
                    />
                    <button
                      onClick={() => handleSave("rating")}
                      className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <StarRateSharpIcon className="mr-2  text-gray-500" />
                    <span className="text-gray-600">{formData.rating}</span>
                    <EditIcon
                      className="text-lg text-gray-400 cursor-pointer hover:text-gray-600"
                      onClick={() => handleEdit("rating")}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">About this place</h3>
            {editing.description ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  min="1"
                  value={formData.description}
                  onChange={(e) => handleChange(e, "description")}
                  className="border px-2 py-1 rounded-lg "
                  placeholder="Description About Place"
                />
                <button
                  onClick={() => handleSave("description")}
                  className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <AddLocationSharpIcon className="mr-2  text-gray-500" />
                <span className="text-gray-600">{formData.description}</span>
                <EditIcon
                  className="text-lg text-gray-400 cursor-pointer hover:text-gray-600"
                  onClick={() => handleEdit("description")}
                />
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">
              What this place offers
            </h3>
            <div className="grid grid-cols-2 gap-4" id="amenities">
              <div className="flex items-center gap-2 cursor-pointer">
                <i className="fa-solid fa-umbrella-beach"></i>
                <span>Beach access</span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <i className="fa-solid fa-person-swimming"></i>
                <span>Private pool</span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <i className="fa-solid fa-wifi"></i>
                <span>Free Wi-Fi</span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <i className="fa-solid fa-sink"></i>
                <span>Kitchen</span>
              </div>

              <div className="flex items-center gap-2 cursor-pointer">
                <i className="fa-solid fa-square-parking"></i>
                <span>Free Parking</span>
              </div>

              <div className="flex items-center gap-2 cursor-pointer">
                <i className="fa-solid fa-dumbbell"></i>
                <span>Fitness Center</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
