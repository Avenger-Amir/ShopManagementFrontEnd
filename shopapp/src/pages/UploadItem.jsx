import {getSessionId} from "../util/LocalStorageUtil.js";

export default function UploadItem({shopId, onItemAdded, itemNames}) {

    const sessionId = getSessionId();
    if (!sessionId) {
        alert("Only shop owners can upload items. Please log in.");
        return;
    }
    const validateName = (name) => {
        if (itemNames?.includes(name)) {
            alert("Item name already exists. Please choose a different name.");
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData();

        const imageFile = form.image.files[0];
        const name = form.name.value;
        const price = parseFloat(form.price.value);
        const quantity = parseInt(form.quantity.value);
        const description = form.description.value;

        if (!validateName(name)) {
            alert("Invalid name");
            return;
        }

        // 🔁 Backend expects a list of WsItem(s)
        const item = {
            name,
            price,
            quantity,
            description,
            shop_id: 1  // match Java field name using @JsonProperty
        };

        const itemsJsonBlob = new Blob([JSON.stringify((item))], {
            type: "application/json",
        });

        formData.append("item", itemsJsonBlob);
        if (imageFile) {
            formData.append("images", imageFile); // 'images' must match @RequestPart("images")
        }

        try {
            const response = await fetch("http://localhost:9098/api/shop/owner/items/add", {
                method: "POST",
                headers: {
                    "X-Session-Id": sessionId
                },
                body: formData
            });

            if (response.ok) {
                const newItems = await response.json();
                alert("Item uploaded successfully!");
                onItemAdded(newItems?.[0]); // Notify parent
                form.reset();
            } else {
                const errorData = await response.json();
                alert(`Failed to upload item. ${errorData.message || ''}`);
            }
        } catch (err) {
            console.error("Error adding item:", err);
            alert("An error occurred while uploading the item.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" name="image" accept="image/*" required />
                <input type="text" name="name" placeholder="Item name" required />
                <input type="number" name="price" placeholder="Price" step="0.01" required />
                <input type="number" name="quantity" placeholder="Quantity" required />
                <input type="text" name="description" placeholder="Description" />
                <button type="submit">Upload Item</button>
            </form>
        </div>
    );
}