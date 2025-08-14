import shirtLogo from "../assets/icons/shirt.svg";
import pantsLogo from "../assets/icons/pants.svg";
import shoeLogo from "../assets/icons/shoe.svg";

import { useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { deleteItem, editItem, getItem, getWardrobe } from "../firebase";

export default function EditClothing() {
    const location = useLocation();
    const navigate = useNavigate();
    const [docData, setDocData] = useState(location.state?.docData);
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    useEffect(() => {
        if (!docData) {
            navigate("/");
        }
    }, [docData, navigate]);

    async function handleForm(formData) {
        const name = formData.get("name");
        const desc = formData.get("desc");
        const icon = formData.get("icon");
        await editItem(name, desc, icon, docData.id);
        const docSnap = await getItem(docData.id);
        setDocData({ id: docData.id, ...docSnap.data() });
        document.getElementById("edit-dialog").show();
    }

    return (
        <main>
            <h1>Edit Clothing</h1>
            <form className="add-clothing-form" action={handleForm}>
                <label htmlFor="name">Name</label>
                <input
                    className="add-clothing-form-input"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Blue Sweater"
                    defaultValue={docData ? docData.name : ""}
                    maxLength="16"
                    required={true}
                    onBlur={() => {
                        const dialog = document.getElementById("edit-dialog");
                        if (dialog.open) {
                            dialog.close();
                        }
                        if (deleteConfirm) {
                            setDeleteConfirm(false);
                        }
                    }}
                />
                <label htmlFor="desc">Description</label>
                <textarea
                    className="add-clothing-form-input"
                    id="desc"
                    name="desc"
                    type="text"
                    placeholder="Royal blue, cable-knit sweater"
                    maxLength="128"
                    defaultValue={docData ? docData.desc : ""}
                    cols={20}
                    rows={40}
                    required={true}
                    onBlur={() => {
                        const dialog = document.getElementById("edit-dialog");
                        if (dialog.open) {
                            dialog.close();
                        }
                        if (deleteConfirm) {
                            setDeleteConfirm(false);
                        }
                    }}
                />
                <fieldset>
                    <legend htmlFor="icon">Icon</legend>
                    <label className="radio-container">
                        <input
                            type="radio"
                            name="icon"
                            value={0}
                            defaultChecked={docData && docData.icon == 0 ? true : false}
                            required={true}
                            onChange={() => {
                                const dialog = document.getElementById("edit-dialog");
                                if (dialog.open) {
                                    dialog.close();
                                }
                                if (deleteConfirm) {
                                    setDeleteConfirm(false);
                                }
                            }}
                        />
                        <span className="radio-box">
                            <img src={shirtLogo} alt="" />
                        </span>
                    </label>
                    <label className="radio-container">
                        <input
                            type="radio"
                            name="icon"
                            value={1}
                            defaultChecked={docData && docData.icon == 1 ? true : false}
                            onChange={() => {
                                const dialog = document.getElementById("edit-dialog");
                                if (dialog.open) {
                                    dialog.close();
                                }
                                if (deleteConfirm) {
                                    setDeleteConfirm(false);
                                }
                            }}
                        />
                        <span className="radio-box">
                            <img src={pantsLogo} alt="" />
                        </span>
                    </label>
                    <label className="radio-container">
                        <input
                            type="radio"
                            name="icon"
                            value={2}
                            defaultChecked={docData && docData.icon == 2 ? true : false}
                            onChange={() => {
                                const dialog = document.getElementById("edit-dialog");
                                if (dialog.open) {
                                    dialog.close();
                                }
                                if (deleteConfirm) {
                                    setDeleteConfirm(false);
                                }
                            }}
                        />
                        <span className="radio-box">
                            <img className="shoe" src={shoeLogo} alt="" />
                        </span>
                    </label>
                </fieldset>
                <button className="form-submit-btn" type="submit">
                    Edit Item
                </button>
            </form>
            <button
                onClick={async () => {
                    const querySnapshot = await getWardrobe();
                    const clothingData = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    navigate("/wardrobe", { state: { clothingData } });
                }}
                className="back-btn"
            >
                Back
            </button>
            <button
                onClick={async () => {
                    if (!deleteConfirm) {
                        setDeleteConfirm(true);
                    } else {
                        await deleteItem(docData.id, docData.icon);
                        const querySnapshot = await getWardrobe();
                        const clothingData = querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));
                        navigate("/wardrobe", { state: { clothingData } });
                    }
                }}
                className="delete-btn"
            >
                {deleteConfirm ? "Are you sure?" : "Delete Item"}
            </button>
            <dialog className="edit-dialog" id="edit-dialog">
                Item edited successfully
            </dialog>
        </main>
    );
}
