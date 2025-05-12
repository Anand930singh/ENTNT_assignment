"use client"

import { useState, useEffect } from "react"
import { Save, X } from "lucide-react"
import "../../styles/HomeShip.css"

const ShipEditForm = ({ ship, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    imo: "",
    flag: "",
    status: "Active",
  })

  useEffect(() => {
    if (ship) {
      setFormData({
        name: ship.name || "",
        imoNumber: ship.imo || "",
        flag: ship.flag || "",
        status: ship.status || "Active",
      })
    }
  }, [ship])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="ship-edit-overlay">
      <div className="ship-edit-container">
        <div className="ship-edit-header">
          <h2>Edit Ship Details</h2>
          <button className="close-button" onClick={onCancel}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="ship-edit-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="imoNumber">IMO Number</label>
            <input
              type="text"
              id="imoNumber"
              name="imo"
              value={formData.imoNumber}
              onChange={handleChange}
              required
              pattern="[0-9]+"
              title="IMO Number must contain only numbers"
            />
          </div>

          <div className="form-group">
            <label htmlFor="flag">Flag</label>
            <input type="text" id="flag" name="flag" value={formData.flag} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select id="status" name="status" value={formData.status} onChange={handleChange} required>
              <option value="Active">Active</option>
              <option value="Under Maintenance">Under Maintenance</option>
              <option value="Inactive">Out of Service</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="save-button">
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


export default ShipEditForm
